import vision from "@google-cloud/vision"
const client = new vision.ImageAnnotatorClient()

export const imageTextDetection = async (filename) => {
  const [result] = await client.textDetection(filename)
  const detections = result.textAnnotations
  return detections
}
