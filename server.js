const express = require("express");
const app = express();
const db = require("./db");
const path = require("path");
app.use(express.json());
//require('dotenv').config();
const port = 3000;

// app.get('/idle', (req,res)=>{
//     res.send('idle working')
// })


app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

const personRouters = require('./notificationsRouter');
const registerationRouter = require('./registerationRouter');
app.use('/person', personRouters);
app.use('/register', registerationRouter);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});