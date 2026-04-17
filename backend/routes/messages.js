const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const verifyAdmin = require('../middleware/auth');
const nodemailer = require('nodemailer');

// Public route to submit a contact message
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        
        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        // Nodemailer setup
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail', // Standard default, user can change if needed
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                });

                const mailOptions = {
                    from: email,
                    to: process.env.EMAIL_USER,
                    subject: `New Portfolio Message from ${name}`,
                    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
                    replyTo: email
                };

                await transporter.sendMail(mailOptions);
                console.log("Email sent to admin.");
            } catch (mailError) {
                console.error("Failed to send email via nodemailer:", mailError);
                // Do not block the response if email fails to send but DB save succeeds
            }
        }
        
        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin secure route to get all messages
router.get('/', verifyAdmin, async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
