from flask_restful import Resource
from flask_security import auth_required, roles_required
from flask_restful import  marshal_with, fields, reqparse
from flask import current_app as app
from ..database import db
from .theatre_api import theatre_show_output
from .booking_api import booking_output
from ..models import Show
from ..validation import  EntryValidationError
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import Conflict
from werkzeug.utils import secure_filename
from ..cache import cache
import werkzeug
import os


show_output = {
    "show_id" :fields.Integer,
    "title" :fields.String,
    "rating" :fields.Float,
    "tags" :fields.String,
    "price" :fields.Integer,
    "img" :fields.String,
    "theatre_shows" :fields.List(fields.Nested(theatre_show_output)),
    "bookings" :fields.List(fields.Nested(booking_output))
}

create_show_parser = reqparse.RequestParser()
create_show_parser.add_argument('title', location='form')
create_show_parser.add_argument('rating', type=int, location='form')
create_show_parser.add_argument('tags', location='form')
create_show_parser.add_argument('price', location='form')
create_show_parser.add_argument('img', type=werkzeug.datastructures.FileStorage, location='files')

create_rating_parser = reqparse.RequestParser()
create_rating_parser.add_argument('rating', type=int)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class Showinfo(Resource):
    @auth_required("token")
    @marshal_with(show_output)
    def get(self, show_id):
        show = Show.query.filter(Show.show_id == show_id).first()
        return show

    @auth_required("token")
    @roles_required("admin")
    def put(self, show_id):
        show = Show.query.filter(Show.show_id == show_id).first()

        args = create_show_parser.parse_args()
        title = args.get("title", None)
        rating = args.get("rating", None)
        tags = args.get("tags", None)
        price = args.get("price", None)
        img = args.get("img", None)

        if (title != ''):
            show.title = title
        if (rating is not None):
            show.rating = (show.rating*show.qrat + rating)/(show.qrat+1)
            show.rating = round(show.rating, 2)
            show.qrat += 1
        if (tags != ''):
            show.tags = tags
        if (price is not None):
            show.price = price
        if (img is not None):
            if (img.filename != '') and allowed_file(img.filename):
                show.img = secure_filename(img.filename)
                img.save(os.path.join(app.config['IMAGES_UPLOAD_PATH'], secure_filename(img.filename)))
        try:
            db.session.commit()
            return '', 201
        except IntegrityError:
            raise Conflict


    @auth_required("token")
    @roles_required("admin")
    def delete(self, show_id):
        try:
            show = Show.query.filter(Show.show_id == show_id).first()
            db.session.delete(show)
            db.session.commit()
            return '', 204
        except IntegrityError:
            raise Conflict


class Shows(Resource):
    @auth_required("token")
    @marshal_with(show_output)
    def get(self):
        show_list = Show.query.all()
        return show_list
    
    @auth_required("token")
    @roles_required("admin")
    def post(self):
        args = create_show_parser.parse_args()
        title = args.get("title", None)
        rating = args.get("rating", None)
        tags = args.get("tags", None)
        price = args.get("price", None)
        img = args.get("img", None)

        if title == '':
            raise EntryValidationError(status_code=400, error_code='NS1001', error_message='title is required')
        if price is None:
            raise EntryValidationError(status_code=400, error_code='NS1002', error_message='price is required')
        if img is None:
            raise EntryValidationError(status_code=400, error_code='NS1004', error_message='image is required')
        if img.filename == '':
            raise EntryValidationError(status_code=400, error_code='NS1004', error_message='image is required')
        if allowed_file(img.filename) != True:
            raise EntryValidationError(status_code=400, error_code='NS1004', error_message='only png/jpg/jpeg files are allowed')
        try:
            app.logger.info('started createing a show in database')

            filename = secure_filename(img.filename)
            img.save(os.path.join(app.config['IMAGES_UPLOAD_PATH'], filename))

            show = Show(title=title, rating=rating, tags=tags, price=price, qrat=1, img=filename)
            db.session.add(show)
            db.session.commit()
            return '', 201
        except IntegrityError:
            raise Conflict
        
        
class RateShow(Resource):
    @auth_required("token")
    def put(self, show_id):
        show = Show.query.filter(Show.show_id == show_id).first()

        args = create_rating_parser.parse_args()
        rating = args.get("rating", None)

        if (rating is not None):
            show.rating = (show.rating*show.qrat + rating)/(show.qrat+1)
            show.rating = round(show.rating, 2)
            show.qrat += 1
        try:
            db.session.commit()
            return '', 201
        except IntegrityError:
            raise Conflict

