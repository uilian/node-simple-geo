var mongoose = require('mongoose');

mongoose.connect(
    'mongodb://127.0.0.1:27017/geodb', 
    { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true }
);

var conn = mongoose.connection;

conn.on('connected', () => {
    console.log('database is connected successfully');
});
conn.on('disconnected',() => {
    console.log('database is disconnected successfully');
});
conn.on('error', console.error.bind(console, 'connection error:'));

module.exports = conn;
