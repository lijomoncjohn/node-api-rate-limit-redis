const { db } = require('../config');

module.exports = {
	development: {
		username: db.username,
		password: db.password,
		database: db.database,
		host: db.host,
		dialect: db.dialect,
	},
};
