const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');



// Connect to DB 
const DB = process.env.DB_CONNECT;
mongoose.connect(DB)
    .then((result) => { console.log('connected to db .....') })
    .catch((err) => { console.log(err) });

// Import routes
const authRoute = require('./routes/auth');

dotenv.config();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());
//  Route Middleware
app.use('/api/user', authRoute);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);

