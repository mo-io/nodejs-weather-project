const searchForm = document.querySelector('form')
const search = document.querySelector('input')
const loading = document.querySelector('#loading')
const result = document.querySelector('#result')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const url = '/weather?search='+ search.value
    loading.textContent = "Loading ... "
    result.textContent = ''

    fetch(url).then( (response) => {
        response.json().then((data) => {
            if(data.error){
                loading.textContent = ''
                result.textContent = data.error
            }else{
                loading.textContent = data.location
                result.textContent = data.temperature
            }
        })
    })
})