import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const MY_KEY = 'AIzaSyAp55dvTZIYI88A5T6AEc5elvJgjic5of8';

const firebaseConfig = {
    apiKey: MY_KEY,
    authDomain: 'review-rating-system.firebaseapp.com',
    databaseURL: 'https://review-rating-system-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'review-rating-system',
    storageBucket: 'review-rating-system.appspot.com',
    messagingSenderId: '998187997260',
    appId: '1:998187997260:web:96fa13370dfbdab99b7ce9',
    measurementId: 'G-ZE35M1LYMW',
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);


export { auth, database };