import express from "express"
import { Multer } from "@app/http/middlewares"
import { VoteController } from "@app/http/controllers"

const router = express.Router()
const orderRouter = express.Router({ mergeParams: true })

router.get("/", (req, res) => {
  return res.send("Received a GET HTTP method")
})

router.use("/orders", orderRouter)
orderRouter.post(
  "/votes/image/store",
  Multer.single("capture"),
  VoteController.imageStore
)

export default router
