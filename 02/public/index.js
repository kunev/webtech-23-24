document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form')

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(form).entries())
    data.guess = parseInt(data.guess)
    console.log(JSON.stringify(data))

    fetch('/guess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseData => {

      })
  })
})
