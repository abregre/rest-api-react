const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const app = express();


//Load config env
dotenv.config({ path: './config/.env' });

//Express body-parser middleware
app.use(express.json());

//DB connection
connectDB();

//Logs for console in dev enviroment
app.use(morgan('dev'));



//Use routes
app.use('/articles', require('./routes/api/articles'))
app.use('/categories', require('./routes/api/categories.js'))


//PORT Configuration
const port = process.env.PORT || 5001

app.listen(port, () => console.log(`Server started on port ${port}`));
