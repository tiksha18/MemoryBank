import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
// import dotenv from'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
// dotenv.config();


// setting bodyParser
app.use(bodyParser.json({ limit : "30mb", extended : true }));
app.use(bodyParser.urlencoded({ limit : "30mb", extended : true }));
app.use(cors());

//middleware or routes
app.use('/posts', postRoutes);  // all the urls like localhost:5000/posts requests will reach here and landed to postRoutes then
app.use('/user', userRoutes);

// message that heroku will show
// app.get('/', (req, res) => {
//     res.send('Hello to Memory Bank');
// })

const CONNECTION_URL = 'mongodb+srv://mymemos:mymemoriez1108@cluster0.duav5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// server connecting to database
const PORT = process.env.PORT || 5000;

// npm install env for this => process.env.CONNECTION_URL
mongoose.connect( CONNECTION_URL, { useNewUrlParser : true, useUnifiedTopology : true })
    .then( () => app.listen(PORT, () => console.log(`Server started at port : ${PORT}`)))
    .catch( (error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);  // ensures we doesnt get any warnings in the console