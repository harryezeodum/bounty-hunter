// To create a new Server
// npm init -y
// npm install express
// npm install morgan
// npm install -g nodemon
// npm install uuid for fake IDs
// npm install mongoose

const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

// Middleware (for every request)
app.use(express.json());
app.use(morgan("dev"));

mongoose.connect("mongodb+srv://harryezeodum25:Genesisruona2017.@cluster1.xgx20fv.mongodb.net/BountyDB?retryWrites=true&w=majority&appName=Cluster1", console.log('connected to db'))

// Routes
app.use("/api/bounty", require("./routes/bountyHunterRoutes.js"));
app.use(express.static(path.join(__dirname, "client", "dist")));

// Error handler
app.use((err, req, res, next) => {
    console.log(err);
    //return res.status(501).send({ Error: err.message })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(9000, () => {
    console.log("The server is running on Port 9000");
})
