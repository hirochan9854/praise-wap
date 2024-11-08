import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Firebaseの設定をここに貼り付け
const firebaseConfig = {
  apiKey: 'AIzaSyDP_1FhqLtRULK2Lz4tDyit_uICeFAbb38',
  authDomain: 'praisewap.firebaseapp.com',
  projectId: 'praisewap',
  storageBucket: 'praisewap.firebasestorage.app',
  messagingSenderId: '141624892',
  appId: '1:141624892:web:991e40b31e7057a1302539',
  measurementId: 'G-3M62173PWS',
};

// Firebaseの初期化
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage(app);

export { app, storage };
