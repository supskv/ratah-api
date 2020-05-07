import "dotenv/config"
import path from "path"

const port = process.env.PORT || 8000
let app_url = process.env.APP_URL || "http://localhost"
if (port !== "80") app_url += ":" + port

export default {
  port: port,
  appUrl: app_url,
  baseDir: path.resolve("."),
  storageDir: path.resolve("./storage"),
}
