const mongoose = require("mongoose")
const { Schema, model } = mongoose

const TopicSchema = new Schema({
  
})

module.exports = model("Topic", TopicSchema, "topic");