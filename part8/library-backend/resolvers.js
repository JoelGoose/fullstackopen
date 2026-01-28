const { GraphQLError } = require('graphql')

const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
			if (args.genre) {
				const books = await Book.find({ genres: args.genre }).populate('author')
				return books
			}
			else
				return Book.find({}).populate('author')
    },
    allAuthors: async () => Author.find({}),
		me: (root, args, context) => {
			return context.currentUser
		}
  },
  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root._id })
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
			
			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'UNAUTHENTICATED'
					}
				})
			}
			
			let author = await Author.findOne({ name: args.author })
			if (!author) {
				author = new Author({ name: args.author })
				try {
					await author.save()
				} catch (error) {
					throw new GraphQLError(`Saving new author failed: ${error}`, {
						extensions: {
							code: 'BAD_USER_INPUT',
							invalidArgs: args.name,
							error
						}
					})
				}
			}
			const book = new Book({ ...args, author: author })
			try {
				await book.save()
			} catch (error) {
				throw new GraphQLError(`Saving new book failed: ${error}`, {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.title,
						error
					}
				})
			}
			return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
			
			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'UNAUTHENTICATED'
					}
				})
			}
			
			const author = await Author.findOneAndUpdate({ name: args.name }, { $set: { born: args.setBornTo }}, { new: true })
			return author
    },
		createUser: async (root, args) => {
			const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
			return user.save()
				.catch(error => {
					throw new GraphQLError(`Creating the user failed: ${error.message}`, {
						extensions: {
							code: 'BAD_USER_INPUT',
							invalidArgs: [args.username, args.favoriteGenre],
							error
						}
					})
				})
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })

			if ( !user || args.password !== 'secret' ) {
				throw new GraphQLError('wrong credentials', {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				})
			}

			const userForToken = {
				username: user.username,
				id: user._id
			}

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
		}
  }
}

module.exports = resolvers