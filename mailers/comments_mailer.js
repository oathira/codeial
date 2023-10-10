const nodemailer = require('../config/nodemailer');
// const ejs = require('ejs');
// const path = require('path');

exports.newComment = (comment) => {
  console.log('inside newcomment mailer', comment);

  // Use the renderTemplate function to render the email template
  let htmlString = nodemailer.renderTemplate({ comment: comment }, 'comments/new_comment.ejs');
  console.log('html', htmlString);

  nodemailer.transporter.sendMail(
    {
      from: 'Sruthysheela1980@gmail.com',
      to: 'athiraos1997@gmail.com',
      subject: 'New comment published!',
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log(err, 'error in sending mail');
        return;
      }
      console.log('Message sent', info);
      return;
    }
  );
};
