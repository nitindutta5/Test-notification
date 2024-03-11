import { NextResponse, NextRequest } from 'next/server';
import admin from 'firebase-admin';
import serviceAccount from '../../../../push-notification-239bd-firebase-adminsdk-n838u-b111ddf280.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as {}),
});

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.text();
  const bodyJson = JSON.parse(body)
  console.log(bodyJson,"BJ")
  const token = bodyJson.token;
  // if (!token) {
  //   return res.status(400).send('Token is required');
  // }
  try {
    const response = await admin.messaging().subscribeToTopic(token,"all");
    console.log("SUBSCRIPTION RESPONSE", response);
    res.json();
    // res.status(200).send("Message sent successfully");
  } catch (err) {
    // console.error("Error sending message:", err);
    // res.status(500).send("Error sending message");
  }
}