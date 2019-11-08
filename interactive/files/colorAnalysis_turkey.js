const fs = require("fs");
const { resolve } = require("path");
const ColorThief = require("colorthief");
const folder = "downloads_turkey";

//how to push attributes into imagesArray

//color analysis
// ColorThief.getColor("./downloads/ep59.140.R.jpg")
//   .then(color => {
//     console.log(color);
//   })
//   .catch(err => {
//     console.log(err);
//   });
let counter = 0;

//read files
fs.readFile("./codebeautify_turkey.json", "utf8", (err, data) => {
  data = data.slice(1, data.length);
  // console.log(data[0]);
  if (err) console.log(err);

  // imagesArray will be image links sorted by date without any empty ones
  let imagesArray = JSON.parse(data).filter(obj => obj.image !== "");
  // .sort(byDate);
  //run color function using asyc/await for each object in the imagesArray (which are the sorted image links only) and save file using fs writeFile

  imagesArray.forEach(async imageObj => {
    await getDominantColor(imageObj);
    console.log(counter);
    if (counter === imagesArray.length) {
      fs.writeFile(
        "finalImages_turkey.json",
        JSON.stringify(imagesArray, null, 2),
        () => console.log("success")
      );
    }
  });

  //declare date function
  function byDate(a, b) {
    return a.date - b.date;
  }
});

//declare get color function (make sure to include 'return' here for async)
function getDominantColor(imageObj) {
  const fileName = "./downloads_turkey/" + imageObj.image.replace(/^.*\//, ""); //replace everything before the / with nothing
  // const fileName = "./downloads/DT1953.jpg"; //replace everything before the / with nothing

  return ColorThief.getColor(fileName)
    .then(color => {
      console.log("color ", color);
      imageObj.color = color;
      counter++;
    })
    .catch(err => {
      console.log(err);
    });
}
