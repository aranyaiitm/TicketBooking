from flask_restful import Resource
from flask_security import auth_required
from ..push import push
from ..models import PushSubscription, Key
from flask_restful import marshal_with, fields, reqparse
from flask import current_app as app
from ..database import db
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import Conflict


key_output = {
    "p256dh" :fields.String,
    "auth" :fields.String
}
subscription_output = {
    "endpoint" :fields.String,
    "keys" :fields.List(fields.Nested(key_output)),
}

create_subscription_parser = reqparse.RequestParser()
create_subscription_parser.add_argument('endpoint', type=str, required=True)
create_subscription_parser.add_argument('keys', type=dict, required=True, location='json')

class Subscription(Resource):
    @auth_required("token")
    def post(self):
        args = create_subscription_parser.parse_args()
        endpoint = args.get("endpoint", None)
        keys = args.get("keys", None)
        keys = [Key(**keys)]

        try:
            app.logger.info('started createing a subscription in database')
            subscription = PushSubscription(endpoint=endpoint, keys=keys)
            db.session.add(subscription)
            db.session.commit()
            return '', 201
        except IntegrityError:
            raise Conflict