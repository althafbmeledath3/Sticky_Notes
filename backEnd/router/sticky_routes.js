import express from "express"
import { signup ,loadHome, login,savedata,loadData} from "../controller/userController.js";
import auth from "../middleware/auth.js";


const stickyRoutes = express.Router()


stickyRoutes.post("/signup",signup)

stickyRoutes.get('/loadhome',auth,loadHome)

stickyRoutes.post('/login',login)

stickyRoutes.post('/savedata',savedata)

stickyRoutes.post('/loadData',loadData)


export default stickyRoutes