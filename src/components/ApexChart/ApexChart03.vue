<template>
<apexchart type="bar" :options="options" :series="series"></apexchart>
</template>

<script>
    import axios from 'axios';
    export default {
    name: 'ApexChart03',
    data: function () {
        return {
          
          series: [],
          options: {},

            }
        },
        mounted() {
    axios.get(`${process.env.API_HOST}:${process.env.API_PORT}/api/chart_5`)
      .then(response => {
        const newData = response.data.list_data;
        const newCategories = response.data.categories;
        console.log(newData);
        
        // Cập nhật dữ liệu cho series và labels
        this.series = [
          {
            name: 'Tỉ lệ',
            data: newData
          }
        ];

        this.options = {
            chart: {
              height: 400,
              type: 'bar',
              fontFamily: 'Times New Roman, serif',
            },
            plotOptions: {
              bar: {
                borderRadius: 0,
                dataLabels: {
                  position: 'top', // top, center, bottom
                },
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val;
              },
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ["#304758"]
              }
            },
            
            xaxis: {
              categories: newCategories,
              position: 'bottom',
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              crosshairs: {
                fill: {
                  type: 'gradient',
                  gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  }
                }
              },
              tooltip: {
                enabled: true,
              }
            },
            yaxis: {
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
                formatter: function (val) {
                  return val;
                }
              }
            
            },
            title: {
              text: 'Biểu đồ thống kê số lượng cây xanh',
              floating: true,
              offsetY: 0,
              align: 'left',
              style: {
                color: '#444'
              }
            }
          }
      })
      .catch(error => {
        console.error('-- Get data chart error--', error);
      });
    }
    }
</script>