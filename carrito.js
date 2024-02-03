
document.getElementById('carrito-icono').addEventListener('click', () => {
    const LISTA_PEDIDOS_MODAL = document.getElementById('lista-pedidos-modal');

    const PEDIDOS = JSON.parse(localStorage.getItem('pedidos')) || {};

    const INICIADO = JSON.parse(localStorage.getItem('iniciado'));

    const USUARIO = INICIADO.usuario;

    const PEDIDOS_USUARIO_INICIADO = PEDIDOS[USUARIO]

    LISTA_PEDIDOS_MODAL.innerHTML = '';

    function removerPedido(usuario, orden) {
        const PEDIDOS = JSON.parse(localStorage.getItem('pedidos')) || {};

        if (PEDIDOS[usuario]) {
            const INDEX = PEDIDOS[usuario].findIndex(pedido => pedido.orden === orden);
            if (INDEX !== -1) {
                PEDIDOS[usuario].splice(INDEX, 1);
                localStorage.setItem('pedidos', JSON.stringify(PEDIDOS));
            }
        }
    }

    function removerModal() {
        const modalExistente = document.querySelector('.modal.show');

        if (modalExistente) {
            const bootstrapModal = new bootstrap.Modal(modalExistente);
            bootstrapModal.hide();

            modalExistente.classList.remove('show');
        }

        const modalBackdrops = document.querySelectorAll('.modal-backdrop');
        modalBackdrops.forEach(backdrop => backdrop.remove());

        setTimeout(() => {
            new bootstrap.Modal(document.getElementById('carritoModal')).show();
            const modalBackdrops = document.querySelectorAll('.modal-backdrop'); 0
            modalBackdrops.forEach(backdrop => backdrop.remove());
        }, 100);
    }

    if (typeof PEDIDOS[USUARIO] !== 'undefined') {
        PEDIDOS_USUARIO_INICIADO.forEach(usuario => {
            const LIST_ITEM = document.createElement('li');
            LIST_ITEM.classList.add('list-group-item');
            

            const LISTA_DETALLES = document.createElement('ul');
            LISTA_DETALLES.classList.add('list-unstyled');

            const ITEM_TIPO_DE_PEDIDO = document.createElement('li');
            ITEM_TIPO_DE_PEDIDO.textContent = `Tipo de Pedido: ${usuario.tipoDePedido}`;
            LISTA_DETALLES.appendChild(ITEM_TIPO_DE_PEDIDO);

            const ITEM_DETALLES = document.createElement('li');
            ITEM_DETALLES.textContent = 'Detalles:';

            const LISTA_DETALLES_ANIDADA = document.createElement('ul');
            LISTA_DETALLES_ANIDADA.classList.add('list-unstyled');

            for (const key in usuario.detalles) {
                if (usuario.detalles.hasOwnProperty(key)) {
                    const DETALLE_ITEM = document.createElement('li');
                    DETALLE_ITEM.textContent = `${key}: ${usuario.detalles[key]}`;
                    LISTA_DETALLES_ANIDADA.appendChild(DETALLE_ITEM);
                }
            }

            ITEM_DETALLES.appendChild(LISTA_DETALLES_ANIDADA);

            LISTA_DETALLES.appendChild(ITEM_DETALLES);

            LIST_ITEM.appendChild(LISTA_DETALLES);
            const REMOVER_PEDIDOS_BOTON = document.createElement('button');
            REMOVER_PEDIDOS_BOTON.textContent = 'Remover Pedido';
            REMOVER_PEDIDOS_BOTON.classList.add('btn', 'btn-danger', 'mt-2');

            REMOVER_PEDIDOS_BOTON.dataset.orden = usuario.orden;

            LIST_ITEM.appendChild(REMOVER_PEDIDOS_BOTON);

            LISTA_PEDIDOS_MODAL.appendChild(LIST_ITEM);
            REMOVER_PEDIDOS_BOTON.addEventListener('click', (e) => {
                console.log('Botón de remover pedido clicado');
                const ORDEN = parseInt(e.target.dataset.orden, 10);
                console.log('Orden a remover:', ORDEN);
                removerPedido(USUARIO, ORDEN);
                removerModal();
            });
        })
    };

    new bootstrap.Modal(document.getElementById('carritoModal')).show();
});