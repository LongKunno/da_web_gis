<template>
<apexchart type="area" :options="options" :series="series"></apexchart>
</template>

<script>
    export default {
    name: 'ApexChart01_3',
    data: function () {
        return {
            series: [
                {
                    name: "STOCK ABC",
                    data: [10, 20, 50, 50, 50, 70]
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
                    text: 'Biếu dồ quản lý Layer',
                    align: 'left'
                },
                subtitle: {
                    text: 'Số lượng Layer',
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