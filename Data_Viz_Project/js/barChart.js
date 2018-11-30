class barChart {
    constructor() {
        this.width = 500; //Placeholder
        this.height = 250;
        this.margin = { top: 50, bottom: 50, left: 50, right: 50 } //Placeholder

        this.x = d3.scaleBand()
            .range([0, this.width])
            .paddingInner([0.1])
            .paddingOuter([0.1])
            .align([0.5]); //Need to research how this works

        this.y = d3.scaleLinear().range([this.height, 0]).nice();

        this.svg = d3.select("#barChart")
            .append("svg").attr("id", "barSVG");

        this.svg.attr("width", this.width + this.margin.left + this.margin.right);
        this.svg.attr("height", this.height + this.margin.top + this.margin.bottom);

        this.chartGroup = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.right + ")");

        this.yAxis = d3.axisLeft();
        this.xAxis = d3.axisBottom();

        this.svg.append("g").attr("id", "xBarGroup").attr("transform", "translate(" + this.margin.left + "," + (this.height + this.margin.top) + ")");
        this.svg.append("g").attr("id", "yBarGroup").attr("transform", "translate(" + this.margin.left + "," + this.margin.right + ")");

        this.colorScale = d3.scaleOrdinal(d3.schemeSet1);
    }

    //Don't use this in another function -- I plan to pass the already-created data arrays from the Area Chart file to create the averages here.
    avgs(dataArrs) {
        let dataAvgs = dataArrs.map(function (file) {
            let avg = 0;

            for (let i = 0; i < file.length; i++) {
                let row = file[i].kBTU;
                avg += parseInt(row);
            }

            avg /= file.length;

            return avg;
        });

        let dataMax = 0;
        let dataCount = [];
        for (let i = 0; i < dataAvgs.length; i++) {
            if (dataMax < dataAvgs[i]) {
                dataMax = dataAvgs[i];
            }
            dataCount.push(i);
        }

        this.x.domain(dataCount);
        this.y.domain([0, dataMax]);

        let allRects = this.chartGroup.selectAll("rect").data(dataAvgs);

        allRects.exit().remove();

        allRects = allRects.enter().append("rect").merge(allRects);

        allRects.attr("width", this.x.bandwidth())
            .attr("height", d => this.y(0) - this.y(d))
            .attr("x", (d, i) => this.x(i))
            .attr("y", d => this.y(d));

        let allText = this.chartGroup.selectAll("text").data(dataAvgs);

        allText.exit().remove();

        allText = allText.enter().append("text").merge(allText);

        allText.attr("x", (d, i) => this.x(i) + this.x.bandwidth() / 2)
            .attr("y", d => this.y(d) - 5)
            .attr("text-anchor", "middle")
            .style("stroke", "black")
            .text(d => parseInt(d));

        this.xAxis.scale(this.x);
        this.yAxis.scale(this.y);

        d3.select("#xBarGroup").call(this.xAxis);
        d3.select("#yBarGroup").call(this.yAxis);

        this.chartGroup.selectAll("rect").attr("fill", (d, i) => this.colorScale(i % 9));

        return dataMax;
    }
}