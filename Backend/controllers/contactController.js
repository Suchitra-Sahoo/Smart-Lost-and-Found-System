const nodemailer = require("nodemailer");

exports.sendContactMail = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `CampusFind <${process.env.EMAIL_USER}>`, 
      replyTo: email,                                
      to: process.env.EMAIL_USER,                 
      subject: `New Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone Number: ${phone}
Message:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};
