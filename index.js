var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.set('port', (process.env.PORT || 5000));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
var base = 'http://api.urbandictionary.com/v0/define?term=';

app.post('/term', function (req, res) {
	var term = req.body.text;
	request.get(base + term, function (err, response, body) {
		var processedResponse = processBody(JSON.parse(body));
		res.send(processedResponse);
	});
});

function processBody(body) {
	var res = [];
	body.list.forEach(function(term){
		var item = {
			word: term.word,
			definition: term.definition,
			example: term.example
		};
		res.push(item);
	});
	return res;
}

app.listen(app.get('port'), function () {
	console.log('Node app is running on port', app.get('port'));
});


