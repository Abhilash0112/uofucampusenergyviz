let mapChart = new MapChart();
mapChart.update();
let barC = new barChart();
let areaChart = new AreaChart(barC);

let table = new Table(areaChart);
table.update();