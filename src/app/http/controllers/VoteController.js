import { GCS } from "@app/services"
import { VoteRepo } from "@app/repositories"

export const imageStore = async (req, res) => {
  // console.log(req.body) // form fields
  // console.log(req.file) // form file

  VoteRepo.imageTextDetection()

  res.send({
    data: await GCS.imageTextDetection(
      storage_path("tmp/uploads/capture-1588766049022-762403758.jpg")
    ),
  })
  res.status(204).end()
}
