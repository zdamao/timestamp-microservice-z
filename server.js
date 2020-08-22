// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp', (req, res) => {
  res.json({
    unix: Date.now(),
    utc: Date()
  })
})

app.get('/api/timestamp/:date_string', (req, res) => {
  var dateString = req.params.date_string;
  //A 4 digit number is a valid ISO-8601 for the beginning of that year
  //5 digits or more must be a unix time, until we reach a year 10,000 problem
  if(/\d{5,}/.test(dateString)){
    let dateInt = parseFloat(dateString);
    res.json({
      unix: dateString,
      utc: new Date(dateInt).toUTCString()
    })
  }
  
  let dateObj = new Date(dateString);
  if(dateObj = 'Invalid Date'){
    res.json({
      error: 'Invalid Date'
    })
  } else {
    res.json({
      unix: dateObj.valueOf(),
      utc: dateObj.toUTCString()
    })
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});