// Firebase-Admin configuration
import * as admin from 'firebase-admin';

const FIREBASE_CONFIG = JSON.parse(<string>process.env.FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_CONFIG),
  storageBucket: 'puyo-gg.appspot.com',
});

export const configRef = admin
  .firestore()
  .collection('league')
  .doc('config');

export default {
  db: admin.firestore(),
  bucket: admin.storage().bucket(),
};
