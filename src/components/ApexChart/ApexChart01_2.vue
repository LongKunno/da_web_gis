<template>
<apexchart type="area" :options="options" :series="series"></apexchart>
</template>

<script>
    export default {
    name: 'ApexChart01_2',
    data: function () {
        return {
            series: [
                {
                    name: "STOCK ABC",
                    data: [10, 100, 100, 250, 345, 500]
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
                    text: 'Biếu dồ quản lý địa điểm',
                    align: 'left'
                },
                subtitle: {
                    text: 'Số lượng địa điểm',
                    align: 'left'
                },
                labels: [0, 5, 10, 15, 20, 25],
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