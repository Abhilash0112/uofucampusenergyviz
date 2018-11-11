class AreaChart {

    constructor() {
        let that = this;
        this.rawToDate = d3.timeParse("t:%Y-%m-%dT%H:%M:%S%Z Denver");
        this.dateToTime = d3.timeFormat("%B %d, %Y, %I:%M %p");
        this.modifier = 0;
        this.width = 500; //Placeholder
        this.height = 250;
        this.margin = { top: 50, bottom: 50, left: 50, right: 50 } //Placeholder

        this.x = d3.scaleTime().range([0, this.width]);
        this.y = d3.scaleLinear().range([this.height, 0]);

        this.line = d3.area().x(function (d) { return that.x(d.time) }).y0(function (d) { return that.y(0) }).y1(function (d) { return that.y(d.kWh) });

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
        //Note to self:
        //Making this a stack is gonna be a pain.
        //I might have to use await for all of the selected CSVs to load their data
        //then put them into the stack.
        //Additional note: After research, I think I've confirmed that I cannot just simply iterate through all of the files
        //with pure Javascript (dammit Javascript)
        //I'll need a direct string-to-file to access the correct file in the first place... and that's just all kinds of spaghetti.
        //I'll have to ask a TA or something to figure this out.

        d3.json("data/JSON_Files/SUTTON_BLDG_208V_PWR.JSON").then(bldgData => {
            let unit = bldgData["cols"][1]["unit"];

            //Note that this code converts from any unit to kBTU
            if (unit === "kBTU") {
                this.modifier = 1.0
            }
            else if (unit === "BTU") {
                this.modifier = 1000.0;
            }
            else if (unit === "Wh") {
                this.modifier = 1000.0 / 3.41214;
            }
            else if (unit === "kWh") {
                this.modifier = 1.0 / 3.41214;
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
            this.y.domain([0, 100]);
            let lineFromData = this.line(dataArr);

            this.chartGroup.append("path")
                .datum(dataArr)
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .style("fill", "lightblue")
                .attr("d", lineFromData);

            this.xAxis.scale(this.x);
            this.yAxis.scale(this.y);

            d3.select("#xGroup").call(this.xAxis);
            d3.select("#yGroup").call(this.yAxis);
        });
    }
}