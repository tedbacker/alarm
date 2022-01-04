// const mysql = require("mysql");
// const dbConfig = require("../config/db.config.js");

// // Create a connection to the database
// const connection = mysql.createConnection({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB
// });

// // open the MySQL connection
// connection.connect(error => {
//   if (error) throw error;
//   console.log("Successfully connected to the database.");
// });

// module.exports = connection;

// const firebase = require('firebase/app');
// const config = require('./db.config');
// const firebaseConfig = {
//     apiKey: "AIzaSyC0PiAkkFmFS2-Ko1TKxxBxIOaUIwqPFNQ",
//     authDomain: "dppatel-f4ab5.firebaseapp.com",
//     databaseURL: "https://dppatel-f4ab5.firebaseio.com",
//     projectId: "dppatel-f4ab5",
//     storageBucket: "dppatel-f4ab5.appspot.com",
//     messagingSenderId: "963849004012",
//     appId: "1:963849004012:web:c28b3373a078d585"
//   };

// const db = firebase.initializeApp(firebaseConfig);

const admin = require('firebase-admin');

const serviceAccount = require('./firebase_sdk.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const db = admin.firestore(); 
// console.log('db',db.collection('alarm').get());
module.exports = db;