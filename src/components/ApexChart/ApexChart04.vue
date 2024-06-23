<template>
<apexchart type="treemap" :options="options" :series="series"></apexchart>
</template>

<script>
    import axios from 'axios';
    export default {
    name: 'ApexChart04',
    data: function () {
        return {
            series: [],
            options: {},
        };
    },
    mounted() {
    axios.get(`${process.env.API_HOST}:${process.env.API_PORT}/api/chart_6`)
      .then(response => {
        const newData = response.data.list_data;
        
        // Cập nhật dữ liệu cho series và labels
        this.series = [
            {
            data: newData
            }
        ];

        this.options = {
                legend: {
                show: false
                },
                chart: {
                height: 400,
                type: 'treemap',
                fontFamily: 'Times New Roman, serif' // Thay đổi phông chữ tại đây
                },
                title: {
                text: 'Biểu đồ thống kê số lượng cây xanh theo vị trí',
                }
            }
      })
      .catch(error => {
        console.error('-- Get data chart error--', error);
      });
    }
};
</script>