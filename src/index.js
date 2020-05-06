import "dotenv/config"
import cors from "cors"
import express from "express"
import router from "@router"

const app = express()

// Middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// Router
app.use("/", router)

// Start Server
const port = process.env.PORT || 8000
let app_url = process.env.APP_URL || "http://localhost"
if (port !== "80") app_url += ":" + port
app.listen(port, () => console.log("Express server listening on: " + app_url))
