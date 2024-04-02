from .send_mail import send_mail
from .template_mail import format_mail

def send_reminder(user):
    send_mail(user.email, 'Reminder', format_mail('./mail_templates/reminder.html',data=user), content="html")
    return True

def send_entertaintment_report(user):
    send_mail(user.email, 'Report', format_mail('./mail_templates/entertainment.html',data=user), content="html")
    return True