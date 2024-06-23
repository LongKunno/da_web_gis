<template>
<apexchart type="area" :options="options" :series="series"></apexchart>
</template>

<script>
    export default {
    name: 'ApexChart01',
    data: function () {
        return {
            series: [
                {
                    name: "STOCK ABC",
                    data: [10, 20, 30, 40, 50, 60]
                }
            ],
            options: {
                chart: {
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
                    text: 'Biếu dồ quy mô quản lý',
                    align: 'left'
                },
                subtitle: {
                    text: 'Số lượng ',
                    align: 'left'
                },
                labels: [10, 20, 50, 50, 70, 100],
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