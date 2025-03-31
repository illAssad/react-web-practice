// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // In production, use environment variable

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/homecare', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


// Client schema and model
const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    birthday: { type: String },
    allergies: [{ type: String }],
    notes: [{
        id: { type: String, required: true },
        date: { type: Date, default: Date.now },
        note: { type: String, required: true },
        writtenBy: { type: String }
    }],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdAt: { type: Date, default: Date.now }
});

const Client = mongoose.model('Client', clientSchema);

// Authentication middleware
const authMiddleware = (req, res, next) => {
    const token = req.header('auth');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Client routes
app.get('/api/clients', authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const clients = await Client.find()
        .skip(skip)
        .limit(limit);

        const total = await Client.countDocuments();

        res.json({
            clients,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            totalClients: total
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.get('/api/clients/:id', authMiddleware, async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.json(client);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(500).send('Server error');
    }
});

app.post('/api/clients', authMiddleware, async (req, res) => {
    const { name, phone, address, birthday, allergies, notes, status } = req.body;

    // Validation
    if (!name || !phone || !address) {
        return res.status(400).json({ message: 'Please enter all required fields' });
    }

    try {
        // Create new client
        const newClient = new Client({
            name,
            phone,
            address,
            birthday: birthday || '',
            allergies: allergies || [],
            notes: notes || [],
            status: status || 'active'
        });

        // Save client
        const client = await newClient.save();
        res.json(client);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.put('/api/clients/:id', authMiddleware, async (req, res) => {
    const { name, phone, address, birthday, allergies, notes, status } = req.body;

    // Build client object
    const clientFields = {};
    if (name) clientFields.name = name;
    if (phone) clientFields.phone = phone;
    if (address) clientFields.address = address;
    if (birthday) clientFields.birthday = birthday;
    if (allergies) clientFields.allergies = allergies;
    if (notes) clientFields.notes = notes;
    if (status) clientFields.status = status;

    try {
        let client = await Client.findById(req.params.id);

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        // Update client
        client = await Client.findByIdAndUpdate(
            req.params.id,
            { $set: clientFields },
            { new: true }
        );

        res.json(client);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(500).send('Server error');
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));