from flask import Flask
from application.config import LocalDevelopementConfigaration
from application.database import db
from application.datastore import user_datastore, security
# api import
from application.resources import api
# flask-CORS
from flask_cors import CORS

app = None

def create_app():
    app = Flask(__name__, template_folder="templates")
    app.config.from_object(LocalDevelopementConfigaration)
    db.init_app(app)
    api.init_app(app)
    security.init_app(app, user_datastore)
    CORS(app)
    app.app_context().push()
    return app

app = create_app()

#controllers
from application.controllers import *

if __name__ == "__main__":
    app.run(port=8080,host='0.0.0.0')