from flask_restful import Resource
from flask_security import auth_required, roles_required
from flask_restful import  marshal_with, fields, reqparse
from flask import current_app
from .database import db
from .theatre_api import theatre_show_output
from .booking_api import booking_output
from .models import Show
from .validation import  EntryValidationError
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import Conflict
from .cache import cache



show_output = {
    "show_id" :fields.Integer,
    "title" :fields.String,
    "rating" :fields.Float,
    "tags" :fields.String,
    "price" :fields.Integer,
    "theatre_shows" :fields.List(fields.Nested(theatre_show_output)),
    "bookings" :fields.List(fields.Nested(booking_output))
}

create_show_parser = reqparse.RequestParser()
create_show_parser.add_argument('title')
create_show_parser.add_argument('rating', type=int)
create_show_parser.add_argument('tags')
create_show_parser.add_argument('price')

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

        if (title is not None):
            show.title = title
        if (rating is not None):
            show.rating = (show.rating*show.qrat + rating)/(show.qrat+1)
            show.rating = round(show.rating, 2)
            show.qrat += 1
        if (tags is not None):
            show.tags = tags
        if (price is not None):
            show.price = price
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

        if title is None:
            raise EntryValidationError(status_code=400, error_code='NS1001', error_message='title is required')
        if price is None:
            raise EntryValidationError(status_code=400, error_code='NS1002', error_message='price is required')
        try:
            current_app.logger.info('started createing a show in database')
            show = Show(title=title, rating=rating, tags=tags, price=price, qrat=1)
            db.session.add(show)
            db.session.commit()
            return '', 201
        except IntegrityError:
            raise Conflict