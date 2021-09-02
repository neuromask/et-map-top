
<template>
  <div class="Home">
    <div id="badge">
      <a href="https://electrotallinn.ee/" target="_blank"><img src="img/et-logo.jpg" height="48px" width="48px"></a>
      <a href="javascript:;" class="giveAccess">your location</a>
    </div>  
    <div id="map"></div>
    <router-link to="top">Top</router-link>
  </div>
</template>

<script>
/* eslint-disable */
  import json from "../locations.json";

  export default{
      data(){
          return{
              myJson: json
          }
      },
      mounted() {
        let gmap = document.createElement('script')
        gmap.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyClDGFnyszA_dpXvvYW63HqTSOvz04JJps&callback=this.initMap')
        document.head.appendChild(gmap)
        
      },
      methods: {
        initMap:function()  {
        // init Map
        new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {
                lat: 59.434685,
                lng: 24.80748
            },
            styles: mapStyle
        });

      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html, body {height: 100%; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;}
  #map {height: 100%;}
  #content {position: relative; width: 100%; height: 100%;}
  .infocontent img {width:100%;}
  #badge {position: absolute; bottom: 64px; left: 0;height: 48px; z-index: 10; background-color: #ec970f; }
  #badge img {float: left;}
  #badge .giveAccess { height: 48px;  line-height: 48px; padding: 8px 12px; font-weight: bold; font-size: 20px; color: white;}
  h4 {font-size: 16px;margin: 0.5em;}
  p {font-size: 12px;margin: 0.5em;}
</style>

