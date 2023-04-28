const Redis = require('ioredis');
const moment = require('moment');
const { redis, ratelimit } = require('../config');
const { tooManyRequests } = require('../utils/response');

const redisClient = new Redis({
	host: redis.host,
	port: redis.port,
});

redisClient.once('error', () => new Error());

const ratelimiter = async (req, res, next) => {
	const ip = (
		req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress
	).split(',')[0];
	console.log(ip);

	const ipData = await redisClient.get(ip);
	const requestTime = moment();
	if (ipData) {
		// parse redi sdata
		const parseData = JSON.parse(ipData);
		let windowStartTimestamp = moment()
			.subtract(ratelimit.maxWindowSize, 'seconds')
			.unix();
		// Get requests within interval
		let requestsWithinWindow = parseData.filter((entry) => {
			return entry.requestTimeStamp > windowStartTimestamp;
		});
		// calculate cumulative sum to increment request count
		let totalWindowRequestsCount = requestsWithinWindow.reduce(
			(accumulator, entry) => {
				return accumulator + entry.requestCount;
			},
			0
		);
		// Check if requests exceed max allowed requests
		if (totalWindowRequestsCount >= ratelimit.maxRequests) {
			tooManyRequests(res, 'Too many requests');
		} else {
			let lastRequestLog = parseData[parseData.length - 1];
			console.log('lastRequestLog', lastRequestLog);
			let potentialCurrentWindowIntervalStartTimeStamp = requestTime
				.subtract(ratelimit.interval, 'seconds')
				.unix();
			if (
				lastRequestLog.requestTimeStamp >
				potentialCurrentWindowIntervalStartTimeStamp
			) {
				// Increment request count
				lastRequestLog.requestCount++;
				parseData[parseData.length - 1] = lastRequestLog;
			} else {
				// Update redis with new count
				parseData.push({
					requestTimeStamp: requestTime.unix(),
					requestCount: 1,
				});
			}
			console.log('parseData', parseData);
			await redisClient.set(req.ip, JSON.stringify(parseData));
			next();
		}
	} else {
		let records = [];
		let requestLog = {
			requestTimeStamp: requestTime.unix(),
			requestCount: 1,
		};
		records.push(requestLog);
		await redisClient.set(req.ip, JSON.stringify(records));
		next();
	}
};

module.exports = ratelimiter;
