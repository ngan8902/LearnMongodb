//Tham chiếu thư viện
const mongoose = require('mongoose');
//Link kết nối tới Database
var url = "mongodb+srv://bichngan8902:5qQhQ8P1gnrTwyfN@cluster0.okizolf.mongodb.net/quanlysukien?retryWrites=true&w=majority&appName=Cluster0"
//Tạo đối tượng và truyền dữ liệu qua url
mongoose.connect(url).then(() => {
    console.log('Connected')
})

// //Tích hợp với Sequelize 
// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('delicious', 'root', '123456',{
//     host: '3307',
//     dialect: 'mysql' 
// });


