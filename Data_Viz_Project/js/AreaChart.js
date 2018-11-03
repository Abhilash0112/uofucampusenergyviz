class AreaChart {

    constructor() {
        //TODO: Create SVG Bounds
        this.rawToDate = d3.timeParse("t:%Y-%m-%dT%H:%M:%S%Z Denver");
        this.dateToTime = d3.timeFormat("%B %d, %Y, %I:%M %p");
    }

    update() {
        //The below is a fixed example for now.
        //Must eventually add a param to update() containing the building(s) to render in the stacked area chart.
        d3.json("data/JSON_Files/BROWNING_BLDG.JSON").then(bldgData => {
            console.log(bldgData);
            console.log(bldgData["cols"][1]["unit"]);
            let unit = bldgData["cols"][1]["unit"];

            let modifier = 0;
            if (unit === "kBTU") {
                modifier = 3.412
            }
            else if (unit === "BTU") {
                modifier = 3.412 / 1000;
            }
            else if (unit === "Wh") {
                modifier = 1000;
            }

            let that = this;

            let dataArr = bldgData["rows"].map(function (d) {
                let dataTime = d["ts"];
                dataTime = dataTime.replace("-06:00 Denver", "");
                dataTime = dataTime.replace("t:", "");
                let tempDate = new Date(dataTime);
                
                let time = that.dateToTime(tempDate);
                return time;
            });

            console.log(dataArr);
        });
    }
}