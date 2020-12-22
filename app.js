const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")

require('dotenv').config()

const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})
app.post("/", function (req, res) {
    let firstName = req.body.top
    let lastName = req.body.middle
    let email = req.body.last

    var data = {
        members: [{
            "email_address": email,
            "status": "subscribed",
            "merge_fields": {
                "FNAME": firstName,
                "LNAME": lastName
            }
        }]
    }

    var jsonData = JSON.stringify(data)

    let option = {
        url: "https://us7.api.mailchimp.com/3.0/lists/fbb229e37b",
        method: "POST",
        headers: {
            "Authorization": process.env.API_KEY
        },
        //body: jsonData

        //   -H 'authorization: Basic <USERNAME:PASSWORD>' \
        //   -d '{"members":[],"update_existing":false}'
        //url:'https://server.api.mailchimp.com/3.0/lists/fbb229e37b?skip_merge_validation=<false>&skip_duplicate_check=<false>'
    }
    request(option, function (error, response, body) {
        if (error) {
            res.sendFile(__dirname + "/failure.html")
        } else if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
    })
})
app.post("/failure", function (req, res) {
    res.redirect("/")
})
app.listen(3000, function () {
    console.log("server is running at port 3000")
})

//api keys
//8d06e6c2786afd6777b03e0bda5b0f6d-us7

//unique id for the list
//fbb229e37b