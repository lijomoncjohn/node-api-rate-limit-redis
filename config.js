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
	maxWindowSize: process.env.RATE_LIMIT_WINDOW_SIZE_HOURS || 60,
	maxRequests: process.env.RATE_LIMIT_WINDOW_MAX_REQUESTS || 20,
	interval: process.env.RATE_LIMIT_WINDOW_INTERVAL || 60,
};

const db = {
	database: process.env.DB_NAME || 'test_db',
	username: process.env.DB_USERNAME || 'postgres',
	password: process.env.DB_PASSWORD || 'admin',
	host: process.env.DB_HOST || 'localhost',
	dialect: process.env.DB_DIALECT || 'postgres',
};

httpStatusCodes = {
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	UNPROCESSABLE_ENTITY: 422,
	TOO_MANY_REQUESTS: 429,
	INTERNAL_SERVER_ERROR: 500,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
};

module.exports = {
	appConfig,
	redis,
	ratelimit,
	db,
	httpStatusCodes,
};
