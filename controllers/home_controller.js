module.exports.home = function(req,res){
  console.log(req.cookies);//console cookies in home page cookie are coming in request
  res.cookie('slf',10);//setting cookie with key slf and value 10
  return res.render('home',{
    title:'Home'
  });
}

//module.exports.actionType =function(req,res){}mnbjkb