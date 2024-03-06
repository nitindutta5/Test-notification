
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// eslint-disable-next-line
importScripts("https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js");
// eslint-disable-next-line
importScripts("https://www.gstatic.com/firebasejs/8.6.7/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
// eslint-disable-next-line
firebase.initializeApp({
    "apiKey": "AIzaSyDBlRRdKxsIiKGvw5aCRYKinUkB_9AtR9c",
    "authDomain": "push-notification-239bd.firebaseapp.com",
    "projectId": "push-notification-239bd",
    "storageBucket": "push-notification-239bd.appspot.com",
    "messagingSenderId": "802961182345",
    "appId": "1:802961182345:web:36f7288de36da7a0f00058",
    "measurementId": "G-C3SRG1SZH4"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// eslint-disable-next-line
const messaging = firebase.messaging();

messaging.onBackgroundMessage((message) => {
  return self.showNotification(
    message.notification.title,
    message.notification
  );
});