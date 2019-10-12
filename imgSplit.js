//iPhone xs aspect ratio 19.5 x 9
const sharp = require('sharp');

var argv = require('minimist')(process.argv.slice(2));
var splitNum = argv['s'];

console.log('\x1b[36m%s\x1b[0m', 'split to:' + splitNum); 
var orgWidth,orgHeight,puzzleWidth,splitNumVertical,splitNumHorizontal;

// original image
let originalImage = 'sampleXs.jpg';



const image = sharp(originalImage);
image
  .metadata()
  .then(info => {
    console.log(info.width);
    orgWidth = info.width;
    orgHeight = info.height;

    puzzleWidth = orgWidth / splitNum;
    splitNumVertical = orgHeight / puzzleWidth;
    splitNumHorizontal = splitNum;

    console.log("puzzle width:" + puzzleWidth);

    cropImages();
  });
  

  function cropImages(){
    console.log("cropImages");
    console.log(splitNumHorizontal);
    console.log(splitNumVertical);
    var i,j;
    for (i = 0; i < splitNumHorizontal; i++) { 
        for (j = 0; j < splitNumVertical; j++) { 
            console.log('\x1b[36m%s\x1b[0m', 'iteration:' + i+'x'+j); 
            // file name for cropped image
            let outputImage = i+'x'+j+'.jpg';

            console.log("width: "+puzzleWidth);
            console.log("left: "+i*puzzleWidth);
            console.log(outputImage);
            image.extract({ width: puzzleWidth, height: puzzleWidth, left: i*puzzleWidth, top: j*puzzleWidth }).toFile(outputImage)
            .then(function(new_file_info) {
                console.log("Image cropped and saved");
            })
            .catch(function(err) {
                console.log("An error occured");
                console.log(err);
            });        
        }
    }
}


  //splitNum


//console.log(sharp.format);

// sharp(originalImage).extract({ width: 1920, height: 1080, left: 60, top: 40 }).toFile(outputImage)
//     .then(function(new_file_info) {
//         console.log("Image cropped and saved");
//     })
//     .catch(function(err) {
//         console.log("An error occured");
//     });```