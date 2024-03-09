document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form')
  const messageText = document.getElementById('message')

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(form).entries())
    data.guess = parseInt(data.guess)

    fetch('/guess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseData => {
        if(responseData.correct){
          messageText.innerHTML = "You guessed the number!!! A new number for guessing is generated!"
        }
        else{
          messageText.innerHTML = `Wrong! The number we are searching for is ${responseData.hint} than ${data.guess}`
        }
      })
  })
})
