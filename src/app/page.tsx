'use client'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseConfig from "../../utils/firebaseConfig.json";
import { useEffect } from "react";

export default function Home() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
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
    // Subscribe to the topic
    const topicURL = `https://fcm.googleapis.com/fcm/send`;
    const body = JSON.stringify({
      "to": "/topics/news",
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
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => confirmNotification()}>Ask for notification</button>
      <button onClick={() => triggerNotification()}>Trigger Notification</button>
    </main>
  );
}
