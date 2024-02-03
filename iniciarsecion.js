document.querySelector('#iniciar-sesion')
    .addEventListener('submit', (e) => {
        e.preventDefault();

        const DATA2 = Object.fromEntries(
            new FormData(e.target)
        )

        console.log(DATA2)

        const DATA1 = JSON.parse(localStorage.getItem('personas'));

        let salioMal = document.getElementById('saliomal');

        let perfilEncontrado = false;

        for (let clavePerfil in DATA1) {
            if (DATA1[clavePerfil].usuario === DATA2.usuario && DATA1[clavePerfil].password === DATA2.password) {
                localStorage.setItem('iniciado', JSON.stringify(DATA1[clavePerfil]))
                window.location.href = "./pedidos.html"
                perfilEncontrado = true;
                break;
            }
        }

        !perfilEncontrado ? (salioMal.innerHTML = "<p> El usuario o la contraseña son incorrectos. </p>") : null;
    })