from flask_security import Security, SQLAlchemyUserDatastore
from .models import User, Role
from .database import db

# Setup Flask-Security
user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security()