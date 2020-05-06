import express from "express"

const router = express.Router()

router.get("/", (req, res) => {
  return res.send("Received a GET HTTP method")
})

export default router
