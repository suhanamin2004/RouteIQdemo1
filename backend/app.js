const express = require("express");
const nodemailer = require("nodemailer");
const cors= require('cors');

const app = express();

const db=require("./firebase")


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const passkey=1234;

app.post("/api/register", async(req, res) => {
    
  try {
    const { name, email, phone, vehicleNo } = req.body;

    

    await db.collection("users").add({
      name,
      email,
      phone,
      vehicleNo,
      approved: false,
      createdAt: new Date()
    });

    res.status(201).json({
      message: "Registration successful. Waiting for admin approval."
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }


    
});

app.get("/api/users", async(req, res) => {  
  try {
    const users = await db.collection("users").get();
    const userList = users.docs.map((doc) => doc.data());
    console.log(userList);
    
    res.json(userList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/ambulance/login", async(req, res) => {
  const { password } = req.body;
 // console.log(req.body);
  
  if (password === "1234") {
    res.status(200).json({ message: "Login successful." });
  } else {
    res.status(401).json({ error: "Invalid password." });
  }
});

app.put("/users/accept/:id", async(req, res) => {
  console.log(req.params.id);
  

  
const email = req.params.id;


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
    to: email,
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


app.delete("/users/reject/:id", async(req, res) => {
  const email = req.params.id;
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
    to: email,
    subject: "Approval Rejected",
     text: `

Your account has been rejected.



Regards,
Admin Team
      `,
  });

  console.log("Email sent!");
 
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
