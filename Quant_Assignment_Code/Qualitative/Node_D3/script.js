const searchUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers';
const objectBaseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

//objects from Islamic Art departments
const departmentsUrl= 'https://collectionapi.metmuseum.org/public/collection/v1/departments';
const IslamicArtDepUrl= objectBaseUrl +'?departmentIds=%2014'


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

      // wait about 2 seconds before building the d3 chart, since we need to wait for myArray to populate with data from Met API

      setTimeout(buildSvg, 2000);

    });

}



fetchDepData(

  'https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=%2014'

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

        addObject(data);

      });

  });

}



let myArray = [];



// create your own array using just the data you need

function addObject(objectData) {

  var currentID = objectData.objectID;

  var currentTitle = objectData.title;

  var currentDate = objectData.objectBeginDate;

  var imgUrl = objectData.primaryImage;

  var nationality = objectData.artistNationality;

  var country = objectData.country;

  var index = myArray.length;

  myArray[index] = {};

  myArray[index]['title'] = currentTitle;

  myArray[index]['date'] = currentDate;

  myArray[index]['image'] = imgUrl;

  myArray[index]['nationality'] = nationality;

  myArray[index]['country'] = country;

  console.log(myArray[index]);

}



// Visualize myArray using d3

// Start with svg rectangles



//  var exampleArray= [1, 2, 3,]; //svg reads this array as 3 rectangles but does not read myArray as 10...



function buildSvg() {

  var svg = d3

    .select('body')

    .append('svg')

    .attr('height', '100%')

    .attr('width', '100%');

  svg

    .selectAll('rect')

    .data(myArray)

    .enter()

    .append('rect');
}


 