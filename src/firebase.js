// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage }  from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDB8PZWPwONLADS3vobUoQGnN4njXac9Q",
  authDomain: "python-2c704.firebaseapp.com",
  projectId: "python-2c704",
  storageBucket: "python-2c704.appspot.com",
  messagingSenderId: "669377094233",
  appId: "1:669377094233:web:5f83d6857df3a02d584748"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const storage = getStorage(firebase)

// getDownloadURL(ref(storage, 'assignments/title1665689041546555664'))
//   .then((url) => {
//     // `url` is the download URL for 'images/stars.jpg'

//     // // This can be downloaded directly:
//     // const xhr = new XMLHttpRequest();
//     // xhr.responseType = 'blob';
//     // xhr.onload = (event) => {
//     //   const blob = xhr.response;
//     // };
//     // xhr.open('GET', url);
//     // xhr.send();

//     // // Or inserted into an <img> element
//     // const img = document.getElementById('myimg');
//     // img.setAttribute('src', url);
//     console.log(url)
//   })
//   .catch((error) => {
//     // Handle any errors
//   });