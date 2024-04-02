from application.workers import celery
from celery.schedules import crontab
from application.models import User, Theatre, PushSubscription
from application.mail_service.mail import send_reminder, send_entertaintment_report
from .notification import push_general_notification
from datetime import datetime, timedelta
# from flask import jsonify
import csv
import os
from flask import current_app as app


def last_month(time):
    today = datetime.now()
    lmonthdate = today - timedelta(days=today.day+1)
    return time.month == lmonthdate.month

#-----------------------------------------Callable jobs-------------------------------------------------
@celery.task()
def export_csv(theatre_id):
        
        theatre = Theatre.query.filter(Theatre.theatre_id == theatre_id).first()

        if theatre:
            
            csv_directory = app.config['CSV_DOWNLOAD_PATH']
            filename = f"export_theatre_{theatre.theatre_id}.csv"
            filepath = os.path.join(csv_directory, filename)

            csv_data = [['Theatre Name','Number of Shows','Number of Bookings' ],
                        [theatre.theatre_name, len(theatre.theatre_shows), len(theatre.bookings)]]
            
            os.makedirs(os.path.dirname(filepath), exist_ok=True)

            with open(filepath, mode='w', newline='') as file:
                writer = csv.writer(file)
                writer.writerows(csv_data)

            return filename
        else:
            return None


# @celery.task()
# def export_csv(theatre):
        
#         filename = f"export_theatre_{theatre.theatre_id}.csv"

#         csv_data = [['Theatre Name','Number of Shows','Number of Bookings' ],
#                     [theatre.theatre_name, len(theatre.theatre_shows), len(theatre.bookings)]]
#         with open(filename, mode='w', newline='') as file:
#             writer = csv.writer(file)
#             writer.writerows(csv_data)

#         return filename

# ------------------------------------------Scheduled jobs-----------------------------------------------

@celery.task()
def reminder_job():
    users = User.query.all()
    for user in users:
        if user.bookings == []:
            send_reminder(user)

@celery.task()
def monthly_report_job():
    users = User.query.all()
    for user in users:
        last_month_bookings = []
        for booking in user.bookings:
            if last_month(booking.time):
                last_month_bookings.append(booking)
        user1 = user
        user1.bookings = last_month_bookings
        if user1.bookings != []:
            send_entertaintment_report(user1)

@celery.task()
def entertaintment_notification_job():
    subscriptions = PushSubscription.query.all()
    for subscription in subscriptions:
        notification_data = {
            "title": "Get Ready for the Showtime!",
            "body": "Ready for an incredible weekend? Head over to our website to unlock the excitement of our upcoming shows.",
            "url": "http://localhost:8000/"
        }
        push_general_notification(subscription,notification_data)

# Testing
# @celery.on_after_finalize.connect
# def daily_reminder_job_test(sender, **kwargs):
#     sender.add_periodic_task(10.0, monthly_report_job.s(), name='at every 10 seconds')

@celery.on_after_finalize.connect
def daily_reminder_job(sender, **kwargs):
    sender.add_periodic_task(
        crontab(hour=18, minute=30),
        reminder_job.s(),
    )

@celery.on_after_finalize.connect
def monthly_entertaintment_report_job(sender, **kwargs):
    sender.add_periodic_task(
        crontab(day_of_month=1, hour=6, minute=00),
        monthly_report_job.s(),
    )

@celery.on_after_finalize.connect
def weekend_entertaintment_notification_job(sender, **kwargs):
    sender.add_periodic_task(
        crontab(day_of_week=6, hour=8, minute=00),
        entertaintment_notification_job.s(),
    )