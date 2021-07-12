const graphql = require('graphql')
const bcrypt = require('bcrypt')
const { getUserId, login } = require('../utils')

const DateTime = new graphql.GraphQLScalarType({
  name: 'DateTime',
  parseValue: (value) => {
    return Date.parse(value)
  }
})


const UserType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: graphql.GraphQLID },
    username: { type: graphql.GraphQLString },
    email: { type: graphql.GraphQLString },
    password: { type: graphql.GraphQLString },
    fullname: { type: graphql.GraphQLString },
    books: {
      type: new graphql.GraphQLList(BookType),
      resolve: async (parent, args, context) => {
        getUserId(context)
        const user = await context.User.findById(parent.id)
        return user.books.map(async book => {
          return await context.Book.findById(book)
        })
      }
    }
  })
})

const BookType = new graphql.GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: graphql.GraphQLID },
    done: { type: graphql.GraphQLBoolean },
    title: { type: graphql.GraphQLString },
    author: { type: graphql.GraphQLString },
    start: { type: DateTime },
    end: { type: DateTime },
    comment: { type: graphql.GraphQLString },
    user: { 
      type: UserType,
      resolve: async (parent, args, context) => {
        getUserId(context)
        const book = await context.Book.findById(parent.id)
        return await context.User.findById(book.userId)
      }
    }
  })
})

const AuthPayload = new graphql.GraphQLObjectType({
  name: 'AuthPayload',
  fields: () => ({
    token: { type: graphql.GraphQLString },
    user: { type: UserType }
  })
})

const RootQuery = new graphql.GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    users: {
      type: new graphql.GraphQLList(UserType),
      resolve: (parent, args, context) => {
        const userId = getUserId(context)
        return context.User.find({})
      }
    },
    books: {
      type: new graphql.GraphQLList(BookType),
      resolve: (parent, args, context) => {
        const userId = getUserId(context)
        return context.Book.find({})
      }
    },
    user: {
      type: UserType,
      resolve: (parent, args, context) => {
        const userId = getUserId(context)
        return context.User.findById(userId)
      }
    }
  }
})

const Mutation = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    register: {
      type: UserType,
      args: {
        username: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        email: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        password: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        fullname: { type: graphql.GraphQLString } 
      },
      resolve: async (parent, args, context) => {
        let user = context.User({
          username: args.username,
          email: args.email,
          fullname: args.fullname,
          password: bcrypt.hashSync(args.password, process.env.SALT)
        })
        return await user.save()
      }
    },
    login: {
      type: AuthPayload,
      args: {
        email: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        password: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
      },
      resolve: async (parent, args, context) => {
        const user = await context.User.findOne({ email: args.email })
        return login(user, args.password)
      }
    },
    addBook: {
      type: BookType,
      args: {
        title: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        author: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
      },
      resolve: async (parent, args, context) => {
        const userId = getUserId(context)
        const user = await context.User.findById(userId)
        const book = context.Book({
          userId,
          author: args.author,
          title: args.title
        })
        user.books.push(book.id)
        user.save()
        return await book.save()
      }
    },
    doneRead: {
      type: BookType,
      args: {
        bookId: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        comment: { type: graphql.GraphQLString }
      },
      resolve: async (parent, args, context) => {
        const userId = getUserId(context)
        return context.Book.findByIdAndUpdate(args.bookId, {
          done: true,
          end: Date.now(),
          comment: args.comment
        })
      }
    }
  }
})


module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
