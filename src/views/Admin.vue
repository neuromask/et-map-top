
<template>
  <div class="Admin">
    <b-alert show>Welcome on vue-bootstrap-boilerplate.</b-alert>
    <b-table striped hover :items="myJson"></b-table>
    <router-link to="/">Map</router-link>
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
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

