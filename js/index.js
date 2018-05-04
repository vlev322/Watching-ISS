var url = "http://api.open-notify.org/iss-now.json";
var url2 = "http://api.open-notify.org/astros.json";

var pLong = document.getElementById("long");
var pLat = document.getElementById("lat");
var name = document.getElementById("name");
var number = document.getElementById("number");
var divPeople = document.getElementById('peopleOnIss');

var request = new XMLHttpRequest();
var _myMap, _marker;

function test() {
	request.open("GET", url, true);

	request.onload = function () {
		if (request.status >= 200 && request.status < 400) {
			var data = JSON.parse(request.responseText);
			latitude = data["iss_position"]["latitude"];
			longitude = data["iss_position"]["longitude"];

			pLong.innerHTML = "Longitude is: " + data["iss_position"]["longitude"];
			pLat.innerHTML = "Latitude is: " + data["iss_position"]["latitude"];
		
			if (_marker && _marker.setPosition) {
				var latlng = new google.maps.LatLng(
					data["iss_position"]["latitude"],
					data["iss_position"]["longitude"]
				);
				_myMap.setCenter(latlng);
				_marker.setPosition(latlng);
			}
		} else {
			console.log("Target server returned an error");
		}
	};
	request.send();
}
var timerId = setInterval(test, 5000);

//---------- MAP`s options ---------------------------

var lon = 30.52, latt = 50.2;

function initMap(params) {
	var pos = { lat: latt, lng: lon };
	var element = document.getElementById("map");
	var options = {
		zoom: 4,
		center: { lat: latt, lng: lon }
	};

	_myMap = new google.maps.Map(element, options);;

	addMarker({ lat: latt, lng: lon });

	function addMarker(coordinates) {
		_marker = new google.maps.Marker({
			position: coordinates,
			map: _myMap,
			icon:
				"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
		});

		_marker.addListener("click", function () {
			InfoWindow.open(_myMap, marker);
		});
	}

	var InfoWindow = new google.maps.InfoWindow({
		content: "<h2>We here!</h2>"
	});
}

//---------- Who is on board iss? ---------------------------

request.open("GET", url2, true);

request.onload = function () {
	if (request.status >= 200 && request.status < 400) {
		var arrInfo = JSON.parse(request.responseText);
//----Names
		function getValue(array) {
			for (i = 0; i < array.length; i++) {
				if (array[i].name) {
					var p = document.createElement("p");
					p.textContent = array[i].name;
					divPeople.appendChild(p);
				}
			}
		}
		getValue(arrInfo["people"]);
//-----Number
		var pNum = document.createElement("p");
		pNum.textContent = arrInfo["number"];
		divPeople.appendChild(pNum);	
		console.log(arrInfo["number"]);
		
		// name.innerHTML = "Name is: " + data2["people"]["name"];
	} else {
		console.log("Target server returned an error");
	}
};
request.send();
