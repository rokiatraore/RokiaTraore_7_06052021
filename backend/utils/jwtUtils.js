const jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = 'RANDOM_TOKEN_SECRET';


//Exportations des fonctions
module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin,
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
    },
    //Récupérer le token
    parseAuthorization : function(authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    //Récupérer la userId
    getUserId: function(authorization) {
        
        let token = module.exports.parseAuthorization(authorization);
        if (token != null){
            try {
                let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if(jwtToken != null)
                    userId = jwtToken.userId;
            } catch(err){ }
        }
        return userId;
    }
}