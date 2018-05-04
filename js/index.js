// var request = require('request')
// 	, JSONStream = require('JSONStream')
// 	, es = require('event-stream')
// 	, XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// 	var latitude, longitude;

// var request = new XMLHttpRequest();
// request.open('GET', 'http://api.open-notify.org/iss-now.json');
// request.onreadystatechange = function (e) {
// 	if (this.readyState = 4) {
// 		if (this.status == 200) {
// 			var response = JSON.parse(this.responseText);
			
// 			latitude = response['iss_position']['latitude'];
// 			longitude = response['iss_position']['longitude'];
			
// 			console.log(latitude);
			

// 		}	
// 	}
// }
// request.send();
var url = "http://api.open-notify.org/iss-now.json";
var pLong = document.getElementById('long');
var pLat = document.getElementById('lat');

var request = new XMLHttpRequest();

function test () {
	request.open('GET', url, true);

	request.onload = function () {
		if (request.status >= 200 && request.status < 400) {
			var data = JSON.parse(request.responseText);
				latitude = data['iss_position']['latitude'];
				longitude = data['iss_position']['longitude'];
				
			pLong.innerHTML = "Longitude is: " + data['iss_position']['longitude'];
			pLat.innerHTML = "Latitude is: " + data['iss_position']['latitude'];

		} else {
			console.log("Target server returned an error");
		}
	};
	request.send();
}


var timerId = setInterval(test, 1000);




