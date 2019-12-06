const url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

var myObjects = [
  {
    ObjectID: 453317
  },
  {
    ObjectID: 456970
  },
  {
    ObjectID: 456971
  },
  {
    ObjectID: 445297
  },
  {
    ObjectID: 456975
  },
  {
    ObjectID: 456976
  },
  {
    ObjectID: 445364
  },
  {
    ObjectID: 447569
  },
  {
    ObjectID: 447572
  },
  {
    ObjectID: 445311
  },
  {
    ObjectID: 447544
  },
  {
    ObjectID: 447547
  },
  {
    ObjectID: 447571
  },
  {
    ObjectID: 452372
  },
  {
    ObjectID: 452562
  },
  {
    ObjectID: 452563
  },
  {
    ObjectID: 452565
  },
  {
    ObjectID: 452566
  },
  {
    ObjectID: 456973
  },
  {
    ObjectID: 445300
  },
  {
    ObjectID: 447491
  },
  {
    ObjectID: 447575
  },
  {
    ObjectID: 452376
  },
  {
    ObjectID: 452567
  },
  {
    ObjectID: 452569
  },
  {
    ObjectID: 452570
  },
  {
    ObjectID: 446955
  },
  {
    ObjectID: 447543
  },
  {
    ObjectID: 447546
  },
  {
    ObjectID: 452374
  },
  {
    ObjectID: 457757
  },
  {
    ObjectID: 446641
  },
  {
    ObjectID: 446956
  },
  {
    ObjectID: 447475
  },
  {
    ObjectID: 447476
  },
  {
    ObjectID: 447477
  },
  {
    ObjectID: 447479
  },
  {
    ObjectID: 447480
  },
  {
    ObjectID: 447488
  },
  {
    ObjectID: 447490
  },
  {
    ObjectID: 447516
  },
  {
    ObjectID: 447517
  },
  {
    ObjectID: 447518
  },
  {
    ObjectID: 447522
  },
  {
    ObjectID: 447536
  },
  {
    ObjectID: 447537
  },
  {
    ObjectID: 447538
  },
  {
    ObjectID: 447539
  },
  {
    ObjectID: 447542
  },
  {
    ObjectID: 447552
  },
  {
    ObjectID: 447553
  },
  {
    ObjectID: 447555
  },
  {
    ObjectID: 447556
  },
  {
    ObjectID: 447557
  },
  {
    ObjectID: 447558
  },
  {
    ObjectID: 447559
  },
  {
    ObjectID: 447560
  },
  {
    ObjectID: 447561
  },
  {
    ObjectID: 447562
  },
  {
    ObjectID: 447563
  },
  {
    ObjectID: 447565
  },
  {
    ObjectID: 447584
  },
  {
    ObjectID: 448409
  },
  {
    ObjectID: 448416
  },
  {
    ObjectID: 448420
  },
  {
    ObjectID: 448421
  },
  {
    ObjectID: 448458
  },
  {
    ObjectID: 452280
  },
  {
    ObjectID: 452281
  },
  {
    ObjectID: 452282
  },
  {
    ObjectID: 452284
  },
  {
    ObjectID: 452285
  },
  {
    ObjectID: 452286
  },
  {
    ObjectID: 452316
  },
  {
    ObjectID: 452370
  },
  {
    ObjectID: 452377
  },
  {
    ObjectID: 452564
  },
  {
    ObjectID: 452571
  },
  {
    ObjectID: 452575
  },
  {
    ObjectID: 452577
  },
  {
    ObjectID: 452579
  },
  {
    ObjectID: 452580
  },
  {
    ObjectID: 452582
  },
  {
    ObjectID: 452585
  },
  {
    ObjectID: 452586
  },
  {
    ObjectID: 452587
  },
  {
    ObjectID: 452589
  },
  {
    ObjectID: 452594
  },
  {
    ObjectID: 452604
  },
  {
    ObjectID: 453322
  },
  {
    ObjectID: 447582
  },
  {
    ObjectID: 452606
  },
  {
    ObjectID: 452574
  },
  {
    ObjectID: 447509
  },
  {
    ObjectID: 444995
  },
  {
    ObjectID: 447570
  },
  {
    ObjectID: 452373
  },
  {
    ObjectID: 698564
  },
  {
    ObjectID: 447540
  },
  {
    ObjectID: 452593
  },
  {
    ObjectID: 455276
  },
  {
    ObjectID: 452572
  },
  {
    ObjectID: 451690
  },
  {
    ObjectID: 447554
  },
  {
    ObjectID: 456977
  },
  {
    ObjectID: 447574
  },
  {
    ObjectID: 447520
  },
  {
    ObjectID: 447551
  },
  {
    ObjectID: 451885
  },
  {
    ObjectID: 451886
  },
  {
    ObjectID: 447567
  },
  {
    ObjectID: 453237
  },
  {
    ObjectID: 453277
  },
  {
    ObjectID: 452588
  },
  {
    ObjectID: 453282
  },
  {
    ObjectID: 454036
  },
  {
    ObjectID: 451471
  },
  {
    ObjectID: 452553
  },
  {
    ObjectID: 452845
  },
  {
    ObjectID: 452808
  },
  {
    ObjectID: 456979
  },
  {
    ObjectID: 456981
  },
  {
    ObjectID: 447489
  },
  {
    ObjectID: 447564
  },
  {
    ObjectID: 447566
  },
  {
    ObjectID: 447521
  },
  {
    ObjectID: 447573
  },
  {
    ObjectID: 452584
  },
  {
    ObjectID: 451893
  },
  {
    ObjectID: 452283
  },
  {
    ObjectID: 452287
  },
  {
    ObjectID: 452583
  },
  {
    ObjectID: 456972
  },
  {
    ObjectID: 451698
  },
  {
    ObjectID: 447548
  },
  {
    ObjectID: 447550
  },
  {
    ObjectID: 447568
  },
  {
    ObjectID: 447581
  },
  {
    ObjectID: 447474
  },
  {
    ObjectID: 447523
  },
  {
    ObjectID: 447549
  },
  {
    ObjectID: 452573
  },
  {
    ObjectID: 456974
  },
  {
    ObjectID: 451638
  },
  {
    ObjectID: 447545
  },
  {
    ObjectID: 452568
  },
  {
    ObjectID: 452576
  },
  {
    ObjectID: 452375
  },
  {
    ObjectID: 451722
  },
  {
    ObjectID: 452578
  },
  {
    ObjectID: 456980
  },
  {
    ObjectID: 452590
  },
  {
    ObjectID: 447541
  },
  {
    ObjectID: 452581
  },
  {
    ObjectID: 452591
  },
  {
    ObjectID: 453581
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
  var index = myArray.length;
  myArray[index] = {};
  myArray[index]["title"] = currentTitle;
  myArray[index]["date"] = currentDate;
  myArray[index]["dynasty"] = dynasty;
  myArray[index]["period"] = period;
  myArray[index]["nationality"] = nationality;
  myArray[index]["culture"] = culture;
  myArray[index]["image"] = imgUrl;

  console.log(JSON.stringify(myArray));
}
console.log(filename);
