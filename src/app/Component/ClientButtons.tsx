"use client"
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseConfig from "../../../utils/firebaseConfig.json";

export const ClientButton = () => {
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
    onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
    });
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
        }
        else {
            console.log("not subscribed")
        }
    }

    const subscribeToTopic = async (topicName: string) => {
        getToken(getMessaging(), { vapidKey: 'BAIvvsE2zXF7Cf9YukrxY6MCfdtE2M6hl7ErNxvCqoOUVKl0vusW9VfYjG8h-hs_-pNFTvtNgNsyyoyYTF1rlGA' }).then((currentToken: any) => {
            if (currentToken) {
                // Send the token to your server and update the UI if necessary
                fetch('./api/subscribe-to-topic', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "token": currentToken,

                    })
                }).then((res) => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json(); // Convert the response body to JSON
                }).then((data) => {
                    console.log('Response:', data); // Log the response body
                }).catch((e: Error) => {
                    console.error(e, "SOmething went wrong!")
                })
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
    return (
        <>
            <button onClick={() => confirmNotification()}>Ask for notification</button>
            <button onClick={() => triggerNotification()}>Trigger Notification</button>
        </>
    )
}