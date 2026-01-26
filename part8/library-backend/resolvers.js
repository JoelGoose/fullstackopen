const { GraphQLError } = require('graphql')

const Book = require('./models/book')
const Author = require('./models/author')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
			if (args.genre) {
				const books = await Book.find({ genres: args.genre})
				return books
			}
			else
				return Book.find({})
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: (root) => { // NOT WORKING
      // return books.filter(book => book.author === root.name).length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
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
    editAuthor: async (root, args) => {
      const author = await Author.findOneAndUpdate({ name: args.name }, { $set: { born: args.setBornTo }}, { new: true })
			return author
    }
  }
}

module.exports = resolvers