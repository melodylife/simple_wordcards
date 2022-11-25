
const express = require('express');
const pug = require('pug');
const app = express();
const fs = require('fs');
const mongoose = require('mongoose');
const port = 3000;
const localDB = 'mongodb://localhost:27017/words';
mongoose.connect(localDB, { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.Promise = global.Promise;


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 连接错误'));
db.on('connected' , () => {console.log('Already connected');})

var rawJsonStr = fs.readFileSync('data/schema.json');
var mondbSchema = JSON.parse(rawJsonStr);
console.log(mondbSchema);

var Schema = mongoose.Schema;
/*var wordsModelSchema = new Schema({
  objectID: [Schema.Types.ObjectId],
  word: {type: String, required: true},
  createTime: {type: Date , default: Date.now,require: true},
  phonics: {type: String, required: true},
  meaning: {type: String, required: true},
  example: {type: String, required: true},
  ext: {type: Schema.Types.Mixed, required: false}
});*/

var wordsModelSchema = new Schema(mondbSchema);

const wordsModel = mongoose.model('word_cards' , wordsModelSchema);

let query = wordsModel.find({});
/*query.exec((err , res) => {
  console.log(res);
});*/

app.set('view engine' , 'pug');
app.get('/' , (req , res) => {
  res.send("Hello World");
});
/*app.get('/word_cards' , (req , res) => {
  res.render('word_cards' , {});
});*/
app.get('/word_cards' , (req , res) => {
    let query = wordsModel.find({});
    return query.exec((err , wordList) => {
      //console.log(wordList);
      return res.render('word_cards' , {"dataName": "wordlist", "data": wordList});
    });
});

app.use(express.static('content'));

app.listen(port , () => {
  console.log(`Example listen to port: ${port}`);
});
