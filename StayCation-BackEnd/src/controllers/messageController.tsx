const Message = require('../models/messageModel');
//-----------------------------------------------------------------------
exports.createMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Missing required fields: name, email, and message' });
        }
        res.status(200).json({ message: 'Message sent successfull' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: error.message});
    }
};

exports.getAllMessages = async(req, res) => {
    try {
        const messages = await Message.find({});
        const messageTexts = messages.map(message => message.name + ": " + message.message + ". Sent From: " + message.email);
        res.status(200).json(messageTexts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching messages' });
    }
};