'use client'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseConfig from "../../utils/firebaseConfig.json";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const router = useRouter();
  useEffect(() => {
    // Set up the onMessage listener outside fetch request
    onMessage(getMessaging(app), (payload) => {
      console.log('messageReceived', payload);
      // Handle incoming messages here
    });
  }, []);

  const confirmNotification = () => {

    if (window && window.Notification.permission !== "granted") {
      console.log("Inside if", window.Notification.permission);
      window.Notification.requestPermission();
    } else {
      console.log("notifications not allowed");
    }
  }

  const triggerNotification = () => {
    if (window && window.Notification.permission === "granted") {
      subscribeToTopic("news");
      //Manual Notification Trigger
    }
    else {
      console.log("not subscribed")
    }
  }

  const subscribeToTopic = (topicName: string) => {
    getToken(getMessaging(), { vapidKey: 'BAIvvsE2zXF7Cf9YukrxY6MCfdtE2M6hl7ErNxvCqoOUVKl0vusW9VfYjG8h-hs_-pNFTvtNgNsyyoyYTF1rlGA' }).then((currentToken:any) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        console.log("Token generated", currentToken);
        // ...
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });

    // Subscribe to the topic
    const topicURL = `https://fcm.googleapis.com/fcm/send`;
    const body = JSON.stringify({
      "to": "/topics/all",
      "notification": {
        "body": "This week's edition is now available.",
        "title": "NewsMagazine.com",
      }
    });
    fetch(topicURL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `key=AAAAuvQ3Tok:APA91bFpGv5DtYQKreD4A-7m943I3fYBktvmSSfFrEmCm4Jbs35guRYzXKBcopfKtIOZaoiRs-72QgxMUbyYUd3RVDq7qCrhu9gHc2zDajiWgScafCO9Bq0KuouhJrhihCi7SjQK8IKz`,
        },
        body: body
      }).then((response: any) => {
        console.log(response, "SUBSCRIBED")
        if (response.status === 200) {
          console.log(response, "RS")
        }
      })
      .catch(() => {
        console.error(`Can't subscribe to ${topicName} topic`);
      });
  };
    // useEffect(() => {
    //   // Service worker registration
    //   if ('serviceWorker' in navigator) {
    //     window.addEventListener('load', () => {
    //       navigator.serviceWorker
    //         .register('/firebase-messaging-sw.js')
    //         .then((registration) => {
    //           console.log('Service worker registered:', registration);
    //         })
    //         .catch((error) => {
    //           console.error('Service worker registration failed:', error);
    //         });
    //     });
    //   }
    // }, [router]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => confirmNotification()}>Ask for notification</button>
      <button onClick={() => triggerNotification()}>Trigger Notification</button>
    </main>
  );
}
