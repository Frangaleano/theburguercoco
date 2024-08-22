const carouselInner = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
const toggleMenu = () => {
    const body = document.body;
    const main = document.getElementById("main");
    body.classList.toggle('open');
    // Bloquear o restaurar el scroll del cuerpo
    if (body.classList.contains('open')) {
        body.style.overflow = 'hidden'; // Bloquear el scroll
        main.style.opacity = "0"
    } else {
        body.style.overflow = ''; // Restaurar el scroll
        main.style.opacity = "1"
    }
};

window.addEventListener('load', function () {
    const carousel = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');

    let counter = 0;
    const slideCount = images.length;
    let slideWidth;

    function nextSlide() {
        if (slideWidth === undefined) {
            slideWidth = images[0].clientWidth;
        }
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(${-slideWidth * counter}px)`;
        counter = (counter + 1) % slideCount;
    }


    // Iniciar el carousel automáticamente
    setInterval(nextSlide, 1500);
});


let currentIndex = 0;
let subMenuVisible = false;
let subMenuDosVisible = false;
let subMenuTresVisible = false;
let subMenuCuatroVisible = false;
let extrasCounters = {};
let totalExtras = 0;
let productos = [];
let preciosTotalesProductos = [0];
let counters = {};
let selectedItems = [];
let total = 0;
let totalProductos = 0;

setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    const translateValue = -currentIndex * 100 + '%';
    carouselInner.style.transform = 'translateX(' + translateValue + ')';
}, 1500);


document.querySelectorAll('.menu ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        // Scroll suave
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
        // Cerrar el menú después de hacer clic en un enlace
        toggleMenu();
    });
});

setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    const translateValue = -currentIndex * 100 + '%';
    carouselInner.style.transform = 'translateX(' + translateValue + ')';
}, 1500);


function toggleMenuSection() {
    const menuProductos = document.getElementById("menu-section");
    const tituloMenu = document.getElementById("menu-title");
    const carousel = document.getElementById("hidden")
    const total = document.getElementById("total")
    const parrafoMenu = document.getElementById("parrafo-menu")

    menuProductos.classList.toggle("visible");

    if (menuProductos.classList.contains("visible")) {
        // Mostrar la sección del menú
        menuProductos.style.display = "flex";
        menuProductos.offsetHeight; // Activar reflows
        menuProductos.style.opacity = "1";
        menuProductos.style.transform = "translateY(0)";
        menuProductos.style.visibility = "visible";
        carousel.style.display = "none"
        tituloMenu.style.backgroundColor = "#013f33";
        tituloMenu.style.color = "white"
        tituloMenu.style.animation = "none"
        total.style.display = "flex"
        total.style.opacity = "1"
        parrafoMenu.style.display = "none"
    } else {
        menuProductos.style.opacity = "0";
        menuProductos.style.transform = "translateY(-20px)";
        total.style.display = "none"
        total.style.opacity = "0"
        setTimeout(() => {
            menuProductos.style.visibility = "hidden";
            menuProductos.style.display = "none"
            carousel.style.display = "flex"
        }, 500); // Establecer un tiempo de espera para ocultar después de la animación

        tituloMenu.style.backgroundColor = "transparent";
        tituloMenu.style.animation = "shadowAnimation 2s infinite"
        tituloMenu.style.color = "#26B884"
        parrafoMenu.style.display = "block"
    }
}

function selectButton(buttonNumber) {
    const container = document.querySelector('.menu-button-container');
    const allButtons = container.querySelectorAll('.menu-button');

    allButtons.forEach((button, index) => {
        button.classList.remove('active');
        if (index + 1 === buttonNumber) {
            event.preventDefault();
            button.classList.add('active');
        }
    });
}

function toggleSubMenu() {
    event.preventDefault();
    const subMenu = document.getElementById('subMenu');
    const boton1 = document.getElementById('boton1');

    if (!subMenuVisible) {
        const buttonsHTML = `
        <div class="div-botones-submenu" data-button-number="1">
            <div class="div-producto">
                <img class="img-productos" src="./burguer-prod.png" alt="Classic Power">

                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="1">Classic Power</button>
                <p id="parrafos-detalles">Blen de carne + Pan de papa + Salsa BIG + Lechuga + Tomate + Cebolla + Panceta + Cheddar</p>

                    <div class="div-detalles">
                        <div class="div-input">
                        <p>Simple $5700</p>
                        <input class="radio-button" type="radio" name="Classic power simple" value="5700">
                        </div>
                        <div class="div-input">
                        <p>Doble <br>$7200</p>
                        <input class="radio-button" type="radio" name="Classic power doble" value="7200">
                        </div>
                        <div class="div-input">
                        <p>Triple <br>$8500</p>
                        <input class="radio-button" type="radio" name="Classic power triple" value="8500">
                        </div>
                        <div class="div-input">
                        <button class="counter-button" onclick="updateCounter(1, 'decrement')">-</button>
                        <span class="counter-value">0</span>
                        <button class="counter-button" onclick="updateCounter(1, 'increment')">+</button>
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(1)">Agregar al pedido</button>
            </div>
        </div>

        <div class="div-botones-submenu" data-button-number="2">
            <div class="div-producto">
                <img class="img-productos" src="./miñon-item.webp" alt="miñon">
                <div class="div-parrafos">
                    <button class="sub-menu-button" data-button-number="2">Miñon</button>
                    <p id="parrafos-detalles">Pan especial para restaurant y viandas</p>
                    <div class="div-detalles">
                        <p>$8000 <br> $1600 x Kg</p>
                        <input class="radio-button" type="radio" name="miñon" value="8000">
                        <p>$8000 <br> $1600 x Kg</p>
                        <input class="radio-button" type="radio" name="miñon" value="8000">
                        <p>$8000 <br> $1600 x Kg</p>
                        <input class="radio-button" type="radio" name="miñon" value="8000">
                        <button class="counter-button" onclick="updateCounter(2, 'decrement')">-</button>
                        <span class="counter-value">0</span>
                        <button class="counter-button" onclick="updateCounter(2, 'increment')">+</button>
                    </div>
                </div>   
            </div>    
                       
            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(2)">Agregar al pedido</button>
            </div>
        </div>

        <div class="div-botones-submenu" data-button-number="3">
            <div class="div-producto">
                <img class="img-productos" src="./milonga-item.webp" alt="milonga">
                <div class="div-parrafos">
                    <button class="sub-menu-button" data-button-number="3">Milonga</button>
                    <p id="parrafos-detalles">Pan clásico para venta al peso y sandwicheria</p>
                    <p id="parrafos-detalles"><b>Medida</b>: 12 - 13 cm.</p>
                    <p id="parrafos-detalles"><b>Cantidad</b>: 11U. aprox. por Kg.</p>
                    <p id="parrafos-detalles"><b>Presentacion</b>: Bolsa de 5 Kg.</p>
                    <div class="div-detalles">
                        <p>$8000 <br>$1600 x Kg</p>
                        <input class="radio-button" type="radio" name="milonga" value="8000">
                        <button class="counter-button" onclick="updateCounter(3, 'decrement')">-</button>
                        <span class="counter-value">0</span>
                        <button class="counter-button" onclick="updateCounter(3, 'increment')">+</button>
                    </div>
                </div>   
            </div>    
                       
            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(3)">Agregar al pedido</button>
            </div>
        </div>

        <div class="div-botones-submenu" data-button-number="4">
            <div class="div-producto">
                <img class="img-productos" src="./flautita-item.webp" alt="flautita">
                <div class="div-parrafos">
                    <button class="sub-menu-button" data-button-number="3">Flauta</button>
                    <p id="parrafos-detalles">Pan especial para sanwicheria</p>
                    <p id="parrafos-detalles"><b>Medida</b>: 17 - 18 cm.</p>
                    <p id="parrafos-detalles"><b>Cantidad</b>: 7U. aprox. por Kg.</p>
                    <p id="parrafos-detalles"><b>Presentacion</b>: Bolsa de 5 Kg.</p>
                    <div class="div-detalles">
                        <p>$8000 <br>$1600 x Kg</p>
                        <input class="radio-button" type="radio" name="flauta" value="8000">
                        <button class="counter-button" onclick="updateCounter(4, 'decrement')">-</button>
                        <span class="counter-value">0</span>
                        <button class="counter-button" onclick="updateCounter(4, 'increment')">+</button>
                    </div>
                </div>   
            </div>    
                       
            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(4)">Agregar al pedido</button>
            </div>
        </div>
        `;


        subMenu.innerHTML = buttonsHTML;

        subMenuVisible = true;
        subMenu.style.display = "flex";
        subMenu.offsetHeight;
        subMenu.style.opacity = "1";
        subMenu.style.transform = "translateY(0)";
        subMenu.style.visibility = "visible";
        subMenu.style.flexDirection = "column";
        subMenu.style.rowGap = "10px";
        subMenu.style.alignItems = "center"

        // Agrega la clase 'active' al botón1 cuando se despliega el submenú
        boton1.classList.add('active');
        subMenu.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        event.preventDefault();
    } else {
        const subMenuButtons = document.querySelectorAll('.menu-button');
        subMenuButtons.forEach(button => {
            button.classList.remove('initial');
        });
        setTimeout(() => {
            subMenu.innerHTML = '';
        }, subMenuButtons.length * 100);

        subMenuVisible = false;

        subMenu.style.opacity = "0";
        subMenu.style.transform = "translateY(-20px)";
        setTimeout(() => {
            subMenu.style.visibility = "hidden";
            subMenu.style.display = "none";
        }, 800);

        // Quita la clase 'active' al botón1 cuando se contrae el submenú
        boton1.classList.remove('active');
    }
}

function toggleSubMenuDos() {
    event.preventDefault();
    const subMenuDos = document.getElementById('subMenuDos');
    const boton2 = document.getElementById('boton2');

    if (!subMenuDosVisible) {
        const buttonsHTML = `
        <div class="div-botones-submenu" data-button-number="5">
            <div class="div-producto">
                <img class="img-productos" src="./pan-negro-item.webp" alt="pan negro">
                <div class="div-parrafos">
                    <button class="sub-menu-button" data-button-number="5">Pan negro</button>
                    <p id="parrafos-detalles"><b>Cantidad</b>: 22U. aprox. por Kg.</p>
                    <p id="parrafos-detalles"><b>Presentacion</b>: Bolsa de 2 Kg.</p>
                    <div class="div-detalles">
                        <p>$5500 <br> $2750 x Kg</p>
                        <input class="radio-button" type="radio" name="pan negro" value="5500">
                        <button class="counter-button" onclick="updateCounter(5, 'decrement')">-</button>
                        <span class="counter-value">0</span>
                        <button class="counter-button" onclick="updateCounter(5, 'increment')">+</button>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(5)">Agregar al pedido</button>
            </div>
        </div>

        <div class="div-botones-submenu" data-button-number="6">
            <div class="div-producto">
                <img class="img-productos" src="./figaza-item.webp" alt="figaza">
                <div class="div-parrafos">
                    <button class="sub-menu-button" data-button-number="6">Figaza</button>
                    <p id="parrafos-detalles">Especiales para sandwich</p>
                    <p id="parrafos-detalles"><b>Medida</b>: 6 x 6 cm.</p>
                    <p id="parrafos-detalles"><b>Cantidad</b>: 20U. aprox. por Kg.</p>
                    <p id="parrafos-detalles"><b>Presentacion</b>: Bolsa de 2 Kg.</p>
                    <div class="div-detalles">
                        <p>$5500 <br>$2750 x Kg</p>
                        <input class="radio-button" type="radio" name="figaza" value="5500">
                        <button class="counter-button" onclick="updateCounter(6, 'decrement')">-</button>
                        <span class="counter-value">0</span>
                        <button class="counter-button" onclick="updateCounter(6, 'increment')">+</button>
                    </div>
                </div>   
            </div>    
                       
            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(6)">Agregar al pedido</button>
            </div>
        </div>
        `;


        subMenuDos.innerHTML = buttonsHTML;

        subMenuDosVisible = true;
        subMenuDos.style.display = "flex";
        subMenuDos.offsetHeight;
        subMenuDos.style.opacity = "1";
        subMenuDos.style.transform = "translateY(0)";
        subMenuDos.style.visibility = "visible";
        subMenuDos.style.flexDirection = "column";
        subMenuDos.style.rowGap = "10px";
        subMenuDos.style.alignItems = "center"

        // Agrega la clase 'active' al botón1 cuando se despliega el submenú
        boton2.classList.add('active');
        subMenuDos.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        event.preventDefault();
    } else {
        const subMenuDosButtons = document.querySelectorAll('.menu-button');
        subMenuDosButtons.forEach(button => {
            button.classList.remove('initial');
        });
        setTimeout(() => {
            subMenuDos.innerHTML = '';
        }, subMenuDosButtons.length * 100);

        subMenuDosVisible = false;

        subMenuDos.style.opacity = "0";
        subMenuDos.style.transform = "translateY(-20px)";
        setTimeout(() => {
            subMenuDos.style.visibility = "hidden";
            subMenuDos.style.display = "none";
        }, 800);

        // Quita la clase 'active' al botón1 cuando se contrae el submenú
        boton2.classList.remove('active');
    }
}

function toggleSubMenuTres() {
    event.preventDefault();
    const subMenuTres = document.getElementById('subMenuTres');
    const boton3 = document.getElementById('boton3');

    if (!subMenuTresVisible) {
        const buttonsHTML = `
        <div class="div-botones-submenu" data-button-number="7">
            <div class="div-producto" style="margin-bottom: 12px;">
                <img class="img-productos" src="./chipa-item.webp" alt="chipá">
                <div class="div-parrafos">
                    <button class="sub-menu-button" data-button-number="7">Chipá</button>
                    <p id="parrafos-detalles"><b>Presentacion</b>: Bolsa de 1 Kg.</p>
                    <div class="div-detalles">
                        <p>$6600 x Kg</p>
                        <input class="radio-button" type="radio" name="chipa" value="6600">
                        <button class="counter-button" onclick="updateCounter(7, 'decrement')">-</button>
                        <span class="counter-value">0</span>
                        <button class="counter-button" onclick="updateCounter(7, 'increment')">+</button>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(7)">Agregar al pedido</button>
            </div>
        </div>

        <div class="div-botones-submenu" data-button-number="8">
            <div class="div-producto">
                <img class="img-productos" src="./medialunas-item.webp" alt="medialunas">
                <div class="div-parrafos">
                    <button class="sub-menu-button" data-button-number="8">Medialunas</button>
                    <p id="parrafos-detalles"><b>Peso</b>: 55grs. aprox.</p>
                    <p id="parrafos-detalles"><b>Presentacion</b>: 3 docenas</p>
                    <p id="parrafos-detalles"><b>Almibar bonificado</b></p>
                    <div class="div-detalles">
                        <p>$9700 <br>$270 x Unidad</p>
                        <input class="radio-button" type="radio" name="medialunas" value="9700">
                        <button class="counter-button" onclick="updateCounter(8, 'decrement')">-</button>
                        <span class="counter-value">0</span>
                        <button class="counter-button" onclick="updateCounter(8, 'increment')">+</button>
                    </div>
                </div>   
            </div>    
                       
            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(8)">Agregar al pedido</button>
            </div>
        </div>
        `;


        subMenuTres.innerHTML = buttonsHTML;

        subMenuTresVisible = true;
        subMenuTres.style.display = "flex";
        subMenuTres.offsetHeight;
        subMenuTres.style.opacity = "1";
        subMenuTres.style.transform = "translateY(0)";
        subMenuTres.style.visibility = "visible";
        subMenuTres.style.flexDirection = "column";
        subMenuTres.style.rowGap = "10px";
        subMenuTres.style.alignItems = "center"

        // Agrega la clase 'active' al botón1 cuando se despliega el submenú
        boton3.classList.add('active');
        subMenuTres.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        event.preventDefault();
    } else {
        const subMenuTresButtons = document.querySelectorAll('.menu-button');
        subMenuTresButtons.forEach(button => {
            button.classList.remove('initial');
        });
        setTimeout(() => {
            subMenuTres.innerHTML = '';
        }, subMenuTresButtons.length * 100);

        subMenuTresVisible = false;

        subMenuTres.style.opacity = "0";
        subMenuTres.style.transform = "translateY(-20px)";
        setTimeout(() => {
            subMenuTres.style.visibility = "hidden";
            subMenuTres.style.display = "none";
        }, 800);

        // Quita la clase 'active' al botón1 cuando se contrae el submenú
        boton3.classList.remove('active');
    }
}

function updateCounter(buttonNumber, action) {
    const counterValue = document.querySelector(`.div-botones-submenu[data-button-number="${buttonNumber}"] .counter-value`);
    const selectedInput = document.querySelector(`.div-botones-submenu[data-button-number="${buttonNumber}"] input:checked`);

    if (counterValue && selectedInput && selectedInput.value) {
        if (!counters[buttonNumber]) {
            counters[buttonNumber] = 0;
        }

        let itemPrice = parseFloat(selectedInput.value);

        switch (action) {
            case 'increment':
                counters[buttonNumber]++;
                total += itemPrice;
                break;
            case 'decrement':
                if (counters[buttonNumber] > 0) {
                    counters[buttonNumber]--;
                    total -= itemPrice;
                }
                break;
            default:
                break;
        }

        counterValue.textContent = counters[buttonNumber];
    }

}

function agregarAlPedido(buttonNumber) {
    const itemNameElement = document.querySelector(`.div-botones-submenu[data-button-number="${buttonNumber}"] .sub-menu-button`);
    const selectedInputElement = document.querySelector(`.div-botones-submenu[data-button-number="${buttonNumber}"] input:checked`);

    if (!itemNameElement || !selectedInputElement) {
        console.error('No se encontraron elementos necesarios para agregar al pedido');
        return;
    }

    const itemName = itemNameElement.textContent;
    const itemPrice = parseFloat(selectedInputElement.value);
    const itemCount = counters[buttonNumber];

    const precioTotalProducto = itemPrice * itemCount;

    const pedido = {
        producto: {
            nombre: itemName,
            cantidad: itemCount,
            precio: itemPrice * itemCount,
            precioTotal: precioTotalProducto
        }
    };

    productos.push(pedido);

    localStorage.setItem('pedido', JSON.stringify(productos));

    // Reiniciar el contador y el input
    const counterValue = document.querySelector(`.div-botones-submenu[data-button-number="${buttonNumber}"] .counter-value`);
    if (counterValue) {
        counterValue.textContent = 0;
    }

    // Deseleccionar el input
    selectedInputElement.checked = false;

    // Actualizar el total en la interfaz
    actualizarTotal();
    // Actualizar el total del pedido en localStorage
    actualizarTotalPedido();

    // Reiniciar el contador
    counters[buttonNumber] = 0;

    // Mostrar el botón de hacer pedido si hay productos
    if (productos.length > 0) {
        document.getElementById('hacerPedidoButton').style.display = 'block';
    }

    const btnTuPedido = document.getElementById("tuPedidoBtn");
    btnTuPedido.style.display = productos.length > 0 ? 'flex' : 'none';
}

function actualizarTotal() {
    // Obtener la lista de productos del localStorage
    const productosGuardados = JSON.parse(localStorage.getItem('pedido'));

    // Inicializar el total de productos
    let totalProductos = 0;

    if (productosGuardados && productosGuardados.length > 0) {
        // Sumar los precios totales de los productos en el pedido
        totalProductos = productosGuardados.reduce((total, producto) => {
            return total + producto.producto.precioTotal;
        }, 0);
    }

    // Sumar el total de productos con el total de extras
    const totalFinal = totalProductos;

    // Actualiza el total en el elemento HTML
    const totalElement = document.getElementById('total');
    if (totalElement) {
        totalElement.textContent = `$${totalFinal.toFixed(2)}`;
    }
}

function actualizarTotalPedido() {
    const productosGuardados = JSON.parse(localStorage.getItem('pedido'));

    let totalPedido = 0;

    if (productosGuardados && productosGuardados.length > 0) {
        totalPedido = productosGuardados.reduce((total, producto) => total + producto.producto.precioTotal, 0);
    }

    localStorage.setItem('totalPedido', totalPedido);
}

function toggleDropdown() {
    const tuPedidoBtn = document.getElementById('tuPedidoBtn');
    const pedidoDropdown = document.getElementById('pedidoDropdown');

    // Togglear la visibilidad del div al hacer clic en el botón "Tu Pedido"
    if (pedidoDropdown.style.display === 'none') {
        actualizarPedido(); // Actualizar la lista de productos en el pedido
        pedidoDropdown.style.display = 'flex';
        pedidoDropdown.style.transition = 'transform 0.8s, opacity 0.8s';
        pedidoDropdown.style.transform = 'translateY(0px)';
        pedidoDropdown.style.opacity = '1';
        flecha.classList.remove('flecha-abajo');
        flecha.classList.add('flecha-arriba');
    } else {
        pedidoDropdown.style.transition = 'transform 0.8s , opacity 0.8s';
        pedidoDropdown.style.transform = 'translateY(-50px)';
        pedidoDropdown.style.opacity = '0';
        flecha.classList.remove('flecha-arriba');
        flecha.classList.add('flecha-abajo');
        // Retrasar la ocultación para permitir que la transición tenga lugar
        setTimeout(() => {
            pedidoDropdown.style.display = 'none';
        }, 800);
    }
}
function actualizarPedido() {
    const pedidoDropdown = document.getElementById('pedidoDropdown');
    const tuPedidoBtn = document.getElementById('tuPedidoBtn');
    const btnHacerPedido = document.getElementById("hacerPedidoButton")

    pedidoDropdown.innerHTML = '';

    const productosGuardados = JSON.parse(localStorage.getItem('pedido'));

    if (productosGuardados && productosGuardados.length > 0) {
        let productoAnterior = null;

        productosGuardados.forEach((producto, index) => {
            const productoDiv = document.createElement('div');
            productoDiv.className = 'producto-pedido';

            productoDiv.innerHTML = `${producto.producto.nombre} Cantidad: ${producto.producto.cantidad} Precio Total: $${producto.producto.precioTotal}`;

            if (producto.producto.extras && producto.producto.extras.length > 0) {
                productoDiv.innerHTML += ' (E)';
            }

            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'x';
            eliminarBtn.className = 'eliminar-producto';
            eliminarBtn.onclick = function () {
                eliminarDelPedido(index);
                actualizarPedido();
            };
            productoDiv.appendChild(eliminarBtn);

            pedidoDropdown.appendChild(productoDiv);

            productoAnterior = { producto };
        });

        pedidoDropdown.style.display = 'flex';
        tuPedidoBtn.style.display = 'block';
    } else {
        pedidoDropdown.style.display = 'none';
        tuPedidoBtn.style.display = 'none';
        btnHacerPedido.style.display = "none"

    }
}

function eliminarDelPedido(index) {
    const btnHacerPedido = document.getElementById("hacerPedidoButton")
    const total = document.getElementById("total")

    productos.splice(index, 1);
    localStorage.setItem('pedido', JSON.stringify(productos));
    actualizarTotal(); // Actualizar el total en la interfaz
    actualizarTotalPedido(); // Actualizar el total del pedido en localStorage

    if (total.textContent == '$0.00') {
        btnHacerPedido.style.display = "none"
    }
}

function eliminarDelPedido(index) {
    const productoEliminado = productos[index];
    const precioProductoEliminado = productoEliminado.producto.precioTotal;

    productos.splice(index, 1); // Eliminar el producto del array de productos
    localStorage.setItem('pedido', JSON.stringify(productos)); // Actualizar el localStorage con la nueva lista de productos

    // Restar el precio del producto eliminado del total del pedido
    const totalProductos = preciosTotalesProductos.reduce((total, precio) => total + precio, 0);
    const totalPedidoActualizado = totalProductos - precioProductoEliminado;

    preciosTotalesProductos = productos.map(producto => producto.producto.precioTotal); // Actualizar los precios totales de los productos

    // Actualizar el totalPedido en cada objeto de producto
    productos.forEach(producto => {
        producto.totalPedido = totalPedidoActualizado;
    });

    actualizarTotal(); // Actualizar el total en la interfaz
    actualizarPedido(); // Actualizar el pedido mostrado en la interfaz
}

function enviarPedidoWhatsApp() {
    // Obtener la lista de productos del almacenamiento local
    const productosGuardados = JSON.parse(localStorage.getItem('pedido'));
    let totalPedido = JSON.parse(localStorage.getItem('totalPedido'));

    if (productosGuardados && productosGuardados.length > 0) {
        // Crear el mensaje para WhatsApp
        let mensajeWhatsApp = `¡Hola Coco! Quiero realizar un pedido:\n\n`;

        // Recorrer cada producto en la lista de productos guardados
        productosGuardados.forEach((producto) => {
            mensajeWhatsApp += `${producto.producto.nombre} - Cantidad: ${producto.producto.cantidad} - Precio: $${producto.producto.precio}\n`;


            // Agregar el precio total del producto
            mensajeWhatsApp += `Precio Total del Producto: $${producto.producto.precioTotal}\n\n`;
        });

        // Agregar el precio total del pedido obtenido del localStorage
        mensajeWhatsApp += `Total del pedido: $${totalPedido}\n\n Muchas Gracias!`;

        // Reemplazar 'NUMERO_DE_TELEFONO' con el número de WhatsApp al que deseas enviar el mensaje, asegurándote de quitar espacios o guiones
        const numeroWhatsApp = '541150090298';

        // Crear el enlace de WhatsApp utilizando 'https://wa.me/'
        const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;

        // Redirigir a WhatsApp
        window.location.href = enlaceWhatsApp;

        // Imprimir en la consola para verificar el flujo
        console.log('Pedido enviado por WhatsApp.');
    } else {
        console.error('No se encontró información de pedido almacenada.');
    }
}