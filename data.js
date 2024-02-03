document.querySelector('#form-data')
    .addEventListener('submit', (e) => {
        e.preventDefault();

        const FORM_DATA = new FormData(e.target);
        const DETALLES = Object.fromEntries(FORM_DATA)

        const INICIADO = JSON.parse(localStorage.getItem('iniciado'));

        const USUARIO = INICIADO.usuario;

        let pedidos = JSON.parse(localStorage.getItem('pedidos')) || {}

        !pedidos[USUARIO] ? pedidos[USUARIO] = [] : null;

        const ORDEN = pedidos[USUARIO].length + 1;

        const NUEVO_PEDIDO = {
            detalles: DETALLES,
            tipoDePedido: "data",
            orden: ORDEN
        };

        pedidos[USUARIO] = [...pedidos[USUARIO], NUEVO_PEDIDO];

        localStorage.setItem('pedidos', JSON.stringify(pedidos));

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Mail enviado!",
            showConfirmButton: false,
            timer: 1500
        });
    })