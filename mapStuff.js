/*
	Hicks: 42.289148, -85.600481
	Stetson: 42.289628, -85.601523
	Dewing: 42.290112, -85.601899
	Mandelle: 42.290104, -85.601009
	Olds Upton: 42.290064, -85.600054
	Hoben: 42.289604, -85.599475
	DeWaters: 42.289294, -85.602399 	
	Trowbridge: 42.289712, -85.602685
	Arcus Center: 42.290133, -85.603968
	Harmon: 42.290089, -85.599326
	Upjohn Library: 42.290741, -85.601811
	Fine Arts Building: 42.290798, -85.600641
	Dow Science Center: 42.291871, -85.600345
	Severn: 42.291458, -85.598401
	Crissey: 42.291176, -85.598016
	
	*/
	/*
	This function will take strings of format "lat, lng" and turn them into latLng google maps objects.
	It strips most punctuation to be safe.
	 */
	function latLngToMaps(locString) {
	var cleaned = locString.replace(/[,\/#!$%\^&\*;:{}=_`~()]/g,"");
	var split = cleaned.split(" ");
	var latLng = new google.maps.LatLng(parseFloat(split[0]), parseFloat(split[1]));
	return  latLng;
	
	}
	
	var testLocs = ["42.289148, -85.600481", "42.289628, -85.601523", "42.290112, -85.601899", "42.290104, -85.601009", "42.290064, -85.600054", "42.289604, -85.599475"]
	var apiURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBLbzxAA9jdd2AoNXe85Zlujz-17-jsW9E&callback=initMap"
	

		//perfunctory API hider: FIX API HIDING
		function initAPI() {
		document.getElementById("api").src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBLbzxAA9jdd2AoNXe85Zlujz-17-jsW9E&callback=initMap";
		alert(document.getElementById("api").src);
		
		initMap();	
		}
	//create a static map focused on Kalamazoo College
        function initMap() {

        var map = new google.maps.Map(document.getElementById('map'), {
          center: new google.maps.LatLng(42.290447, -85.601068),
          zoom: 18, 
		  gestureHandling: 'none',
		  zoomControl: false,
		  streetViewControl: false
        });
       
	   
		var newMark = new google.maps.Marker({
		position: new google.maps.LatLng(42.289148, -85.600481),
		map: map,
		title: "Building"
		});
		newMark.setMap(map);
		
		
		for (var i=0; i < testLocs.length; i++) {
			var pos = latLngToMaps(testLocs[i]);
			var newMark = new google.maps.Marker({
				position: pos,
			map: map,
			title: "Building"
			});
		}
		
		}
		/* TUTORIAL STUFF
          // Change this depending on the name of your PHP or XML file
          downloadUrl('https://storage.googleapis.com/mapsdevsite/json/mapmarkers2.xml', function(data) {
            var xml = data.responseXML;
            var markers = xml.documentElement.getElementsByTagName('marker');
            Array.prototype.forEach.call(markers, function(markerElem) {
              var id = markerElem.getAttribute('id');
              var name = markerElem.getAttribute('name');
              var address = markerElem.getAttribute('address');
              var type = markerElem.getAttribute('type');
              var point = new google.maps.LatLng(
                  parseFloat(markerElem.getAttribute('lat')),
                  parseFloat(markerElem.getAttribute('lng')));

              var infowincontent = document.createElement('div');
              var strong = document.createElement('strong');
              strong.textContent = name
              infowincontent.appendChild(strong);
              infowincontent.appendChild(document.createElement('br'));

              var text = document.createElement('text');
              text.textContent = address
              infowincontent.appendChild(text);
              var icon = customLabel[type] || {};
              var marker = new google.maps.Marker({
                map: map,
                position: point,
                label: icon.label
              });
              marker.addListener('click', function() {
                infoWindow.setContent(infowincontent);
                infoWindow.open(map, marker);
              });
            });
          });
        }



      function downloadUrl(url, callback) {
        var request = window.ActiveXObject ?
            new ActiveXObject('Microsoft.XMLHTTP') :
            new XMLHttpRequest;

        request.onreadystatechange = function() {
          if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request, request.status);
          }
        };

        request.open('GET', url, true);
        request.send(null);
      }

      function doNothing() {}
	  */
	  