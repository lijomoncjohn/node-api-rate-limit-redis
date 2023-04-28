const db = require('../../models');
const { success, serverError } = require('../../utils/response');

module.exports = {
	getBlogPosts: async (req, res) => {
		try {
			const blogs = await db.blog.findAll();
			return success(res, '', blogs);
		} catch (error) {
			return serverError(res);
		}
	},
};
