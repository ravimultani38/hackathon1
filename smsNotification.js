const twilio = require('twilio');
const Registration = require('./models/registerationScehma'); // Adjust the path to your Registration schema
const Notification = require('./models/notifications'); // Adjust the path to your Notification schema

// Twilio configuration
const accountSid = 'ACf5654eafc5f7c50d23e7c972631653df';
const authToken = '7d1a65d8c771c1fa691cf264d952241f'; // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);

const sendSmsToRegisteredUsers = async (notification) => {
    try {
        // Fetch all registrations
        const registrations = await Registration.find({ preference: 'SMS' });

        // Send SMS to each user
        for (const reg of registrations) {
            await client.messages.create({
                body: `New Notification: ${notification.title} - ${notification.description}`,
                from: '+18335742576', // Replace with your Twilio phone number
                to: reg.mobile
            });
            console.log(`SMS sent to ${reg.mobile}`);
        }
    } catch (err) {
        console.error("Error sending SMS:", err);
    }
};

module.exports = sendSmsToRegisteredUsers;
