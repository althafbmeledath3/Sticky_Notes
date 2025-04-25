import pkg from 'jsonwebtoken'
const {verify} = pkg;


export default async function auth(req,res,next){

    try{

        console.log("auth middleware")
        
        
        const key = req.headers.authorization
        
        if(!key){
            
            console.log("No token")
            
            return res.status(403).json({message:"Token Missing"})
        }
        
        const token = key.split(" ")[1]
        
        const auth = await verify(token, process.env.JWT_KEY)
        
        req.user = auth.id
        
        next()
    }

    catch(error){

        console.log(error)
        return res.status(403).json({message:"Invalid token or Unauthorised access"})
    }
}