import 'dotenv/config';
import express = require('express');
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import userRoutes from './UserRoutes';

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('MONGO_URI is not set. Copy .env.example to .env and fill it in.');
  process.exit(1);
}

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'src', 'public')));

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api', userRoutes);

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });
