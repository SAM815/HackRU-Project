const Message = require("../models/messageModel");
const User = require("../models/User");


exports.createMessage = async (req, res, next) => {
  try {
    //extract the sender's ID from the authenticated user
    const sender = req.user._id;
    const { receiver, message } = req.body;

    //validate the request body
    if (!receiver || !message) {
      return res.status(400).json({
        status: "fail",
        message: "Please enter all the fields",
      });
    }

    //check if the receiver exists
    const receiverExists = await User.findById(receiver);
    if (!receiverExists) {
      return res.status(400).json({
        status: "fail",
        message: "Receiver not found",
      });
    }

    //create a new message
    let newMessage = await Message.create({
      sender,
      receiver,
      message,
    });
    
    // Respond with a success message and the new message data
    res.status(201).json({
      status: "success",
      message: "Message sent successfully",
      data: {
        newMessage,
      },
    });
  } catch (error) {
    console.error("error",error);
    // Respond with an error message
    res.status(500).json({
      status: "error",
      message: "Something went wrong while creating the message",
    });
  }
}


exports.getMessages = async (req, res,next) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id },
        { receiver: req.user._id },
      ],
    }).populate("sender receiver");

    res.status(200).json({
      status: "success",
      messages,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
}


exports.getConversation = async (req, res,next) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: req.params.id },
        { sender: req.params.id, receiver: req.user._id },
      ],
    }).populate("sender receiver");

    res.status(200).json({
      status: "success",
      messages,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
}


