const width = window.innerWidth;
const height = window.innerHeight;
let hue;
let sat;
let lightness;

var size, size_inner, circleSize;
if (width < 850) {
  size = width * 0.9;
  size_inner = width * 0.9 - 30;
  circleSize = 1;
} else {
  size = height * 0.9;
  size_inner = height * 0.9 - 30;
  circleSize = 1.5;
}
const bands = 1;
const band_width = (size - size_inner) / bands;
const min_opacity = 0.1;
const opacity_step = (1 - min_opacity) / bands;
const count = 12;
const colors = d3.range(count).map((d, i) => d3.interpolateRainbow(i / count));

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
var sizeB = (size - band_width) / 2;
var biggest = ((size - band_width) / 2) * 0.75;
var secondB = ((size - band_width) / 2) * 0.5;
var small = ((size - band_width) / 2) * 0.25;
console.log(size, biggest);

//circle coordinates
function getCircleX(radians, radius) {
  return Math.cos((radians * Math.PI) / 180) * radius;
}
function getCircleY(radians, radius) {
  return Math.sin((radians * Math.PI) / 180) * radius;
}
function getRadius(r) {
  return (r * sizeB) / 100;
}

var dataset = [
  [sizeB, 0, 0, "white"],
  [biggest, 0, 0.5, "white"],
  [secondB, 0, 0.5, "white"],
  [small, 0, 0.3, "white"]
];

const svg = d3
  .select(".mySVG")
  .append("svg")
  // .attr("viewBox", [0, 0, width, height])
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

//Create the wheelCopy (code credit: https://www.essycode.com/posts/create-color-wheel-javascript-d3/)
for (let k = 0; k < bands; k++) {
  const arc = d3
    .arc()
    .outerRadius((size - k * band_width) / 2)
    .innerRadius((size - (k + 1) * band_width) / 2)
    .startAngle(0)
    .endAngle((2 * Math.PI) / count);

  svg
    .append("g")
    .attr("class", "band")
    .selectAll("path")
    .data(colors)
    .enter()
    .append("path")
    .attr("fill", d => {
      const c = d3.color(d);
      c.opacity = 1 - opacity_step * k;
      return c + "";
    })
    .attr("stroke", "black")
    .attr("stroke-width", 0.3)
    .attr("transform", (d, i) => "rotate(" + i * (360 / count) + ")")
    .attr("d", arc());
}

//end of color wheel

//lightness circles
var circle = svg
  .selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")

  .attr("r", d => d[0])
  .attr("cx", d => d[1])
  .attr("cy", d => d[1])
  .style("fill", "none")
  .style("stroke", d => d[3])
  .style("stroke-width", d => d[2]);

var dataset2 = [
  [("100% Lightness", 0, 0)],
  ["75%", 0, -305],
  ["50%", 0, -205],
  ["25%", 0, -105]
];

//curved path
svg
  .append("path")
  .attr("id", "wavy") //Unique id of the path
  .attr("d", "M -405, 2 A 100, 100 0 0,1 405, 2")
  //.attr("d", "M -390, -17 A 100, 100 0 0,1 405, -17") //SVG path
  .style("fill", "none");

//Create an SVG text element and append a textPath element
svg
  .append("text")
  .append("textPath") //append a textPath to the text element
  .attr("xlink:href", "#wavy") //place the ID of the path here
  .style("text-anchor", "middle") //place the text halfway on the arc
  .attr("startOffset", "50%")
  .attr("font-family", "Cormorant Garamond")
  .attr("font-size", "13px")
  .attr("fill", "white")
  .text("100% Lightness");

//circles text for lightness 70-25
svg
  .selectAll("text")
  .data(dataset2)
  .enter()
  .append("text")
  .text(d => d[0])
  .attr("x", d => d[1])
  .attr("y", d => d[2])
  .attr("font-family", "Cormorant Garamond")
  .attr("font-size", "12px")
  .attr("fill", "white")
  .attr("text-anchor", "middle");

var div = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

let updatedSortedData = [];
const counts = {};
d3.json("finalImages_euro.json").then(data => {
  // data.forEach((d, i) => (d.id = i));

  let sortedData2 = data.sort(byDate);

  function updateCounts(key) {
    if (counts[key] === undefined) counts[key] = 0;
    counts[key]++;
  }
  sortedData2.forEach(object => {
    //console.log(object.date);
    if (object.date < 1381 && object.date >= 1200) {
      object.group = "Medieval-Gothic";
      updateCounts(object.group);
      updatedSortedData.push(object);
      //console.log(object);
    } else if (object.date >= 1381 && object.date < 1510) {
      object.group = "Italian-Renaissance";
      updateCounts(object.group);
      updatedSortedData.push(object);
    } else if (object.date >= 1510 && object.date < 1550) {
      object.group = "Northern-Renaissance";
      updateCounts(object.group);
      updatedSortedData.push(object);
    } else if (object.date >= 1550 && object.date < 1580) {
      object.group = "Mannerism";
      updateCounts(object.group);
      updatedSortedData.push(object);
    } else if (object.date >= 1580 && object.date < 1705) {
      object.group = "Baroque";
      updateCounts(object.group);
      updatedSortedData.push(object);
    } else if (object.date >= 1705 && object.date < 1750) {
      object.group = "Rococo";
      updateCounts(object.group);
      updatedSortedData.push(object);
    } else if (object.date >= 1750 && object.date < 1805) {
      object.group = "Neoclassicism";
      updateCounts(object.group);
      updatedSortedData.push(object);
    } else if (object.date >= 1805 && object.date < 1853) {
      object.group = "Romanticism";
      updateCounts(object.group);
      updatedSortedData.push(object);
    } else if (object.date >= 1853 && object.date < 1899) {
      object.group = "Realism";
      updateCounts(object.group);
      updatedSortedData.push(object);
    } else {
      object.group = "Modernism";
      updateCounts(object.group);
      updatedSortedData.push(object);
    }
  });
  //console.log(updatedSortedData);
  buildChart(updatedSortedData);
});

function buildChart(data) {
  var circles2 = svg
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("a")
    .attr("xlink:href", function(d) {
      return d.image;
    })
    .attr("target", "_blank")
    .append("circle")
    .attr("class", d => {
      return `${d.group} bubble`;
    })
    .attr("cx", (d, i) => {
      return getCircleX(
        colorConverter(d.color[0], d.color[1], d.color[2])[0],
        getRadius(colorConverter(d.color[0], d.color[1], d.color[2])[2]) + 1
      );
    })
    .attr("cy", (d, i) => {
      // console.log(colorConverter(d.color[0], d.color[1], d.color[2])[0]);
      return getCircleY(
        colorConverter(d.color[0], d.color[1], d.color[2])[0],
        getRadius(colorConverter(d.color[0], d.color[1], d.color[2])[2]) + 1
      );
    })
    .attr("fill", d => {
      return d3.rgb(d.color[0], d.color[1], d.color[2]);
    });

  circles2
    .on("mouseover", function(d, i) {
      //console.log("mouseover on", this);
      div
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px")
        .transition()
        .duration(200)
        .style("opacity", 1)
        // .attr("width", 5)
        .attr("stroke", "white");

      div.html(
        `<b>Title:</b> ${d.title}<br/><br/><b>Country:</b> ${d.nationality}<br/><br/><b>Movement:</b> ${d.group}<br/><br/><b>Date:</b> ${d.date} <br/><br/> <img src="${d.image}" width="100%"/>`
      );
    })
    .on("mouseout", function(d, i) {
      //console.log("mouseout", this);
      div
        .transition()
        .duration(200)
        .style("opacity", 0);
      // .attr("width", 2.5)
      // .attr("stroke", "none")
    });

  // change the opacity and size of selected and unselected circles

  function update() {
    var total = 0;
    //console.log(counts);
    // For each check box:
    d3.selectAll(".checkbox").each(function(d) {
      checkedBox = d3.select(this);
      group = checkedBox.property("value");
      //console.log(grp);
      // if checked, show
      if (checkedBox.property("checked")) {
        //console.log(group);
        total += counts[group];
        svg
          .selectAll(`.${group}`)
          .transition()
          .duration(200)
          .style("opacity", 1)
          .transition()
          .delay(function(d, i) {
            return i * 3;
          })
          .duration(1000)
          .attr(
            "r",
            // "10"
            d => {
              return (
                Math.sqrt(
                  colorConverter(d.color[0], d.color[1], d.color[2])[1]
                ) * circleSize
              );
            }
          );

        // else, hide
      } else {
        //console.log("test2");
        svg
          .selectAll("." + group)
          .transition()
          .duration(800)
          .style("opacity", 0)
          .attr("r", 0);
      }
      $("#count")
        .text(total)
        .css("color", "red");
      setTimeout(() => $("#count").css("color", "white"), 1000);
    });
  }

  // run update when button clicks "change"
  d3.selectAll(".checkbox").on("change", update);
  // initialize it
  update();
}
