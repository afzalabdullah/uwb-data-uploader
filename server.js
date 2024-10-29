const express = require('express');
const bodyParser = require('body-parser');
const dataRoute = require('./routes/dataRoute');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the data route
app.use('/api', dataRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
