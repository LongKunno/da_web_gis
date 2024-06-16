<template>
<apexchart type="radialBar" :options="options" :series="series"></apexchart>
</template>

<script>
    export default {
    name: 'ApexChart04',
    data: function () {
        return {
          
          series: [67],
          options: {
            chart: {
              height: 350,
              type: 'radialBar',
            },
            plotOptions: {
              radialBar: {
                hollow: {
                  margin: 15,
                  size: '70%',
                  image: 'https://img.pikbest.com/origin/09/41/85/916pIkbEsTzRC.jpg!w700wp',
                  imageWidth: 64,
                  imageHeight: 64,
                  imageClipped: false
                },
                dataLabels: {
                  name: {
                    show: false,
                    color: '#fff'
                  },
                  value: {
                    show: true,
                    color: '#333',
                    offsetY: 70,
                    fontSize: '22px'
                  }
                }
              }
            },
            fill: {
              type: 'image',
              image: {
                src: ['https://img.pikbest.com/origin/09/41/85/916pIkbEsTzRC.jpg!w700wp'],
              }
            },
            stroke: {
              lineCap: 'round'
            },
            labels: ['Volatility'],
          },
            
            
            }
        }
    }
</script>