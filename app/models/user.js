const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, select: false },
})

module.exports = model("user", userSchema);


// class UserModel{
//   constructor(dbUrl,dbName){
//     this.dbUrl = dbUrl
//     this.dbName = dbName
//   }
//   connectDb(callback){
//     MongoClient.connect(this.dbUrl, (err, client) => {
//       console.log("bbb")
//       if(err){
//         console.log("数据库连接失败")
//       }
//       var result = callback(client)
//       client.close()
//     })
//   }
//   find(dbCollection){
//     this.connectDb(client => {
//       const collection = client.db(this.dbName).collection(dbCollection)
//       collection.find({})
//     })
//   }
//   findOne(dbCollection,name){
//     this.connectDb(client => {
//       const collection  = client.db(this.dbName).collection(dbCollection)
//       collection.findOne({name})
//     })
//   }
//   register(dbCollection,registerData){
//     const { username, password } = registerData
//     this.connectDb(client => {
//       const collection  = client.db(this.dbName).collection(dbCollection)
//       collection.insertOne({
//         username,
//         password
//       })
//     })
//   }
// }

// module.exports = new UserModel(dbUrl, dbName)