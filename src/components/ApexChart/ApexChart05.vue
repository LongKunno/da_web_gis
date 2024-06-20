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
                  image: 'https://www.pikpng.com/pngl/b/74-745720_download-img-icon-png-clipart.png',
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
                src: ['https://sheokhanda.wordpress.com/wp-content/uploads/2010/06/spring-colors.jpg'],
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