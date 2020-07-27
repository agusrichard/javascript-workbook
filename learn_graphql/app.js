const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')


require('dotenv').config()

const app = express()

const uri = `mongodb+srv://agusrichard:${process.env.USERNAME}@learn-graphql.vr2l8.mongodb.net/${process.env.PASSWORD}?retryWrites=true&w=majority`
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => {
  console.log('Connected to database')
})

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Server is running on port 4000')
})