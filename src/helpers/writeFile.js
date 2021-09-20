const fs = require('fs');

function writeToFile(obj) {
    return fs.open('src/data/data.json', 'a', 0o666, (err, fd) => {
        if (err) console.log('There was an error opening the file', err);
        console.log('fddddd', fd)
        let objToBuffer = Buffer.from(JSON.stringify(obj));
        fs.read(fd, objToBuffer, 0, objToBuffer.length, 0, (err, bytes) => {
            if (err) throw err;
            if (bytes > 0) {
                console.log(objToBuffer.slice(0, bytes).toString())
            }

            fs.close(fd, (err) => {
                throw err
            })
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

function helperToWrite(filename, data) {
    return fs.writeFile(filename, data, 'utf8', (err) => {
        if (err) console.log('There was an error writing to the file', err)
    })
}

module.exports = writeToFile;