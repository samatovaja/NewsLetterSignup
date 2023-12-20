
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

app.listen(process.env.PORT || 3000, function(){
    console.log('Server is running on port 3000')
})



//api key
// 209200dd98f44df6e3f9de5c6b9bdbe9-us12

//list id
//6f1a243a71t