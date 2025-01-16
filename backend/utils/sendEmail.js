const nodemailer = require('nodemailer');
const emailConfig = require('../config/emailConfig');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: emailConfig.secure,
    auth: {
      user: emailConfig.auth.user,
      pass: emailConfig.auth.pass
    }
  });

  const mailOptions = {
    from: '"GamilApp" <no-reply@gamilapp.com>', // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
    html: options.html // html body
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
