const BaseModel = require("./baseModel")
const {dbUrl, dbName} =  require("../config")

class UserModel extends BaseModel{

  constructor(){
    super(dbUrl,dbName)
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

  findOne(dbCollection,findData){
    return new Promise()
  }
}

module.exports = new UserModel()