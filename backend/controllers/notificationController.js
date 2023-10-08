const Notification = require('../models/notificationModel');


exports.createNotification = async (req, res,next) => {
    try {
        const { recipient, sender, message, link } = req.body;
    
        let notification = await Notification.create({
        recipient,
        sender,
        message,
        link,
        });
    
        res.status(201).json({
        status: 'success',
        message: 'Notification sent successfully',
        data: {
            notification,
        },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
        status: 'error',
        message: 'Something went wrong while creating the notification',
        });
    }
};


exports.getNotifications = async (req, res,next) => {
    try {
        const notifications = await Notification.find({
            recipient: req.user._id,
        }).populate('sender');

        res.status(200).json({
            status: 'success',
            results: notifications.length,
            notifications,
            
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
}


exports.getNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                notification,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
}