import "dotenv/config"
import cors from "cors"
import express from "express"

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  return res.send("Received a GET HTTP method")
})

const port = process.env.PORT || 8000
let app_url = process.env.APP_URL || "http://localhost"
if (port !== "80") app_url += ":" + port

app.listen(port, () => console.log("Server listening on: " + app_url))
