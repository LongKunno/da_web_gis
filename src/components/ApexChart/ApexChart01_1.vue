<template>
<apexchart type="area" :options="options" :series="series"></apexchart>
</template>

<script>
    export default {
    name: 'ApexChart01_1',
    data: function () {
        return {
            series: [
                {
                    name: "STOCK ABC",
                    data: [5, 10, 15, 13, 13, 21]
                }
            ],
            options: {
                chart: {
                    fontFamily: 'Times New Roman, serif',
                    type: 'area',
                    height: 350,
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                
                title: {
                    text: 'Biếu dồ quản lý tài khoản',
                    align: 'left'
                },
                subtitle: {
                    text: 'Số lượng tài khoản',
                    align: 'left'
                },
                labels: [0, 20, 40, 60, 80, 100],
                xaxis: {
                    type: 'datetime',
                },
                yaxis: {
                    opposite: true
                },
                legend: {
                    horizontalAlign: 'left'
                }
            },
        }
    }
}
</script>