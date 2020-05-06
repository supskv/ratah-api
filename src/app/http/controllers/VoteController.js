import * as GCS from "@app/services/GoogleCloudService"

export const imageStore = async (req, res) => {
  console.log(req.body) // form fields
  console.log(req.file) // form file
  res.status(204).end()
}
