UofU Campus Energy Consumption
This project deals with the visualization of University of Utah Campus Energy Consumption for each building.

### Project Links
The [Project Website](https://abhilash0112.github.io/uofucampusenergyviz/Data_Viz_Project/) has the live visualization.

The [Process Book](https://github.com/Abhilash0112/uofucampusenergyviz/blob/master/Process_Book_(Final).pdf) has the details on the visualization and its interaction.

The [Screencast](https://youtu.be/_-6WcOU1UMQ) has a video demonstration of the visualization.

Data Processing
The data was obtained from the University of Utah's Skyspark system through queries to a Fanthom rest web API. The data was then aggregated using the source.py file and then combined into three CSV files. The initial goal of the project was to mimic the actual responses from the rest API, however there proved to be no way to link the JSON files together, therefore the static data set was created.

Visualization
We have three main forms of visualizations in order to represent the dataset and provide access to different comparisions between the datasets. You can explore more here https://abhilash0112.github.io/uofucampusenergyviz/Data_Viz_Project/. Please use Google Chrome to get the best experience.

The main form of visualization is a MAP with locations of various events highlighted. Interaction with the markers help in getting details of individual event as a tooltip.

The second visualization represents the timeline, encoding the number of events over the years. Interaction with this visualization effectively showcases the changes on to the MAP, indicating all such events in the selected year/years.

The third visualization helps with analysing the numeric data and also look at other details of each such events. We have a semantic zooming table, which indicates the main categories initially and displaying the interested details on interaction. This is also linked to a chart to compare the number of events for certain columns of data.
