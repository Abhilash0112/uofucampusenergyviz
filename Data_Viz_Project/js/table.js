class Table {

    constructor(areaChart) {
        this.table = d3.select("#table-location")
            .append("table")
            .attr("class", "table table-condensed table-striped");

        this.thead = this.table.append("thead");
        this.tbody = this.table.append("tbody");
        this.theaders = this.thead.append("tr").selectAll("th");
        this.dropdown = d3.select("#drop").append("select");

        let colors = ["#CD5C5C", "#DC143C", "#C71585", "#FF8C00", "#BDB76B", "#8A2BE2", "#98FB98", "#00008B", "#2F4F4F", "#808080", "#B8860B"];
        this.colScale = d3.scaleOrdinal()
            .range(colors);

        this.areaChart = areaChart;
    }

    update() {
        d3.csv("data/Final_Static_DataSet/CSV_FULL_SITE_LIST.csv").then(tabledata => {
            let that = this;
            let col = tabledata.map(function (d) { return { Category: d.mgntGroup, Area: d.area, PrimaryUsage: d.primaryFunction, Type: d.dis }; });;

            let ByName = d3.nest().key(function (d) { return d.Category; }).entries(col);
            let columns = Object.keys(col[0]);

            this.theaders
                .data(columns)
                .enter()
                .append("th")
                .text(function (columns) { return columns; });

            let rows = this.tbody.selectAll("tr")
                .data(ByName[0].values)
                .enter()
                .append("tr")
                .on("mouseover", function (d) {
                    d3.select(this).style("background-color", "steelblue");
                })
                .on("mouseout", function (d) {
                    d3.select(this).style("background-color", "transparent")

                })
                .on("click", function (d) {
                    console.log("CLICKED ORIGINAL", d);
                    console.log(d["Type"].slice(0, 4));
                    that.areaChart.update([d["Type"].slice(0, 4)]);
                })
                ;

            rows.selectAll("td")
                .data(function (d) {
                    return columns.map(function (k) {
                        return { 'value': d[k], 'name': k }
                    });
                })
                .enter()
                .append("td")
                .text(function (d) { return d.value; });

            rows.exit().remove();

            this.dropdown.selectAll("option")
                .data(ByName)
                .enter()
                .append("option")
                .attr("value", function (d) {
                    return d.key;
                })
                .text(function (d) {
                    return d.key;
                });

            d3.select("#drop")
                .on("change", function () {

                    let selected = d3.select('select').property('value')
                    let selData;
                    for (let i = 0; i < ByName.length; i++) {
                        if (ByName[i].key === selected) {
                            selData = ByName[i].values;
                        }
                    }

                    let newRows = that.tbody.selectAll("tr")
                        .data(selData);


                    newRows.enter().append("tr");
                    newRows.exit().remove();

                    let allRows = that.tbody.selectAll("tr");

                    allRows.on("mouseover", function (d) {
                        d3.select(this).style("background-color", "steelblue");
                    })
                        .on("mouseout", function (d) {
                            d3.select(this).style("background-color", "transparent")

                        })
                        .on("click", function (d) {
                            console.log("CLICKED NEW", d);
                            console.log(d["Type"].slice(0, 4));

                            that.areaChart.update([d["Type"].slice(0, 4)]);
                        });

                    let allData = allRows.selectAll("td")
                        .data(function (d) {
                            return columns.map(function (k) {
                                return { 'value': d[k], 'name': k }
                            });
                        });

                    allData.enter().append("td")
                    allData.exit().remove();

                    allRows.selectAll("td").transition()
                        .duration(500)
                        .text(function (d) { return d.value; });
                });

            this.colScale.domain(d3.extent(tabledata, function (d) { return d.mgntGroup; }));

            let legend = d3.select("#legend")
                .selectAll("text")
                .data(ByName, function (d) { return d.key });

            legend.enter().append("rect")
                .attr("width", 10)
                .attr("height", 10)
                .attr("x", 0)
                .attr("y", function (d, i) { return 0 + i * 15; })
                .attr("fill", function (d) { return that.colScale(d.key); })
                .attr("class", function (d, i) { return "legendcheckbox " + d.key });

            legend.enter()
                .append("text")
                .attr("x", 20)
                .attr("y", function (d, i) { return 10 + i * 15; })
                .attr("class", "legend")
                .transition()
                .style("fill", "#steelblue")
                .text(function (d) { return d.key; });

            legend.exit().remove();

        });
    }
}
