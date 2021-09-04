
<template>

  <div class="locations">
    <b-sidebar id="sidebar-variant" title="ET⚡ Map" bg-variant="dark" text-variant="light" shadow>
      <div class="px-3 py-0">
        <b-img class="my-4" :src="require('../assets/img/circle.png')" fluid center></b-img>
        <p>🇷🇺 - Карта с обозначением мест расположения розеток для зарядки, ремонта в доступных местах.</p>
        <p>🇬🇧 - Map showing the locations of outlets for charging, repair in accessible places.</p>
        <p>🇪🇪 - Kaart, mis näitab laadimis- ja paranduskohtade asukohti juurdepääsetavates kohtades.</p>
        <b-list-group class="my-4">
          <b-list-group-item><router-link to="top">Activity Top</router-link></b-list-group-item>
          <b-list-group-item><a href="https://electrotallinn.ee/" target="_blank">ElectroTallinn Site</a></b-list-group-item>
        </b-list-group>
        <p style="text-align: center;">Copyright © 2021 – ElectroTallinn<br/>Crafted by Leo & <a href="https://nuforms.com/" target="_blank">Nuforms Design</a></p>
      </div>
    </b-sidebar>
    <div id="badge">
      <a v-b-toggle.sidebar-variant><img :src="require('../assets/img/et-logo.jpg')" height="48px" width="48px"></a>
      <a href="javascript:;" class="giveAccess"><b-icon-geo></b-icon-geo><i class="bi bi-geo-alt-fill"></i></a>
    </div>  

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
  #badge {position: absolute; bottom: 64px; left: 0;height: 48px; z-index: 10; background-color: #ec970f; }
  #badge img {float: left;}
  #badge .giveAccess { height: 48px;  line-height: 48px; padding: 8px 12px; font-weight: bold; font-size: 20px; color: white;}

</style>

