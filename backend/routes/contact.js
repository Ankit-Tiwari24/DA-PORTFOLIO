const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const nodemailer = require('nodemailer');
const multer = require('multer');

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'image/jpeg', 
            'image/png', 
            'application/pdf', 
            'application/msword', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPG, PNG, PDF, and DOC/DOCX are allowed.'));
        }
    }
});

router.post('/', (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                console.error("Multer error during upload:", err);
                return res.status(400).json({ success: false, message: 'File too large (Max 5MB).' });
            }
            console.error("Unknown error during upload:", err);
            return res.status(400).json({ success: false, message: err.message });
        }
        next();
    });
}, async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }
        
        // Spam protection: check message length
        if (message.length < 10) {
            return res.status(400).json({ success: false, message: 'Message is too short to be valid.' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format.' });
        }
        
        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error("CRITICAL ERROR: Environment variables EMAIL_USER and EMAIL_PASS are missing!");
            return res.status(500).json({ success: false, message: 'Server email configuration is missing.' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: email,
            to: 'ankittiwari201600@gmail.com',
            subject: 'New Contact Message from Portfolio',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            replyTo: email
        };

        if (req.file) {
            mailOptions.attachments = [
                {
                    filename: req.file.originalname,
                    content: req.file.buffer
                }
            ];
        }

        try {
            await transporter.sendMail(mailOptions);
            res.status(201).json({ success: true, message: 'Message sent successfully!' });
        } catch (mailError) {
            console.error("Nodemailer failed to dispatch message:", mailError.message, mailError.stack);
            return res.status(500).json({ success: false, message: 'Unable to send message. Please try again later.' });
        }
        
    } catch (error) {
        console.error("Critical server failure handling contact routing:", error.message, error.stack);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
