let mapChart = new MapChart();
mapChart.update();
let table = new Table();
table.update();
let barC = new barChart();
let areaChart = new AreaChart(barC);


areaChart.update(["0011", "0009"]);