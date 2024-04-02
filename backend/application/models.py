from .database import db
from flask_security import UserMixin, RoleMixin
from datetime import datetime



roles_users = db.Table('roles_users',
    db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
    db.Column('role_id', db.Integer(), db.ForeignKey('role.id')))


class User(db.Model, UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String, unique=True, nullable=False)
    name = db.Column(db.String)
    password = db.Column(db.String, nullable=False)
    active = db.Column(db.Boolean)
    fs_uniquifier = db.Column(db.String(255), unique=True, nullable=False)
    roles = db.relationship('Role', secondary=roles_users, backref=db.backref('users', lazy='dynamic'))
    theatres = db.relationship("Theatre")
    bookings = db.relationship("Booking", cascade="all, delete-orphan")

class Role(db.Model, RoleMixin):
    __tablename__ = 'role'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

# theatre_shows = db.Table('theatre_shows',
#     db.Column('theatre_id', db.Integer(), db.ForeignKey('theatre.theatre_id')),
#     db.Column('show_id', db.Integer(), db.ForeignKey('show.show_id')),
#     db.Column('time', db.DateTime, nullable=False, default=datetime.now))

class Theatre_show(db.Model):
    __tablename__ = 'theatre_show'
    theatre_show_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    theatre_id = db.Column(db.Integer(), db.ForeignKey('theatre.theatre_id'), nullable=False)
    show_id = db.Column(db.Integer(), db.ForeignKey('show.show_id'), nullable=False)
    time = db.Column(db.DateTime, nullable=False, default=datetime.now)
    avs = db.Column(db.Integer, nullable=False)

class Theatre(db.Model):
    __tablename__ = 'theatre'
    theatre_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    theatre_name = db.Column(db.String, nullable=False)
    place = db.Column(db.String, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    admin_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=True)
    # shows = db.relationship("Show", secondary=theatre_shows, backref=db.backref('theatres', lazy='dynamic'))
    theatre_shows = db.relationship("Theatre_show", cascade="all, delete-orphan", backref=db.backref('venue', lazy=True))
    bookings = db.relationship("Booking", cascade="all, delete-orphan", backref=db.backref('theatre', lazy=True))

class Show(db.Model):
    __tablename__ = 'show'
    show_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String, nullable=False)
    rating = db.Column(db.Float, nullable=True)
    qrat = db.Column(db.Integer, nullable=True)
    tags = db.Column(db.String, nullable=True)
    price = db.Column(db.Integer, nullable=False)
    img = db.Column(db.String, nullable=False)
    theatre_shows = db.relationship("Theatre_show", cascade="all, delete-orphan", backref=db.backref('show', lazy=True))
    bookings = db.relationship("Booking", cascade="all, delete-orphan", backref=db.backref('show', lazy=True))

class Booking(db.Model):
    __tablename__ = 'booking'
    booking_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    theatre_id = db.Column(db.Integer(), db.ForeignKey('theatre.theatre_id'), nullable=False)
    show_id = db.Column(db.Integer(), db.ForeignKey('show.show_id'), nullable=False)
    time = db.Column(db.DateTime, nullable=False, default=datetime.now)
    quantity = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Integer, nullable=False)

class PushSubscription(db.Model):
    __tablename__ = 'pushsubscription'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    endpoint = db.Column(db.String, nullable=False)
    keys = db.relationship("Key", cascade="all, delete-orphan")

class Key(db.Model):
    __tablename__ = 'key'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    subscription_id = db.Column(db.Integer, db.ForeignKey('pushsubscription.id'), nullable=False)
    p256dh = db.Column(db.String, nullable=False)
    auth = db.Column(db.String, nullable=False)