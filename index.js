const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//to get static files assets
app.use(express.static('./assets'));
app.use(expressLayouts);
//extract style and scripts from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//use express router
app.use('/',require('./routes'));


//setting up view enjine
app.set('view engine','ejs');
app.set('views','./views')




app.listen(port,function(err){
    if(err){
        console.log(`error:${err}`);
    }
    console.log(`server is running on port:${port}`);
});