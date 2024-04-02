from flask_restful import Resource
from flask_security import auth_required
from flask_restful import  marshal_with, fields, reqparse
from flask import current_app
from ..database import db
from ..models import Booking, Theatre_show
from .theatre_api import theatre_output, CustomDate
from ..validation import  EntryValidationError
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import Conflict
from datetime import datetime
from ..cache import cache


show = {
    "show_id" :fields.Integer,
    "title" :fields.String,
    "rating" :fields.Float,
    "tags" :fields.String,
    "price" :fields.Integer,
}
booking_output = {
    "booking_id" :fields.Integer,
    "theatre_id" :fields.Integer,
    "time" : CustomDate,
    "quantity" :fields.Integer,
    "total_price" :fields.Integer,
    "theatre" :fields.Nested(theatre_output),
    "show" :fields.Nested(show)
}

create_booking_parser = reqparse.RequestParser()
create_booking_parser.add_argument('user_id')
create_booking_parser.add_argument('theatre_id')
create_booking_parser.add_argument('show_id')
create_booking_parser.add_argument('time')
create_booking_parser.add_argument('quantity', type=int)
create_booking_parser.add_argument('total_price')

class Bookinginfo(Resource):
    @auth_required("token")
    @marshal_with(booking_output)
    def get(self, booking_id):
        pass


    def put(self, booking_id):
        pass


    def delete(self, booking_id):
        pass


class Bookings(Resource):
    @auth_required("token")
    @marshal_with(booking_output)
    def get(self):
        booking_list = Booking.query.all()
        return booking_list

    @auth_required("token")
    def post(self):
        args = create_booking_parser.parse_args()
        user_id = args.get("user_id", None)
        theatre_id = args.get("theatre_id", None)
        show_id = args.get("show_id", None)
        time = args.get("time", None)
        timestamp = datetime.strptime(time, '%Y-%m-%dT%H:%M:%S')
        quantity = args.get("quantity", None)
        total_price = args.get("total_price", None)

        theatre_show = Theatre_show.query.filter((Theatre_show.theatre_id == theatre_id) & (Theatre_show.show_id == show_id)).first()
        new_avs = theatre_show.avs - quantity

        if theatre_show.avs < quantity:
            raise EntryValidationError(status_code=400, error_code='NB1001', error_message= str(quantity) + ' ticket not avilable')
        if quantity == 0:
            raise EntryValidationError(status_code=400, error_code='NB1001', error_message='book minimum 1 ticket')
        
        try:
            current_app.logger.info('started createing a booking in database')
            booking = Booking(user_id=user_id, theatre_id=theatre_id, show_id=show_id, time=timestamp, quantity=quantity, total_price=total_price)
            db.session.add(booking)
            theatre_show.avs = new_avs
            db.session.commit()
            return '', 201
        except IntegrityError:
            raise Conflict