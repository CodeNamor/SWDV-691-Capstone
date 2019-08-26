var express = require('express');
var app      = express();
var path = require('path');

app.use(express.static(path.resolve(__dirname, "www")));

app.use(express.static('home'))
app.use(express.static('movies'))

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
 console.log("listening to Port: ", app.get("port"));
});