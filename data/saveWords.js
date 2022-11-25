const mongoose = require('mongoose');
const fs = require('fs');
const dayjs = require('dayjs');

const localDB = 'mongodb://localhost:27017/words';
mongoose.connect(localDB , {useNewUrlParser:true , useUnifiedTopology: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error' , console.error.bind(console, 'MongoDB connection error'));
db.on('connected' , () => {console.log('Already Connected');});

var rawJsonStr = fs.readFileSync('schema.json');
var mongoDBSchema = JSON.parse(rawJsonStr);

var Schema = mongoose.Schema;
var wordsModelSchema = new Schema(mongoDBSchema);
const wordsModel = mongoose.model('word_cards' , wordsModelSchema);
console.log(mongoDBSchema);

var xlsx = require('node-xlsx');
var sheets = xlsx.parse('wordlist.xlsx');



sheets.forEach((sheet) => {
//  console.log(sheet['name']);
  var docList = [];
  for(var rowID in sheet['data']){
    if (rowID == 0) {
      continue;
    }
    var row = sheet['data'][rowID];
    let today = dayjs();
    //console.log(today.format('YYYY/MM/DD').toString());
    var doc = {};
    doc.word = row[0];
    doc.phonics = row[1];
    doc.meaning = row[2];
    doc.createTime = today.format('YYYY/MM/DD').toString();
    doc.example = row[3];
    docList.push(doc);
  }
  console.log(docList);
  wordsModel.insertMany(docList);

});

//var Schema = mongoose.Schema;
//var wordsModelSchema = new Schema();
