import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import connectdb from './database/db.js';
dotenv.config();

if (!process.env.MONGO_URI) {
    console.error('MONGODB_URL is not defined in the environment variables.');
    process.exit(1); // Exit the application if the variable is missing
}

const app = express();
app.use(cors);
connectdb()
app.use(express.json)
// const PORT = process.env.PORT;
// const MONGO_URI = process.env.MONGO_URI;

// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('Database connected successfully'))
// .catch(err => console.error('Error connecting to db', err));

// Use authentication routes
app.use('/api/auth', authRoutes);
app.listen(process.env.PORT,()=>{
    console.log(`app listening at port ${process.env.PORT}`)
})