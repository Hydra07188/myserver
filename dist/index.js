"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error('MONGO_URI is not set. Copy .env.example to .env and fill it in.');
    process.exit(1);
}
// Middleware
app.use(express.json());
app.use((0, cors_1.default)());
app.use(express.static(path_1.default.join(__dirname, '..', 'src', 'public')));
// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/api', UserRoutes_1.default);
mongoose_1.default
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
