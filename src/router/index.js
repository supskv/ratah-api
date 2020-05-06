import express from "express"
import { Multer } from "@app/http/middlewares"
const router = express.Router()

router.get("/", (req, res) => {
  return res.send("Received a GET HTTP method")
})

router.post("/", Multer.single("capture"), (req, res) => {
  console.log(req.body) // form fields
  console.log(req.file) // form file
  res.status(204).end()
})

export default router
