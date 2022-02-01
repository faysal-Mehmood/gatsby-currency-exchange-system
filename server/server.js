const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var request = require('request');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

//cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
const  headers ={
    'Authorization': 'Basic VDYxMDUwMTk6QGIyeXVWJGVoNFF1JHRYN2dmbV4=',
    'Content-Type':'application/json',
    
}

const port = process.env.PORT || 3000

app.post('/getpolilink', function (req, res) {
    console.log(req)
    request({
        url: "https://poliapi.apac.paywithpoli.com/api/POLiLink/Create",
        method: "POST",
        json: true,   // <--Very important!!!
        body: req.body,
        headers:headers        
    }, function (error, response, body){
        console.log(body);
        res.send(body)
    });
})
 
app.listen(port, () => console.log(`Example app listening on port 3000`))