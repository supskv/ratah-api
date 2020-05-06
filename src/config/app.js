import "dotenv/config"

const port = process.env.PORT || 8000
let app_url = process.env.APP_URL || "http://localhost"
if (port !== "80") app_url += ":" + port

export default {
  port: port,
  appUrl: app_url,
}
