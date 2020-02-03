const mongodb = require('mongodb').MongoClient

class BaseModel{
  constructor(dbUrl,dbName){
    this.dbUrl = dbUrl
    this.dbName = dbName
    if(!this.connectDbPromise){
      this.connectDbPromise = this.connectDb()
    }
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
}

module.exports = BaseModel