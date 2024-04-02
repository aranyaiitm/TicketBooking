from .push import push
from flask_pywebpush import WebPushException
from .database import db

def push_general_notification(subscription,notification_data):

    keys = {
        'p256dh': subscription.keys[0].p256dh,
        'auth': subscription.keys[0].auth
    }

    subscription_info = {
        'endpoint': subscription.endpoint,
        'keys': keys
    }

    try:
        push.send(subscription_info, notification=notification_data)
    except WebPushException as exc:
        print(exc)
        db.session.delete(subscription)
        db.session.commit()

    return True