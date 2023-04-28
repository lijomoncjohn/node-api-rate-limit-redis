require('dotenv').config();

const appConfig = {
	port: process.env.PORT || 4000,
};

const redis = {
	host: process.env.REDIS_HOST || 'localhost',
	port: process.env.REDIS_PORT || '6379',
	exp: process.env.REDIS_EXP || '86400',
};

const ratelimit = {
	maxWindowSize: process.env.RATE_LIMIT_WINDOW_SIZE_HOURS || 1,
	maxRequests: process.env.RATE_LIMIT_WINDOW_MAX_REQUESTS || 20,
	interval: process.env.RATE_LIMIT_WINDOW_INTERVAL || 1,
};

module.exports = {
	appConfig,
	redis,
	ratelimit,
};
