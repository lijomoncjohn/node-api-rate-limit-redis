const express = require('express');
const cors = require('cors');
const { appConfig } = require('./config');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = appConfig.port;

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
