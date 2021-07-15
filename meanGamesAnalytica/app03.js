const express = require("express");
const path = require("path");
const cors = require('cors')
require("dotenv").config();

require("./api/data/db");
const routers = require("./api/routes");

const app = express();
console.log("The env port is", process.env.PORT);

app.set("PORT", process.env.PORT);
app.use(cors());

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});


app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));

app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules/", express.static(path.join(__dirname, "node_modules")));
app.use("/api", function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use("/api", routers);


const server = app.listen(app.get("PORT"), function() {
    console.log("Listening to port ", server.address().port)
})



