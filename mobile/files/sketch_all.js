let jsonData;
let jsonData2;
let jsonData3;
const width = window.innerWidth * 1;
const height = window.innerHeight * 0.5;
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
  const sortedData2 = jsonData2.sort(byDate);
  buildChart(sortedData2);
  const sortedData3 = jsonData3.sort(byDate);
  buildChart(sortedData3);
});
//const border = 100;
//const bordercolor = #2b2f36;
function byDate(a, b) {
  return a.date - b.date;
}
// function byDecendingDate(a, b) {
//   return b.date - a.date;
// }
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

d3.json("finalImages_turkey.json").then(data => {
  data.forEach((d, i) => (d.id = i));
  jsonData = data;
  //   console.log(data);
  const sortedData = data.sort(byDate);
  buildChart(sortedData);
});

d3.json("finalImages_iran.json").then(data => {
  data.forEach((d, i) => (d.id = i));
  jsonData2 = data;
  //   console.log(data);
  const sortedData2 = data.sort(byDate);
  buildChart2(sortedData2);
});

d3.json("finalImages_india.json").then(data => {
  data.forEach((d, i) => (d.id = i));
  jsonData3 = data;
  //   console.log(data);
  const sortedData3 = data.sort(byDate);
  buildChart3(sortedData3);
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

function buildChart(data) {
  data = data.filter(excludeGrey);
  $("#count").text(data.length);
  console.log(data);
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
    // .attr("data-date", d => d.date)
    .attr("fill", d => {
      //   return d.date === 1886 ? "red" : "white";
      return d3.rgb(d.color[0], d.color[1], d.color[2]);
      //d3 'fill' does not read rgb automatically
      //d.color ? d3.rgb(d.color[0], d.color[1], d.color[2]) : "black";
    })

    //tooltip
    .on("mousemove", function(d, i) {
      console.log("mouseover on", this);
      div
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px")
        .transition()
        .duration(1000)
        .style("opacity", 0.85);
      // .attr("width", 5)
      // .attr("stroke", "black");

      div.html(
        `<b>Title:</b> ${d.title}<br/><br/><b>Culture:</b> ${d.culture}<br/><br/><b>Date:</b> ${d.date} <br/><br/> <b>Period:</b> ${d.period}<br/><br/><img src="${d.image}" width="100%"/>`
      );
    })
    .on("mouseout", function(d, i) {
      console.log("mouseout", this);
      div
        .transition()
        .duration(1000)
        .style("opacity", 0);
      // .attr("width", 2.5)
      // .attr("stroke", "none")
    });
}

//Iran
function buildChart2(data) {
  data = data.filter(excludeGrey);
  $("#count").text(data.length);
  console.log(data);
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
    //.attr("border", border)
    //.style("stroke", #2b2f36)
    .on("mousemove", function(d, i) {
      console.log("mouseover on", this);
      div
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px")
        .transition()
        .duration(1000)
        .style("opacity", 0.85);
      // .attr("width", 5)
      // .attr("stroke", "black");

      div.html(
        `<b>Title:</b> ${d.title}<br/><br/><b>Culture:</b> ${d.culture}<br/><br/><b>Date:</b> ${d.date} <br/><br/> <b>Period:</b> ${d.period}<br/><br/><img src="${d.image}" width="100%"/>`
      );
    })
    .on("mouseout", function(d, i) {
      console.log("mouseout", this);
      div
        .transition()
        .duration(1000)
        .style("opacity", 0);
      // .attr("width", 2.5)
      // .attr("stroke", "none")
    });
}

//India

function buildChart3(data) {
  data = data.filter(excludeGrey);
  $("#count").text(data.length);
  console.log(data);
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
    //.attr("border", border)
    //.style("stroke", #2b2f36)
    .on("mousemove", function(d, i) {
      console.log("mouseover on", this);
      div
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px")
        .transition()
        .duration(1000)
        .style("opacity", 0.85);
      // .attr("width", 5)
      // .attr("stroke", "black");

      div.html(
        `<b>Title:</b> ${d.title}<br/><br/><b>Culture:</b> ${d.culture}<br/><br/><b>Date:</b> ${d.date} <br/><br/> <b>Period:</b> ${d.period}<br/><br/><img src="${d.image}" width="100%"/>`
      );
    })
    .on("mouseout", function(d, i) {
      console.log("mouseout", this);
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
