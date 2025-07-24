export const authUser=(req,res,next)=>{
    const token=req.cookie.token()
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    

}