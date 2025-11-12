const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0) 
  return totalLikes
} 

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce((currentMax, blog) => Math.max(currentMax, blog.likes), 0)
  const favoriteBlog = blogs.find(blog => blog.likes === mostLikes)
  return favoriteBlog
}

const mostBlogs = (blogs) => {
  if (_.isEmpty(blogs)) { return undefined }
  const mostFrequentAuthor = _.maxBy(blogs, function(blog) { return blog.author }).author
  const authorBlogAmount = _.countBy(blogs, function(blog) { return blog.author === mostFrequentAuthor}).true
  return { author: mostFrequentAuthor, blogs: authorBlogAmount }
}

// this solution is a mess
const mostLikes = (blogs) => {
  if (_.isEmpty(blogs)) { return undefined }
  
  let maxAuthor = null
  let maxLikes = 0

  const authorsGrouped = _.groupBy(blogs, function(blog) { return blog.author})
  _.forEach(authorsGrouped, function(blogsOfAuthor, author) {
    const totalLikes = _.sumBy(blogsOfAuthor, function(blog) { return blog.likes })
    if (totalLikes > maxLikes) {
        maxLikes = totalLikes
        maxAuthor = author
    }
  })
  return { author: maxAuthor, likes: maxLikes}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}