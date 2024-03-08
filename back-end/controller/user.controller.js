const userModel = require("../model/schemas/user.schema");
const eventModel = require("../model/schemas/event.schema");
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");



SECRECT_KEY = "123"

const userController = {
    //ADD USER
    // addUsser: async (req, res) => {
    //    try{
    //         const newUser = new userModel.userModel(req.body);
    //         const saveUser = await newUser.save();
    //         res.status(200).json(saveUser);
    //    }catch(err){
    //         res.status(500).json(err);
    //         console.log(err)
    //    }
    // },
    // GET ALL USER
    getAllUser: async (req, res) => {
        try {
            const User = await userModel.userModel.find();
            res.status(200).json(User);
        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }
    },
    //GET AN USER
    getAnUser: async (req, res) => {
        try {
            // params là dấu : , id là id của ng dùng
            const User = await userModel.userModel.findById(req.params.id).populate('event')
            res.status(200).json(User);
        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }
    },
    //UPDATE USER
    updateUser: async (req, res) => {
        try {
            const User = await userModel.userModel.findById(req.params.id);
            await User.updateOne({ $set: req.body });
            res.status(200).json('Updated Successly!');
        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }
    },
    //DELETED USER
    deletedUser: async (req, res) => {
        try {
            await eventModel.eventModel.updateMany(
                { user: req.params.id },
                { user: null }// dùng updateMany để lấy các id user trong Event ra để xóa 
            );
            await userModel.userModel.findByIdAndDelete(req.params.id);
            res.status(200).json('Deleted Successly!');
        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }
    },
    //SIGNUP
    signup: async (req, res) => {
        try {
            const { email, fullname, password, phonenumber } = req.body;

            const passwordCipher = CryptoJS.AES.encrypt(password , SECRECT_KEY).toString();//Mã hóa pass

            // Tạo một instance mới của UserModel
            const newUser = new userModel.userModel({
                email: email,
                fullname: fullname,
                password: passwordCipher,
                phonenumber: phonenumber
            });
            const saveUser = await newUser.save();
            if (!saveUser) throw new Error('Inputs are not valid!!')

            res.status(200).json({
                code: 200,
                message: 'Create customer success!',
                data: saveUser
            })

        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }
    },
    //LOGIN
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Tìm người dùng trong cơ sở dữ liệu dựa trên email
            const foundUser = await userModel.userModel.findOne({ email });

            // Kiểm tra xem người dùng có tồn tại không
            if (!foundUser) {
                throw new Error('User not found');
            }

            const bytes = CryptoJS.AES.decrypt(foundUser.password, SECRECT_KEY)
            // So sánh mật khẩu đã nhập với mật khẩu đã lưu trữ trong cơ sở dữ liệu
            const passwordText = bytes.toString(CryptoJS.enc.Utf8)

            if (password !== passwordText) throw new Error('Password not match')

            // Nếu mọi thứ hợp lệ, gửi phản hồi thành công
            res.status(200).json({
                code: 200,
                message: 'Login successful',
                data: {
                    email: foundUser.email,
                    fullname: foundUser.fullname,
                    phonenumber: foundUser.phonenumber
                }
            });
        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }
    }
}

module.exports = userController;