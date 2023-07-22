module.exports.home = function(req,res){
  console.log(req.cookies);
  res.cookie('slf',10);
  return res.render('home',{
    title:'Home'
  });
}

//module.exports.actionType =function(req,res){}