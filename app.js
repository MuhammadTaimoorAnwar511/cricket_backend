const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const UserRouter = require('./Routes/Routes');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
console.log('Connected to MongoDB');});
mongoose.connection.on('error', (err) => { console.error('MongoDB connection error: ', err);});
app.use('/player', UserRouter);
app.listen(PORT, () => {
    console.log(`Server listening at ${BASE_URL}${PORT}`);
});