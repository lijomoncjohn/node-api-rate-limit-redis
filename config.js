require('dotenv').config();

const appConfig = {
	port: process.env.PORT || 4000,
};

module.exports = {
	appConfig,
};
