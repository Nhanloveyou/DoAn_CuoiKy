const User = require('../models/user');

class AuthController{
    authUser(req, res, next) {
        if (req.user == null) {
            res.status(403);
            res.render('auth/errorlogin');
        }
        
        next()
    }

    authRole(req,res,next){
          if (req.user.role !== 'admin') {
            // res.status(401)
            res.send('Bạn không có quyền ở trang này')
          }else{
            return next()
          }
        }


}

module.exports = new AuthController;