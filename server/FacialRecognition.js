const fs = require('fs');
// Temp path
const tmpPath = './tmp';
// Require and create an object.
const visualRecognition = new (require('watson-developer-cloud/visual-recognition/v3'))({
    version: '2018-03-19',
    iam_apikey: process.env.IAM_APIKEY
});
// Create an index generator to the temp file.
let idx = 0;
const getIdx = () => idx++;

// Method that will save the temp file.
function saveTmp(data, callback) {
    // Generate the file name.
    let filename = 'tmp-'+getIdx()+'.tmp';
    // Write the file inside the Temp path.
    fs.writeFile(tmpPath+'/'+filename, data, 'base64', err => {
        // Check if some error occurred.
        if(err) {
            callback();
            return;
        }
        // Create a ReadStream from the saved file.
        let stream = fs.createReadStream(tmpPath+'/'+filename);
        // Call the callback and when it is done, remove the created temp.
        callback(stream, () => {
            fs.unlink(tmpPath+'/'+filename, err => {
                // Check if some error occurred while it was deleting the file..
                if(err)
                    console.log('Error when application tried to delete the temp file.');
            });
        });
    });
}

// Export the object with the functionalities.
module.exports = new function() {
    // Create the temp folder.
    fs.mkdir(tmpPath, err => {
        // Check for errors
        if(!err)
            console.log('tmp folder was created.');
        else
            console.log('tmp folder already exists.');
    });
    // Create the method to recognize faces.
    this.recognizeFaces = img => {
        // Return the promise.
        return new Promise( (resolve, reject) => {
            // Check if img is empty
            if(img == undefined) {
                reject('Error, parameter img is empty.');
                return;
            }
            // Get the image.
            let image = img.split(';base64,').pop();
            // Save the image as a temp.
            saveTmp(image, (stream, finish) => {
                if(stream == undefined) {
                    reject('Error while it was saving the file.');
                    return;
                }
                // instance parameters.
                let params = {
                    images_file: stream
                };
                // call the API.
                visualRecognition.detectFaces(params, (err, res) => {
                    // Check for errors.
                    if(err) {
                        // Reject it
                        reject(err);
                    } else {
                        // Resolve it
                        resolve(res);
                        // Call the callback to remove the temp file.
                        finish();
                    }
                });
            });
        });
    }
}();