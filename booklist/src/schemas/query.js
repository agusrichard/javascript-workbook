const graphql = require('graphql')
const User = require('../models/user')
const Book = require('../models/book')
const { UserType } = require('./types')

console.log('query')

const RootQuery = new graphql.GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    users: {
      type: new graphql.GraphQLList(UserType),
      resolve: (source, args) => {
        console.log('RootQuery')
      }
    }
  }
})


module.exports = { RootQuery }