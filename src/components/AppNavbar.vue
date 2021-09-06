<template>

    <div class="navbar">
        <b-sidebar id="sidebar-variant" title="ET⚡ Map" bg-variant="dark" text-variant="light" shadow backdrop>
        <div class="px-3 py-0">
        <b-img class="my-4" :src="require('../assets/img/circle.png')" fluid center></b-img>
        <p>🇷🇺 - Карта с обозначением мест расположения розеток для зарядки, ремонта в доступных местах.</p>
        <p>🇬🇧 - Map showing the locations of outlets for charging, repair in accessible places.</p>
        <p>🇪🇪 - Kaart, mis näitab laadimis- ja paranduskohtade asukohti juurdepääsetavates kohtades.</p>
        <b-list-group class="my-4">
            <b-list-group-item><router-link to="/">Map</router-link></b-list-group-item>
            <b-list-group-item><router-link to="top">Activity Top</router-link></b-list-group-item>
            <b-list-group-item><router-link to="help">Help</router-link></b-list-group-item>
            <b-list-group-item><a href="https://electrotallinn.ee/" target="_blank">ElectroTallinn Site</a></b-list-group-item>
            <b-list-group-item><a v-b-modal.modal-login>Admin Access</a></b-list-group-item>
        </b-list-group>
        <b-modal id="modal-login" title="Access Admin area" ok-only ok-variant="secondary" ok-title="Cancel">
            <app-login></app-login>
        </b-modal>
        <p style="text-align: center;">Copyright © 2021 – ElectroTallinn<br/>Crafted by Leo & <a href="https://nuforms.com/" target="_blank">Nuforms Design</a></p>
        </div>
        </b-sidebar>

        <div id="badge">
            <a v-b-toggle.sidebar-variant><b-icon-list></b-icon-list></a>
        </div>
        
    </div>

</template>
