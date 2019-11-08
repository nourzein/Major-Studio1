//Things need to figure out
//install node
//going from fetch to get the objects to request to save them
//using vibrant to extract color
// const axios= require('axios');
// (async () => {
//   let url= ;
//   let myRequest= await axios.get(url, {
//     responseType: 'json',

//   })
// }
// )

// var fs = require("fs");
// // load a default library that lets us make HTTP requests (like calls to an API)
// var request = require("request");

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
      // console.log(data);

      // wait about 2 seconds before building the d3 chart, since we need to wait for myArray to populate with data from Met API

      //   setTimeout(buildSvg, 2000);
    });
}

fetchDepData(
  "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=%2011"
);

function fetchObjects(data) {
  let objectIDs = data.objectIDs;

  // console.log('fetching:' + objectIDs.length + 'objects');

  objectIDs.forEach(function(n) {
    // console.log(objectBaseUrl + n);

    let objUrl = objectBaseUrl + n;

    window

      .fetch(objUrl)

      .then(data => data.json())

      .then(data => {
        // console.log(data);
        addObject(data);
      });
  });
}

let myArray = [];

function addObject(objectData) {
  var currentID = objectData.objectID;
  var currentTitle = objectData.title;
  var currentDate = objectData.objectBeginDate;
  var imgUrl = objectData.primaryImage;
  var nationality = objectData.artistNationality;
  var country = objectData.country;
  var index = myArray.length;
  myArray[index] = {};
  myArray[index]["title"] = currentTitle;
  myArray[index]["date"] = currentDate;
  myArray[index]["image"] = imgUrl;
  myArray[index]["nationality"] = nationality;
  myArray[index]["country"] = country;
  // console.log(JSON.stringify(myArray));
}

// // call the function for each element in the myObjectIds array
// myArray.forEach(objectId => {
//   addObject(objectId);
// });

// // the function inside the setTimeout saves myResults to a JSON
// // it will automatically run after 2000 ms

// setTimeout(() => {
//   fs.writeFileSync("./data3.json", JSON.stringify(myArray), "utf8");
// }, 2000);
