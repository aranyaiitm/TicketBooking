import os


curr_dir = os.path.abspath(os.path.dirname(__file__))

class Config():
    SQLITE_DB_DIR = None
    SQLALCHEMY_DATABASE_URI = None
    DEBUG = True
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class LocalDevelopementConfigaration(Config):
    SQLITE_DB_DIR = os.path.join(curr_dir, "../db_directory")
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(SQLITE_DB_DIR, "mad_2project.sqlite3")
    SECRET_KEY = "atsjpbsecret"
    # Flask-security-too
    SECURITY_PASSWORD_SALT = "atsjpbsalt"
    SECURITY_PASSWORD_HASH = "bcrypt"
    SECURITY_TOKEN_AUTHENTICATION_HEADER = "Authentication-Token"
    WTF_CSRF_ENABLED = False
    SECURITY_REGISTERABLE = True
    SECURITY_SEND_REGISTER_EMAIL = False