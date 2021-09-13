<template>
  <div id="NotFound">
    <div id="bg-image" :style="{backgroundImage: 'url('+bgImages[3]+')'}">
      <div id="banner" class="g-light" :style="{backgroundImage: 'url('+bgImages[1]+')'}"></div>

      <b-container class="bg-light p-5 mt-4">
          <h2 class="m-0"><strong>Error 404</strong> - not found.</h2>
          <h5>Please try something new :)</h5>
          <hr/>

              <b-img center :src="require('@/assets/img/not-found.png')"></b-img>

      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  props: {},
  data() {
    return {
      BACKEND_BASE: 'https://etmap.nuforms.com',
      bgImages: [
        require("@/assets/img/pattern-icons.png"),
        require("@/assets/img/top.jpg"),
        require("@/assets/img/tallinn.svg"),
        require("@/assets/img/mol.svg")
      ],
    }
  },
  mounted () {
  },
  methods: {

  }
}
// d-flex justify-content-center align-items-center
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
