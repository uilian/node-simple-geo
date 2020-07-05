# Simple Geo Application

Sample NodeJS application to test geo features of MongoDB, using LeafletJS, Open Streep Maps and MapBox.

## Instructions

What you'll need:

- MongoDB (or docker / docker-compose)
- Node

### Importing your date to mongodb:

Run the script ```init-db.js```:

```
$ node config/init-db.js
```

It assumes that you have mongodb up and running on the default port:

```
mongodb://localhost:27017
```

If you don't have a mongo db, there is one configured, you just need to execute ```docker-compose```:

```
$ docker-compose up -d
```

After running this script, you will have a collection called ```wifi_hotspots``` under a ```geodb``` database.

### Running the application

In the application directory:

```
$ npm install
$ npm start
```

Open your browser in [http://localhost:3000/](http://localhost:3000/)

That's it!


