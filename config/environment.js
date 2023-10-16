const fs = require('fs');
const rfs = require('rotating-file-stream');

const path = require('path');

// Specify the log directory path as a string
const logDirectory = path.join(__dirname, '../production_logs');

// Check if the log directory exists and create it if it doesn't
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Create a rotating log file stream
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: logDirectory
});

// You can now use the `accessLogStream` for writing logs.

const development = {
   name: 'development',
   asset_path :'./assets',
   session_cookie_key :'something',
   db :'codeial_development',
   smtp :{
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "Sruthysheela1980",
        pass: "uydi ssdc wvyk qwfp",
      },
    },
   google_client_id,
   google_client_secret,
   google_callback_url,
   jwt_secret :'codeial',
   morgan   : {
    mode    :'dev',
    options : {
      stream : accessLogStream
    }
   }
}


const production = {
    name:'production',
    asset_path :process.env.CODEIAL_ASSET_PATH,
   session_cookie_key :process.env.CODEIAL_SESSION_COOKIE_KEY,
   db :process.env.CODEIAL_DB,
   smtp :{
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.CODEIAL_GMAIL_USER_NAME,
        pass: process.env.CODEIAL_GMAIL_USER_PASSWORD,
      },
    },
   google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID ,
   google_client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECERT ,
   google_callback_url:process.env.CODEIAL_GOOGLE_CALLBACK_URL,
   jwt_secret :process.env.CODEIAL_JWT_SECRET,
   morgan   : {
    mode    :'combined',
    options : {
      stream : accessLogStream
    }
   }
 }

 module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT) ;
