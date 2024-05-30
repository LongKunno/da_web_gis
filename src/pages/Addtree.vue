<template>
    <q-page class="q-pa-md">
      <q-card>
        <q-card-section>
          <div class="text-h6">Add New Tree</div>
        </q-card-section>
  
        <q-card-section>
          <q-form @submit="submitForm" class="q-gutter-md">
            <q-input v-model="name" label="Name" />
            <q-input v-model="type" label="Type" />
            <q-input v-model="height" type="number" label="Height (m)" />
            <q-input v-model="age" type="number" label="Age (years)" />
            <q-input v-model="longitude" type="number" label="Longitude" />
            <q-input v-model="latitude" type="number" label="Latitude" />
            <q-btn type="submit" label="Add Tree" color="primary" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script>
  import { addXML } from "@/utils/geoserver"; // Điều chỉnh đường dẫn tới file chứa hàm addXML
  import * as ol from 'ol';
  import * as geom from 'ol/geom';
  
  export default {
    data() {
      return {
        name: "",
        type: "",
        height: null,
        age: null,
        longitude: null,
        latitude: null,
      };
    },
    methods: {
      submitForm() {
        if (
          this.name &&
          this.type &&
          this.height !== null &&
          this.age !== null &&
          this.longitude !== null &&
          this.latitude !== null
        ) {
          const feature = new ol.Feature({
            geometry: new geom.Point([this.longitude, this.latitude]),
            name: this.name,
            type: this.type,
            height: this.height,
            age: this.age,
          });
  
          addXML({
            feature,
            workspace: "danang",
            layer: "tree",
            resolve: () => {
              console.log("Feature inserted successfully");
              this.$q.notify({
                message: "Tree added successfully!",
                color: "primary",
                icon: "check_circle",
              });
              // Clear the form after successful submission
              this.name = "";
              this.type = "";
              this.height = null;
              this.age = null;
              this.longitude = null;
              this.latitude = null;
            },
          });
        } else {
          this.$q.notify({
            message: "Please fill in all fields.",
            type: "negative",
          });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .q-card {
    max-width: 400px;
    margin: auto;
  }
  </style>
  