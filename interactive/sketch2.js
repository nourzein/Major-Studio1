var dataset;
const width = window.innerWidth * 0.99;
const height = window.innerHeight * 0.99;
const barHeight = height / 2 - 40;
let hue;
let sat;
let lightness;

//sort by date function
function byDate(a, b) {
  return a.date - b.date;
}

//color converter function
function colorConverter(r, g, b) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;
  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;
  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  // Make negative hues positive behind 360°
  if (h < 0) h += 360;
  // Calculate lightness
  l = (cmax + cmin) / 2;
  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  hue = h;
  sat = s;
  lightness = l;
  return [h, s, l];
}

//just to check if function worked
//color = [43, 43, 43];
//newColor = colorConverter(color[0], color[1], color[2])[0];
//console.log();
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var circle = svg
  .append("circle")
  .attr("r", 400)
  .attr("cx", 0)
  .attr("cy", 0)
  .style("fill", "none")
  .style("stroke", "white")
  .style("stroke-width", "1.5px");

var circle2 = svg
  .append("circle")
  .attr("r", 200)
  .attr("cx", 0)
  .attr("cy", 0)
  .style("fill", "none")
  .style("stroke", "white")
  .style("stroke-width", "0.5px");

var circle3 = svg
  .append("circle")
  .attr("r", 300)
  .attr("cx", 0)
  .attr("cy", 0)
  .style("fill", "none")
  .style("stroke", "white")
  .style("stroke-width", "0.5px");

//load data
d3.json("finalImages_turkey.json").then(data => {
  data.forEach((d, i) => (d.id = i));
  dataset = data;
  console.log(dataset);
  const sortedData = data.sort(byDate);
  buildChart(sortedData);
});

// // build chart
function buildChart(data) {
  //Scales (areaScale= for inside the circle (maps the saturation of color) and along the circumferance of the circle (maps the hue))
  //   var areaScale = d3.scale
  //     .linear()
  //     .domain(["0", "100"])
  //     .range(["0", 300]);
  //   var xScale = d3.scale
  //     .radial()
  //     .domain(["0", "360"])
  //     .range(["0", 300]);

  var circles = svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("a")
    .attr("xlink:href", function(d) {
      return d.image;
    })
    .attr("target", "_blank")
    .append("circle")
    .attr("cx", 1)
    .attr("cy", 2)
    .attr("r", d => {
      return colorConverter(d.color[0], d.color[1], d.color[2])[2];
    })
    .attr("fill", d => {
      return d3.rgb(d.color[0], d.color[1], d.color[2]);
    }) // color of cirle
    .style("stroke", "white")
    .style("stroke-width", "1px");
}
