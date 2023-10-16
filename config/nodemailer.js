

/* Define renderTemplate Function: This function is designed to render an email template using EJS. It takes two arguments:
   data: Data to be passed to the EJS template for rendering.
   relativePath: Relative path to the EJS template file.
Inside the function, it uses ejs.renderFile to render the template located in 
the specified directory (../views/mailers) with the provided data. 
The rendered HTML content is stored in the mailHTML variable.*/
const nodemailer = require("nodemailer");
const env = require('./environment');
const ejs = require("ejs");
const path = require("path");

const transporter = nodemailer.createTransport(env.smtp);

let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, '../views/mailers', relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log('error rendering template', err);
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};

module.exports = {
  transporter,
  renderTemplate,
};
