# Simple Geo Application

Sample NodeJS application to test geo features of MongoDB, using LeafletJS, Open Streep Maps and MapBox.

## Instructions

What you'll need:

- MongoDB
- NodeJS
- Express

### Creating the geodatabase

Simply run the "loadpoints.js" script:

```
$ node loadpoints.js
```

It assumes your mongodb is up and running on the default port:

```
mongodb://localhost:27017/sampledb
```

### Running the application

In the application directory:

```
$ npm install
$ node app.js
```

Open your browser in [http://localhost:3000/][http://localhost:3000/].

That's it!
