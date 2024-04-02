from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import smtplib

SERVER_SMTP_HOST = 'localhost'
SERVER_SMTP_PORT = 1025
SENDER_ADDRESS = "sender@test.com"
SENDER_PASSWORD = ''

def send_mail(to_address, subject, message, content="text", attachment_file=None):
    msg = MIMEMultipart()
    msg['To'] = to_address
    msg['From'] = SENDER_ADDRESS
    msg['Subject'] = subject


    if content == "html":
        msg.attach(MIMEText(message, 'html'))
    else:
        msg.attach(MIMEText(message, 'plain'))


    if attachment_file:
        with open(attachment_file, "rb") as attachment:
            part = MIMEBase("application", "octa-stream")
            part.set_payload(attachment.read())
        encoders.encode_base64(part)
        part.add_header(
            "Content-Disposition", f"attachment; filename={attachment_file}",
        )
        msg.attach(part)


    s = smtplib.SMTP(host=SERVER_SMTP_HOST, port=SERVER_SMTP_PORT)
    s.login(SENDER_ADDRESS, SENDER_PASSWORD)
    s.send_message(msg)
    s.quit()

    return True