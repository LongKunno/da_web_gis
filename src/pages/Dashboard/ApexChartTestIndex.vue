<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page style="margin-top: 20px;">
  <!-- <ApexChartTest></ApexChartTest> -->
    <div class="row">
      <div class="col-md-3" style="padding-left:10px; padding-right:10px;">
        <ApexChart01_1></ApexChart01_1>
      </div>
      <div class="col-md-3" style="padding-left:10px; padding-right:10px;">
        <ApexChart01_2></ApexChart01_2>
      </div>
      <div class="col-md-3" style="padding-left:10px; padding-right:10px;">
        <ApexChart01_3></ApexChart01_3>
      </div>
      <div class="col-md-3" style="padding-left:10px; padding-right:10px;">
        <ApexChart01_4></ApexChart01_4>
      </div>
    </div>
    <div class="row" style="margin-top: 20px;">
      <div class="col-md-6" style="padding-left:10px; padding-right:10px;">
          <ApexChart03></ApexChart03>
      </div>
      <div class="col-md-6" style="padding-left:10px; padding-right:10px;">
          <ApexChart04></ApexChart04>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue';
// import ApexChartTest from 'src/components/ApexChart/ApexChartTest.vue';
import ApexChart01_1 from 'src/components/ApexChart/ApexChart01_1.vue';
import ApexChart01_2 from 'src/components/ApexChart/ApexChart01_2.vue';
import ApexChart01_3 from 'src/components/ApexChart/ApexChart01_3.vue';
import ApexChart01_4 from 'src/components/ApexChart/ApexChart01_4.vue';
import ApexChart02 from 'src/components/ApexChart/ApexChart02.vue';
import ApexChart03 from 'src/components/ApexChart/ApexChart03.vue';
import ApexChart04 from 'src/components/ApexChart/ApexChart04.vue';
import ApexChart05 from 'src/components/ApexChart/ApexChart05.vue';

export default defineComponent({
  name: 'ApexChartTestIndex',
  components: {
    // ApexChartTest,
    ApexChart01_1,
    ApexChart01_2,
    ApexChart01_3,
    ApexChart01_4,
    // ApexChart02,
    ApexChart03,
    ApexChart04,
    // ApexChart05,
  }
})
</script>