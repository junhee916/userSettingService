// required nodemailer 
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const mailer = require('../sendEmail/mail')
const sendMailController = {}
sendMailController.send = (req, res) => {
    const resultDuesSource = fs.readFileSync(path.join(__dirname, "../template/resultDues.html"), "utf8")
    const resultDuesTemplate = handlebars.compile(resultDuesSource)
    const resultDuesToSend = resultDuesTemplate({NAME: req.body.NAME, ID: req.body.ID, EMAIL : req.body.EMAIL})
    try{
      if(res.locals.user){
        let emailParam = {
          toEmail: req.body.EMAIL,     
          subject: '로그인 검증 결과',   
          html: resultDuesToSend   
        };
        mailer.sendGmail(emailParam);
        res.status(200).send("메일이 정상적으로 보내졌습니다.");
      }
      else{
        res.status(403).json({
          msg : "no token"
        })
      }
    }
    catch(err){
      res.status(500).json({
        msg : err.message
      })
    }
};

module.exports = sendMailController