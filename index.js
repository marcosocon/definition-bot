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

app.post('/', function (req, res) {
	var term = req.body.text.toUpperCase();
	request.get(base + term, function (err, response, body) {
		var processedResponse = processBody(JSON.parse(body));
		res.setHeader('Content-Type', 'application/json');
		var result = {
			response_type: 'in_channel',
			attachments: [
				{
					author_name: 'Dictionary Bot',
					title: 'Results For:	' + term,
					text: processedResponse,
					color: '#36a64f',
					thumb_url: 'http://i0.kym-cdn.com/entries/icons/original/000/016/956/10042483-funny-robot-sit-with-headphones.jpg'
				}
			]
		};
		res.send(result);
	});
});

function processBody(body) {
	var res = '';
	body.list.forEach(function(term){
		res += term.definition + '\n \n';
	});
	return res;
}

app.listen(app.get('port'), function () {
	console.log('Node app is running on port', app.get('port'));
});


