// import/require dependencies express/cors/body-parser/nodemailer
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// set up express routes to get and post request
const app = express();
//Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins 
app.use(cors({ origin: "*" }));
// to parse the request and send the response to the client
app.use(bodyParser.json());

//the app is listening on port number 3000
app.listen(3000, () => {
    console.log("Successfully started server at port 3000");
});

// Get the user data
app.get("/", (req, res) => {
    res.send(
      "<h1 style='text-align: center'>Welcome to the Email Sender System by Reem</h1>"
    );
});

// post/send email using user info
app.post("/sendmail", (req, res) => {
    console.log("Request received!");
    let user = req.body;
    sendMail(user, info => {
      console.log(`The mail has been sent with the id: ${info.messageId} 😃`);
      res.send(info);
    });
});

// set up nodemailer to create email sending functionality

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'emailsendersystem2022@gmail.com', // generate gmail user
        pass: 'pgpxcdpozvsycbny' // generate user password
      }
    });
  // send mail with defined transport object
    let mailOptions = {
      from: '"Email sent from Reem Ahmed"<emailsendersystem2022@gmail.com>', // sender address
      to: 'india.canada96@yahoo.com', // list of receivers
      subject: "This is a test email to confirm my app functionality 👻", // Subject line
      html: `<h1>Hi ${user.name}</h1><br> 
      <h4>This is an Email Sender Application created by Reem, using technologies Node and Express for the Backend, 
      Nodemailer for sending email, MySQL database and Angular for frontend </h4>`
    };
  
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
  
    callback(info);
  //   // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);
