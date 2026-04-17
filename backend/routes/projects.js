const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Project = require('../models/Project');
const verifyAdmin = require('../middleware/auth');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Public route to get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin secure route: Create project
router.post('/', verifyAdmin, upload.single('image'), async (req, res) => {
    try {
        const projectData = {
            ...req.body,
            tools: req.body.tools ? req.body.tools.split(',').map(t => t.trim()) : [],
        };
        
        if (req.file) {
            projectData.image = `/uploads/${req.file.filename}`;
        }
        
        const newProject = new Project(projectData);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin secure route: Update project
router.put('/:id', verifyAdmin, upload.single('image'), async (req, res) => {
    try {
        const projectData = { ...req.body };
        if (req.body.tools) {
            projectData.tools = req.body.tools.split(',').map(t => t.trim());
        }
        
        if (req.file) {
            projectData.image = `/uploads/${req.file.filename}`;
        }
        
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, projectData, { new: true });
        res.json(updatedProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin secure route: Delete project
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
