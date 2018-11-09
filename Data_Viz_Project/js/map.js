class MapChart {

    constructor() {

    }

    update() {
        d3.csv("/data/Campus_Locations.csv").then(mapdata =>{
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
                                  .attr("class", "marker");
                function transform(d) {
                    d = new google.maps.LatLng(+d.LAT, +d.LONG);
                    d = projection.fromLatLngToDivPixel(d);
                    console.log(d);
                    return d3.select(this)
                             .style("left", (d.x - padding) + "px")
                             .style("top", (d.y - padding) + "px");
                }
                marker.append("circle")
                      .attr("r", 6)
                      .attr("cx", padding + 5)
                      .attr("cy", padding + 5);

                marker.append("text")
                      .attr("x", padding + 7)
                      .attr("y", padding)
                      .attr("dy", ".31em")
                      .text(function(d){ return d.key;});
            }
        }
        overlay.setMap(map);
        });

    }
}