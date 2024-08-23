const express = require('express');
const router = express.Router();
const Registration = require('./models/registerationScehma'); // Use the correct path to your schema
const twilio = require('twilio');

// Twilio configuration
const accountSid = 'ACf5654eafc5f7c50d23e7c972631653df';
const authToken = '7d1a65d8c771c1fa691cf264d952241f'; // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);

// POST /register - Save registration data and send SMS
router.post("/", async (req, res) => {
    try {
        const data = req.body;

        // Create a new registration object using the request data
        const newRegistration = new Registration(data);

        // Save the registration data to the database
        const response = await newRegistration.save();

        console.log("Registration data saved");

        // Send SMS notification if 'SMS' is in preferences
        if (data.preference.includes('SMS')) {
            await client.messages.create({
                body: `Hello ${data.name}, you have successfully registered for notifications.`,
                from: '+18335742576', // Replace with your Twilio phone number
                to: data.mobile
            });
            console.log("SMS sent to", data.mobile);
        }

        res.status(201).json(response);
    } catch (err) {
        console.log(err);
        // Handle duplicate email error
        if (err.code === 11000) {
            res.status(400).json({ error: "Email is already registered" });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

module.exports = router;
