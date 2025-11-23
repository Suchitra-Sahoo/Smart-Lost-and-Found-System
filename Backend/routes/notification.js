const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/user", async (req, res) => {
  const { to, lostItem, foundItem } = req.body;

  if (!to)
    return res.status(400).json({ message: "Lost user email is required" });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const formattedDate = foundItem.dateFound
    ? new Date(foundItem.dateFound).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "N/A";

  const mailOptions = {
    from: '"CampusFind" <your-email@gmail.com>',
    to,
    subject: `Found Item Matching Your Lost Item: ${lostItem.itemName}`,
    html: `
    <h3>Found Item Details</h3>
    <p><strong>Name:</strong> ${foundItem.itemName}</p>
    <p><strong>Description:</strong> ${foundItem.itemDescription}</p>
    <p><strong>Place Found:</strong> ${foundItem.placeFound || "N/A"}</p>
    <p><strong>Date Found:</strong> ${formattedDate}</p>
    ${
      foundItem.image
        ? `<p><img src="cid:foundItemImage" width="300" style="display:block;"/></p>`
        : ""
    }
  `,
    attachments: foundItem.image
      ? [
          {
            filename: "found-item.jpg",
            path: foundItem.image,
            cid: "foundItemImage",
          },
        ]
      : [],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Notification sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send email" });
  }
});

module.exports = router;
