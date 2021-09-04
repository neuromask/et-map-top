<template>
  <div class="locations">
    <div id="map" ref="googleMap"></div>
  </div>
</template>

<script>
import axios from 'axios';
import $Scriptjs from 'scriptjs';
import mapStyle from '../assets/json/mapStyle.json';

export default {
  name: 'Map',
  props: {},
  data() {
    return {
      map: null,
      mapCenter: {lat: 0, lng:0},
      mapConfig: {
        zoom: 12,
        center: {
          lat: 59.434685,
          lng: 24.80748
      },
      mapTypeId: 'terrain',
      styles: mapStyle
    },
    apiKey: 'AIzaSyClDGFnyszA_dpXvvYW63HqTSOvz04JJps',
    locationIcons: {
        CHARGE: require('../assets/icon/charge.png'),
        REPAIR: require('../assets/icon/repair.png'),
        AIR: require('../assets/icon/air.png'),
        WATER: require('../assets/icon/water.png')
      }
    }
  },
  mounted () {
    $Scriptjs('https://maps.googleapis.com/maps/api/js?key='+this.apiKey, () => {
        this.initMap()
    })
  },
  methods: {
    initMap() {

      const mapContainer = this.$refs.googleMap;
      this.map = new window.google.maps.Map(mapContainer, this.mapConfig);


      var BACKEND_BASE = 'https://etmap.nuforms.com';
      var infowindow = new window.google.maps.InfoWindow({});

      axios
        .get(BACKEND_BASE + '/locations')
        .then(response => {
          for (const location of response.data) {
            //console.log(location);

            var marker = new window.google.maps.Marker({
              position: new window.google.maps.LatLng(location.lat, location.lng),
              map: this.map,
              icon: {url: this.locationIcons[location.type], scaledSize: new window.google.maps.Size(24, 24)},
              title: location.title,
              id: location.id
            });

            window.google.maps.event.addListener(marker, 'click', (function(marker) {

              return function() {
                infowindow.setContent("<div class='infocontent'>" + (location.imageName ? "<img src='" + BACKEND_BASE + '/images/' + location.imageName + "'>" : "") + "<h4>" + location.title + "</h4><p>" + (location.description || "") + "</p></div>");
                infowindow.open(this.map, marker);
              }
            })(marker));
          }
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #map, .locations {height: 100%; width: 100%;}
  #content {position: relative; width: 100%; height: 100%;}
  .infocontent img {width:100%;}


</style>

