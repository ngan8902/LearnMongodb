const express = require("express");
const cors = require('cors');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { userModel } = require('./model/schemas/user.schema')
const { eventModel } = require('./model/schemas/event.schema')
const { postModel } = require('./model/schemas/post.schema')


require('./model')
app.use(express.json())

app.use(cors())

app.use(bodyParser.json())

app.use(express.static(__dirname + '/public/build'));
console.log(__dirname + '/public/build')

app.get('/adduser', async (req, res, next) => {
  await userModel.create({
    username: 'Bich Ngan',
    email: 'bichnganb722@gmail.com',
    password: '12345',
    fullname: 'ngan nguyen'
  })
  const userList = await userModel.find()
  res.json(userList)
})

app.get('/addevent', async (req, res, next) => {
  await eventModel.create({
    name: 'event 1',
    user: '65e2caf4f512ca59eb62c6ad'
  })
  res.end()
})

app.get('/addpost', async (req, res, next) => {
  await postModel.create({
    titel: 'Tiệc sinh nhật',
    author: '65e2caf4f512ca59eb62c6ad'
  })
  res.end()
})

app.get('/getevent', async (req, res, next) => {
  const eventlist = await eventModel.find().populate('user')
  res.json(eventlist)
})

app.get('/getpost', async (req, res, next)=> {
  const postlist = await postModel.find().populate('author')
  res.json(postlist)
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
  });