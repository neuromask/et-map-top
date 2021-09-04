
<template>
  <div class="Top">
    <b-alert show>Top Table</b-alert>
    <b-table striped hover :items="listFull"></b-table>
    <router-link to="/">Top</router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Map',
  props: {},
  data() {
    return {
      listFull: [],
     
    }
  },
  mounted () {
    var BACKEND_BASE = 'https://etmap.nuforms.com';
      axios
        .get(BACKEND_BASE + '/locations')
        .then(response => {
          this.listFull = response.data;
        });
  },
  methods: {
    initList() {

      
    }
  }
}
// d-flex justify-content-center align-items-center
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

