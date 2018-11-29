class Table {

    constructor() {
<<<<<<< HEAD

=======
//        this.mapChart = mapChart;
//        this.barChart = barChart;
//        this.AreaChart = AreaChart;
>>>>>>> 748164a4525941a268c435913736209bc42a8561
    }

    update() {
        d3.csv("/data/CSV_FULL_SITE_LIST.csv").then(tabledata =>{
<<<<<<< HEAD
//        console.log(tabledata);
=======
        console.log(tabledata);
>>>>>>> 748164a4525941a268c435913736209bc42a8561

        let data = tabledata.filter(function(d) { return d.tz == 'Denver';});
//        console.log(data);
//        console.log(Object.keys(bardata[0]));
//        let columns = Object.keys(data[0]);

        let svg = d3.select("body").append("svg")
                    .attr("height", 1)
                    .attr("width", 1);

<<<<<<< HEAD
        var table = d3.select("#table-location")
=======
        let table = d3.select("#table-location")
>>>>>>> 748164a4525941a268c435913736209bc42a8561
                      .append("table")
                      .attr("class", "table table-condensed table-striped"),
                      thead = table.append("thead"),
                      tbody = table.append("tbody");
<<<<<<< HEAD
        var col = tabledata.map(function(d){ return { Category: d.mgntGroup, Area: d.area, PrimaryUsage: d.primaryFunction, Type: d.dis};});;

        let ByName = d3.nest().key(function(d){ return d.Category;}).entries(col);
        console.log(ByName);
        let data1 = [];
        let data2 = [];
        for(let x in ByName){
            data1.push(ByName[x].values);
        }
//        console.log(data1);
        for(let x in data1){
            data2.push(data1[x].values);
        }
        var columns = Object.keys(col[0]);
        let sorting = true;
        var header = thead.append("tr")
=======
        let col = tabledata.map(function(d){ return { Category: d.mgntGroup, Area: d.area, PrimaryUsage: d.primaryFunction, Type: d.dis};});;
        console.log(col);
        let ByName = d3.nest().key(function(d){ return d.Category;}).entries(col);
        console.log(ByName);
        let columns = Object.keys(col[0]);
        let sorting = true;
        let header = thead.append("tr")
>>>>>>> 748164a4525941a268c435913736209bc42a8561
                          .selectAll("th")
                          .data(columns)
                          .enter()
                          .append("th")
<<<<<<< HEAD
                          .text(function(columns) { return columns;});

        var rows = tbody.selectAll("tr")
                        .data(data1[0])
=======
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
>>>>>>> 748164a4525941a268c435913736209bc42a8561
                        .enter()
                        .append("tr")
                        .on("mouseover", function(d){
                            d3.select(this).style("background-color", "steelblue");
                        })
                        .on("mouseout", function(d){
                            d3.select(this).style("background-color", "transparent")
<<<<<<< HEAD

                        })
=======
                        .on("click", function(d) { tableRowClicked(d);})
                        });
>>>>>>> 748164a4525941a268c435913736209bc42a8561
        rows.selectAll("td")
            .data(function(d){
                return columns.map(function(k){
                    return { 'value': d[k], 'name': k}
                });
            })
            .enter()
            .append("td")
            .text(function(d){ return d.value;});
<<<<<<< HEAD
        rows.exit().remove();
=======
        let result = [];
        for (let i=0; i < tabledata.length; i++){
            result = tabledata.push(i);
        }
        console.log(result);
>>>>>>> 748164a4525941a268c435913736209bc42a8561
        let dropdown = d3.select("#drop")
                         .append("select")
                         .selectAll("option")
                         .data(ByName)
                         .enter()
                         .append("option")
                         .attr("value", function(d) {
                            return d.key;
                         })
<<<<<<< HEAD
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
                tbody.selectAll("tr")
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
            else if(selected === "District 3 (Athletics/Auxiliary/Venue)"){
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
            else if(selected === "Hospital"){
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
            else if(selected === ""){
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
=======
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

>>>>>>> 748164a4525941a268c435913736209bc42a8561

        });


    }


<<<<<<< HEAD
}
=======
}
>>>>>>> 748164a4525941a268c435913736209bc42a8561
