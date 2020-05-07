import { GCS } from "@app/services"
import { ImageHelper } from "@app/helpers"

export const imageTextDetection = async () => {
  const imagePath = storage_path(
    "tmp/uploads/capture-1588766049022-762403758.jpg"
  )
  const imageTextDetectionObj = await GCS.imageTextDetection(imagePath)
  // Get data from VISION response
  const { numberAnno, width } = GCS.parseData(imageTextDetectionObj)
  if (numberAnno === undefined) return

  // Prepare cropping image
  // Get bounding poly x,y specific left-top (1) and left-bottom (3)
  //  1 -------- 2
  //  |   word   |
  //  3 -------- 4
  const { 0: bfirst, 3: blast } = numberAnno.boundingPoly.vertices
  // Cal. height, top of cropped image
  const cropImageHeight = 150 + blast.y - bfirst.y
  const top = bfirst.y - 100
  const outputImage = ImageHelper.getOutputImagePath(imagePath)
  const cropStatus = await ImageHelper.cropImage(
    {
      width: width,
      height: cropImageHeight,
      left: 0,
      top: top,
    },
    imagePath,
    outputImage
  )
  if (!cropStatus) return

  const cropTextDetectionObj = await GCS.imageTextDetection(outputImage)
  // Get data from VISION response
  const { voteAnno } = GCS.parseDataCrop(cropTextDetectionObj)

  console.log(voteAnno.description)
}
