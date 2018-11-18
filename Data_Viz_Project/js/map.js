class MapChart {

    constructor() {

    }

    update() {
        d3.csv("/data/CSV_FULL_SITE_LIST.csv").then(mapdata =>{
        console.log(mapdata);
        let bound = new google.maps.LatLngBounds();
        for (let m in mapdata){
            let long = +mapdata[m].LONG;
            let lat = +mapdata[m].LAT;
            bound.extend(new google.maps.LatLng(lat, long));
//            console.log(long);
        }
        let map = new google.maps.Map(d3.select("#map").node(), {
        zoom: 15,
        center: new google.maps.LatLng(40.764938, -111.842102),
        mapTypeId: google.maps.MapTypeId.TERRAIN
        });
        d3.selectAll("#map");
        map.fitBounds(bound);
        let overlay = new google.maps.OverlayView();
        overlay.onAdd = function() {
            let layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
                          .attr("class", "building");
            overlay.draw = function() {
                let projection = this.getProjection(), padding = 10;
                let marker = layer.selectAll("svg")
                                  .data(mapdata)
                                  .each(transform)
                                  .enter().append("svg")
                                  .each(transform)
                                  .attr("class", "building");
                let tooltip = d3.select("body")
                                .append("div")
                                .attr("class", "tooltip")
                                .style("opacity", 0);
                function transform(d) {
                    d = new google.maps.LatLng(+d.LAT, +d.LONG);
                    d = projection.fromLatLngToDivPixel(d);
//                    console.log(d);
                    return d3.select(this)
                             .style("left", (d.x - padding) + "px")
                             .style("top", (d.y - padding) + "px");
                }
                marker.append("circle")
                      .attr("r", 4)
                      .attr("cx", padding + 5)
                      .attr("cy", padding + 5)
                      .on("mouseover", function(d) {
                        tooltip.transition()
                               .duration(250)
                               .style("opacity", 100);
                        tooltip.html('BDLG : '+d.dis+ '<br>'+'Area of BDLG : '+d.area+'<br>'+'Category of BDLG : '+d.mgntGroup)
                               .style("left", (d3.event.pageX + 60) + "px")
                               .style("top", (d3.event.pageY - 28) + "px");
                      })
                      .on("mouseout", function(d) {
                        tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                      });

                /*marker.append("text")
                      .attr("x", padding + "px")
                      .attr("y", padding + "px")
                      .attr("dy", ".31em")
                      .text(function(d){ return d.dis,d.area,d.mgntGroup ;});*/
            }
        }
        overlay.setMap(map);
        });

    }
}