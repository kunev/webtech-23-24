import express from 'express'
import path from 'path'

const app = express()

app.get('/', (_req, res) => {
  res.send('hi!')
})

app.get('/public/:filename', (req, res) => {
  res.sendFile(req.params.filename, {root: path.join(__dirname, 'public')})
})

app.listen(3000, () => console.log('Server is listening'))
