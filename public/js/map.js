var map;
var markers = new Array();

// Default location in Porto Alegre - RS - Brazil
var POA = [-30.04,-51.20];

function init(){
   map = initOSM();  
   //map = initMapbox();

   L.marker(POA, {
          icon: L.ExtraMarkers.icon({
              icon: 'fa-wifi',
              shape: 'circle',
              markerColor: 'red',
              prefix: 'fa',
              extraClasses: 'fa-pulse'
          })})
      .addTo(map)
      .bindPopup('<b>Free Wifi, woot!!!</b>.');         

   var popup = L.popup();
   function onMapClick(e) {
      popup
         .setLatLng(e.latlng)
         .setContent("Lat/Long clicado: " + e.latlng.toString())
         .openOn(map);
   }
   map.on('click', getSpots);
}

function initOSM(){
   var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
   var osmAttrib ='&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors';
   var osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});         
   return L.map('map').setView(POA, 13).addLayer(osm);   
}

function initMapbox(){  
   var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
         mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

   var streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

   return L.map('map').setView(POA, 13).addLayer(streets);
}


/* Submits search to DB and add the result to the map. */
function getSpots(e) {
   var baseUrl="/wifi/spots?latitude=";
   var url= baseUrl + e.latlng.lat;
   url+= "&longitude="+ e.latlng.lng + "&distance=" + $('#radius').val();
   $.getJSON(url, 
      function (data) {               
         var wifimarker = L.ExtraMarkers.icon({
            icon: 'fa-wifi',
            markerColor: 'black',
            shape: 'circle',
            prefix: 'fa'
         });

         // cleanup map
         removeSpots();

         for (var i = 0; i < data.length; i++) {
            // Locations are stored as long/lat pairs.
            var location = new L.LatLng(data[i].local[1], data[i].local[0]);                  
            var title = "<div style='font-size: 18px; color: #0078A8;'>"+ data[i].nome +"</div>";
            var address = "<div style='font-size: 14px;'>" + data[i].endereco + "</div>";
            var marker = L.marker(location, {icon: wifimarker});
            
            // to future cleanup
            markers.push(marker);

            marker.addTo(map);
            marker.bindPopup(
               "<div style='text-align: center; margin-left: auto; margin-right: auto;'>"
               + title + address + "</div>", 
               {maxWidth: '400'}
            );
         }
      }
   )
}

/* Removes all dynamically inserted marker from the map.*/
function removeSpots() {
   for (i=0; i < markers.length; i++) {
      map.removeLayer(markers[i]);
   }
}