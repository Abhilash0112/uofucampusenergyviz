class MapChart {

    constructor() {

    }

    update() {
        d3.csv("data/Final_Static_DataSet/CSV_FULL_SITE_LIST.csv").then(mapdata =>{
        //console.log(mapdata);
        let bound = new google.maps.LatLngBounds();
        for (let m in mapdata){
            let long = +mapdata[m].Longitude;
            let lat = +mapdata[m].Latitude;
//            console.log(lat);
            bound.extend(new google.maps.LatLng(lat, long));
//            console.log(long);
        }
        let width = 500;
        let height = 500;

        let map = new google.maps.Map(d3.select("#map").node(), {
        zoom: 10,
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
                                  .attr("width", width)
                                  .attr("height", height)
                                  .each(transform)
                                  .attr("class", "building");
                let tooltip = d3.select("body")
                                .append("div")
                                .attr("class", "tooltip")
                                .style("opacity", 0);
                let colors = ["#CD5C5C", "#DC143C", "#C71585", "#FF8C00", "#BDB76B", "#8A2BE2", "#98FB98", "#00008B", "#2F4F4F", "#808080", "#B8860B"];
                let colScale = d3.scaleOrdinal()
                                 .range(colors);
//                console.log(colScale);
//                let size = [];
//                for(let x in mapdata){
//                    size.push((mapdata[x]["area"]));
//                }
//                console.log(size);
                let col = mapdata.map(function(d){ return { Category: d.mgntGroup, Area: d.area, PrimaryUsage: d.primaryFunction, Type: d.dis};});;
//                console.log(col);
                let ByName = d3.nest().key(function(d){ return d.Category;}).entries(col);
//                console.log(ByName);
                colScale.domain(d3.extent(mapdata, function(d) { return d.mgntGroup;}));
                marker.append("circle")
                      .data(mapdata)
                      .attr("r", function(d) {
                      let val = parseInt(d.area);
                      //console.log(val);
                      return (Math.sqrt(val)/60)})
                      .attr("cx", padding)
                      .attr("cy", padding)
//                      .data(mapdata)
                      .style("fill", function(d) { return colScale(d.mgntGroup);})
                      .on("mouseover", function(d) {
                        tooltip.transition()
                               .duration(50)
                               .style("opacity", 100);
                        tooltip.html('BDLG : '+d.dis+ '<br>'+'Area of BDLG : '+d.area+'<br>'+'Category of BDLG : '+d.mgntGroup+'<br>'+'Address of BDLG : '+d.geoAddr)
                               .style("left", (d3.event.pageX + 60) + "px")
                               .style("top", (d3.event.pageY - 28) + "px")
//                               .style("class", "bubble");
                      })
                      .on("mouseout", function(d) {
                        tooltip.transition()
                        .duration(200)
                        .style("opacity", 0);
                      });

                function transform(d) {
                    d = new google.maps.LatLng(+d.Latitude, +d.Longitude);
                    d = projection.fromLatLngToDivPixel(d);
//                    console.log(d);
                    return d3.select(this)
                             .style("left", (d.x - padding) + "px")
                             .style("top", (d.y - padding) + "px")
//                             .style('fill', color(d.area) + "px");
                }


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
