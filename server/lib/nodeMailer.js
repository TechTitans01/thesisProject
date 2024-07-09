const nodemailer = require("nodemailer");

const nodeMailer = async (to,subject,html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "ahmed.gafsi.2001@gmail.com",
        pass: "zuun jjuy nlsr trfg",
      },
    });

    const message = {
      from: '"bookify 👻" <ahmed.gafsi.2001@gmail.com>', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: subject, // plain text body
      html: html, // html body
    };

    // send mail with defined transport object
    const info = await transporter.sendMail(message);
    console.log('mail sent ' + info.response);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  nodeMailer
};
