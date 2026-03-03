
export const adminMiddleware = (req,res,next) => {
    try{
        if(req.user.role!=='admin'){
        return res.status(409).json({msg : 'Admin only access'})
   }
    next()
    } catch(err){
        res.status(500).json({msg : err.message})
    }
}

