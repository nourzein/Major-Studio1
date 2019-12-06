const url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

var myObjects = [
  {
    ObjectID: 456985
  },
  {
    ObjectID: 445237
  },
  {
    ObjectID: 446999
  },
  {
    ObjectID: 447531
  },
  {
    ObjectID: 448018
  },
  {
    ObjectID: 450469
  },
  {
    ObjectID: 451059
  },
  {
    ObjectID: 446643
  },
  {
    ObjectID: 446646
  },
  {
    ObjectID: 446998
  },
  {
    ObjectID: 452197
  },
  {
    ObjectID: 452554
  },
  {
    ObjectID: 781487
  },
  {
    ObjectID: 446638
  },
  {
    ObjectID: 446635
  },
  {
    ObjectID: 450471
  },
  {
    ObjectID: 452192
  },
  {
    ObjectID: 450529
  },
  {
    ObjectID: 451982
  }
];

let myObjectIds = [];

for (let i = 0; i < myObjects.length; i++) {
  myObjectIds.push(myObjects[i].ObjectID);
}

fetchObjects(myObjectIds);

function fetchObjects(data) {
  let objectIDs = data;

  objectIDs.forEach(function(n) {
    // console.log(objectBaseUrl + n);

    let objUrl = url + n;

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
  var imgUrl = objectData.primaryImageSmall;
  var nationality = objectData.artistNationality;
  var dynasty = objectData.dynasty;
  var period = objectData.period;
  var culture = objectData.culture;
  var imgUrlLarge = objectData.primaryImage;
  var country = objectData.country;
  var index = myArray.length;
  myArray[index] = {};
  myArray[index]["title"] = currentTitle;
  myArray[index]["date"] = currentDate;
  myArray[index]["dynasty"] = dynasty;
  myArray[index]["period"] = period;
  myArray[index]["nationality"] = nationality;
  myArray[index]["culture"] = culture;
  myArray[index]["image"] = imgUrl;
  myArray[index]["country"] = country;

  console.log(JSON.stringify(myArray));
}
console.log(filename);
