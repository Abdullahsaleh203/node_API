import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
const app = express();
import authRoute from './routes/auth';
import authPost from './routes/post';


// Connect to DB 
config();
const DB = process.env.DB_CONNECT;
const PORT = process.env.PORT || 3000;

connect(DB)
    .then((result) => { console.log('connected to db .....') })
    .catch((err) => { console.log(err) });





// Middleware
app.use(json());

//  Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', authPost);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);

