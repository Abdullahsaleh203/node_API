const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const authRoute = require('./routes/auth');
const authPost = require('./routes/post');


// Connect to DB 
dotenv.config();
const DB = process.env.DB_CONNECT;
const PORT = process.env.PORT || 3000;

mongoose.connect(DB)
    .then((result) => { console.log('connected to db .....') })
    .catch((err) => { console.log(err) });





// Middleware
app.use(express.json());

//  Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', authPost );


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);

