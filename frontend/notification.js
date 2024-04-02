
import Fetchdata from "./Fetch.js"
import ApiUrl from './config.js'

export default {
  template: `<div>
    <button @click='enebleNotification'> Eneble Notification </button>
    </div>`,

    data() {
      return {
        pushNotificationSupported: false,
        pushNotificationPermission: null,
        userSubscribed: false,
        serviceWorkerRegistration: null
      };
    },

    mounted() {
      this.checkPushNotificationSupport();
      // this.checkPushNotificationPermission();
      // this.registerServiceWorker();
    },

    methods: {
      async checkPushNotificationSupport() {
        if ('Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window) {
          this.pushNotificationSupported = true;
        }
        else {
          throw new Error("Notification not supported")
        }
      },

      async checkPushNotificationPermission() {
      //   if (this.pushNotificationPermission === 'default') {
      //     // Notification permission hasn't been requested yet
      //     await this.requestNotificationPermission();
      //   }
          if (this.pushNotificationSupported) {
            this.pushNotificationPermission = Notification.permission
          }
      },

      async requestNotificationPermission() {
        if (this.pushNotificationPermission === 'denied') {
          console.error("Push Notification permission denied")
        } else if (this.pushNotificationPermission === 'default'){
          try {
            const permission = await Notification.requestPermission();
            this.pushNotificationPermission = permission;
            if (permission === 'granted') {
              // User granted permission, subscribe to push notifications
            } else {
              console.warn('User denied permission for push notifications.');
            }
          } catch (error) {
            console.error('Failed to request notification permission:', error);
          }
        }
      },

      async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
          try {
            const registration = await navigator.serviceWorker.register('/service-worker.js');
            this.serviceWorkerRegistration = registration;
            // this.checkSubscription();
            await navigator.serviceWorker.ready.then((registration) =>{
              console.log(registration.active)
            })
          } catch (error) {
            console.error('Service worker registration failed:', error);
          }
        } else {
          console.warn('Service workers are not supported.');
        }
      },

      async checkSubscription() {
        if (this.serviceWorkerRegistration == null) {
          const registration = await navigator.serviceWorker.getRegistration()
          this.serviceWorkerRegistration = registration;
        }
        if (this.serviceWorkerRegistration != null) {
          const subscription = await this.serviceWorkerRegistration.pushManager.getSubscription();
          this.userSubscribed = !!subscription;
        }
        // else {
        //   console.log('No service worker found')
        // }
      },

      urlBase64ToUint8array(base64String) {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
          .replace(/\-/g, '+')
          .replace(/_/g, '/');
    
        const rawData = atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        
        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i)
        }
        return outputArray
      },

      async sendSubscriptionToBackend(subscription) {
        // Send the subscription object to your backend server
        const response = await Fetchdata({
            url: `${ApiUrl}/subscribe`,
            obj: {
              headers: {
                  'Content-Type': 'application/json',
              },
              method: 'POST',
              body: JSON.stringify(subscription),
            },
            authRequired: true
        })
      },

      async subscribeToPushNotifications() {
        const subscription = await this.serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8array("BMpD7vFmWSvqV0Z4Fa4Y9h5PZCJUT_h7bFeKCsro6ZtXppSTYE73aQZwamqQaQGZOeiFvx3TzQCI5WBOlrWh-_8")
        });
        // Send the subscription details to your backend
        const response = await this.sendSubscriptionToBackend(subscription);
        this.userSubscribed = true;
        console.log(response)
        // console.log(subscription)
        // registration.showNotification("Success", { body: "Hello World"})
      },

      async enebleNotification() {
        if (this.pushNotificationSupported) {
          await this.checkPushNotificationPermission();
          await this.requestNotificationPermission();
          await this.checkSubscription();
          if (!this.userSubscribed) {
            await this.registerServiceWorker();
            await this.subscribeToPushNotifications();
          }
        }
      }
      
    // =======================================

    // Public Key:
    // BMpD7vFmWSvqV0Z4Fa4Y9h5PZCJUT_h7bFeKCsro6ZtXppSTYE73aQZwamqQaQGZOeiFvx3TzQCI5WBOlrWh-_8

    // Private Key:
    // qTmJymzitzaxCbhlAAZbnj7iIx4cP9HvPHJ_BMu2g34

    // =======================================
    // {
    //   "endpoint": "https://fcm.googleapis.com/fcm/send/fRKNqwkN4UU:APA91bGyPC1Crc6DUY73Ma_oc9FjnxehaM0smBdhsmURaGlhhCblumW3XiCwjGwkdLeHs4kBmFG7aT4gJnYlGiVG5k3hO9ueBBUJ36co0JyWxBb2VzEKLyQULGgivHsN89ntA3IFxwKm",
    //   "expirationTime": null,
    //   "keys": {
    //       "p256dh": "BO4h7ZQYQcWdIf3P5w6GdYqOpjIJaZNRPK5j85tfh7-HveBR4v5hnuEzxGgbemUGUa7vyauQvnel8arw_h6WjLs",
    //       "auth": "cCOYsI2I-2_SXaycTd6EdQ"
    //   }
    // }
    }
};
  