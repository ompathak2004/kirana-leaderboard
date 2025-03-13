import admin from 'firebase-admin';

const serviceAccount = require(process.env.FIREBASE_CREDENTIALS_PATH!);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'https://firebasestorage.googleapis.com/v0/b/[YOUR-BUCKET-NAME].appspot.com/o/[FILE_PATH]',
});

export const db = admin.firestore();
export const storage = admin.storage();