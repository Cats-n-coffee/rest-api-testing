const fs = require('fs');

function writeToFile(obj) {
    return fs.open('src/data/data.json', 'as+', 0o666, (err, fd) => {
        if (err) console.log('There was an error opening the file', err);
        console.log('fddddd', fd)

        let objToBuffer = Buffer.from(JSON.stringify(obj));

        fs.read(fd, objToBuffer, 0, objToBuffer.length, 0, (err, bytes) => {
            if (err) {
                console.log('Error in file read', err)
                throw err
            };
            if (bytes > 0) {
                console.log('reading some bytes', bytes)
                console.log(objToBuffer.slice(0, bytes).toString())
                // deserialize and re-serialize and write to file
            }
            if (bytes === 0) {
                console.log('youre here because there\s no bytes')
                // serialize the obj properly
                helperToWrite(fd, objToBuffer)
            }
            console.log('inside the read fd is', fd, 'bytes', bytes)
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

// function helperToWrite(filename, data) {
//     return fs.writeFile(filename, data, 'utf8', (err) => {
//         if (err) console.log('There was an error writing to the file', err)
//     })
// }

function helperToWrite(fileDesc, buffer) {
    fs.write(fileDesc, buffer, 0, buffer.length, 0, (err, bytes) => {
        if (err) {
            console.log('Error while writing to file', err)
            throw err;
        }
        if (bytes > 0) {
            console.log(buffer.slice(0, bytes).toString())
        }
        fs.close(fd)
    })
}

module.exports = writeToFile;