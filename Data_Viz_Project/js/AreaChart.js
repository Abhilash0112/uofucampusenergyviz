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

        this.line = d3.area()
            .x(function (d) { return that.x(d.time) })
            .y0(that.y(0))
            .y1(function (d) { return that.y(d.kBTU) });

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
        

        d3.csv("data/fixed/combined_csvs/0011.csv").then(bldgData => {
            console.log(bldgData);
            let that = this;
            let dataArr = bldgData.map(function (d) {
                let formatData = {};
                let dataTime = d["ts"];

                dataTime = dataTime.replace("-06:00 Denver", "");
                formatData.time = new Date(dataTime);

                formatData.kBTU = d["v0"].replace(" kBTU", "");

                return formatData;
            });

            console.log(dataArr);

            this.x.domain(d3.extent(dataArr, function (d) { return d.time }));
            this.y.domain([0, 100000]);
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