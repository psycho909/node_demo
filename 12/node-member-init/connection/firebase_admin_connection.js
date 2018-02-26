var admin = require("firebase-admin");

var serviceAccount = require("../project2-7211a-firebase-adminsdk-fd6h8-d8c7295f14.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://project2-7211a.firebaseio.com"
});

var db=admin.database();

module.exports=db;