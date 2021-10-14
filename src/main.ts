import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAtnXi9N0coCx6nr9vMTrrFDVQEXj1JZjY',
  authDomain: 'hasmart-front-end.firebaseapp.com',
  projectId: 'hasmart-front-end',
  storageBucket: 'hasmart-front-end.appspot.com',
  messagingSenderId: '1085048205902',
  appId: '1:1085048205902:web:988d6af0e884946322091f',
  measurementId: 'G-YZRTFXYNDP'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
