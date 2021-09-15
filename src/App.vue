<template>
  <div id="app" :class="{ 'mobile' : $isMobile()}">
    <app-navbar></app-navbar>
    <router-view></router-view>
    <footer>
      <cookie-law theme="et"></cookie-law>
    </footer>
  </div>
</template>

<script>
  import CookieLaw from 'vue-cookie-law'
  export default {
    components: { CookieLaw }
  }
</script>