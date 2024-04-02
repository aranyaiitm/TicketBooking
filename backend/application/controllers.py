from flask import render_template
from flask import current_app as app
from flask_security import auth_required


@app.route("/")
@auth_required()
def home():
    return render_template("index.html")