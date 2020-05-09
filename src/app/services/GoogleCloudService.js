import vision from "@google-cloud/vision"

const client = new vision.ImageAnnotatorClient()
const conditions = {
  original: { target: "จำนวน", keywords: ["จำนวน", "กุลจิราณัฐ"] },
  cropped: { target: /^\d+$/, keywords: ["จำนวน"] },
}

/**
 * Send to Google Cloud VISION API
 * @param {String} originalImage path to image
 */
export const imageTextDetection = async (originalImage) => {
  const [result] = await client.textDetection(originalImage)
  return result
}

/**
 * Get result from GCS response json.
 * If cannot it'll return empty object.
 * @param {Object} result from VISION API
 * @param {String} type
 */
export const decodeTextDetection = (result, type = "normal") => {
  // Validate obj
  const { textAnnotations: text, fullTextAnnotation: full } = result
  if (!Array.isArray(text) || !text.length) return {}

  // Seperate all annotations
  const [{ description: total = "" }, ...annos] = text

  switch (type) {
    case "crop":
      return getResultTypeCrop(total, annos)
    default:
      return getResultTypeNormal(total, full, annos)
  }
}

/**
 * Check and get result from Vision API response json that type is normal
 * @param {String} total
 * @param {Object} full
 * @param {Array} annos
 */
const getResultTypeNormal = (total, full, annos) => {
  // Condition
  if (!checkKeywords(conditions.original.keywords, total)) return {}

  // Get page object
  const [page] = full.pages
  const [anno] = annos.filter((a) => a.description === conditions.original.target)

  return {
    anno: anno,
    width: page.width,
    height: page.height,
  }
}

/**
 * Check and get result from Vision API response json that type is normal
 * @param {String} total
 * @param {Array} annos
 */
const getResultTypeCrop = (total, annos) => {
  // Condition
  if (!checkKeywords(conditions.cropped.keywords, total)) return {}

  const [anno] = annos.filter((anno) => conditions.cropped.target.test(anno.description))
  return { anno }
}

/**
 * Check keywords
 * @param {Array} keywords
 */
const checkKeywords = (keywords, str) => keywords.every((k) => str.includes(k))
