import fs from "fs"
import path from "path"
import multer from "multer"
import { Packages } from "@config"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = Packages.multer.dest
    fs.mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    )
  },
})
const upload = multer({ storage: storage })

export default upload
