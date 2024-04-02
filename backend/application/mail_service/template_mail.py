from jinja2 import Template
from .send_mail import send_mail

# To compile mail_templates with data use format_mail function
def format_mail(mail_template,data):
    with open(mail_template, 'r') as f:
        template = Template(f.read())
        return template.render(data=data)


# def send_reminder(user):
#     send_mail('test5@test.com', 'subject', format_mail('./mail_templates/mail.html',data=user), content="html", attachment_file='requirements.txt')
#     return True