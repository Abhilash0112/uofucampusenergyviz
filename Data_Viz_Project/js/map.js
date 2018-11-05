class MapChart {

    constructor() {

    }

    update() {
        d3.csv("/data/Campus_Locations.csv").then(mapdata =>{
        console.log(mapdata);
        let bound = new google.maps.LatLngBounds();
        for (let m in mapdata){
            let long = +mapdata[m].LANG;
            let lat = +mapdata[m].LAT;
            bound.extend(new google.maps.LatLng(lat, long));
        }
        d3.selectAll("#map");
        let map = new google.maps.Map(d3.select("#map").node(), {
            zoom: 1,
            center: new google.maps.LatLng(40.764938, -111.842102),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        });

        map.fitBounds(bound);
        let overlay = new google.maps.OverlayView();
        overlay.onAdd = function() {
            let layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
                          .attr("class", "effective");
            overlay.draw = function() {
                let projection = this.getProjection(), padding = 10;
                let marker = layer.selectAll("svg")
                                  .data(mapdata)
                                  .each(transform)
                                  .enter().append("svg")
                                  .each(transform)
                                  .attr("class", "marker");
                function transform(d) {
                    d = new google.maps.LatLng(+d.latitude, +d.longitude);
                    d = projection.fromLatLngToDivPixel(d);
                    return d3.select(this)
                             .style("left", (d.x - padding) + "px")
                             .style("top", (d.y - padding) + "px");
                }
                marker.append("circle")
                      .attr("r", 15)
                      .attr("cx", padding + 5)
                      .attr("cy", padding + 5)
                      .attr("class", "marker");
            }
        }
        overlay.setMap(map);
        });
    }
}