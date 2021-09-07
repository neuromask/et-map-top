<template>
  <div id="app" :class="{ 'mobile' : $isMobile()}">
    <app-navbar></app-navbar>
    <router-view></router-view>
  </div>
</template>