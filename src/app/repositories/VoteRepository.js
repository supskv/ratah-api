import fs from "fs"
import { GCS } from "@app/services"
import { FileHelper, ImageHelper } from "@app/helpers"

export const imageTextDetection = async () => {
  const imagePath = storage_path(
    "tmp/uploads/capture-1588766049022-762403758.jpg"
  )

  const resultOI = await visionOriginalImage(imagePath)

  const { outputPath } = await createCroppedImage(imagePath, resultOI)

  const { voteAnno } = await visionCroppedImage(outputPath)

  return { voteAnno }
}

/**
 * Send Original image to VISION API
 * @param {String} imagePath
 */
const visionOriginalImage = async (imagePath) => {
  // Send to VISON API
  const result = await GCS.imageTextDetection(imagePath)

  // Get data from VISION response
  return GCS.parseData(result)
}

/**
 * Send Cropped image to VISION API
 * @param {String} imagePath
 */
const visionCroppedImage = async (imagePath) => {
  // Send to VISON API
  const result = await GCS.imageTextDetection(imagePath)

  // Remove cropped image
  FileHelper.remove(imagePath)

  // Get data from VISION response
  return GCS.parseDataCrop(result)
}

/**
 * Create new image that has cropped
 * @param {String} imagePath
 * @param {Annotation} numberAnno
 */
const createCroppedImage = async (imagePath, { numberAnno, width }) => {
  // Validate
  if (numberAnno === undefined) return {}

  // Prepare cropping image
  let outputPath = ImageHelper.getOutputImagePath(imagePath)
  const size = calculateSizeOutputImage(numberAnno, width)

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
const calculateSizeOutputImage = (numberAnno, width) => {
  // Get bounding poly x,y specific left-top (1) and left-bottom (3)
  //  1 -------- 2
  //  |   word   |
  //  3 -------- 4
  const { 0: bfirst, 3: blast } = numberAnno.boundingPoly.vertices

  // Cal. height, top of cropped image
  const height = 150 + blast.y - bfirst.y
  const top = bfirst.y - 100
  const left = 0

  return { width, height, left, top }
}
