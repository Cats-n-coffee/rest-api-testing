const express = require('express');
const app = express();
const writeToFile = require('./helpers/writeFile');
const { randomId } = require('./helpers/other');

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200)
    res.json({ message: 'Home'});
})

app.post('/message', (req, res) => {
    let data = req.body;
    let newId = randomId();

    data = { ...req.body, id: newId}
    writeToFile(data)
    
    console.log(data)

    res.status(200);
    res.json({ message: 'Received'});
})

app.get('/message/:username', (req, res) => {
    const { username } = req.params;
    console.log(username)

    // const testObj = {
    //     all: [
    //         {
    //             username: 'chichi',
    //             data: 'This is Chichi the cat'
    //         },
    //         {
    //             username: 'miki',
    //             data: 'This is Miki the kitten'
    //         }
    //     ]
    // }

    res.status(200);
    res.json({ messages: 'All the messages'});
})


module.exports = app;

// {\"username\": \"chichi\", \"data\": \"I'm a cat\"}