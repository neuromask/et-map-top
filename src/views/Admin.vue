
<template>
  <div id="admin">
    <div id="bg-image">
      <div id="banner" class="bg-light" :style="{backgroundImage: 'url('+bgImages[1]+')'}"></div>
      <b-container class="bg-light mt-4 p-5">
        <h2 class="m-0">Admin area</h2>      
        <hr/>
        <b-row>
          <b-col cols="12">
            <h3><b-badge variant="warning" class="text-white font-weight-bold">List</b-badge> Locations</h3>
            <b-table class="bg-info" borderless striped hover :items="listFull" :fields="fieldsLoc">
              <template #cell(title)="data">
                <h4>{{ data.item.title }}</h4><p>{{ data.item.description }}</p><small>Added by: {{ data.item.userFirstName }}</small>
              </template>
              <template #cell(type)="data">
                <b-img :src="locationIcons[data.item.type]" center fluid class="table-icon"></b-img>
              </template>
              <template #cell(imageName)="data">
                <div>
                  <b-button-group size="sm">
                    <b-button size="sm" v-b-modal="'image-modal-'+data.item.id">Image</b-button>
                    <b-button variant="primary" size="sm" v-b-modal="'map-modal-'+data.item.id">Map</b-button>
                  </b-button-group>
                </div>
                <b-modal :id="'image-modal-'+data.item.id" title="Photo" ok-only>
                  <b-img :src="$root.BACKEND_BASE + '/images/' + data.item.imageName" center fluid></b-img>
                </b-modal>
                <b-modal :id="'map-modal-'+data.item.id" title="Point on map" ok-only>
                  <iframe width="100%" height="460px" frameBorder="0" :src="'https://maps.google.com/maps?q='+data.item.lat+','+data.item.lng+'&z=15&output=embed'"></iframe>
                </b-modal>
              </template>
              <template  #cell(show_details)="data">
                <div>
                  <b-button-group size="sm">
                    <b-button variant="primary"><b-icon icon="pencil-fill" @click="data.toggleDetails" variant="white"></b-icon></b-button>
                    <b-button :class="data.item.status == 'NEW' ? 'btn-warning' : 'btn-success'" @click="statusLoc(data.item.id)"><b-icon icon="check-circle-fill" variant="white"></b-icon></b-button>
                    <b-button variant="danger" v-b-modal="'delete-modal-'+data.item.id"><b-icon icon="trash-fill" variant="white"></b-icon></b-button>
                  </b-button-group>
                  <b-modal :id="'delete-modal-'+data.item.id" title="Confirm delete">
                    Are you sure you want to delete?<br />ID: {{data.item.id}}<br />Name: {{data.item.title}}
                    <template #modal-footer="{ ok, cancel, hide }">
                      <b-button size="sm" @click="deleteLoc(data.item.id), hide()">OK</b-button>
                      <b-button size="sm" @click="cancel()">Cancel</b-button>
                    </template>
                  </b-modal>
                </div>
              </template>
              <template #row-details="data">
                <b-card>
                  <b-form inline>
                    <b-form-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" :placeholder="data.item.title"></b-form-input>
                    <b-form-input id="inline-form-input-username" class="mb-2 mr-sm-2 mb-sm-0" :placeholder="data.item.description"></b-form-input>
                    <b-button variant="primary">Save</b-button>
                  </b-form>
                </b-card>
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
      componentKey: 0,
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
      listFull: [],
      fieldsLoc: [
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
        },
        {
          key: 'show_details',
          sortable: false,
          label: ''
        }
      ],
      sortBy: 'count',
      sortDesc: true
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
    },
    deleteLoc(locId) {
        axios
        //.delete(this.$root.BACKEND_BASE + '/locations/' + locId)
        .then((response) => {
          if (response.status == '200') {
            this.requests();
            console.log(locId+" deleted");
          }
        })
    },
    statusLoc(locId) {
        axios
        .put(this.$root.BACKEND_BASE + '/locations/' + locId + '/confirm/')
        .then((response) => {
          if (response.status == '200') {
            this.requests();
            console.log(locId+" approved");
          }
        })
    }

  }
}
// d-flex justify-content-center align-items-center
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

