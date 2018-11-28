class Table {

    constructor() {
//        this.mapChart = mapChart;
//        this.barChart = barChart;
//        this.AreaChart = AreaChart;
    }

    update() {
        d3.csv("/data/CSV_FULL_SITE_LIST.csv").then(tabledata =>{
        console.log(tabledata);

        let data = tabledata.filter(function(d) { return d.tz == 'Denver';});
//        console.log(data);
//        console.log(Object.keys(bardata[0]));
//        let columns = Object.keys(data[0]);

        let svg = d3.select("body").append("svg")
                    .attr("height", 1)
                    .attr("width", 1);

        let table = d3.select("#table-location")
                      .append("table")
                      .attr("class", "table table-condensed table-striped"),
                      thead = table.append("thead"),
                      tbody = table.append("tbody");
        let col = tabledata.map(function(d){ return { Category: d.mgntGroup, Area: d.area, PrimaryUsage: d.primaryFunction, Type: d.dis};});;
        console.log(col);
        let ByName = d3.nest().key(function(d){ return d.Category;}).entries(col);
        console.log(ByName);
        let columns = Object.keys(col[0]);
        let sorting = true;
        let header = thead.append("tr")
                          .selectAll("th")
                          .data(columns)
                          .enter()
                          .append("th")
                          .text(function(columns) { return columns;})
                          .on("click", function(d){
                            header.attr('class', 'header');
                            if(sorting) {
                                rows.sort(function(a, b){ return b[d] < a[d];});
                                sorting = false;
                                this.className = 'aes';
                            }  else {
                                rows.sort(function(a, b){ return b[d] > a[d];});
                                sorting = true;
                                this.className = 'des';
                              }

                          });

        let rows = tbody.selectAll("tr")
                        .data(ByName[0].values)
                        .enter()
                        .append("tr")
                        .on("mouseover", function(d){
                            d3.select(this).style("background-color", "steelblue");
                        })
                        .on("mouseout", function(d){
                            d3.select(this).style("background-color", "transparent")
                        .on("click", function(d) { tableRowClicked(d);})
                        });
        rows.selectAll("td")
            .data(function(d){
                return columns.map(function(k){
                    return { 'value': d[k], 'name': k}
                });
            })
            .enter()
            .append("td")
            .text(function(d){ return d.value;});
        let result = [];
        for (let i=0; i < tabledata.length; i++){
            result = tabledata.push(i);
        }
        console.log(result);
        let dropdown = d3.select("#drop")
                         .append("select")
                         .selectAll("option")
                         .data(ByName)
                         .enter()
                         .append("option")
                         .attr("value", function(d) {
                            return d.key;
                         })
                         .text(function(d){
                            return d.key;
                         });


//        console.log(ByName[0].values);
//        console.log(ByName[1].values);
//        console.log(ByName[2].values);
//        console.log(ByName[3].values);
//        console.log(ByName[4].values);
//        console.log(ByName[5].values);
//        console.log(ByName[6].values);
//        console.log(ByName[7].values);
//        console.log(ByName[8].values);
//        console.log(ByName[9].values);
//        console.log(ByName[10].values);
//        console.log(ByName[11].values);


        });


    }


}
