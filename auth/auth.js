module.exports = {
    checkLogin: (req,res,next)=>{
        console.log(req.session.login);
        
        if(req.session.login == undefined){
            return  res.redirect('/');
          
        }else{
            next();
        }
        
    },

};