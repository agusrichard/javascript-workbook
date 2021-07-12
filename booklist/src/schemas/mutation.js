const graphql = require('graphql')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Book = require('../models/book')
const { UserType, LoginType } = require('./query')

console.log('mutation')


const Mutation = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    register: {
      type: UserType,
      args: {
        username: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        email: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        password: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
      },
      resolve: (source, args) => {
        console.log('register')
        let user = User({
          username: args.username,
          email: args.email,
          password: args.password
        })
        return user.save()
      }
    },
    login: {
      type: LoginType,
      args: {
        email: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        password: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
      },
      resolve: (source, args) => {
        console.log('login')
      }
    }
  }
})


module.exports = { Mutation }