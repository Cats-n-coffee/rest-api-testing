const express = require('express');
const app = express();
const writeToFile = require('./helpers/writeFile');
const { randomId } = require('./helpers/other');

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'Home'})
})

app.post('/message', (req, res) => {
    let data = req.body;

    //writeToFile(data)
    let newId = randomId();
    console.log({...data, id: newId })

    res.json({ message: 'Received'})
    res.end()
})


module.exports = app;

// {\"username\": \"chichi\", \"data\": \"I'm a cat\"}