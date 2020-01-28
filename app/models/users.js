const MongoClient = require("mongodb").MongoClient
const {dbUrl, dbName} = require("../config")

class UserModel{
  constructor(dbUrl,dbName){
    this.dbUrl = dbUrl
    this.dbName = dbName
  }
  insert(dbCollection,insertData){
    MongoClien.connect(this.dbUrl, (err, client) => {
      console.log("MongoDb 连接成功!");
      const collection  = client.db(this.dbName).collection(dbCollection)
      collection.insert(insertData, (err, result) => {
        if(err){
          console.log("Error:" + err)
          return 
        }
        client.close()
      })
    }) 
  }
}

module.exports = new UserModel(dbUrl, dbName)