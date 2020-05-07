import vision from "@google-cloud/vision"

const client = new vision.ImageAnnotatorClient()

export const imageTextDetection = async (originalImage) => {
  const [result] = await client.textDetection(originalImage)
  return result
}

export const parseDataTextDetection = (obj) => {
  // Validate obj
  const { textAnnotations, fullTextAnnotation } = obj
  if (!Array.isArray(textAnnotations) || !textAnnotations.length) return {}

  const [
    { description: totalDescription = "" },
    ...annotations
  ] = textAnnotations
  const target = "จำนวน"

  // Check keyword
  if (
    !totalDescription.includes(target) ||
    !totalDescription.includes("กุลจิราณัฐ")
  ) {
    return {}
  }

  // Get annotation that description is "จำนวน"
  const [targetAnno] = annotations.filter((anno) => anno.description === target)
  if (targetAnno === undefined) return {}

  // There are width and height in page object
  const [objPage] = fullTextAnnotation.pages
  return {
    numberAnno: targetAnno,
    width: objPage.width,
    height: objPage.height,
  }
}
