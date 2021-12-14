//Importing the required modules:
const express = require('express');
var admin = require("firebase-admin");

//Importing controllers:
const postTimerController = require('./controllers/postTimer.js');

//Setting up firebase
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://opgave3-80853-default-rtdb.europe-west1.firebasedatabase.app"
});

//Setting up Express app
const app = express();

app.use(function(req, res, next) { //Fixes Cors policy, with a middleware
    res.header("Access-Control-Allow-Origin"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(4000, () => {
    console.log("app listening on port 4000")
})

app.post('/postTimer', postTimerController)

