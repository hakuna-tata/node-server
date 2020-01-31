const mongodb = require('mongodb').MongoClient
const {dbUrl, dbName} =  require("../config")

class UserModel{
  constructor(dbUrl,dbName){
    this.dbUrl = dbUrl
    this.dbName = dbName
    this.connectDbPromise = this.connectDb()
  }

  // 多次连接共享实例对象
  static getInstance(dbUrl,dbName){
    if(!UserModel.instance){
      UserModel.instance = new UserModel(dbUrl,dbName)
    }
    return UserModel.instance
  }

  connectDb(){
    return new Promise((resolve,reject) => {
      mongodb.connect(this.dbUrl,{ useNewUrlParser: true,  useUnifiedTopology: true },(err,client) => {
        if(err) {
          console.log("数据库连接失败")
          reject(err)
        }
        console.log("[MongoDB] starting at port 27017")
        const dbClient = client.db(this.dbName)
        resolve(dbClient)
      })
    })
  }

  add(dbCollection,addData){
    return new Promise((resolve, reject) => {
      this.connectDbPromise.then(db => {
        db.collection(dbCollection).insertOne(addData,(err,result) => {
          if(err) reject(err);
          resolve(result)
        })
      })
    })
  }

  delete(dbCollection,deleteData){
    return new Promise((resolve, reject) => {
      this.connectDbPromise.then(db => {
        db.collection(dbCollection).deleteOne(deleteData,(err,result) => {
          if(err) reject(err);
          resolve(result)
        })
      })
    })
  }

  update(dbCollection,condition,updateData){
    return new Promise((resolve, reject) => {
      this.connectDbPromise.then(db => {
        db.collection(dbCollection).updateOne(condition,{
          $set:updateData
        },(err,result) => {
          if(err) reject(err);
          resolve(result)
        })
      })
    })
  }

  find(dbCollection,findData){
    return new Promise((resolve, reject) => {
      this.connectDbPromise.then(db => {
        db.collection(dbCollection).find(findData).toArray((err,result) => {
          if(err) reject(err);
          resolve(result)
        })
      })
    })
  }
}

module.exports = UserModel.getInstance(dbUrl, dbName)