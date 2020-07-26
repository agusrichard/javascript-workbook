const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql
const _ = require('lodash')

const books = [
  { name: 'The Silmarillion', genre: 'Fantasy', id: '1' },
  { name: '1984', genre: 'Dystopia', id: '2' },
  { name: 'The Hobbit', genre: 'Fantasy', id: '3' }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve: (parent, args) => {
        // code to get data from db or other sources
        return _.find(books, { id: args.id })
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery
})