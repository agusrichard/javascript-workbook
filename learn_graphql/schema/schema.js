const graphql = require('graphql')
const _ = require('lodash')
const { 
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql


const books = [
  { name: 'The Silmarillion', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: '1984', genre: 'Dystopian', id: '2', authorId: '2' },
  { name: 'The Hobbit', genre: 'Fantasy', id: '3', authorId: '1' },
  { name: 'Animal Farm', genre: 'Dystopian', id: '4', authorId: '2' },
  { name: 'Digital Fortress', genre: 'Fiction', id: '5', authorId: '3' },
  { name: 'Da Vinci Code', genre: 'Fiction', id: '6', authorId: '3' },
]

const authors = [
  { name: 'J.R.R Tolkien', age: 69, id: '1' },
  { name: 'George Orwell', age: 42, id: '2' },
  { name: 'Dan Brown', age: 39, id: '3' }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent, args) => {
        return _.find(authors, { id: parent.authorId })
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        return _.filter(books, { authorId: parent.id })
      }
    }
  })
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return _.find(books, { id: args.id })
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return _.find(authors, { id: args.id })
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (parent, args) => {
        return authors
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery
})