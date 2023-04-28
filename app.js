const express = require('express');
const cors = require('cors');
const { appConfig } = require('./config');
const router = require('./routes');

// Init express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Mount routes
app.use(router);

const port = appConfig.port;

// start server
app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
