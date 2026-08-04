require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    },
});

//verify the connection config!
transporter.verify((error, success) =>{
    if(error){
        console.log('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages');   
    }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistrationEmail(userEmail, name) {
    const subject = 'Welcome to Backend Ledger!';
    const text = `Hi ${name},\n\nWelcome to Backend Ledger! Your account has been created successfully.\n\nThanks,\nBackend Ledger Team`;
    const html = `<p>Hi ${name},</p><p>Welcome to <strong>Backend Ledger</strong>! Your account has been created successfully.</p><p>Thanks,<br>Backend Ledger Team</p>`;

    await sendEmail(userEmail, subject, text, html);
}

module.exports =  {
    sendRegistrationEmail
};