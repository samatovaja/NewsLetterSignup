// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC84wmcs7bI_WUp8OtP7p8xZ8aw1ONBbw",
  authDomain: "newsletter-88262.firebaseapp.com",
  projectId: "newsletter-88262",
  storageBucket: "newsletter-88262.appspot.com",
  messagingSenderId: "474683582699",
  appId: "1:474683582699:web:9b9612d0c986db54a276ae",
  measurementId: "G-78J7YW94B1"
};

// Initialize Firebase
const apps = initializeApp(firebaseConfig);
const analytics = getAnalytics(apps);

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')

const app = express()
app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html')
})


app.post('/', function(req, res) {
    var firstName = req.body.fName 
    var lastName = req.body.lName
    var email = req.body.email

    var data = {
        members: [ 
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }        
            }
        ]
    }

    var jsonData = JSON.stringify(data)

    var url = "https://us12.api.mailchimp.com/3.0/lists/6f1a243a71"

    var options = {
        method: 'POST',
        auth: 'djama:209200dd98f44df6e3f9de5c6b9bdbe9-us12'
    }

    const request = https.request(url, options, function(response){
        if (response.statusCode == 200) {
            res.sendFile(__dirname + '/success.html')
        } else {
            res.sendFile(__dirname + '/failure.html')
        }
        response.on('data', function(data){
            console.log(JSON.parse(data))
        })
    }) 

    request.write(jsonData)
    request.end()

    app.post('/failure', function(req, res){ 
        res.redirect('/')
    })
   
})

app.listen(3000, function(){
    console.log('Server is running on port 3000')
})



//api key
// 209200dd98f44df6e3f9de5c6b9bdbe9-us12

//list id
//6f1a243a71t