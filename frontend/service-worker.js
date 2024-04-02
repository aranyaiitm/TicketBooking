// self.addEventListener("activate", e => {
//     console.log('Service worker is activated')
// })

self.addEventListener("push", e => {
    let payload = e.data.json();

    const options = {
        data: {
            url: payload?.['url']
        },
        body: payload?.['body']
    };

    e.waitUntil(self.registration.showNotification(payload?.['title'],options));
});

self.addEventListener("notificationclick", e =>{
    let payload = e.notification.data;
    clients.openWindow(payload?.['url']);
})