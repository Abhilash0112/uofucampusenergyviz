class AreaChart {

    constructor() {
        //TODO: Create SVG Bounds
        let that = this;
        this.rawToDate = d3.timeParse("t:%Y-%m-%dT%H:%M:%S%Z Denver");
        this.dateToTime = d3.timeFormat("%B %d, %Y, %I:%M %p");
        this.modifier = 0;
        this.width = 500; //Placeholder
        this.height = 250;
        this.margin = { top: 50, bottom: 50, left: 50, right: 50 } //Placeholder

        this.x = d3.scaleTime().range([0, this.width]);
        this.y = d3.scaleLinear().range([0, this.height]);
        this.revY = d3.scaleLinear().range([this.height, 0]);

        this.line = d3.area().x(function (d) { return that.x(d.time) }).y0(function (d) { return that.revY(0) }).y1(function (d) { return that.y(d.kWh) });

        this.svg = d3.select("#chart")
            .append("svg").attr("id", "chartSVG");

        this.svg.attr("width", this.width + this.margin.left + this.margin.right);
        this.svg.attr("height", this.height + this.margin.top + this.margin.bottom);

        this.chartGroup = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.right + ")");

        this.yAxis = d3.axisLeft();
        this.xAxis = d3.axisBottom();

        this.svg.append("g").attr("id", "xGroup").attr("transform", "translate(" + this.margin.left + "," + (this.height + this.margin.top) + ")");
        this.svg.append("g").attr("id", "yGroup").attr("transform", "translate(" + this.margin.left + "," + this.margin.right + ")");
    }

    update() {
        //The below is a fixed example for now.
        //Must eventually add a param to update() containing the building(s) to render in the stacked area chart.
        d3.json("data/JSON_Files/SUTTON_BLDG_208V_PWR.JSON").then(bldgData => {
            let unit = bldgData["cols"][1]["unit"];

            if (unit === "kBTU") {
                this.modifier = 3.412
            }
            else if (unit === "BTU") {
                this.modifier = 3.412 / 1000;
            }
            else if (unit === "Wh") {
                this.modifier = 1000;
            }
            else if (unit === "kWh") {
                this.modifier = 1;
            }

            let that = this;
            let dataArr = bldgData["rows"].map(function (d) {
                let formatData = {};
                let dataTime = d["ts"];
                let dataEnergy = d["v0"];

                dataTime = dataTime.replace("-06:00 Denver", "");
                dataTime = dataTime.replace("t:", "");
                formatData.time = new Date(dataTime);

                dataEnergy = dataEnergy.replace("n:", "");
                dataEnergy = dataEnergy.replace(" kWh", "");
                dataEnergy = dataEnergy.replace(" BTU", "");
                dataEnergy = dataEnergy.replace(" kBTU", "");
                dataEnergy = dataEnergy.replace(" Wh", "");

                formatData.kWh = parseFloat(dataEnergy) / that.modifier;
                return formatData;
            });

            this.x.domain(d3.extent(dataArr, function (d) { return d.time }));
            this.y.domain(d3.extent(dataArr, function (d) { return d.kWh }));
            let lineFromData = this.line(dataArr);

            this.chartGroup.append("path")
                .datum(dataArr)
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .style("fill", "lightblue")
                .attr("d", lineFromData);

            this.xAxis.scale(this.x);
            this.yAxis.scale(this.revY);

            d3.select("#xGroup").call(this.xAxis);
            d3.select("#yGroup").call(this.yAxis);
        });
    }
}