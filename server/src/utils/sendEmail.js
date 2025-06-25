import nodemailer from 'nodemailer';
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { 
    user: 'abhayakhatri11@gmail.com',
    pass: 'gwsf hksd ggfm ozfu'
  }
});

function sendEmail(userEmail) {
  let mailOptions = {
  from: 'abhayakhatri11@gmail.com',
  to: userEmail,
  subject: 'Successful Registration',
  html: '<h1>Welcome to Cartmandu!</h1>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
export default sendEmail;