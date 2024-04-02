import os


curr_dir = os.path.abspath(os.path.dirname(__file__))

class Config():
    SQLITE_DB_DIR = None
    SQLALCHEMY_DATABASE_URI = None
    DEBUG = True
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CELERY_BROKER_URL = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND = "redis://localhost:6379/2"
    # Caching
    CACHE_TYPE = "RedisCache"
    CACHE_REDIS_URL = "redis://localhost:6379/3"
    CACHE_DEFAULT_TIMEOUT = 1000
    CACHE_REDIS_HOST = "localhost"
    CACHE_REDIS_PORT = 6379
    CACHE_KEY_PREFIX = 'my_app'

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
    CELERY_BROKER_URL = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND = "redis://localhost:6379/2"
    # Caching
    CACHE_TYPE = "RedisCache"
    CACHE_REDIS_URL = "redis://localhost:6379/3"
    CACHE_DEFAULT_TIMEOUT = 1000
    CACHE_REDIS_HOST = "localhost"
    CACHE_REDIS_PORT = 6379
    CACHE_KEY_PREFIX = 'my_app'
    #download file path
    CSV_DOWNLOAD_FOLDER = 'exports'
    CSV_DOWNLOAD_PATH = os.path.join(curr_dir, "../static", CSV_DOWNLOAD_FOLDER)
    IMAGES_UPLOAD_FOLDER = 'imgs'
    IMAGES_UPLOAD_PATH = os.path.join(curr_dir, "../static", IMAGES_UPLOAD_FOLDER)
    #push-notification
    WEBPUSH_VAPID_PRIVATE_KEY = 'qTmJymzitzaxCbhlAAZbnj7iIx4cP9HvPHJ_BMu2g34'
    WEBPUSH_SENDER_INFO = 'mailto:admin@ticket.com'