const ObjectID  = require('mongodb').ObjectID
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

  remove(dbCollection,id){
    return new Promise((resolve, reject) => {
      this.connectDbPromise.then(db => {
        db.collection(dbCollection).findOneAndDelete({"_id":new ObjectID(id)},(err,result) => {
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
    return new Promise((resolve, reject) => {
      this.connectDbPromise.then(db => {
        db.collection(dbCollection).findOne(findData,(err,result) => {
          if(err) reject(err);
          resolve(result)
        })
      })
    })
  }
}

module.exports = new UserModel()