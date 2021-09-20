# REST API Testing

This is a playground repository to practice backend testing.
This Markdown file contains my notes about anything backend testing related. 
This app is not intended to make sense (as a whole project), but contains parts which are interesting to test and learn about.

## Testing the routes

To test the routes and controllers we are using Supertest. It provides an interface with chained methods, similar to writing a response with Express. <br>
It seems that the type of data in the request's body is by default Json, since nothing special needs to be added to parse a Json body. 
However, for `text/plain`, we needed to specify `.type('text/plain')`.<br>

```javascript
await supertest(app).post('/endpoint')
    .type('text/plain')
    .send('This is a string')
```

