const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
        if(!req.headers.authorization ){
            throw {
                name: 'EmptyTokenError',
                message: 'invalid token'
            };  
        }
        
        const secretKey = process.env.SECRET_KEY || 'secretKey';
        const token = req.headers.authorization.split(" ")[1];
    
        const credential = jwt.verify(token,secretKey);

        if(credential){
            req.app.locals.credential = credential;
            return next();
        } 
    } catch (error) {
        return res.status(401).send({
            status: '401 Unauthenticated',
            error
        }) 
    }
}

module.exports = verifyToken;