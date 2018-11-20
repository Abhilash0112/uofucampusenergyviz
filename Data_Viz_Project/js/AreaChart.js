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


    //Params is an array of strings that correspond to the correct .csv files in the data folder
    //default path data/fixed/combined_csvs/FILENAME.csv
    update(params) {
        //Note to self:
        //Making this a stack is gonna be a pain.
        //I might have to use await for all of the selected CSVs to load their data
        //then put them into the stack.

        let that = this;

        //Load all csvs
        let promises = params.map(function (d) {
            return d3.csv("data/fixed/combined_csvs/" + d + ".csv")
        });

        //Then once that's done, files will contain all of the csvs.
        Promise.all(promises).then(function (files) {
            //Okay, let's take this slow
            //The files contains all of the csv data.
            //I'll need to first map, then use another map to return a formatted entry.
            //Then that second map will return a single entry to the mapped data
            //Then the first map will return an array of array of data, sorted by the order in which it was passed via params.
            let dataArrs = files.map(function (file) {
                let dataArr = file.map(function (row) {
                    let formatData = {};
                    let dataTime = row["ts"];

                    dataTime = dataTime.replace("-06:00 Denver", "");
                    formatData.time = new Date(dataTime);

                    formatData.kBTU = row["v0"].replace(" kBTU", "");

                    return formatData;
                });

                return dataArr;
            });

            that.x.domain(d3.extent(dataArrs[0], function (d) { return d.time }));
            that.y.domain([0, 100000]);

            let allPaths = that.chartGroup.selectAll("path").data(dataArrs);

            allPaths.exit().remove();

            allPaths.enter().append("path")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .style("fill", "lightblue")
                .attr("d", d => that.line(d));


            that.xAxis.scale(that.x);
            that.yAxis.scale(that.y);

            d3.select("#xGroup").call(that.xAxis);
            d3.select("#yGroup").call(that.yAxis);
        });
        
    }
}