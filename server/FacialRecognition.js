const fs = require('fs');
let idx = 0;
const getIdx = () => idx++;
const tmpPath = './tmp';

function saveTmp(data, callback) {
    let filename = 'tmp-'+getIdx()+'.tmp';
    fs.writeFile(tmpPath+'/'+filename, data, 'base64', err => {
        if(err)
            console.log('Error when application tried to create the temp file.');
        let stream = fs.createReadStream(tmpPath+'/'+filename);
        callback(stream, () => {
            fs.unlink(tmpPath+'/'+filename, err => {
                if(err)
                    console.log('Error when application tried to delete the temp file.');
            });
        });
    });
}

module.exports = new function() {
    // Create the tmp folder.
    fs.mkdir(tmpPath, err => {
        if(!err)
            console.log('tmp folder was created.');
        else
            console.log('tmp folder already exists.');
    });

    this.recognizeFaces = img => {
        return new Promise( (resolve, reject) => {
            if(img == undefined)
                reject('Error, img is empty.');

            saveTmp(img.split(';base64,').pop(), (stream, finish) => {
                console.log(stream);
                finish();
            });
        });
    }
}();