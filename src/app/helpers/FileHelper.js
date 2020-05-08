import fs from "fs"

export const remove = (link) => {
  if (fs.existsSync(link)) {
    fs.unlinkSync(link)
    return true
  }

  return false
}
