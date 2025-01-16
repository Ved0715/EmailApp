module.exports = {
  host: 'smtp.example.com', // Replace with your SMTP host
  port: 587, // Replace with your SMTP port
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your-email@example.com', // Replace with your SMTP username
    pass: 'your-email-password' // Replace with your SMTP password
  }
};
