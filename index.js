const container = document.querySelector(".myCards")

let apiKey = {
  key: ''
}

const build = (data) => {
  let content = ''  

  data.forEach((item, index) => {
    if(index < 18) {
      content += `
        <div class="col">
          <div class="card" style="width: 100%">
            <h2>${item.name}</h2>
            <i class="fas fa-coins"></i>
            <strong>$ ${item.symbol}</strong>
          </div>
        </div>
      `
    }
  })

  container.innerHTML = content
}

fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=' + apiKey.key)
  .then(response => {
    if(response.status >= 400) throw new Error('Erro na requisição')
    return response.json()
  })
  .then(response => {
    build(response.data)
  })
  .catch(err => {
    console.log(err.message)
    fetch('./lista.json').then(response => response.json())
    .then(response => build(response.data))
  })