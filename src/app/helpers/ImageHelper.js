import path from "path"
import sharp from "sharp"

// Doc: https://usefulangle.com/post/104/nodejs-crop-image
export const cropImage = async (
  { width, height, left, top },
  originalImage,
  outputImage
) => {
  try {
    await sharp(originalImage)
      .extract({ width: width, height: height, left: left, top: top })
      .toFile(outputImage)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export const getOutputImagePath = (filename) => {
  const prefix = "crop"
  const slug = [prefix, path.basename(filename)].join("-")
  return storage_path("tmp/uploads/" + slug)
}
