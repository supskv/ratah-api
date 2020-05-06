export const imageStore = (req, res) => {
  console.log(req.body) // form fields
  console.log(req.file) // form file
  res.status(204).end()
}
