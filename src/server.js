const express = require('express');
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'Home'})
})

app.post('/message', (req, res) => {
    let data = req.body;

    console.log(data)
    res.json({ message: 'Received'})
})


module.exports = app;