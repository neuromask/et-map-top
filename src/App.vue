<template>
  <div id="app">
    <div class="holder d-flex justify-content-center align-items-center">
      <router-view />
    </div>
  </div>
</template>
<style>
    html, body, #app {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    #app .holder {
        position: relative;
        height: 100%;
        width: 100%;
    }
    .page-icon {
        margin-right: 10px;
    }
    .md-drawer {
        background-color: white;
    }
    .infowindow .infowindow-header {
        background-color: #333;
        color: white;
        padding: 15px;
    }
    .infowindow .infowindow-footer {
        background-color: #eee;
        padding: 10px;
    }
    a {
        color: #42b983;
    }

</style>