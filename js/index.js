document.getElementById("btn-cadastro").onclick = function(e){
    e.preventDefault()
    window.location = './pages/cadastro.html'
}

document.getElementById("btn-entrar").onclick = function(e){
    e.preventDefault()

    const login = document.getElementsByName('login')[0].value
    const password = document.getElementsByName('password')[0].value
    if (!login || !password){
        alert("Por favor preencha os dados necessário!")
        return false
    }

    fetch(new URL('http://localhost:5002/auth'), {
        method: 'POST',
        headers: new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({ 
            login, password 
        })
    }).then(response => {
        if (response.status == 204){
            window.location = './pages/main.html'
        }
        if(response.status == 401 || response.status == 404){
            response.json().then(error => alert(error.error))
        }
    }).catch(err => {
        console.log(err)
    })
}
