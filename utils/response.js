const { httpStatusCodes } = require('../config');

const success = (res, message, data = null) => {
	const response = {
		status: true,
		message,
	};

	if (data) response.data = data;
	res.status(httpStatusCodes.OK).send(response);
};

const serverError = (res, error, message) => {
	loggerUtil.error({ message: error.toString(), level: 'error' });

	res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({
		status: false,
		error: error.toString(),
		message:
			message || 'We are unable to process your request now. Please try again',
	});
};

const tooManyRequests = (res, message) => {
	res.status(httpStatusCodes.TOO_MANY_REQUESTS).send({
		status: false,
		message,
	});
};

module.exports = {
	success,
	serverError,
	tooManyRequests,
};
