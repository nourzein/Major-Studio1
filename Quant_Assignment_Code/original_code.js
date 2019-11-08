d3.csv("final.csv", d => {
  return {
    date: +d["DATE OF ACQUISITION"],
    country: d["Country"]
  };
}).then(data => makeChart(data));

function makeChart(data) {
  const cleanData = d3
    .nest()
    .key(d => d.country)
    .key(d => d.date)
    .rollup(v => {
      return { count: d3.count(v, d => d.date) };
    })
    .entries(data);

  //   console.log(cleanData[0].values[0].key);
  console.log(cleanData);

  const width = window.innerWidth * 0.9;
  const height = window.innerHeight * 0.9;
  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const xScale = d3
    .scaleLinear()
    .domain([1700, 2019])
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, 1000])
    .range([height, 0]);
  const line = d3
    .line()
    .x(d => xScale(d.key))
    .y(d => yScale(d.value.count));

  cleanData.forEach((data, i) => {
    svg
      .append("path")
      .datum(data.values)
      //   .classed("country-path", true)
      .attr("class", () => {
        return i === 0 ? "country-path India" : "country-path Egypt";
      })
      .attr("d", line);
  });
}
