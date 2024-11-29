import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: 'praisewap.firebaseapp.com',
  projectId: 'praisewap',
  storageBucket: 'praisewap.firebasestorage.app',
  messagingSenderId: '141624892',
  appId: '1:141624892:web:991e40b31e7057a1302539',
  measurementId: 'G-3M62173PWS',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage(app);

export { app, storage };
