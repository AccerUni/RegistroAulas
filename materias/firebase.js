import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDw3mcOdT3iBvl2a0jPTlqaj7LqtRrHHyg",
    authDomain: "novapagina-b357d.firebaseapp.com",
    projectId: "novapagina-b357d",
    storageBucket: "novapagina-b357d.firebasestorage.app",
    messagingSenderId: "1060248426922",
    appId: "1:1060248426922:web:ff150165bf3c525bb4f3d3",
    measurementId: "G-NWEMVGPPMG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, collection, addDoc, getDocs };