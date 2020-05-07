import "dotenv/config"
import cors from "cors"
import path from "path"
import router from "@router"
import express from "express"
import { App as AppConfig } from "@config"

const app = express()

// Middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// Router
app.use("/", router)

// Start Server
app.listen(AppConfig.port, () =>
  console.log("Express server listening on: " + AppConfig.appUrl)
)

// Set global variables
global.storage_path = (str) => path.join(AppConfig.storageDir, str)
