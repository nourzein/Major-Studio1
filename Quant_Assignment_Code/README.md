# Quantitative Assignment: Graphing Islamic Art Aquisition over time

## Prototype Phase: 
My project focuses on the Islamic Art collect of the Met Museum. 
I was initially intrigued by the collection due to my cultural background, and then inspired by their article on the chronology of the Islamic World's empires and dynasties. 
I am interested in using a multi-line graph to show the amount of the artwork overtime by country, inclduing information of the type of artwork and era in which it comes from. 
The goal is to visualise information on the Islamic Art collection of the Met, and potentially cross reference it with important events in the countries during the aquisition. 
![islamic art line graph](https://github.com/nourzein/major-studio1/blob/master/islamic_art_line_graph.png)

## Execution Phase:
For this project, I was very set on using d3.js to graph my line. This is because d3 is so widely used in the data viz realm and some of my favourite graphs were done with it. I have never done anything in d3 before and am a month in in using any kind of code so I knew it would be challeging.

Step 1: Explore the MET CSV and Organize the data
This step was time consuming but straightforward. I broke down the MET CSV islamic art department into individual spreadsheets based on country. I then counted the country totals and worked with the top 5 because they were significantly larger than the rest. 
![country count csv](https://github.com/nourzein/Major-Studio1/blob/master/Quant_Assignment/country_count.png)

I then broke down the credit line variable to get the time of aquisition using the "Right, 4" fucntion in excel to get the last 4 digits in the cell. 
So now I have a csv with all my countries with the date of aquisition (see final.csv). I put that into d3!

Step 2: Upload data into d3 and plot it
The sketch file contains my code... but some things to highlight:

When uploading data into d3, you have to have variables written in a way js can understand

    d3.csv("final.csv", d => {
      return {
        date: +d["DATE OF ACQUISITION"], //define variables for javascript
        country: d["Country"]
      };

When wanting to run the graph function, put it in a promise so js gets the data THEN plots it

    //.then run fucntion to make chart
    }).then(data => makeChart(data));

Aggregate the data so you have year with all the artwork done there for each country (note: looking for a less confusing way to nest them though)

    //create function to make chart
    function makeChart(data) {
      const cleanData = d3
        .nest() //nest data to get count
        .key(d => d.country)
        .key(d => d.date)
        .rollup(v => {
          return { count: d3.count(v, d => d.date) };
        })
        .entries(data);
 The rest of the code contains marks for how it was done! 
 
 Step 3: Style with HTML and CSS !
 
 Final Product: 
 
 ![final line graph](https://github.com/nourzein/Major-Studio1/blob/master/Quant_Assignment/final_quant_project.png)
 
 
  


