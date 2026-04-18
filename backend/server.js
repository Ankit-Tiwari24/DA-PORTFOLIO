require('dotenv').config();

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const projectRoutes = require('./routes/projects');
const messageRoutes = require('./routes/messages');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.warn("Local MongoDB connection failed. Falling back to in-memory database...");
        try {
            const { MongoMemoryServer } = require('mongodb-memory-server');
            const mongoServer = await MongoMemoryServer.create();
            const mongoUri = mongoServer.getUri();
            await mongoose.connect(mongoUri);
            console.log("Connected to In-Memory MongoDB");
        } catch (memErr) {
            console.error("In-Memory MongoDB failed to start", memErr);
        }
    }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
