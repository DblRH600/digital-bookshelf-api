import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import booksRouter from './routes/books.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;

const uri = process.env.MONGODB_URI;

// =========== Middleware =========== //
app.use(express.json());
app.use('/api/books', booksRouter);



// ======== DB Connection ========== //
mongoose
.connect(uri)
.then(console.log('Connection to MongoDB established'))
.catch(e => console.log(`Error connecting to MongoDB: ${e}`))

let isConnected = false;


// =========== Routes ============== //
app.get('/', (req, res) => {
    if (isConnected) {
        return res.json({ message: 'Successful connection to DB!' })
    } else {
        return res.status(500).json({ message: 'Failed to connect to DB!' })
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})