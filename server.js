let user = [
    {
        userName: "zubair",
        userEmail: "zubair@gmail.com",
        userPassword: 222
    }
]

let express = require("express");
let cors = require('cors')
let morgan = require('morgan')
const PORT = process.env.PORT || 5000
let bodyParser = require('body-parser')
let app = express();

app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.json())

app.get("/", (req, res, next) => {
    console.log("SignUp Successfully");
    res.send("SignUp Successfully");
});

app.post("/signup", (req, res, next) => {
    var mEmail = req.body.userEmail === mEmail;
    console.log(mEmail)
    let isFound = false;

    for (let i = 0; i < user.length; i++) {
        if (user[i].userEmail === mEmail) {
            isFound = true;
            break;
        }
    }
    if (isFound) {
        res.send("User Already Exists")
    }
    else {
        user.push(req.body);
        res.send("SignUp Successfully")
    }
    console.log(user)
});

app.post("/login", (req, res, next) => {
    let email = req.body.email
    let password = req.body.password

    let isFound = false

    for (let i = 0; i <user.length; i++) {

        console.log(user[i].userEmail, email)

        if (user[i].userEmail === email) {
            isFound = i;
            var currentemail = email;
            break;
        }
    }
    if (isFound === false) {
        res.send("User Not Found")
    }
    else if (user[isFound].userPassword === password) {
        res.send(`Login Successfully Name: ${user[isFound].userName} Email: ${currentemail}`)
    }

    else {
        res.status(403).send("Password or Email Invalid")
    }
});
app.listen(PORT, function () {
    console.log("Server is Running");
});