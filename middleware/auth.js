const jwt = require('jsonwebtoken')
const auth = (req , res , next) =>{
   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(" ")[1]
   if (!token){
    return res.json({
        "authentified" : "false"
    })
   }
   jwt.verify(token , process.env.SECRET_KEY , (err , decoded) => {
    if (err){
        console.error(err)
        return res.json({
            "authentified" : "false"
        })
    }
    else {
        res.json({
            "authentified" : "true"
        })
        next()
    }
   })
}
module.exports = auth;