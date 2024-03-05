const userModel = require("../model/schemas/user.schema");
const eventModel = require("../model/schemas/event.schema");


const userController = {
    //ADD USER
    addUsser: async (req, res) => {
       try{
            const newUser = new userModel.userModel(req.body);
            const saveUser = await newUser.save();
            res.status(200).json(saveUser);
       }catch(err){
            res.status(500).json(err);
            console.log(err)
       }
    },
    // GET ALL USER
    getAllUser: async (req, res) => {
        try{
            const User = await userModel.userModel.find();
            res.status(200).json(User);
        }catch(err){
            res.status(500).json(err);
            console.log(err)
        }
    },
    //GET AN USER
    getAnUser: async (req, res) => {
        try{
            // params là dấu : , id là id của ng dùng
            const User = await userModel.userModel.findById(req.params.id).populate('event')
            res.status(200).json(User);
        }catch(err){
            res.status(500).json(err);
            console.log(err)
        }
    },
    //UPDATE USER
    updateUser: async (req, res) => {
        try{
            const User = await userModel.userModel.findById(req.params.id);
            await User.updateOne({ $set: req.body});
            res.status(200).json('Updated Successly!');
        }catch(err){
            res.status(500).json(err);
            console.log(err)
        }
    },
    //DELETED USER
    deletedUser: async (req, res) => {
        try{
            await eventModel.eventModel.updateMany(
                {user: req.params.id}, 
                {user: null}// dùng updateMany để lấy các id user trong Event ra để xóa 
            );
            await userModel.userModel.findByIdAndDelete(req.params.id);
            res.status(200).json('Deleted Successly!');
        }catch(err){
            res.status(500).json(err);
            console.log(err)    
        }
    }
}

module.exports = userController;