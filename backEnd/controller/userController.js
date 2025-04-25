import userSchema from "../models/userSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



export async function signup(req,res){

   const {username,email,password} = req.body

   const userExist = await userSchema.findOne({email})

   if(!userExist){       
      
        const hashed_pwd = await bcrypt.hash(password,10)
           
        const data = await userSchema.create({
            
            username,
            email,
            password:hashed_pwd
        })
                
      

        const userExist1 = await userSchema.findOne({email})

        if(userExist1){

            const token = await jwt.sign({id:userExist1._id},process.env.JWT_KEY,{expiresIn:"24h"})
            
            return res.status(201).json({message:"User Created Successfully",token})
            
        }

        else{

            return res.status(404).json({message:"Server Side Error ocuured"})
        }

        
    }

    else{

        return res.status(200).json({message:"User Already Exists Please Login"})

    }

}


export async function loadHome(req,res){

    try {

        let id = req.user

        const user = await userSchema.findById(id)

        res.status(200).json({message:"Success",user})


    } catch (error) {

        res.status(500).json({message:error})
        
    }
    
}




export async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const data = await userSchema.findOne({ email });

        if (!data) {
            return res.status(404).json({ message: "No User Found" }); // Use 404 for user not found
        }
        
        // Compare the password with hashed password stored in the DB
        const pass_match = await bcrypt.compare(password, data.password);

        if (!pass_match) {
            return res.status(401).json({ message: "Invalid Password" }); // Use 401 for invalid password
        }

        // Generate JWT token
        const token = jwt.sign({ id: data._id }, process.env.JWT_KEY, {
            expiresIn: "24h", // Set expiration time for the token
        });

        // Send successful response with token
        return res.status(200).json({ message: "Logged in Successfully", token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Side Error" }); // Handle any internal server error
    }
}



export async function savedata(req,res){


    try{

        const {email,title,content} = req.body
        
        const user = await userSchema.findOne({email})

        if(!user)
            return res.status(404).json({message:"User Not Found"})
        
        user.notes.push({title,content})
        
        await user.save()
        
        
        res.status(200).json({ message: "Note saved successfully", notes: user.notes });
        
    }

    catch(error){

        console.log(error)
        return res.status(500).json({message:error})
    }
}


export async function loadData(req,res){

    const {email} = req.body
    console.log("Inisde load data")
    
   
    try {

        const user = await userSchema.findOne({email})
        res.status(200).json({user})
        
    } catch (error) {
        
        return res.status(500).json({message:error})
    }
}