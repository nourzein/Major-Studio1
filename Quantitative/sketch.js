//define width, height, margins
const margin = { top: 100, right: 50, bottom: 100, left: 100 };
const width = window.innerWidth * 0.8;
const height = window.innerHeight * 0.8;

//load data
d3.csv("final.csv", d => {
  return {
    date: +d["DATE OF ACQUISITION"], //define variables for javascript
    country: d["Country"]
  };
  //.then run fucntion to make chart
}).then(data => makeChart(data));

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

  //   console.log(cleanData[0].values[0].key);

  // create for loop to get the minimum year
  let min = 2019;
  for (country in cleanData) {
    for (value in cleanData[country]["values"]) {
      if (cleanData[country]["values"][value].key < min) {
        min = cleanData[country]["values"][value].key;
      }
    }
  }

  //create SVG variable, append svg and g
  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //x axis scale, use min here
  const xScale = d3
    .scaleLinear()
    .domain([min, 2019])
    .range([0, width]);

  //Y axis scale, use exponential logs here
  const yScale = d3
    .scalePow()
    .exponent(0.3)
    .domain([1, 2200])
    .range([height, 0]);

  //append x axis- format to remove commas
  svg
    .append("g")
    .attr("class", "xaxis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale).tickFormat(d3.format("0")));

  // append y axis
  svg
    .append("g")
    .attr("class", "yaxis")
    .call(d3.axisLeft(yScale));

  // text label for the x axis
  svg
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top - 50) + ")"
    )
    .style("text-anchor", "middle")
    .attr("font-family", "arial")
    .text("Year");

  //text label for the y axis
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 15)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .attr("font-family", "arial")
    .style("text-anchor", "middle")
    .text("Number of Artworks");

  const line = d3
    .line()
    .defined(d => !isNaN(d.value.count) && !isNaN(d.key)) //remove any not number
    .x(d => xScale(d.key))
    .y(d => yScale(d.value.count));

  const classMatch = cleanData.map(el => el.key); // assign variable for country name

  //for.Each loop to assign color to each cleanData country
  cleanData.forEach((data, i) => {
    svg
      .append("path")
      .datum(data.values)
      .attr("class", () => {
        return classMatch[i]; // uses the array of country names
      })
      .classed("country-path", true)
      .attr("d", line);
  });
}
