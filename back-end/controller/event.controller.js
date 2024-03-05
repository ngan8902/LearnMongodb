const userModel = require("../model/schemas/user.schema");
const eventModel = require("../model/schemas/event.schema");

const eventController = {
    //ADD EVENT
    addEvent: async (req, res) => {
        try{
            const newEvent = new eventModel.eventModel(req.body);
            const saveEvent = await newEvent.save();
            if(req.body.user){
                const user = userModel.userModel.findById(req.body.user)
                await user.updateOne({ $push: { event : saveEvent._id}})
            }
            res.status(200).json(saveEvent);
        }catch(err){
            res.status(500).json(err);
            console.log(err)
        }
    },
    //GET ALL EVENT
    getAllEvent: async (req, res) => {
        try{
            const Event = await eventModel.eventModel.find();
            res.status(200).json(Event);
        }catch(err){
            res.status(500).json(err);
            console.log(err)
        }
    },
    //GET AN EVENT
    getAnEvent: async (req, res) => {
        try{
            const Event = await eventModel.eventModel.findById(req.params.id).populate('user');
            res.status(200).json(Event);
        }catch(err){
            res.status(500).json(err);
            console.log(err)
        }
    },
    //GET UPDATE EVENT
    updateEvent: async (req, res) => {
        try{
            const Event = await eventModel.eventModel.findById(req.params.id);
            await Event.updateOne({ $set: req.body});
            res.status(200).json('Updated Successly!');
        }catch(err){
            res.status(500).json(err);
            console.log(err)
        }
    },
    //DELETED EVENT
    deletedEvent: async (req, res) => {
        try{
            await userModel.userModel.updateMany(
                {event: req.params.id}, 
                {$pull : {event: req.params.id}}// dùng updateMany để lấy các id user trong Event ra để xóa 
            );
            await eventModel.eventModel.findByIdAndDelete(req.params.id);
            res.status(200).json('Deleted Successly!'); 
        }catch(err){
            res.status(500).json(err);
            console.log(err)
        }
    }
}

module.exports = eventController;