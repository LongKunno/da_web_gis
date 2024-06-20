<template>
<apexchart type="treemap" :options="options" :series="series"></apexchart>
</template>

<script>
    export default {
    name: 'ApexChart04',
    data: function () {
        return {
            series: [
                {
                data: [
                    { x: 'Không có dữ liệu', y: 1 },
                ]
                }
            ],
            options: {
                legend: {
                show: false
                },
                chart: {
                height: 350,
                type: 'treemap',
                fontFamily: 'Times New Roman, serif' // Thay đổi phông chữ tại đây
                },
                title: {
                text: 'Thống kê số lượng cây xanh',
                }
            },
        };
    },
    mounted() {
        this.updateChart();
    },
    methods: {
        updateChart() {

            this.series = 
            [{
                data: [
                    { x: 'Nguyễn Văn Linh', y: 218 },
                    { x: 'Trường Chinh', y: 149 },
                    { x: 'Công viên 29/3', y: 184 },
                    { x: 'Lê Tấn Trung', y: 55 },
                    { x: 'Ông Ích Khiêm', y: 84 },
                    { x: 'Nguyễn Lương Bằng', y: 31 },
                    { x: 'Dũng Sĩ Thanh Khê', y: 70 },
                    { x: 'Hoàng Sa', y: 30 },
                    { x: 'Cầu Rồng', y: 44 },
                    { x: 'Lê Duẫn', y: 68 },
                    { x: 'Trần Thị Lý', y: 28 },
                    { x: 'Núi Thần', y: 19 },
                    { x: 'Nguyễn Tất Thành', y: 29 }
                ]
            }];
        }
    }
};
</script>