const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routerAuth = require('./router/authRouter');
const routerWork = require('./router/workRouter');

dotenv.config();  // Load environment variables

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("connected to the db"))
    .catch((err) => console.log(err));
    app.use(cors({
      origin: '*', // Cho phép tất cả các nguồn
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức được cho phép
      allowedHeaders: ['Content-Type', 'Authorization'], // Các header được cho phép
  }));
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.use("/api/users",routerAuth);
app.use("/api/tasks",routerWork);

const ip = "192.168.137.1";
const port = process.env.PORT || 3000; 

app.listen(port, () => {
  console.log(`Product server listening on ${port}`);
});
