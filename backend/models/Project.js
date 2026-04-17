const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tools: [{ type: String }],
    insights: { type: String },
    githubLink: { type: String },
    liveLink: { type: String },
    category: { type: String },
    image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
