from flask import render_template
from flask import current_app as app
from flask_security import auth_required
from application import tasks
from datetime import datetime
from application.mail_service.mail import send_reminder, send_entertaintment_report
from application.models import User, Theatre, Theatre_show, Show, PushSubscription
from .push import push

@app.route("/")
@auth_required()
def home():
    return render_template("index.html")

# -----------test---------------
# @app.route("/test")
# @auth_required()
# def test():
#     data = Theatre_show.query.filter(
#         (Theatre_show.show.title.like('%' + 'paradox' + '%'))
#     ).all()
#     return render_template("test.html", data = data)
# -----------test---------------

# @app.route("/hello/<user_name>", methods=["GET", "POST"])
# def hello(user_name):
#     job = tasks.just_say.delay(user_name)
#     result = job.get()
#     return str(result), 200

# @app.route("/nhello", methods=["GET", "POST"])
# def nhello():
#     now = datetime.now()
#     print("now in flask =", now)
#     dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
#     print("date and time =", dt_string)

#     job = tasks.dghj.apply_async(countdown=10)
#     result = job.wait()

#     return str(result), 200

# @app.route("/mail/<int:id>", methods=["GET", "POST"])
# def mail(id):
#     user = User.query.filter(User.id == id).first()
#     send_entertaintment_report(user)
#     send_reminder(user)
#     return 'mail send'

# @app.route("/mail", methods=["GET", "POST"])
# def reminder_job():
#     users = User.query.all()
#     for user in users:
#         if user.bookings == []:
#             print(user.name)
#     return ('Done')

# -----------notification test---------------
# @app.route("/notification", methods=["GET"])
# def push_notification():
#     subscriptions = PushSubscription.query.all()
#     for subscription in subscriptions:
#         keys = {
#             'p256dh': subscription.keys[0].p256dh,
#             'auth': subscription.keys[0].auth
#         }

#         subscription_info = {
#             'endpoint': subscription.endpoint,
#             'keys': keys
#         }

#         notification_data = {
#             "title": "New Message",
#             "body": "You have a new message!"
#             # You can add more data here as needed
#         }
#         print(subscription_info)
#         push.send(subscription_info, notification=notification_data)
#     return "ok"
# -----------notification test---------------