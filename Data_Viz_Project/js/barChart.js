class BarChart {

    constructor() {

    }

    update() {
        d3.csv("/data/CSV_FULL_SITE_LIST.csv").then(bardata =>{
        console.log(bardata);

        let data = bardata.filter(function(d) { return d.tz == 'Denver';});
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
        let col = bardata.map(function(d){ return { Category: d.mgntGroup, Area: d.area, PrimaryUsage: d.primaryFunction, Type: d.dis};});;
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
                        .data(col)
                        .enter()
                        .append("tr")
                        .on("mouseover", function(d){
                            d3.select(this).style("background-color", "steelblue");
                        })
                        .on("mouseout", function(d){
                            d3.select(this).style("background-color", "transparent")
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
        });


    }


}