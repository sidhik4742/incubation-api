var nodemailer = require("nodemailer");

module.exports.mailer = ({ email, amount, orderId, planName }) => {
  return new Promise((resolve, reject) => {
    try {
      var transporter = nodemailer.createTransport({
        //  service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "sidhh1994@gmail.com",
          pass: "qwerty@1247",
        },
      });
      var mailOptions = {
        from: "sidhh1994@gmail.com",
        to: email,
        subject: "Thanks for your Feedback",
        html: `<h2>S@R</h2><h5><strong>Welcome</strong>, 
                Your payment has been succesfully completed with <strong>&#x20b9; ${amount}</strong> amount. Your order_id <strong>${orderId}</strong>
                for <strong>${planName}</strong>.
                <br></br>
                <a href=https://sidhik4742.github.io/MyPersonalWebsite/> You must click this link to back home page.</a></h5>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent successfully : " + info.response);
          resolve({
            message: "Email sent successfully",
            result: info.response,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
};
