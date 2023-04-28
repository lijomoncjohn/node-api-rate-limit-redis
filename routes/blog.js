const express = require('express');
// Import controllers
const { getBlogPosts } = require('../modules/blog/blog.controller');

const blogRouter = express.Router();

// define blog routes
blogRouter.route('/').get(getBlogPosts); // To get all blogs

module.exports = blogRouter;
