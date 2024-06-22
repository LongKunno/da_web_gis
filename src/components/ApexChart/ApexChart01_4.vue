<template>
<apexchart type="area" :options="options" :series="series"></apexchart>
</template>

<script>
    import axios from 'axios';
    export default {
    name: 'ApexChart01_4',
    data: function () {
        return {
            series: [],
            options: {},
        }
    },
    mounted() {
    axios.get(`${process.env.API_HOST}:${process.env.API_PORT}/api/chart_4`)
      .then(response => {
        const newData = response.data.list_data;
        const newCategories = response.data.categories;
        console.log(newData);
        
        // Cập nhật dữ liệu cho series và labels
        this.series = [
          {
            name: "Features",
            data: newData // Dữ liệu lấy từ API
          }
        ];

        this.options = {
                chart: {
                    fontFamily: 'Times New Roman, serif',
                    type: 'area',
                    height: 250,
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: 'Biếu đồ quản lý đặc trưng',
                    align: 'left'
                },
                subtitle: {
                    text: 'Thông kê số lượng đặc trưng theo từng tháng',
                    align: 'left'
                },
                xaxis: {
                    categories: newCategories
                },
                yaxis: {
                    opposite: true
                },
                legend: {
                    horizontalAlign: 'left'
                }
            }
      })
      .catch(error => {
        console.error('-- Get data chart error--', error);
      });
    }
}
</script>