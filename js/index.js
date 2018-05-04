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

//---------- MAP ---------------------------
var lon = 30.52, latt = 50.2

	function initMap(params) {
		var pos = { lat: latt, lng: lon}
			var element = document.getElementById('map');
			var options = {
					zoom: 5,
				center: { lat: latt, lng: lon }
			};

			var myMap = new google.maps.Map(element, options);

		addMarker({ lat: latt, lng: lon });
			
			function addMarker(coordinates) {
				var marker = new google.maps.Marker({
						position: coordinates,
						map: myMap,
						icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
				});				
			}

			var InfoWindow = new google.maps.InfoWindow({
				content: '<h2>We here!</h2>'
			});

			marker.addListener('click', function(){
				InfoWindow.open(myMap, marker);
			})
		}
