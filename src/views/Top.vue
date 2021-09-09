
<template>
  <div id="top">
    <div id="bg-image">
      <div id="banner" class="bg-light" :style="{backgroundImage: 'url('+bgImages[1]+')'}"></div>
      <b-container class="bg-light mt-4 p-5">

        <h2 class="m-0">ElectroPeople ranking - top activity.</h2>
        <h5>Be the first!</h5>
        
        <hr/>
        <b-row>
          <b-col cols="12" lg="4">
            <h3><b-badge variant="danger" class="text-white font-weight-bold">Top</b-badge> ElectroPeople</h3>
            <b-table class="bg-info" borderless outlined striped hover :items="listTop" :fields="fields_top" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">
              <template #cell(indx)="data">
                <b-badge variant="light"><h3 class="text-right font-weight-bold">{{ data.index + 1 }}</h3></b-badge>
              </template>
              <template #cell(img)="data">
                <b-img :src="ranks[getRank(data.item.count)].icon" center left fluid class="table-icon"></b-img>
              </template>
              <template #cell(user)="data">
                <h4>{{ data.item.user }}</h4><i class="rank-sub">{{ranks[getRank(data.item.count)].name}}</i>
              </template>
              <template #cell(count)="data">
                <b-badge variant="dark" class="text-white font-weight-bold"><h4>{{ data.item.count }}</h4></b-badge>
              </template>
            </b-table>
            <h3 class="mt-5"><b-badge variant="danger" class="text-white font-weight-bold">Ranks</b-badge> Legend</h3>
            <b-table class="bg-info mb-5" borderless outlined striped hover :items="ranks" :fields="fields_rank">
              <template #cell(icon)="data">
                <b-img :src="data.item.icon" center fluid class="table-icon"></b-img>
              </template>
              <template #cell(name)="data">
                <h4>{{ data.item.name }}</h4>
              </template>
              <template #cell(minCount)="data">
                <b-badge variant="dark" class="text-white font-weight-bold"><h4>{{ data.item.minCount }}+</h4></b-badge>
              </template>
            </b-table>
          </b-col>
          <b-col cols="12" lg="8">
            <h3><b-badge variant="danger" class="text-white font-weight-bold">List</b-badge> Locations</h3>
            <b-table class="bg-info" borderless striped hover :items="listFull" :fields="fields_loc">
              <template #cell(title)="data">
                <h4>{{ data.item.title }}</h4><p>{{ data.item.description }}</p><small>Added by: {{ data.item.user }}</small>
              </template>
              <template #cell(type)="data">
                <b-img :src="locationIcons[data.item.type]" center fluid class="table-icon"></b-img>
              </template>
              <template #cell(imageName)="data">
                  <b-button-group size="sm">
                    <b-button size="sm" v-b-modal="'image-modal-'+data.item.id">Image</b-button>
                    <b-button variant="primary" size="sm" v-b-modal="'map-modal-'+data.item.id">Map</b-button>
                  </b-button-group>
                <b-modal :id="'image-modal-'+data.item.id" title="Photo" ok-only>
                  <b-img :src="$root.BACKEND_BASE + '/images/' + data.item.imageName" center fluid></b-img>
                </b-modal>
                <b-modal :id="'map-modal-'+data.item.id" title="Point on map" ok-only>
                  <iframe width="100%" height="460px" frameBorder="0" :src="'https://maps.google.com/maps?q='+data.item.lat+','+data.item.lng+'&z=15&output=embed'"></iframe>
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
      bgImages: [
        require("@/assets/img/pattern-icons.png"),
        require("@/assets/img/top.jpg"),
        require("@/assets/img/tallinn.svg"),
        require("@/assets/img/mol.svg")
      ],
      locationIcons: {
        CHARGE: require("@/assets/img/icon/icon-charge.svg"),
        REPAIR: require('@/assets/img/icon/icon-repair.svg'),
        AIR: require('@/assets/img/icon/icon-air.svg'),
        WATER: require('@/assets/img/icon/icon-water.svg')
      },
      ranks: [
        {
          num: 0,
          icon: require('@/assets/img/ranks/rank-1.png'),
          name: 'ElectroIron',
          minCount: 1
        },
        {
          num: 1,
          icon: require('@/assets/img/ranks/rank-2.png'),
          name: 'ElectroBronze',
          minCount: 3
        },
        {
          num: 2,
          icon: require('@/assets/img/ranks/rank-3.png'),
          name: 'ElectroSilver',
          minCount: 5
        },
        {
          num: 3,
          icon: require('@/assets/img/ranks/rank-4.png'),
          name: 'ElectroGoldie',
          minCount: 7
        },
        {
          num: 4,
          icon: require('@/assets/img/ranks/rank-5.png'),
          name: 'ElectroDiamond',
          minCount: 10
        },
        {
          num: 5,
          icon: require('@/assets/img/ranks/rank-6.png'),
          name: 'ElectroMeteor',
          minCount: 15
        },
        {
          num: 6,
          icon: require('@/assets/img/ranks/rank-7.png'),
          name: 'ElectroSpace',
          minCount: 30
        },
        {
          num: 7,
          icon: require('@/assets/img/ranks/rank-8.png'),
          name: 'ElectroGodness',
          minCount: 50
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
          label: 'Name'
        },
        {
          key: 'imageName',
          sortable: false,
          label: 'Info'
        }
      ],
      fields_top: [
         {
          key: 'indx',
          sortable: false,
          label: ''
        },
        {
          key: 'user',
          sortable: false,
          label: 'Name'
        },
        {
          key: 'img',
          sortable: false,
          label: ''
        },
        {
          key: 'count',
          sortable: false,
          label: 'Points'
        }
      ],
      sortBy: 'count',
      sortDesc: true,
      fields_rank: [
        {
          key: 'icon',
          label: 'Medal'
        },
        {
          key: 'name',
          label: 'Rank'
        },
        {
          key: 'minCount',
          label: 'Points'
        }
      ]
    }
  },
  computed : {
  },
  getters: {
  },
  mounted () {
    this.requests();
  },
  methods: {
    requests() {

      axios
        .get(this.$root.BACKEND_BASE + '/locations')
        .then(response => {
          this.listFull = response.data.slice().reverse();
        });
      axios
        .get(this.$root.BACKEND_BASE + '/locations/top')
        .then(response => {
          this.listTop = response.data;
        });
    },
    getRank(points) {
      let rank;
      for (rank of this.ranks.slice().reverse()) {
        if (points >= rank.minCount) return rank.num;
      }
      return 0; //default
    }

  }
}
// d-flex justify-content-center align-items-center
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

