import jwt from "jsonwebtoken"
export const authmiddleware = (req,res,next) => {
  

    const token = req.signedCookies.accessToken
    if(!token){
       return res.status(401).json({msg : 'Login Expired'})
    }
    try{
        const verifyToken = jwt.verify(token,process.env.ACCESS_JWT_SECRET)
        if(!verifyToken){
            return res.status(401).json({msg : 'Unauthorized access'})
        }
        req.user = verifyToken
        req.userId = verifyToken.userId;
        req.role = verifyToken.role

        next();
    } catch(err){
        res.status(500).json({msg : err.message})
    }
}
