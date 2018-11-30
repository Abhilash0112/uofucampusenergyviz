class Table {

    constructor() {

    }

    update() {
        d3.csv("data/Final_Static_DataSet/CSV_FULL_SITE_LIST.csv").then(tabledata =>{
//        console.log(tabledata);
//        console.log(data);
//        console.log(Object.keys(bardata[0]));
//        let columns = Object.keys(data[0]);

        let svg = d3.select("body").append("svg")
                    .attr("height", 1)
                    .attr("width", 1);

        var table = d3.select("#table-location")
                      .append("table")
                      .attr("class", "table table-condensed table-striped"),
                      thead = table.append("thead"),
                      tbody = table.append("tbody");
        table.exit().remove();
        var col = tabledata.map(function(d){ return { Category: d.mgntGroup, Area: d.area, PrimaryUsage: d.primaryFunction, Type: d.dis};});;

        let ByName = d3.nest().key(function(d){ return d.Category;}).entries(col);
        console.log(ByName);
        let data1 = [];
        for(let x in ByName){
            data1.push(ByName[x].values);
        }
//        console.log(data1);
        var columns = Object.keys(col[0]);
        let sorting = true;
        var header = thead.append("tr")
                          .selectAll("th")
                          .data(columns)
                          .enter()
                          .append("th")
                          .text(function(columns) { return columns;});

        var rows = tbody.selectAll("tr")
                        .data(data1[0])
                        .enter()
                        .append("tr")
                        .on("mouseover", function(d){
                            d3.select(this).style("background-color", "steelblue");
                        })
                        .on("mouseout", function(d){
                            d3.select(this).style("background-color", "transparent")

                        })
        rows.selectAll("td")
            .data(function(d){
                return columns.map(function(k){
                    return { 'value': d[k], 'name': k}
                });
            })
            .enter()
            .append("td")
            .text(function(d){ return d.value;});
        rows.exit().remove();
        let dropdown = d3.select("#drop")
                         .append("select")
                         .selectAll("option")
                         .data(ByName)
                         .enter()
                         .append("option")
                         .attr("value", function(d) {
                            return d.key;
                         })
//                         .attr("selected", function(d))
                         .text(function(d){
                            return d.key;
                         });
        d3.select("#drop")
          .on("change", function(){

            let selected = d3.select('select').property('value')
            console.log(selected);
//            let Ind = Math.round(Math.random() * ByName.length);
//            console.log(Ind);
            if(selected === "District 4 (Engineering)"){
                tbody.selectAll("td")
//                  .exit()
//                  .remove()
                  .data(ByName[1].values)
                  .selectAll("td")
//                  .enter()
                  .data(function(d){
                    return columns.map(function(k){
                        return { 'value': d[k], 'name': k}
                    });
                  })
//                  .enter()
                  .transition()
                    .duration(500)
                    .text(function(d){ return d.value;});
               rows.exit().remove();
//               tbody.transition();
            }
            else if(selected === "District 5 (Academic)"){
                tbody.selectAll("tr")
                  .data(ByName[0].values)
                  .selectAll("td")
//                  .enter()
                  .data(function(d){
                    return columns.map(function(k){
                        return { 'value': d[k], 'name': k}
                    });
                  })
//                  .enter()
                  .transition()
                    .duration(500)
                    .text(function(d){ return d.value;});
               rows.exit().remove();
            }
            else if(selected === "District 1 (Presidents Circle)"){
                tbody.selectAll("tr")
                  .data(ByName[2].values)
                  .selectAll("td")
//                  .enter()
                  .data(function(d){
                    return columns.map(function(k){
                        return { 'value': d[k], 'name': k}
                    });
                  })
//                  .enter()
                  .transition()
                    .duration(500)
                    .text(function(d){ return d.value;});
               rows.exit().remove();
            }
            else if(selected === "District 6 (Health Sciences)"){
                tbody.selectAll("tr")
                  .data(ByName[3].values)
                  .selectAll("td")
//                  .enter()
                  .data(function(d){
                    return columns.map(function(k){
                        return { 'value': d[k], 'name': k}
                    });
                  })
//                  .enter()
                  .transition()
                    .duration(500)
                    .text(function(d){ return d.value;});
               rows.exit().remove();
            }
            else if(selected === "Hospital"){
                tbody.selectAll("tr")
                  .data(ByName[4].values)
                  .selectAll("td")
//                  .enter()
                  .data(function(d){
                    return columns.map(function(k){
                        return { 'value': d[k], 'name': k}
                    });
                  })
//                  .enter()
                  .transition()
                    .duration(500)
                    .text(function(d){ return d.value;});
               rows.exit().remove();
            }
            else if(selected === "District 3 (Athletics/Auxiliary/Venue)"){
                tbody.selectAll("tr")
                  .data(ByName[5].values)
                  .selectAll("td")
//                  .enter()
                  .data(function(d){
                    return columns.map(function(k){
                        return { 'value': d[k], 'name': k}
                    });
                  })
//                  .enter()
                  .transition()
                    .duration(500)
                    .text(function(d){ return d.value;});
               rows.exit().remove();
            }
            else if(selected === "Housing HRE"){
                tbody.selectAll("tr")
                  .data(ByName[6].values)
                  .selectAll("td")
//                  .enter()
                  .data(function(d){
                    return columns.map(function(k){
                        return { 'value': d[k], 'name': k}
                    });
                  })
//                  .enter()
                  .transition()
                    .duration(500)
                    .text(function(d){ return d.value;});
               rows.exit().remove();
            }
            else if(selected === "District 2 (Sciences)"){
                tbody.selectAll("tr")
                  .data(ByName[7].values)
                  .selectAll("td")
//                  .enter()
                  .data(function(d){
                    return columns.map(function(k){
                        return { 'value': d[k], 'name': k}
                    });
                  })
//                  .enter()
                  .transition()
                    .duration(500)
                    .text(function(d){ return d.value;});
               rows.exit().remove();
            }
            else if(selected === "Plant"){
                tbody.selectAll("tr")
                  .data(ByName[8].values)
                  .selectAll("td")
//                  .enter()
                  .data(function(d){
                    return columns.map(function(k){
                        return { 'value': d[k], 'name': k}
                    });
                  })
//                  .enter()
                  .transition()
                    .duration(500)
                    .text(function(d){ return d.value;});
               rows.exit().remove();
            }
            else if(selected === "Others"){
                tbody.selectAll("tr")
                  .data(ByName[9].values)
                  .selectAll("td")
//                  .enter()
                  .data(function(d){
                    return columns.map(function(k){
                        return { 'value': d[k], 'name': k}
                    });
                  })
//                  .enter()
                  .transition()
                    .duration(500)
                    .text(function(d){ return d.value;});
               rows.exit().remove();
            }
            else if(selected === "Student Affairs"){
                tbody.selectAll("tr")
                  .data(ByName[10].values)
                  .selectAll("td")
//                  .enter()
                  .data(function(d){
                    return columns.map(function(k){
                        return { 'value': d[k], 'name': k}
                    });
                  })
//                  .enter()
                  .transition()
                    .duration(500)
                    .text(function(d){ return d.value;});
               rows.exit().remove();
            }
            else if(selected === "Parking"){
                tbody.selectAll("tr")
                  .data(ByName[11].values)
                  .selectAll("td")
//                  .enter()
                  .data(function(d){
                    return columns.map(function(k){
                        return { 'value': d[k], 'name': k}
                    });
                  })
//                  .enter()
                  .transition()
                    .duration(500)
                    .text(function(d){ return d.value;});
               rows.exit().remove();
            }

          })
        let colors = ["#CD5C5C", "#DC143C", "#C71585", "#FF8C00", "#BDB76B", "#8A2BE2", "#98FB98", "#00008B", "#2F4F4F", "#808080", "#B8860B"];
        let colScale = d3.scaleOrdinal()
                         .range(colors);
        colScale.domain(d3.extent(tabledata, function(d) { return d.mgntGroup;}));
        let legend = d3.select("#legend")
                               .selectAll("text")
                               .data(ByName, function(d) { return d.key});

                legend.enter().append("rect")
                      .attr("width", 10)
                      .attr("height", 10)
                      .attr("x", 0)
                      .attr("y", function(d, i){ return 0 + i*15;})
                      .attr("fill", function(d){ return colScale(d.key);})
                      .attr("class", function(d,i){ return "legendcheckbox " + d.key});
                /*d3.select(this).attr("fill", function(d){
                    if(d3.select(this).attr("fill") == "#ccc"){
                        return colScale(d.key);
                    }else {
                        return "#ccc";
                    }
                })*/
                legend.enter()
                      .append("text")
                      .attr("x", 20)
                      .attr("y", function(d, i){ return 10 +i*15;})
                      .attr("class", "legend")
                      .transition()
                      .style("fill", "#steelblue")
                      .text(function(d){ return d.key;});

                legend.exit().remove();

        });


    }


}
