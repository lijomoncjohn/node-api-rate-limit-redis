const express = require('express');
const cors = require('cors');
const { appConfig } = require('./config');
const router = require('./routes');
const ratelimiter = require('./helpers/ratelimiter');

// Init express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// Mount rate limiter middleware
app.use(ratelimiter);
// Mount routes
app.use(router);

const port = appConfig.port;

// start server
app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
