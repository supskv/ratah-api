import fs from "fs"
import { GCS } from "@app/services"
import { FileHelper, ImageHelper } from "@app/helpers"

export const imageTextDetection = async () => {
  const imagePath = storage_path("tmp/uploads/capture-1588766049022-762403758.jpg")

  const resultOI = await visionImage(imagePath)

  const { outputPath } = await createCroppedImage(imagePath, resultOI)

  const { anno } = await visionImage(outputPath, "crop")

  return { anno }
}

/**
 * Send to VISION API and decode response json
 * @param {String} imagePath
 */
const visionImage = async (imagePath, type) => {
  // Send to VISON API
  const result = await GCS.imageTextDetection(imagePath)

  // Get data from VISION response
  return GCS.decodeTextDetection(result, type)
}

/**
 * Create new image that has cropped
 * @param {String} imagePath
 * @param {Annotation} numberAnno
 */
const createCroppedImage = async (imagePath, { anno, width }) => {
  // Validate
  if (anno === undefined) return {}

  // Prepare cropping image
  let outputPath = ImageHelper.getOutputImagePath(imagePath)
  const size = calculateSizeOutputImage(anno, width)

  // Cropping image
  const status = await ImageHelper.cropImage(size, imagePath, outputPath)
  if (!status) outputPath = undefined

  return { outputPath }
}

/**
 * Calculate Width, Height, Left and top of crop image
 * @param {Object} numberAnno
 * @param {Int} width
 */
const calculateSizeOutputImage = (anno, width) => {
  // Get bounding poly x,y specific left-top (1) and left-bottom (3)
  //  1 -------- 2
  //  |   word   |
  //  3 -------- 4
  const { 0: bfirst, 3: blast } = anno.boundingPoly.vertices

  // Cal. height, top of cropped image
  const height = 150 + blast.y - bfirst.y
  const top = bfirst.y - 100
  const left = 0

  return { width, height, left, top }
}
