import express from "express"
import path,{dirname,join} from "path"
import url from 'url'
import connection from "./connection.js"
import stickyRoutes from "./router/sticky_routes.js"
import env from "dotenv"
env.config()
const __dirname = dirname(url.fileURLToPath(import.meta.url))

const frontEnd = join(__dirname,"..","frontEnd")

const app = express()


app.use(express.static(frontEnd))
app.use(express.json({"limit":"50mb"}))

app.use("/api",stickyRoutes)

const port = 3000


connection().then(()=>{

    app.listen(port,()=>{

        console.log("Server Running on http://localhost:3000")
    })

})

