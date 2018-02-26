var firebase=require('firebase');
var config = {
    apiKey: "AIzaSyCuntaoqhWNCPqvmLzr9lU9P2E_Hhn7VU4",
    authDomain: "project2-7211a.firebaseapp.com",
    databaseURL: "https://project2-7211a.firebaseio.com",
    projectId: "project2-7211a",
    storageBucket: "project2-7211a.appspot.com",
    messagingSenderId: "531896812353"
};
firebase.initializeApp(config);

module.exports=firebase;