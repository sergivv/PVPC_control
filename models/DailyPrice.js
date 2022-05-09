const { Schema, model } = require('mongoose')

const priceSchema = new Schema({
  date: String,
  PCB: [Number],
  CYM: [Number]
})

const Price = model('Price', priceSchema)

module.exports = Price
