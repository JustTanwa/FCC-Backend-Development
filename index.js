// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

// user story 1
app.get("/api", function (req, res) {
  res.json({unix: new Date().getTime(), utc: new Date().toUTCString()})
});

app.get("/api/:date?", function (req, res) {
  let date;
  console.log(req.params.date)
  if (!req.params.date.includes("-") && !req.params.date.includes(" ")) {
    date = new Date(Number(req.params.date));
  } else {
    date = new Date(req.params.date);
  }
  const resObj = {unix: date.getTime(), utc: date.toUTCString()};

  if (!resObj["unix"] || !resObj["utc"]) {
    res.json({ error : "Invalid Date" });
  } else {
    res.json(resObj);
  }
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
