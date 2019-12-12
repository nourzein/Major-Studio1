const fs = require('fs');
const request = require('axios');

const searchUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers';
const objectBaseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

//objects from Islamic Art departments
const departmentsUrl= 'https://collectionapi.metmuseum.org/public/collection/v1/departments';
const IslamicArtDepUrl= objectBaseUrl +'?departmentIds=%2014'


// https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=%2014


fetchDepData("https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=%2014");

 function fetchDepData(url) {
 
    request.get(url)
    // .then(data=> data.json())
    .then( data => { 
    //   console.log("fetchDepData", data.data);
     fetchObjects(data.data);

    })
}
 
    

 function fetchObjects(data) {
  let objectIDs= data.objectIDs.slice(0, 10);
//   console.log("fetching:" + objectIDs.length + "objects");
   objectIDs.forEach(function (n) {
    // console.log(objectBaseUrl + n);
    let objUrl = objectBaseUrl + n;
    request.get(objUrl)
    //   .then(data => data.json())
      .then(data => {
        // console.log(data);
        addObject(data.data);
      })
  });
}     

let myArray = [];

// create your own array using just the data you need
 function addObject(objectData){
    var currentID = objectData.objectID;
    var currentTitle = objectData.title;
    var currentDate = objectData.objectBeginDate;
    var imgUrl = objectData.primaryImage;
    var nationality= objectData.artistNationality;
    var country= objectData.country;
    var index = myArray.length;
    myArray[index] = {};
    myArray[index]["title"] = currentTitle;
    myArray[index]["date"] = currentDate;
    myArray[index]["image"] = imgUrl;
    myArray[index]["nationality"] = nationality;
    myArray[index]["country"] = country;
    // console.log(myArray[index]);
}


// fs.writeFileSync("data.json", myArray)
