const mongoose = require('mongoose')

const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@sergivv-cluster0.mavet.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('DB connected')
  })
  .catch(err => {
    console.error(err)
  })
