const mongodb = require('mongodb').MongoClient
const {dbUrl, dbName} =  require("../config")

class UserModel{
  constructor(dbUrl,dbName){
    this.dbUrl = dbUrl
    this.dbName = dbName
    this.connectDb()
  }

  // 多次连接共享实例对象
  static getInstance(dbUrl,dbName){
    if(!UserModel.instance){
      UserModel.instance = new UserModel(dbUrl,dbName)
    }
    // 简化性能提升
    return UserModel.instance
  }

  connectDb(){
    return new Promise((resolve,reject) => {
      mongodb.connect(this.dbUrl,{ useNewUrlParser: true,  useUnifiedTopology: true },(err,client) => {
        if(err) {
          console.log("数据库连接失败")
          reject(err)
        }
        const dbClient = client.db(this.dbName)
        resolve(dbClient)
      })
    })
  }

  find(dbCollection,searchQuery){
    return new Promise((resolve, reject) => {
      this.connectDb().then(db => {
        db.collection(dbCollection).find(searchQuery).toArray((err,result) => {
          if(err) reject(err);
          resolve(result)
        })
      })
    })
  }
}

module.exports = UserModel.getInstance(dbUrl, dbName)