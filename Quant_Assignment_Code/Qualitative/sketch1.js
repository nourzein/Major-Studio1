//load dependencies
// // load a default library that lets us read/write to the file system
// var fs = require("fs");
// // load a default library that lets us make HTTP requests (like calls to an API)
// var request = require("request");
// // global.fetch = require("node-fetch");

const searchUrl =
  "https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers";
const objectBaseUrl =
  "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

//objects from Islamic Art departments
const departmentsUrl =
  "https://collectionapi.metmuseum.org/public/collection/v1/departments";
const IslamicArtDepUrl = objectBaseUrl + "?departmentIds=%2014";

// https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=%2014

//   fetch(url)
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(myJson) {
//     console.log(JSON.stringify(myJson));
//   });

function fetchDepData(url) {
  fetch(url)
    .then(data => data.json())

    .then(data => {
      // console.log("fetchDepData", data);

      fetchObjects(data);
      console.log(data);

      // wait about 2 seconds before building the d3 chart, since we need to wait for myArray to populate with data from Met API

      //   setTimeout(buildSvg, 2000);
    });
}

fetchDepData(
  "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=%2011"
);

function fetchObjects(data) {
  let objectIDs = data.objectIDs.slice(0, 10);

  // console.log('fetching:' + objectIDs.length + 'objects');

  objectIDs.forEach(function(n) {
    // console.log(objectBaseUrl + n);

    let objUrl = objectBaseUrl + n;

    window

      .fetch(objUrl)

      .then(data => data.json())

      .then(data => {
        // console.log(data);
        // addObject(data);
      });
  });
}

let myArray = [];

// create your own array using just the data you need

// function addObject(objectData) {
//   var currentID = objectData.objectID;

//   var currentTitle = objectData.title;

//   var currentDate = objectData.objectBeginDate;

//   var imgUrl = objectData.primaryImage;

//   var nationality = objectData.artistNationality;

//   var country = objectData.country;

//   var index = myArray.length;

//   myArray[index] = {};

//   myArray[index]["ID"] = currentID;

//   myArray[index]["date"] = currentDate;

//   myArray[index]["image"] = imgUrl;

//   myArray[index]["nationality"] = nationality;

//   myArray[index]["country"] = country;

//   console.log(myArray[index]);
// }
// setTimeout(() => {
//   fs.writeFileSync("./data.json", JSON.stringify(myArray), "utf8");
// }, 2000);
