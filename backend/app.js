const express = require("express");
const nodemailer = require("nodemailer");
const cors= require('cors');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const passkey=1234;

app.post("/api/register", (req, res) => {
    console.log(req.body);
    
});

app.get("/", async(req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "zorofurryking@gmail.com",
      pass:"wnxszfgfdtivrmrf",
    },
  });

  
  const info = await transporter.sendMail({
    from: "zorofurryking@gmail.com",
    to: "suhanamin2004@gmail.com",
    subject: "Account Approved",
     text: `

Your account has been approved.

Your Password: ${passkey}

Kindly use this feature for emergency purposes only.

Regards,
Admin Team
      `,
  });

  console.log("Email sent!");
 
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
