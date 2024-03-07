const express = require('express')

const PORT = 3000
var number = Math.floor(Math.random() * 100)

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello')
})

app.post('/guess', (req, res) => {
  const guess = req.body.guess

  if (guess == number) {
    res.send('CORRECT!')
    number = Math.floor(Math.random() * 100)
    console.log(number)
  } else {
    res.send('nope')
  }
})

console.log(number)
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
