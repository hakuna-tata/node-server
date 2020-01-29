const MongoClient = require("mongodb").MongoClient
const {dbUrl, dbName} = require("../config")

class UserModel{
  constructor(dbUrl,dbName){
    this.dbUrl = dbUrl
    this.dbName = dbName
  }
  connectDb(callback){
    MongoClient.connect(this.dbUrl, (err, client) => {
      if(err){
        console.log("数据库连接失败")
      }
      callback(client)
      client.close()
    })
  }
  findAll(dbCollection){
    this.connectDb(client => {
      const collection  = client.db(this.dbName).collection(dbCollection)
      collection.find({})
    })
  }
  findOne(dbCollection,name){
    this.connectDb(client => {
      const collection  = client.db(this.dbName).collection(dbCollection)
      collection.findOne({name})
    })
  }
  register(dbCollection,registerData){
    const { username, password } = registerData
    this.connectDb(client => {
      const collection  = client.db(this.dbName).collection(dbCollection)
      collection.insertOne({
        username,
        password
      })
    })
  }
}

module.exports = new UserModel(dbUrl, dbName)