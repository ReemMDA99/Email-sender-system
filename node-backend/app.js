// import/require dependencies express/cors/bodyparser/nodemailer
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


// set up express routes to get and post request
const app = express();
// use cors as to access request allow origin to access frontend request
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

//the app is listening on port number 3000
app.listen(3000, () => {
    console.log("Successfully started server at port 3000");
});

// Get the user data
app.get("/", (req, res) => {
    res.send(
      "<h1 style='text-align: center'>Email Sender System by Reem</h1>"
    );
});

// add/send email
app.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, info => {
      console.log(`The mail has been sent with the id: ${info.messageId} 😃`);
      res.send(info);
    });
});

