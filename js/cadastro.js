document.getElementById("btn-salva-cadastro").onclick = function(e){
    e.preventDefault();

    const login = document.getElementById("inputLogin").value;
    const password = document.getElementById("inputPassword").value;
    const confirmPassword = document.getElementById("inputConfirmPassword").value;

    if(password != confirmPassword){
        alert("Senhas diferentes")
    }

    fetch(new URL('http://localhost:5002/usuarios'), {
        method: 'POST',
        headers: new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({ 
            login, password
        })
    }).then(response => {
        if(response.status == 201){
            window.location = './main.html'
        }

        if(response.status == 400){
            response.json().then(error => alert(error.error))
        }
    }).catch(err => {
        console.log(err)
    })
}