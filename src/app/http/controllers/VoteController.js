import * as GCS from "@app/services/GoogleCloudService"

export const imageStore = async (req, res) => {
  console.log(req.body) // form fields
  console.log(req.file) // form file

  let originalImage = "originalImage.jpg"
  let outputImage = "croppedImage.jpg"
  await ImageHelper.cropImage(
    { width: 960, height: 250, left: 0, top: 900 },
    originalImage,
    outputImage
  )

  res.status(204).end()
}
