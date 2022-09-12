const express = require("express");
const serverConfig = require("./configs/server.config");
const app = express();
const mongoose = require("mongoose")
const User = require("./models/user.model")
const dbConfig = require("./configs/db.config")
const bcrypt = require("bcryptjs");


const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
    console.log("Error while connecting to mongoDB");
});
db.once("open", () => {
    console.log("Connected to mongoDB");
    init()
});


async function init() {
    try {
        // await User.collection.drop();
        const user = await User.findOne({ userId: "admin" });
        if (user) {
            console.log("Admin user is already present");
            return;
        }
            user = await User.create({
            name: "Derin",
            userId: "admin",
            password: bcrypt.hashSync("maxman", 8),
            email: "derin.maxman@gmail.com",
            userType: "ADMIN"
        })

    } catch (err) { console.log("error in db initialization", err.message); }
}


require("./routes/auth.route")(app);        
require("./routes/user.route")(app);     
require("./routes/ticket.route")(app);    


app.listen(serverConfig.PORT, () => console.log("Server started on the PORT:", serverConfig.PORT)) 