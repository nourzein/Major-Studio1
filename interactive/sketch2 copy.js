//var dataset;
// let jsonData;
// let closeness = 25;
const width = window.innerWidth * 0.98;
const height = window.innerHeight * 0.99;
let hue;
let sat;
let lightness;

const size = 820;
const size_inner = 800;
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

//just to check if function worked
//color = [43, 43, 43];
//newColor = colorConverter(color[0], color[1], color[2])[0];
// console.log(
//   getCircleX(
//     colorConverter(color[0], color[1], color[2])[0],
//     colorConverter(color[0], color[1], color[2])[1]
//   )
// );
// console.log(
//   Math.cos((colorConverter(color[0], color[1], color[2])[0] * Math.PI) / 180)
// );

// let q= 1.0
// function

function getCircleX(radians, radius) {
  return Math.cos((radians * Math.PI) / 180) * radius;
}
function getCircleY(radians, radius) {
  return Math.sin((radians * Math.PI) / 180) * radius;
}
function getRadius(r) {
  return r * 4;
}

// function excludeGrey(p) {
//   let [r, g, b] = p.color;
//   if (
//     closeNumbers(r, g, closeness) &&
//     closeNumbers(g, b, closeness) &&
//     closeNumbers(r, b, closeness)
//   ) {
//     return false;
//   }
//   return true;
// }
// function closeNumbers(a, b, close) {
//   return Math.abs(b - a) <= close;
// }

var dataset = [
  [400, 0, 0.5, "white"],
  [300, 0, 0.5, "white"],
  [200, 0, 0.5, "white"],
  [100, 0, 0.3, "white"]
];
const svg = d3
  .select("body")
  .append("svg")
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
    //.attr("stroke", "#fff")
    .attr("stroke-width", 0.5)
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
  //     .text(d => {
  //       return colorConverter(d.color[0], d.color[1], d.color[2])[0];
  //     })
  // .transition()
  // .delay(function(d, i) {
  //   return i * 3;
  // })
  // .duration(2000)
  .attr("r", d => d[0])
  .attr("cx", d => d[1])
  .attr("cy", d => d[1])
  .style("fill", "none")
  .style("stroke", "white")
  .style("stroke-width", d => d[2]);

// var dataset2 = [
//   //[("100% Lightness", -315, -305)],
//   ["75%", -215, -230],
//   ["50%", -140, -160],
//   ["25%", -75, -85]
// ];
var dataset2 = [
  [("100% Lightness", 0, 0)],
  ["75%", 0, -305],
  ["50%", 0, -205],
  ["25%", 0, -105]
];
//"M -405, -7 A 100, 100 0 0,1 405, -7"

//curved path
svg
  .append("path")
  .attr("id", "wavy") //Unique id of the path
  .attr("d", "M -405, 5 A 100, 100 0 0,1 405, 5")
  //.attr("d", "M -390, -17 A 100, 100 0 0,1 405, -17") //SVG path
  .style("fill", "none");
//.style("stroke", );
// svg
//   .selectAll("path")
//   .transition()
//   .duration(2000)
//   .delay(2000)
//   .attr("d", "M75,300 A125,125 0 0,1 325,300");

//Create an SVG text element and append a textPath element
svg
  .append("text")
  .append("textPath") //append a textPath to the text element
  .attr("xlink:href", "#wavy") //place the ID of the path here
  .style("text-anchor", "middle") //place the text halfway on the arc
  .attr("startOffset", "50%")
  .attr("font-family", "sans-serif")
  .attr("font-size", "12px")
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
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "white")
  .attr("text-anchor", "middle");

// svg
//   .append("path")
//   .attr("id", "curly") //Unique id of the path
//   .attr("d", "M  -150, 0 A 450, 400 0 0,1  120, -650")

//   .style("fill", "none")
//   .style("stroke", "blue");
// svg
//   .selectAll("path")
//   .transition()
//   .duration(2000)
//   .delay(2000)
//   .attr("d", "M75,300 A125,125 0 0,1 325,300");
//Create an SVG text element and append a textPath element
// svg
//   .append("text")
//   .append("textPath") //append a textPath to the text element
//   .attr("xlink:href", "#curly") //place the ID of the path here
//   .style("text-anchor", "start") //place the text halfway on the arc
//   .attr("startOffset", "50%")
//   //.attr("transform", "rotate(-90 * Math.PI/180)")
//   .attr("font-family", "sans-serif")
//   .attr("font-size", "11px")
//   .attr("fill", "white")
//   .text("100% Lightness");

// svg
//   .append("text")
//   .text("Lightness 100%")
//   .attr("x", -315)
//   .attr("y", -305)
//   .attr("font-family", "sans-serif")
//   .attr("font-size", "11px")
//   .attr("fill", "white")
//   .attr("text-anchor", "middle");

// var circle2 = svg
//   .append("circle")
//   .attr("r", 300)
//   .attr("cx", 0)
//   .attr("cy", 0)
//   .style("fill", "none")
//   .style("stroke", "white")
//   .style("stroke-width", "0.5px");

// var circle3 = svg
//   .append("circle")
//   .attr("r", 200)
//   .attr("cx", 0)
//   .attr("cy", 0)
//   .style("fill", "none")
//   .style("stroke", "white")
//   .style("stroke-width", "0.5px");

// var circle4 = svg
//   .append("circle")
//   .attr("r", 100)
//   .attr("cx", 0)
//   .attr("cy", 0)
//   .style("fill", "none")
//   .style("stroke", "white")
//   .style("stroke-width", "0.5px");

var div = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

//load data
// d3.json("finalImages_euro.json").then(data => {
//   data.forEach((d, i) => (d.id = i));
//   // dataset = data;
//   // console.log(dataset);
//   const sortedData = data.sort(byDate);
//   buildChart(sortedData);
// });
d3.json("finalImages_euro.json").then(data => {
  // data.forEach((d, i) => (d.id = i));
  // jsonData = data.filter(excludeGrey);
  //$("#count").text(data.length);
  //

  //   jsonRectangles[i]["newwidth"] = 5;
  //   jsonRectangles[i]["newheight"] = "height";
  //   jsonRectangles[i]["newY_axis"] = "5";
  //   jsonRectangles[i]["r_axis"] = count;
  //   count += 5;
  // }
  let sortedData2 = data.sort(byDate);

  let updatedSortedData = [];

  sortedData2.forEach(object => {
    //console.log(object.date);
    if (object.date < 1381 && object.date >= 1200) {
      object.group = "Medieval-Gothic";
      updatedSortedData.push(object);
      //console.log(object);
    } else if (object.date >= 1381 && object.date < 1510) {
      object.group = "Italian-Renaissance";
      updatedSortedData.push(object);
    } else if (object.date >= 1510 && object.date < 1550) {
      object.group = "Northern-Renaissance";
      updatedSortedData.push(object);
    } else if (object.date >= 1550 && object.date < 1580) {
      object.group = "Mannerism";
      updatedSortedData.push(object);
    } else if (object.date >= 1580 && object.date < 1705) {
      object.group = "Baroque";
      updatedSortedData.push(object);
    } else if (object.date >= 1705 && object.date < 1750) {
      object.group = "Rococo";
      updatedSortedData.push(object);
    } else if (object.date >= 1750 && object.date < 1805) {
      object.group = "Neoclassicism";
      updatedSortedData.push(object);
    } else if (object.date >= 1805 && object.date < 1853) {
      object.group = "Romanticism";
      updatedSortedData.push(object);
    } else if (object.date >= 1853 && object.date < 1899) {
      object.group = "Realism";
      updatedSortedData.push(object);
    } else {
      object.group = "Modernism";
      updatedSortedData.push(object);
    }
  });
  console.log(updatedSortedData);

  // for (let i = 0; i < sortedData2.length; i++) {
  //   if (sortedData2[i].date < 1600 && sortedData2[i].date > 1400) {
  //     sortedData2[i]["Group"] = "Renaissance";
  //     console.log(sortedData2[i]);
  //     updatedSortedData2.push(sortedData[i]);
  //   } else {
  //     return;
  //   }
  // }
  //console.log(sortedData2);

  // const sortedData3 = sortedData2.reduce(
  //   (a, d) => {
  //     if (d.date < 1600 && d.date > 1400) {
  //       a[0].push(d);
  //     } else {
  //       a[1].push(d);
  //     }
  //     return a;
  //   },
  //   [[], []]
  // );
  // console.log(sortedData2);
  // buildChart2([...sortedData3[1], ...sortedData3[0]]);\
  //let sortedData3 = sortedData2.filter(d => d.date < 1600 && d.date > 1400);

  buildChart2(updatedSortedData);
});

// // build chart
// function buildChart(data) {
//   //Scales (areaScale= for inside the circle (maps the saturation of color) and along the circumferance of the circle (maps the hue))
//   //   var areaScale = d3.scale
//   //     .linear()
//   //     .domain(["0", "100"])
//   //     .range(["0", 300]);
//   // var xScale = d3.scale
//   //   .radial()
//   //   .domain(["0", "360"])
//   //   .range(["-1", "1"]);

//   var circles = svg
//     .selectAll("circle")
//     .data(data)
//     .enter()
//     .append("a")
//     .attr("xlink:href", function(d) {
//       return d.image;
//     })
//     .attr("target", "_blank")
//     .append("circle")
//     .attr("cx", d => {
//       return getCircleX(
//         colorConverter(d.color[0], d.color[1], d.color[2])[0],
//         getRadius(colorConverter(d.color[0], d.color[1], d.color[2])[1])
//       );
//     })
//     .attr("cy", d => {
//       return getCircleY(
//         colorConverter(d.color[0], d.color[1], d.color[2])[0],
//         getRadius(colorConverter(d.color[0], d.color[1], d.color[2])[1])
//       );
//     })
//     .attr("r", d => {
//       return colorConverter(d.color[0], d.color[1], d.color[2])[2] * 0.5;
//     })
//     .attr("fill", d => {
//       return d3.rgb(d.color[0], d.color[1], d.color[2]);
//     }) // color of cirle
//     .style("stroke", "white")
//     .style("stroke-width", "1px")

function buildChart2(data) {
  // const xScale = d3
  //   .scaleBand()
  //   .domain([-300, 300])
  //   .range([0, 2 * Math.PI]);

  // const yScale = d3
  //   .scaleRadial()
  //   .domain([-300, 300])
  //   .range([-200, 200]);

  // // Highlight the movement that is hovered
  // var highlight = function(d) {
  //   selected_paintings = d.date;

  //   d3.selectAll(".dot")
  //     .transition()
  //     .duration(200)
  //     .style("fill", "lightgrey")
  //     .attr("r", d => {
  //       return (
  //         Math.sqrt(colorConverter(d.color[0], d.color[1], d.color[2])[1]) * 1.7
  //       );
  //     });

  //   d3.selectAll("" + selected_paintings)
  //     .transition()
  //     .duration(200)
  //     .style("fill", d => {
  //       return d3.rgb(d.color[0], d.color[1], d.color[2]);
  //     })
  //     .attr("r", d => {
  //       return (
  //         Math.sqrt(colorConverter(d.color[0], d.color[1], d.color[2])[1]) * 1.7
  //       );
  //     });
  // };
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

    //.attr("class", d => {
    //   console.log(d.date);
    //   return d.date < 1600 && d.date > 1400 ? "highlight" : "dull";
    // })
    .attr("cx", (d, i) => {
      return getCircleX(
        colorConverter(d.color[0], d.color[1], d.color[2])[0],
        getRadius(colorConverter(d.color[0], d.color[1], d.color[2])[2]) + 5
      );
    })
    .attr("cy", (d, i) => {
      // console.log(colorConverter(d.color[0], d.color[1], d.color[2])[0]);
      return getCircleY(
        colorConverter(d.color[0], d.color[1], d.color[2])[0],
        getRadius(colorConverter(d.color[0], d.color[1], d.color[2])[2]) + 5
      );
    })
    .attr("fill", d => {
      return d3.rgb(d.color[0], d.color[1], d.color[2]);
    });

  // circles2
  //   .transition()
  //   .delay(function(d, i) {
  //     return d.movement;
  //   })
  //   .duration(10000)
  // .attr(
  //   "r",
  //   // "10"
  //   d => {
  //     return (
  //       Math.sqrt(colorConverter(d.color[0], d.color[1], d.color[2])[1]) * 1.7
  //     );
  //   }
  // );

  // color of cirle
  // .style("stroke", "white")
  // .style("stroke-width", "0.4px")
  //.style("opacity", 1)
  //.on("mouseover", highlight)

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

  //   svg
  //     .selectAll("text")
  //     .data(data)
  //     .enter()
  //     .append("text")
  //     .text(d => {
  //       return colorConverter(d.color[0], d.color[1], d.color[2])[0];
  //     })
  //     .attr("x", (d, i) => {
  //       return getCircleX(
  //         colorConverter(d.color[0], d.color[1], d.color[2])[0],
  //         getRadius(colorConverter(d.color[0], d.color[1], d.color[2])[1]) + 20
  //       );
  //     })
  //     .attr("y", d => {
  //       return getCircleY(
  //         colorConverter(d.color[0], d.color[1], d.color[2])[0],
  //         getRadius(colorConverter(d.color[0], d.color[1], d.color[2])[1]) + 20
  //       );
  //     })
  //     .attr("font-family", "sans-serif")
  //     .attr("font-size", "11px")
  //     .attr("fill", "white")
  //     .attr("text-anchor", "middle");

  // This function is gonna change the opacity and size of selected and unselected circles
  function update() {
    // For each check box:
    d3.selectAll(".checkbox").each(function(d) {
      cb = d3.select(this);
      grp = cb.property("value");
      //console.log(grp);
      // If the box is check, I show the group
      if (cb.property("checked")) {
        console.log("test1");
        svg
          .selectAll(`.${grp}`)
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
                ) * 1.7
              );
            }
          );

        // Otherwise I hide it
      } else {
        console.log("test2");
        svg
          .selectAll("." + grp)
          .transition()
          .duration(800)
          .style("opacity", 0)
          .attr("r", 0);
      }
    });
  }
  // When a button change, I run the update function
  d3.selectAll(".checkbox").on("change", update);
  // And I initialize it at the beginning
  update();
}
