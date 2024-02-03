document.querySelector('#registrarse')
    .addEventListener('submit', (e) => {
        e.preventDefault();

        const data = Object.fromEntries(
            new FormData(e.target)
        )

        let datosCompletos = JSON.parse(localStorage.getItem('personas')) || {}

        let numSecuencial = 1;
        let clavePerfil = 'perfil_' + numSecuencial;

        while (datosCompletos[clavePerfil]) {
            numSecuencial++;
            clavePerfil = 'perfil_' + numSecuencial;
        }

        datosCompletos[clavePerfil] = data;
        localStorage.setItem('personas', JSON.stringify(datosCompletos));

        window.location.href = "./inicio_de_sesion.html";
    })