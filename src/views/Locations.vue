<template>
  <div class="locations">
    <div id="map" ref="googleMap"></div>
    <div id="badgePos">
      <a @click="getUserPos"><b-icon-record-circle></b-icon-record-circle></a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import $Scriptjs from 'scriptjs';
import mapStyle from '@/assets/json/mapStyle.json';

export default {
  name: 'Map',
  props: {},
  data() {
    return {
      BACKEND_BASE: 'https://etmap.nuforms.com',
      map: null,
      test: 'test',
      mapCenter: {lat: 0, lng:0},
      mapConfig: {
        zoom: 12,
        center: { lat: 59.434685, lng: 24.80748 },
        styles: mapStyle
      },
      apiKey: 'AIzaSyClDGFnyszA_dpXvvYW63HqTSOvz04JJps',
      locationIcons: {
        CHARGE: require("@/assets/img/icon/icon-charge.svg"),
        REPAIR: require('@/assets/img/icon/icon-repair.svg'),
        AIR: require('@/assets/img/icon/icon-air.svg'),
        WATER: require('@/assets/img/icon/icon-water.svg')
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

      this.mapConfig.mapTypeControlOptions = {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_CENTER,
      };

      const mapContainer = this.$refs.googleMap;
      this.map = new google.maps.Map(mapContainer, this.mapConfig);
      const infowindow = new google.maps.InfoWindow({});
      let baseUrl = this.BACKEND_BASE;

      google.maps.event.addListener(this.map, "click", function(event) {
        infowindow.close();
      });

      axios
      .get(baseUrl + '/locations')
      .then(response => {
        for (const location of response.data) {
          //console.log(location);
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(location.lat, location.lng),
            map: this.map,
            icon: {url: this.locationIcons[location.type], scaledSize: new google.maps.Size(32, 32)},
            title: location.title,
            id: location.id
          });

          google.maps.event.addListener(marker, 'click', (function(marker) {
            return function() {
              infowindow.setContent("<div class='infocontent'>" + (location.imageName ? "<img src='" + baseUrl + '/images/' + location.imageName + "'>" : "") + "<h4>" + location.title + "</h4><p>" + (location.description || "") + "</p><small>Added by: " + (location.user || "") + "</small></div>");
              infowindow.open(this.map, marker);
            }
          })(marker));
        }
      });
    },
    getUserPos() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
          };
          let map = this.map;
          // set current locations
          map.setCenter(pos);
          map.setZoom(15);
          new google.maps.Marker({
            position: pos,
            map,
            title: "Your location!",
          });
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #map, .locations {height: 100%; width: 100%;}
  #content {position: relative; width: 100%; height: 100%;}
</style>

