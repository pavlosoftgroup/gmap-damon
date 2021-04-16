let coord = {lat: 42.202583, lng: -104.527926};
const poiAll = [
  'poi.business',
  'poi.attraction',
  'poi.government',
  'poi.medical',
  'poi.park',
  'poi.place_of_worship',
  'poi.school',
  'poi.sports_complex',
];

let poiObj = [];

for (var k = 0; k < poiAll.length; k++) {
  poiObj.push(
    {
      featureType: poiAll[k],
      stylers: [
        {
          visibility: "off"
        }
      ]
    }
  )
}

function eventShowForm () {
  document.getElementById('floating-panel').classList.add('check-bg')
  showForm();
}

function initMap () {
  var damonMapType = new google.maps.StyledMapType(poiObj, {
    name: 'Damon Style'
  });
  var damonMapTypeId = 'damon_style';
  const mapDiv = document.getElementById("map");


  const map = new google.maps.Map(mapDiv, {
    center: coord,
    zoom: 4,
  });
  map.mapTypes.set(damonMapTypeId, damonMapType);
  map.setMapTypeId(damonMapTypeId);
  // map.clear();
  const geocoder = new google.maps.Geocoder();
  document.getElementById("submit").addEventListener("click", () => {
    setMarkers(map);
    map.zoom = 16;
    geocodeAddress(geocoder, map);
  });


  // markerList.e



}

function geocodeAddress (geocoder, resultsMap) {
  const address = document.getElementById("address").value;
  geocoder.geocode({address: address}, (results, status) => {
    if (status === "OK") {
      resultsMap.setCenter(results[0].geometry.location);
      new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
      });
    }
    else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

function setMarkers (map) {

  const iconPath = 'images/';
  const features = [
    {
      drName: 'INGRID BARILLAS DDS',
      drAddress: '476 48TH ST STE 3   <br> BROOKLYN, NY 11220',
      drPhone: '(347) 410-6682',
      drSite: 'www.dentalspecialistsofny.com',
      position: new google.maps.LatLng(33.754319, -84.386391),
      type: "info2",
    },
    {
      drName: 'FEIBISH, PETER DR',
      drAddress: '94-38 60TH AVE   <br> ELMHURST, NY 11373 ',
      drPhone: '(718) 595-0050',
      drSite: 'www.hollywoodorthodontics.com',
      position: new google.maps.LatLng(33.755637, -84.386081),
      type: "info",
    },
    {
      drName: 'INGRID BARILLAS DDS1',
      drAddress: '476 48TH ST STE 3   <br> BROOKLYN, NY 11220',
      drPhone: '(347) 000-0000',
      drSite: 'www.dentalspecialistsofny.com1',
      position: new google.maps.LatLng(33.75505, -84.388163),
      type: "info2",
    },
    {
      drName: 'FEIBISH, PETER DR2',
      drAddress: '94-38 60TH AVE   <br> ELMHURST, NY 11373 ',
      drPhone: '(718) 595-005022',
      drSite: 'www.hollywoodorthodontics.com2',
      position: new google.maps.LatLng(33.755433, -84.391029),
      type: "info",
    },
  ];

  const items = {
    info2: {
      icon: {
        url: iconPath + "STD-marker.png",
        size: new google.maps.Size(30, 44),
        scaledSize: new google.maps.Size(30, 44),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20, 32),
      },
    },
    info: {
      icon: {
        url: iconPath + "PP-marker.png",
        size: new google.maps.Size(30, 44),
        scaledSize: new google.maps.Size(30, 44),

        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32),
      },
    },
  };

  for (let i = 0; i < features.length; i++) {

    const damonStyle = '<style>' +
      '.locator-map-popup{text-align: left}' +
      '</style>';
    const damonStringNew = createMarkerInfo(features[i]);
    const damonString = '<div class="locator-map-popup card text-dark border-0" style="width:250px"> ' +
      '<div class="card-body p-0"> ' +
      '<h6 class="card-title">' +
      features[i].drName +
      '</h6> ' +
      '<p class="card-text mb-0"> ' +
      features[i].drAddress +
      '</p>' +
      '<p class="card-text mb-2"><a href="' +
      features[i].drPhone +
      '">' +
      features[i].drPhone +
      '</a></p>  ' +
      '<p class="schedule-appointment mb-2">' +
      '<span (click)="showForm(' +
      features[i] +
      ')" class="form-event-button" title="Schedule Appointment" data-location-id="1000000783" data-doctor-name="' +
      features[i].drName +
      '">Schedule Appointment</span></p>' +
      '<a href="https://locator.damonbraces.com/app/?o=1000000063" class="card-link" target="_blank" rel="noopener">' +features[i].drSite + '</a> </div> </div>';

    const windowString = damonStyle + damonString;
    const infowindow = new google.maps.InfoWindow({
      content: windowString,
    });

    setTimeout(() => {
        const marker = new google.maps.Marker({
          position: features[i].position,
          icon: items[features[i].type].icon,
          animation: google.maps.Animation.DROP,
          map: map,
        });
        infowindow.open(map, marker);
        infowindow.close(map, marker);
        marker.addListener("click", () => {
          infowindow.open(map, marker);
          const markerList = document.getElementsByClassName('form-event-button');
          console.log(markerList);
          for(let q = 0; q < markerList.length; q++){
            markerList[q].addEventListener('click', eventShowForm)
          document.querySelector('.form-event-button').addEventListener('click', eventShowForm)
          }
        });

      },
      i * 500);
  }
}

function createMarkerInfo (markerItem) {
  var wrapper = document.createElement('div');
  var drLink = document.createElement('p');
  var spanLink = document.createElement('span');
  spanLink.innerHTML = 'Schedule Appointment';
  spanLink.classList.add('form-event-button');
  drLink.innerHTML = spanLink;
  wrapper.innerHTML = markerItem.drName;
  wrapper.innerHTML = drLink;
  // return jQuery(wrapper.innerText).html();
  return wrapper.innerText;
}

function showForm () {
  (function ($) {
    $('#iframe-container').removeClass('hidden');
  })(jQuery);
}

(function ($) {
  $(".form-event-button").on('click',function () {
    // $("#map-iframe").attr("src",
    // "https://locator.damonbraces.com/iframe/?s=&ver=20210111001");
    $(this).addClass('hidden');
    $('#iframe-container').removeClass('hidden');
  });
  $("#button-hide").click(function () {
    // $("#map-iframe").attr("src", "");
    $('#iframe-container').addClass('hidden');
    $('#button-show').removeClass('hidden');
  });
})(jQuery);


$(window).ready(function () {
  hbspt.forms.create({
    portalId: "5806864",
    formId: "234de9d7-6f38-4298-8cdf-76d6939dc492",
    css: '',
    cssClass: 'media hubspot-form-source',
    target: '#hubspot-form-5806864',
  });
});