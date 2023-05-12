// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyBS6GrAFxCctzjy4WKNUNaF8nR5nxv5nRY",
authDomain: "justvoca-54565.firebaseapp.com",
projectId: "justvoca-54565",
storageBucket: "justvoca-54565.appspot.com",
messagingSenderId: "156712295879",
appId: "1:156712295879:web:8633529a56f70f40688de2",
measurementId: "G-4MBWZHDXMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);