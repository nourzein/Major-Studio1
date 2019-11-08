let fs = require("fs");
// load a default library that lets us make HTTP requests (like calls to an API)
let request = require("request");

// the folder we will write into
const folder = "downloads_india_big";

// download the image by url, name the file by filename
function downloadImage(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);
    request(uri)
      .pipe(fs.createWriteStream(folder + "/" + filename))
      .on("close", callback);
  });
}

// go through the json we created before
function downloadData() {
  fs.readFile("./codebeautify_india_big.json", "utf8", (err, data) => {
    data = data.slice(1, data.length);
    console.log(data[0]);

    if (err) console.log(err);

    let realImages = JSON.parse(data)
      .filter(obj => obj.image !== "")
      .sort(byDate)
      // .map(obj => {
      //   console.log(obj.date);
      //   return obj;
      // })
      .map(obj => obj.image); //to make the obj turn into just the list of images with no extra info
    console.log(realImages.length);

    function byDate(a, b) {
      return a.date - b.date;
    }

    for (let startAt = 0; startAt < realImages.length; startAt += 10) {
      doDownloads(startAt, realImages.length);
    }

    function doDownloads(inum, max) {
      console.log("running", inum);
      setTimeout(() => {
        let promises = [];
        for (let i = inum; i < inum + 10 && i < max; i++) {
          let filename = realImages[i].split("/").pop();
          promises.push(
            downloadImage(realImages[i], filename, function() {
              console.log("Finished Downloading " + filename);
            })
          );
        }
        Promise.all(promises).then(
          () => console.log("finished", inum),
          () => console.log("error", inum)
        );
      }, 5000);
    }
  });
}
downloadData();
