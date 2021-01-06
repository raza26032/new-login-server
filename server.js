let user = []

let express = require("express");
let cors = require('cors')
let morgan = require('morgan')
const PORT = process.env.PORT || 3000
let bodyParser = require('body-parser')
let app = express();
const mongoose = require("mongoose");

/////////////////////////////////////////////////////////////////////////////////////////////////

let dbURI = "mongodb+srv://raza26032:raza26032@cluster0.ypq3m.mongodb.net/firstDB?retryWrites=true&w=majority";
mongoose.connect(dbURI, { userNewUrlParser: true, useUnifiedTopology: true });

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    createdOn: { type: Date, 'default': Date.now }
});
var userModel = mongoose.model("users", userSchema);

///////////////////////////////////////////////////////////////////////////////////////////////

app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.json())

app.get("/", (req, res, next) => {
    console.log("SignUp Successfully");
    res.send("SignUp Successfully");
});

app.post("/signup", (req, res, next) => {
    if (!req.body.userName
        || !req.body.userEmail
        || !req.body.userPassword) {

        res.status(403).send(`
            please send name, email and passwod in json body.
            e.g:
            {
                "name": "malik",
                "email": "malikasinger@gmail.com",
                "password": "abc",
            }`)
        return;
    }

    userModel.findOne({ email: req.body.userEmail }, function (err, data) {
        if (err) {
            console.log(err)
        }

        else if (!data) {
            var newUser = new userModel({
                "name": req.body.userName,
                "email": req.body.userEmail,
                "password": req.body.userPassword,
            })
            newUser.save((err, data) => {
                if (!err) {
                    res.send("User created")
                } else {
                    console.log(err);
                    res.status(500).send("user create error, " + err)
                }
            });
        }
        else {
            res.send('Already registered')
            console.log(data)
        }
    })

})

app.post('/login', (req, res, next) => {
    userModel.findOne({ email: req.body.email, password: req.body.password }, function (err, data) {
        if (err) {
            console.log(err)
        }
        else if (!data) {
            res.send("user not found");
            console.log(data)
        }
        else {
            res.send("Login Sucessfully")
        }
    })

});

app.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})