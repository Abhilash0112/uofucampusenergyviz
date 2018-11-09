/*class MapChart {

    constructor() {

    }

    update() {
        d3.csv("/data/CSV_FULL_SITE_LIST.csv").then(mapdata =>{
//        console.log(mapdata);
        let bound = new google.maps.LatLngBounds();
        for (let m in mapdata){
//            if(mapdata[])
            let long = +mapdata[m].Longitude;
            let lat = +mapdata[m].Latitude;
            console.log(lat,long);
            bound.extend(new google.maps.LatLng(lat, long));
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
                    d = new google.maps.LatLng(+d.Longitude, +d.Latitude);
                    d = projection.fromLatLngToDivPixel(d);
//                    console.log(d);
                    return d3.select(this)
                             .style("left", (d.x - padding) + "px")
                             .style("top", (d.y - padding) + "px");
                }
                marker.append("circle")
                      .attr("r", 4)
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
}*/