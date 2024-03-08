const express = require("express");
const { createServer } = require('http');
const cors = require('cors');
const app = express();
const server = createServer(app);
const morgan = require('morgan')
app.set('port', process.argv[2] || 8000);
const port = process.env.PORT || app.get('port');
const bodyParser = require('body-parser');
const userRouter = require('./router/user');
const eventRouter = require('./router/event');


require('./model')

//Middelware

app.set('view engine', 'ejs');

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(morgan("common"))

app.use(express.static(__dirname + '/public/build'));
console.log(__dirname + '/public/build')

//Router
app.use("/api/user", userRouter)
app.use("/api/event", eventRouter)



server.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
