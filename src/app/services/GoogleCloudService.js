import vision from "@google-cloud/vision"
import { ImageHelper } from "@app/helpers"

const client = new vision.ImageAnnotatorClient()

export const imageTextDetection = async (originalImage) => {
  const [result] = await client.textDetection(originalImage)
  const detections = result.textAnnotations
  return detections
}
