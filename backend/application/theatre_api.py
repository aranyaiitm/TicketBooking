from flask_restful import Resource
from flask_security import auth_required, roles_required
from flask_restful import  marshal_with, fields, reqparse
from flask_login import current_user
from flask import current_app
from .database import db
from .models import Theatre, Theatre_show
from .show_api import show_output
from .validation import  EntryValidationError
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import Conflict
from datetime import datetime

theatre_show_output ={
    "theatre_show_id" :fields.Integer,
    "theatre_id" :fields.Integer,
    "show_id" :fields.Integer,
    "time" :fields.DateTime(dt_format='iso8601'),
    "avs" :fields.Integer,
    "show" :fields.Nested(show_output)
}

theatre_output = {
    "theatre_id" :fields.Integer,
    "theatre_name" :fields.String,
    "place" :fields.String,
    "capacity" :fields.Integer,
    "theatre_shows" :fields.List(fields.Nested(theatre_show_output))
}

create_theatre_parser = reqparse.RequestParser()
create_theatre_parser.add_argument('theatre_name')
create_theatre_parser.add_argument('place')
create_theatre_parser.add_argument('capacity', type=int)

create_theatre_show_parser = reqparse.RequestParser()
create_theatre_show_parser.add_argument('theatre_id', type=int)
create_theatre_show_parser.add_argument('show_id', type=int)
create_theatre_show_parser.add_argument('time')
create_theatre_show_parser.add_argument('avs', type=int)

class Theatreinfo(Resource):
    @auth_required("token")
    @marshal_with(theatre_output)
    def get(self, theatre_id):
        theatre = Theatre.query.filter(Theatre.theatre_id == theatre_id).first()
        return theatre

    @auth_required("token")
    @roles_required("admin")
    def put(self, theatre_id):
        theatre = Theatre.query.filter(Theatre.theatre_id == theatre_id).first()

        args = create_theatre_parser.parse_args()
        theatre_name = args.get("theatre_name", None)
        place = args.get("place", None)
        capacity = args.get("capacity", None)

        if (theatre_name is not None):
            theatre.theatre_name= theatre_name
        if (place is not None):
            theatre.place = place
        if (capacity is not None):
            theatre.capacity = capacity
        try:
            db.session.commit()
            return '', 201
        except IntegrityError:
            raise Conflict
    
    @auth_required("token")
    @roles_required("admin")
    def delete(self, theatre_id):
        try:
            theatre = Theatre.query.filter(Theatre.theatre_id == theatre_id).first()
            db.session.delete(theatre)
            db.session.commit()
            return '', 204
        except IntegrityError:
            raise Conflict


class Theatres(Resource):
    @auth_required("token")
    @marshal_with(theatre_output)
    def get(self):
        theatre_list = Theatre.query.all()
        return theatre_list
    
    @auth_required("token")
    @roles_required("admin")
    def post(self):
        args = create_theatre_parser.parse_args()
        theatre_name = args.get("theatre_name", None)
        place = args.get("place", None)
        capacity = args.get("capacity", None)
        admin_id = current_user.id


        if theatre_name is None:
            raise EntryValidationError(status_code=400, error_code='NT1001', error_message='vanue name is required')
        if place is None:
            raise EntryValidationError(status_code=400, error_code='NT1002', error_message='place is required')
        if capacity < 50:
            raise EntryValidationError(status_code=400, error_code='NT1004', error_message='minimum 50 capacity required')
        try:
            current_app.logger.info('started createing a theatre in database')
            theatre = Theatre(theatre_name=theatre_name, place=place, capacity=capacity, admin_id=admin_id)
            db.session.add(theatre)
            db.session.commit()
            return '', 201
        except IntegrityError:
            raise Conflict
        
    
class Theatre_showinfo(Resource):
    @auth_required("token")
    @roles_required("admin")
    def delete(self, theatre_show_id):
        try:
            theatre_show = Theatre_show.query.filter(Theatre_show.theatre_show_id == theatre_show_id).first()
            db.session.delete(theatre_show)
            db.session.commit()
            return '', 204
        except IntegrityError:
            raise Conflict
        
class Theatre_shows(Resource):
    @auth_required("token")
    @roles_required("admin")
    def post(self):
        args = create_theatre_show_parser.parse_args()
        theatre_id = args.get("theatre_id", None)
        show_id = args.get("show_id", None)
        time = args.get("time", None)
        timestamp = datetime.strptime(time, '%Y-%m-%dT%H:%M')
        avs = args.get("avs", None)

        try:
            current_app.logger.info('started adding a show in theatre')
            theatre_show = Theatre_show(theatre_id=theatre_id, show_id=show_id, time=timestamp, avs=avs)
            db.session.add(theatre_show)
            db.session.commit()
            return '', 201
        except IntegrityError:
            raise Conflict