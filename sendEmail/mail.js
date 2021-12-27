const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport')
const inLineCss = require('nodemailer-juice')
const mailSender = {
  sendGmail : function(param){
    var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PSWD
      }
  }));
  transporter.use('compile', inLineCss());
  var mailOptions = {
    from: process.env.EMAIL,
    to: param.toEmail, // 수신할 이메일
    subject: param.subject, // 메일 제목
    html: param.html // 메일 내용
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } 
    else {
      console.log('Email sent: ' + info.response);
    }
  });   
  }
}
module.exports = mailSender

