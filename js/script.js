let coord = {lat: -33.91722, lng: 151.23064}

function initMap () {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: coord,
    zoom: 14,
  });
  setMarkers(map);
  const geocoder = new google.maps.Geocoder();
  document.getElementById("submit").addEventListener("click", () => {
    geocodeAddress(geocoder, map);
  });
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
      position: new google.maps.LatLng(-33.91721, 151.2263),
      type: "parking",
    },
    {
      drName: 'FEIBISH, PETER DR',
      drAddress: '94-38 60TH AVE   <br> ELMHURST, NY 11373 ',
      drPhone: '(718) 595-0050',
      drSite: 'www.hollywoodorthodontics.com',
      position: new google.maps.LatLng(-33.91539, 151.2282),
      type: "info",
    },
    {
      drName: 'INGRID BARILLAS DDS1',
      drAddress: '476 48TH ST STE 3   <br> BROOKLYN, NY 11220',
      drPhone: '(347) 000-0000',
      drSite: 'www.dentalspecialistsofny.com1',
      position: new google.maps.LatLng(-33.91747, 151.22912),
      type: "parking",
    },
    {
      drName: 'FEIBISH, PETER DR2',
      drAddress: '94-38 60TH AVE   <br> ELMHURST, NY 11373 ',
      drPhone: '(718) 595-005022',
      drSite: 'www.hollywoodorthodontics.com2',
      position: new google.maps.LatLng(-33.9191, 151.22907),
      type: "info",
    },
  ];

  const items = {
    parking: {
      icon: {
        url: iconPath + "STD-marker.png",
        size: new google.maps.Size(20, 32),
        scaledSize: new google.maps.Size(20, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20, 32),
      },
    },
    info: {
      icon: {
        url: iconPath + "PP-marker.png",
        size: new google.maps.Size(20, 32),
        scaledSize: new google.maps.Size(20, 32),

        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32),
      },
    },
  };

  for (let i = 0; i < features.length; i++) {

    const windowString = '<div class="locator-map-popup card text-dark border-0" style="width:250px"> ' +
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
      '<span title="Schedule Appointment" data-location-id="1000000783" data-doctor-name="' +
      features[i].drName +
      '">Schedule Appointment</span></p>' +
    '<a href="https://locator.damonbraces.com/app/?o=1000000063" class="card-link" target="_blank" rel="noopener">${features[i].drSite}</a> </div> </div>';

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
        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });
      },
      i * 800);
  }
}

(function ($) {
  $("#button-show").click(function () {
    $("#map-iframe").attr("src", "https://locator.damonbraces.com/iframe/?s=&ver=20210111001");
    $(this).addClass('hidden');
    $('#iframe-container').removeClass('hidden');
  });
  $("#button-hide").click(function () {
    $("#map-iframe").attr("src", "");
    $('#iframe-container').addClass('hidden');
    $('#button-show').removeClass('hidden');
  });
})(jQuery);
