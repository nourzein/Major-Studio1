let jsonData;
const width = window.innerWidth * 0.999;
const height = window.innerHeight;
let closeness = 25;
const greyness = $("#greyness");
let tooltipOpacity = 1;
//greyness.value = closeness;
greyness.on("change", e => {
  console.log(e.target.value);
  closeness = +e.target.value;
  $("svg").remove();
  const sortedData = jsonData.sort(byDate);
  buildChart(sortedData);
});

// greyness.hover(
//   enter => {
//     $("div.tooltip").css("opacity", 0);
//     tooltipOpacity = 0;
//   },
//   leave => {
//     $("div.tooltip").css("opacity", 1);
//     tooltipOpacity = 1;
//   }
// );

function byDate(a, b) {
  return a.date - b.date;
}
function byDecendingDate(a, b) {
  return b.date - a.date;
}

d3.json("finalImages_euro.json").then(data => {
  data.forEach((d, i) => (d.id = i));
  jsonData = data;
  //   console.log(data);
  const sortedData = data.sort(byDate);
  buildChart(sortedData);
});

//.then run fucntion to make chart
//   }).then(data => makeChart(data)
//   );

//ctl+shift+alt- highlights what you want

//push variables into array
// let count = 5;
// for (let i = 0; i < jsonRectangles.length; i++) {
//   jsonRectangles[i]["newwidth"] = 5;
//   jsonRectangles[i]["newheight"] = "height";
//   jsonRectangles[i]["newY_axis"] = "5";
//   jsonRectangles[i]["r_axis"] = count;
//   count += 5;
// }

// console.log(jsonRectangles);
var div = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

function excludeGrey(p) {
  let [r, g, b] = p.color;
  if (
    closeNumbers(r, g, closeness) &&
    closeNumbers(g, b, closeness) &&
    closeNumbers(r, b, closeness)
  ) {
    return false;
  }
  return true;
}
function closeNumbers(a, b, close) {
  return Math.abs(b - a) <= close;
}

function buildChart(data) {
  data = data.filter(excludeGrey);
  $("#count").text(data.length);
  //console.log(data);
  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  //note: for finalImages, add y_axis, add width, add height then in attributes, add click option)

  //Draw rectangles
  const xScale = d3
    .scaleBand()
    .domain([...data.map(x => x.id)])
    // .domain([...num])
    .range([0, width]);
  // .padding();

  var rectangles = svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("a")
    .attr("xlink:href", function(d) {
      return d.image;
    })
    .attr("target", "_blank")
    .append("rect")
    .attr("x", (d, i) => {
      return xScale(d.id);
    })
    .attr("width", () => xScale.bandwidth())
    .attr("height", height)
    .attr("y", 0)
    .attr("data-date", d => d.date)
    .attr("fill", d => {
      //   return d.date === 1886 ? "red" : "white";
      return d3.rgb(d.color[0], d.color[1], d.color[2]);
      //d3 'fill' does not read rgb automatically
      //d.color ? d3.rgb(d.color[0], d.color[1], d.color[2]) : "black";
    })
    .on("mousemove", function(d, i) {
      // console.log("mouseover on", this);
      div
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px")
        .transition()
        .duration(1000)
        .style("opacity", tooltipOpacity);
      // .attr("width", 5)
      // .attr("stroke", "black");

      div.html(
        `<b>Title:</b> ${d.title}<br/><br/><b>Country:</b> ${d.nationality}<br/><br/><b>Date:</b> ${d.date} cm<br/><br/> <img src="${d.image}" width="100%"/>`
      );
    })
    .on("mouseout", function(d, i) {
      // console.log("mouseout", this);
      div
        .transition()
        .duration(1000)
        .style("opacity", 0);
      // .attr("width", 2.5)
      // .attr("stroke", "none")
    });
}

//   update(d3.select("#sortbox").property("value"), 0);

//   function update(year, speed) {
//     var dataDecending = data.sort(byDecendingDate);
//     xScale.domain(data.map(d => d.id));

//     svg.selectAll(".rectangles").data(data, d => d.date);

//     rectangles.exit().remove();

//     rectangles
//       .enter()
//       .append("rect")
//       .attr("x", (d, i) => {
//         return xScale(d.id);
//       })
//       .attr("width", () => xScale.bandwidth())
//       .attr("height", height)
//       .attr("y", 0)
//       .attr("data-date", d => d.date)
//       .attr("fill", d => {
//         return d3.rgb(d.color[0], d.color[1], d.color[2]);
//       })
//       .merge(bar)
//       .transition()
//       .duration(speed)
//       .attr("x", d => x(d.month))
//       .attr("y", d => y(d.value))
//       .attr("height", d => y(0) - y(d.value));
//   }

//   chart.update = update;
// }

// var checkbox = d3
//   .select("#sortbox")
//   .style("margin-left", "45%")
//   .on("change", function() {
//     chart.update(select.property("value"), 750);
//   });

// function handleCheckboxChange() {
//   // First we find every checkbox and store them in separate variables
//   var dateSort = document.querySelector(".date");
//   var marketsCheckbox = document.querySelector(".markets-checkbox");
//   var pantriesCheckbox = document.querySelector(".pantries-checkbox");
//   var povertyCheckbox = document.querySelector(".poverty-checkbox"); }

//

// var rectangleAttributes = rectangles
//   .attr("x", function(d) {
//     return d.x_axis;
//   })
//   .attr("y", function(d) {
//     return d.y_axis;
//   })
//   .attr("height", function(d) {
//     return d.height;
//   })
//   .attr("width", function(d) {
//     return d.width;
//   })
//   .style("fill", function(d) {
//     return d.color;
//   });

// fisheye code
// xAlign = "xMid"
// ArtSlices = ƒ(rectangles, align)
// xFisheye = fisheye.scale(d3.scaleIdentity).domain([0, width]).focus(0)
// fisheye = Object {
//     scale: ƒ(scaleType)
//     circular: ƒ()
// rebind = ƒ(target, source)
// d3_rebind = ƒ(target, source, method)
