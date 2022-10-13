const express = require('express');
const app = express()
const port = 4000
let cors=require("cors");
// CORS allows us to manage a Cross-origin resource sharing policy so that our front end can talk to the server.
// Enable All CORS Requests
app.use(cors());
// ///////////////////////////////////////////////////////////////////\
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// ////////////////////////////////////////
app.set('view engine', 'ejs')//to use template engin
app.use(express.static( 'website'));//to add css style in our project
projectData = {};
// get ////////////
app.get("/all",(req,res)=>{
res.send(projectData)
})
/////////////////////////
// post////////////
app.post("/add",(req,res)=>{
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
})
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});
