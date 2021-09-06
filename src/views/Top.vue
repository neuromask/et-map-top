
<template>
  <div id="top">
    <div id="bg-image">
      <div id="banner" class="g-light" :style="{backgroundImage: 'url('+bgImages[1]+')'}">
      </div>

      <b-container class="bg-light p-4 mt-4">
        <b-row>
          <b-col cols="12" lg="4">
            <h3><b-badge variant="danger" class="text-white font-weight-bold">Top</b-badge> ElectroPeople</h3>
            <b-table borderless striped hover :items="listTop" :fields="fields_top" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"></b-table>
            <h3><b-badge variant="danger" class="text-white font-weight-bold">rank</b-badge> Legend</h3>
            <b-table borderless striped hover :items="rank" :fields="fields_rang">
              <template #cell(icon)="data">
                <b-img :src="data.item.icon" center fluid></b-img>
              </template>
            </b-table>
          </b-col>
          <b-col cols="12" lg="8">
            <h3><b-badge variant="danger" class="text-white font-weight-bold">List</b-badge> Locations</h3>
            <b-table borderless striped hover :items="listFull" :fields="fields_loc">
              <template #cell(title)="data">
                <h5>{{ data.item.title }}</h5><p>{{ data.item.description }}</p>
              </template>
              <template #cell(type)="data">
                <b-img :src="locationIcons[data.item.type]" center fluid></b-img>
              </template>
              <template #cell(imageName)="data">
                <b-button v-b-modal="'image-modal-'+data.item.id">Show</b-button>
                <b-modal :id="'image-modal-'+data.item.id" title="Photo" ok-only>
                  <b-img :src="BACKEND_BASE + '/images/' + data.item.imageName" center fluid></b-img>
                </b-modal>
              </template>
              <template #cell(lat)="data">
                <b-button v-b-modal="'map-modal-'+data.item.id">Show</b-button>
                <b-modal :id="'map-modal-'+data.item.id" title="Point on map" ok-only>
                  <iframe width="100%" height="460px" frameBorder="0" :src="'http://maps.google.com/maps?q='+data.item.lat+','+data.item.lng+'&z=15&output=embed'"></iframe>
                </b-modal>
              </template>
            </b-table>
          </b-col>

        </b-row>

      </b-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Map',
  props: {},
  data() {
    return {
      BACKEND_BASE: 'https://etmap.nuforms.com',
      bgImages: [
        require("@/assets/img/pattern-icons.png"),
        require("@/assets/img/top.jpg"),
        require("@/assets/img/tallinn.svg")
      ],
      locationIcons: {
        CHARGE: require("@/assets/icon/charge.png"),
        REPAIR: require('@/assets/icon/repair.png'),
        AIR: require('@/assets/icon/air.png'),
        WATER: require('@/assets/icon/water.png')
      },
      rank: [
        {
          icon: require('@/assets/icon/repair.png'),
          name: 'ElectroNewbie',
          range: '1-5'
        }
      ],
      listFull: [],
      listTop: [],
      fields_loc: [
        {
          key: 'type',
          sortable: true,
          label: 'Type'
        },
        {
          key: 'title',
          sortable: true,
          label: 'Location name'
        },
        {
          key: 'imageName',
          sortable: false,
          label: 'Photo'
        },
        {
          key: 'lat',
          sortable: false,
          label: 'Map'
        }
      ],
      fields_top: [
        {
          key: 'user',
          sortable: false,
          label: 'Name'
        },
        {
          key: 'count',
          sortable: true,
          label: 'Points'
        }
      ],
      sortBy: 'count',
      sortDesc: true,
      fields_rang: [
        {
          key: 'icon',
          label: 'Sign'
        },
        {
          key: 'name',
          label: 'Rank'
        },
        {
          key: 'range',
          label: 'Points'
        }
      ]
    }
  },
  computed : {

  },
  mounted () {
    this.requests();
  },
  methods: {

    requests() {
      axios
        .get(this.BACKEND_BASE + '/locations')
        .then(response => {
          this.listFull = response.data;
        });
      axios
        .get(this.BACKEND_BASE + '/locations/top')
        .then(response => {
          this.listTop = response.data;
        });
    }

    
  }
}
// d-flex justify-content-center align-items-center
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#banner {
  width: 100%;
  height:342px;
  background-position: center center;
}
#bg-image {
  background-position: center center;
  width: 100%;height: 100%;
}


</style>

