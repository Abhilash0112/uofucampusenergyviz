class AreaChart {

    constructor() {
        //TODO: Create SVG Bounds
        this.rawToDate = d3.timeParse("t:%Y-%m-%dT%H:%M:%S%Z Denver");
        this.dateToTime = d3.timeFormat("%B %d, %Y, %I:%M %p");
        this.modifier = 0;
    }

    update() {
        //The below is a fixed example for now.
        //Must eventually add a param to update() containing the building(s) to render in the stacked area chart.
        d3.json("data/JSON_Files/BROWNING_BLDG.JSON").then(bldgData => {
            console.log(bldgData);
            console.log(bldgData["cols"][1]["unit"]);
            let unit = bldgData["cols"][1]["unit"];

            if (unit === "kBTU") {
                this.modifier = 3.412
            }
            else if (unit === "BTU") {
                this.modifier = 3.412 / 1000;
            }
            else if (unit === "Wh") {
                this.modifier = 1000;
            }
            else if (unit === "kWh") {
                this.modifier = 1;
            }

            let that = this;

            let dataArr = bldgData["rows"].map(function (d) {
                let formatData = {};
                let dataTime = d["ts"];
                let dataEnergy = d["v0"];

                dataTime = dataTime.replace("-06:00 Denver", "");
                dataTime = dataTime.replace("t:", "");
                let tempDate = new Date(dataTime);

                dataEnergy = dataEnergy.replace("n:", "");
                dataEnergy = dataEnergy.replace(" kWh", "");
                dataEnergy = dataEnergy.replace(" BTU", "");
                dataEnergy = dataEnergy.replace(" kBTU", "");
                dataEnergy = dataEnergy.replace(" Wh", "");
                
                formatData.time = that.dateToTime(tempDate);
                formatData.kWh = parseFloat(dataEnergy) / that.modifier;
                return formatData;
            });

            console.log(dataArr);
        });
    }
}