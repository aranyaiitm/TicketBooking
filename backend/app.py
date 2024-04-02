from flask import Flask
import os
from application.config import LocalDevelopementConfigaration
from application.database import db
from application import workers
from application.datastore import user_datastore, security
# api import
from application.resources import api
# flask-CORS
from flask_cors import CORS
from application.cache import cache

app = None
celery = None

def create_app():
    app = Flask(__name__, template_folder="templates")
    if os.getenv('ENV', "development") == "production":
        app.logger.info("Currently no production config is setup.")
        raise Exception("Currently no production config is setup.")
    else:
        app.logger.info("Staring Local Development.")
        print("Staring Local Development")
        app.config.from_object(LocalDevelopementConfigaration)
    db.init_app(app)
    api.init_app(app)
    cache.init_app(app)
    security.init_app(app, user_datastore)
    CORS(app)
    app.app_context().push()
    celery = workers.celery
    celery.conf.update(
        broker_url = app.config["CELERY_BROKER_URL"],
        result_backend = app.config["CELERY_RESULT_BACKEND"]
    )
    celery.Task = workers.ContextTask
    return app, celery

app, celery = create_app()

#controllers
from application.controllers import *

db_file_path = app.config['SQLALCHEMY_DATABASE_URI'].replace('sqlite:///','')
if not os.path.exists(db_file_path):
    print('creating new db')
    db.create_all()

    admin_role = user_datastore.create_role(name='admin',description='Adminstrative role.')
    admin_user = user_datastore.create_user(email='admin@ticket.com',name='Default Admin', password='password')

    user_datastore.add_role_to_user(admin_user, admin_role)
    db.session.commit()

if __name__ == "__main__":
    app.run(port=8080,host='0.0.0.0')