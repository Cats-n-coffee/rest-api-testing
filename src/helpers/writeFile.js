const fs = require('fs');

function writeToFile(obj) {
    let incomingObjToBuffer = Buffer.from(JSON.stringify(obj));

    return fs.open('src/data/data.json', 'as+', 0o666, (err, fd) => {
        if (err) console.log('There was an error opening the file', err);
        console.log('fddddd', fd)

        let objToBuffer = Buffer.from(JSON.stringify(obj));

        fs.read(fd, (err, bytes, bufferInFile) => {
            console.log('inside the read fd is', fd)
            if (err) {
                console.log('Error in file read', err)
                throw err
            };
            if (bytes > 0) {
                console.log('reading some bytes', bytes, bufferInFile.length)
                let existingObj = bufferInFile.slice(0, bytes).toString();
                existingObj = JSON.parse(existingObj);

                console.log('existing obj ', existingObj)
                console.log('incomingObj', objToBuffer.toString())
                // deserialize and re-serialize and write to file
                existingObj.all.push(obj)
                let newObjToBuffer = Buffer.from(JSON.stringify(existingObj));

                helperToWrite(fd, newObjToBuffer)
            }
            if (bytes === 0) {
                console.log('youre here because there\'s no bytes')  

                let bufferToObj = JSON.parse(objToBuffer.toString());
                let mainObj = { all: [] }
                mainObj.all.push(bufferToObj);
                let objBackToBuffer = Buffer.from(JSON.stringify(mainObj))

                helperToWrite(fd, objBackToBuffer)
            }
       
            fs.close(fd);
        })

    })


    // fs.readFile('data.json', 'utf8', async (err, content) => {
    //     if (err) {
    //         if (err.code === 'ENOENT') {
    //             let mainObj = { messages: [] };

    //             mainObj.messages.push(obj);
    //             mainObj = JSON.stringify(mainObj);

    //             return helperToWrite('data.json', mainObj);
    //         }
    //         else {
    //             console.log('There was an error reading the file', err);
    //         }
    //     }
    //     else {
    //         let parsedContent = await JSON.parse(content);
    //         await parsedContent.messages.push(obj)
    //         let newContent = JSON.stringify(parsedContent);

    //         return helperToWrite('data.json', newContent);
    //     }
    // })
}

function helperToWrite(fileDesc, buffer) {
    console.log('inside the write fd is', fileDesc)
    fs.write(fileDesc, buffer, 0, buffer.length, 0, (err, bytes) => {
        if (err) {
            console.log('Error while writing to file', err)
            throw err;
        }
        if (bytes > 0) {
            console.log('in the write, we have bytes', buffer.slice(0, bytes).toString())
        }
        fs.close(fileDesc)
    })
}

module.exports = writeToFile;