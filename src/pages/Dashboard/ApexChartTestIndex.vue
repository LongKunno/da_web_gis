<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page>
  <!-- <ApexChartTest></ApexChartTest> -->
    <div class="row">
      <div class="col-md-3" style="padding-left:10px; padding-right:10px;">
        <ApexChart03></ApexChart03>
      </div>
      <div class="col-md-3" style="padding-left:10px; padding-right:10px;">
        <ApexChart03></ApexChart03>
      </div>
      <div class="col-md-3" style="padding-left:10px; padding-right:10px;">
        <ApexChart01></ApexChart01>
      </div>
      <div class="col-md-3" style="padding-left:10px; padding-right:10px;">
        <ApexChart01></ApexChart01>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6" style="padding-left:10px; padding-right:10px;">
          <div class="row">
            <div class="col-md-6" style="padding-left:10px; padding-right:10px;">
              <ApexChart02></ApexChart02>
            </div>
            <div class="col-md-6" style="padding-left:10px; padding-right:10px;">
              <ApexChart05></ApexChart05>
            </div>
          </div>
          <ApexChart03></ApexChart03>
      </div>
      <div class="col-md-6" style="padding-left:10px; padding-right:10px;">
        <div class="row">
            <div class="col-md-6" style="padding-left:10px; padding-right:10px;">
              <ApexChart01></ApexChart01>
            </div>
            <div class="col-md-6" style="padding-left:10px; padding-right:10px;">
              <ApexChart01></ApexChart01>
            </div>
          </div>
          <ApexChart04></ApexChart04>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue';
// import ApexChartTest from 'src/components/ApexChart/ApexChartTest.vue';
import ApexChart01 from 'src/components/ApexChart/ApexChart01.vue';
import ApexChart02 from 'src/components/ApexChart/ApexChart02.vue';
import ApexChart03 from 'src/components/ApexChart/ApexChart03.vue';
import ApexChart04 from 'src/components/ApexChart/ApexChart04.vue';
import ApexChart05 from 'src/components/ApexChart/ApexChart05.vue';

export default defineComponent({
  name: 'ApexChartTestIndex',
  components: {
    // ApexChartTest,
    ApexChart01,
    ApexChart02,
    ApexChart03,
    ApexChart04,
    ApexChart05,
  }
})
</script>