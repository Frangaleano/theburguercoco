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
        tituloMenu.style.color = "white"
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
                <div class="div-img-prod">
                    <img class="img-productos" src="./burguer-prod.png" alt="Classic Power">
                    <div class="div-contador">
                    <button class="counter-button" onclick="updateCounter(1, 'decrement')">-</button>
                    <span class="counter-value">0</span>
                    <button class="counter-button" onclick="updateCounter(1, 'increment')">+</button>
                </div>
            </div>
                <div class="div-parrafos">     
                    <button class="menu-button sub-menu-button" data-button-number="1">Classic Power</button>
                    <p id="parrafos-detalles">Blend de carne + Pan de papa + Salsa BIG + Lechuga + Tomate + Cebolla + Panceta + Cheddar</p>
                    <div class="div-detalles">
                        <div class="div-input">
                            <p>Simple $5700</p>
                            <input class="radio-button" type="radio" name="Classic power simple" value="5700">
                            <p>Doble <br>$7200</p>
                            <input class="radio-button" type="radio" name="Classic power doble" value="7200">
                            <p>Triple <br>$8500</p>
                            <input class="radio-button" type="radio" name="Classic power triple" value="8500">
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
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Cuarto de libra">
                <div class="div-contador">
                    <button class="counter-button" onclick="updateCounter(2, 'decrement')">-</button>
                    <span class="counter-value">0</span>
                    <button class="counter-button" onclick="updateCounter(2, 'increment')">+</button>
                </div>
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="2">Cuarto de libra</button>
                <p id="parrafos-detalles">Blend de carne + Pan de papa + Ketchup + Mostaza + Cebolla brunoisse + Cheddar</p>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>Simple $5700</p>
                            <input class="radio-button" type="radio" name="Cuarto de libra simple" value="5700">

                            <p>Doble <br>$7200</p>
                            <input class="radio-button" type="radio" name="Cuarto de libra doble" value="7200">

                            <p>Triple <br>$8500</p>
                            <input class="radio-button" type="radio" name="Cuarto de libra triple" value="8500">
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(2)">Agregar al pedido</button>
            </div>
        </div>

        <div class="div-botones-submenu" data-button-number="3">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Big coco">
                <div class="div-contador">
                <button class="counter-button" onclick="updateCounter(3, 'decrement')">-</button>
                <span class="counter-value">0</span>
                <button class="counter-button" onclick="updateCounter(3, 'increment')">+</button>
                </div>
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="3">Big coco</button>
                <p id="parrafos-detalles">Blend de carne + Pan de papa + Salsa BIG + Lechuga + Pepinilo + Cheddar</p>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>Simple $5700</p>
                            <input class="radio-button" type="radio" name="Big coco simple" value="5700">

                            <p>Doble <br>$7200</p>
                            <input class="radio-button" type="radio" name="Big coco doble" value="7200">

                            <p>Triple <br>$8500</p>
                            <input class="radio-button" type="radio" name="Big coco triple" value="8500">
                            
                            
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(3)">Agregar al pedido</button>
            </div>
        </div>

        <div class="div-botones-submenu" data-button-number="4">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Cheese burguer">
                <div class="div-contador">
                <button class="counter-button" onclick="updateCounter(4, 'decrement')">-</button>
                <span class="counter-value">0</span>
                <button class="counter-button" onclick="updateCounter(4, 'increment')">+</button>
                </div>
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="4">Cheese burguer</button>
                <p id="parrafos-detalles">Blend de carne + Pan de papa + Cheddar</p>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>Simple $5500</p>
                            <input class="radio-button" type="radio" name="Classic power simple" value="5500">

                            <p>Doble <br>$7000</p>
                            <input class="radio-button" type="radio" name="Classic power doble" value="7000">

                            <p>Triple <br>$8200</p>
                            <input class="radio-button" type="radio" name="Classic power triple" value="8200">
                            
                            
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(4)">Agregar al pedido</button>
            </div>
        </div>

        <div class="div-botones-submenu" data-button-number="5">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Veggie premium">
                <div class="div-contador">
                <button class="counter-button" onclick="updateCounter(5, 'decrement')">-</button>
                <span class="counter-value">0</span>
                <button class="counter-button" onclick="updateCounter(5, 'increment')">+</button>
                </div>
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="5">Veggie premium</button>
                <p id="parrafos-detalles">Medallon veggie + Pan de papa + Tomate + Cebolla caramelizada + Cheddar</p>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>Simple $5500</p>
                            <input class="radio-button" type="radio" name="Veggie premium simple" value="5500">

                            <p>Doble <br>$7000</p>
                            <input class="radio-button" type="radio" name="Veggie premium doble" value="7000">

                            <p>Triple <br>$8200</p>
                            <input class="radio-button" type="radio" name="Veggie premium triple" value="8200">
                            
                        </div>
                    </div>
                </div>   
            </div>    
            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(5)">Agregar al pedido</button>
            </div>
        </div>


        <div class="div-botones-submenu" data-button-number="6">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="The king">
                <div class="div-contador">
                <button class="counter-button" onclick="updateCounter(6, 'decrement')">-</button>
                <span class="counter-value">0</span>
                <button class="counter-button" onclick="updateCounter(6, 'increment')">+</button>
                </div>
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="6">The King</button>
                <p id="parrafos-detalles">Blend de carne + Pan de papa + Salsa King + Panceta + Cheddar</p>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>Simple $5800</p>
                            <input class="radio-button" type="radio" name="The King simple" value="5800">

                            <p>Doble <br>$7300</p>
                            <input class="radio-button" type="radio" name="The King doble" value="7300">

                            <p>Triple <br>$8700</p>
                            <input class="radio-button" type="radio" name="The King triple" value="8700">
                            
                            
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(6)">Agregar al pedido</button>
            </div>
        </div>

        <div class="div-botones-submenu" data-button-number="7">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Baked bacon">
                <div class="div-contador">
                <button class="counter-button" onclick="updateCounter(7, 'decrement')">-</button>
                <span class="counter-value">0</span>
                <button class="counter-button" onclick="updateCounter(7, 'increment')">+</button>
                </div>
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="7">Baked Bacon</button>
                <p id="parrafos-detalles">Blend de carne + Pan de papa + Salsa BIG + Panceta + Cheddar</p>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>Simple $5700</p>
                            <input class="radio-button" type="radio" name="Classic power simple" value="5700">

                            <p>Doble <br>$7200</p>
                            <input class="radio-button" type="radio" name="Classic power doble" value="7200">

                            <p>Triple <br>$8500</p>
                            <input class="radio-button" type="radio" name="Classic power triple" value="8500">
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(7)">Agregar al pedido</button>
            </div>
        </div>

        <div class="div-botones-submenu" data-button-number="8">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="The mom power">
                <div class="div-contador">
                <button class="counter-button" onclick="updateCounter(8, 'decrement')">-</button>
                <span class="counter-value">0</span>
                <button class="counter-button" onclick="updateCounter(8, 'increment')">+</button>
                </div>
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="8">The Mom Power</button>
                <p id="parrafos-detalles">Blend de carne + Pan de papa + Salsa Alioli + Aros Cebolla + Cheddar</p>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>Simple $5800</p>
                            <input class="radio-button" type="radio" name="The mom power simple" value="5800">

                            <p>Doble <br>$7300</p>
                            <input class="radio-button" type="radio" name="The mom power doble" value="7300">

                            <p>Triple <br>$8700</p>
                            <input class="radio-button" type="radio" name="The mom power triple" value="8700">
                            
                            
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(8)">Agregar al pedido</button>
            </div>
        </div>

        <div class="div-botones-submenu" data-button-number="9">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Fried onion">
                <div class="div-contador">
                <button class="counter-button" onclick="updateCounter(9, 'decrement')">-</button>
                <span class="counter-value">0</span>
                <button class="counter-button" onclick="updateCounter(9, 'increment')">+</button>
                </div>
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="9">Fried Onion</button>
                <p id="parrafos-detalles">Blend de carne + Pan de papa + Cebolla smasheada + Cheddar</p>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>Simple $5800</p>
                            <input class="radio-button" type="radio" name="Fried onion simple" value="5800">

                            <p>Doble <br>$7300</p>
                            <input class="radio-button" type="radio" name="Fried onion doble" value="7300">

                            <p>Triple <br>$8700</p>
                            <input class="radio-button" type="radio" name="Fried onion triple" value="8700">
                            
                            
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(9)">Agregar al pedido</button>
            </div>
        </div>

        <div class="div-botones-submenu" data-button-number="10">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Sweet onion">
                <div class="div-contador">
                <button class="counter-button" onclick="updateCounter(10, 'decrement')">-</button>
                <span class="counter-value">0</span>
                <button class="counter-button" onclick="updateCounter(10, 'increment')">+</button>
                </div>
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="10">Sweet Onion</button>
                <p id="parrafos-detalles">Blend de carne + Pan de papa + Ketchup + Cebolla Caramelizada + Panceta + Cheddar</p>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>Simple $5800</p>
                            <input class="radio-button" type="radio" name="Sweet onion simple" value="5800">

                            <p>Doble <br>$7300</p>
                            <input class="radio-button" type="radio" name="Sweet onion doble" value="7300">

                            <p>Triple <br>$8700</p>
                            <input class="radio-button" type="radio" name="Sweet onion triple" value="8700">
                            
                            
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(10)">Agregar al pedido</button>
            </div>
        </div>

        <div class="div-botones-submenu" data-button-number="11">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Crispy bacon">
                <div class="div-contador">
                <button class="counter-button" onclick="updateCounter(11, 'decrement')">-</button>
                <span class="counter-value">0</span>
                <button class="counter-button" onclick="updateCounter(11, 'increment')">+</button>
                </div>
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="11">Crispy Bacon</button>
                <p id="parrafos-detalles">Blend de carne + Pan de papa + Barbacoa + Cebolla Crispy + Panceta + Cheddar</p>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>Simple $5800</p>
                            <input class="radio-button" type="radio" name="Crispy Bacon simple" value="5800">

                            <p>Doble <br>$7300</p>
                            <input class="radio-button" type="radio" name="Crispy Bacon doble" value="7300">

                            <p>Triple <br>$8700</p>
                            <input class="radio-button" type="radio" name="Crispy Bacon triple" value="8700">
                            
                            
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(11)">Agregar al pedido</button>
            </div>
        </div>

        <div class="div-botones-submenu" data-button-number="12">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Provolone">
                <div class="div-contador">
                <button class="counter-button" onclick="updateCounter(12, 'decrement')">-</button>
                <span class="counter-value">0</span>
                <button class="counter-button" onclick="updateCounter(12, 'increment')">+</button>
                </div>
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="12">Provolone</button>
                <p id="parrafos-detalles">Blend de carne + Pan de papa + Salsa Diyonesa + Provolone</p>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>Simple $5800</p>
                            <input class="radio-button" type="radio" name="Provolone simple" value="5800">

                            <p>Doble <br>$7300</p>
                            <input class="radio-button" type="radio" name="Provolone doble" value="7300">

                            <p>Triple <br>$8700</p>
                            <input class="radio-button" type="radio" name="Provolone triple" value="8700">
                            
                            
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(12)">Agregar al pedido</button>
            </div>
        </div>

        <div class="div-botones-submenu" data-button-number="13">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Stacker coco">
                <div class="div-contador">
                <button class="counter-button" onclick="updateCounter(13, 'decrement')">-</button>
                <span class="counter-value">0</span>
                <button class="counter-button" onclick="updateCounter(13, 'increment')">+</button>
                </div>
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="13">Stacker coco</button>
                <p id="parrafos-detalles">Blend de carne + Pan de papa + Salsa Stacker + Panceta + Cheddar</p>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>Simple $5800</p>
                            <input class="radio-button" type="radio" name="Stacker coco simple" value="5800">

                            <p>Doble <br>$7300</p>
                            <input class="radio-button" type="radio" name="Stacker coco doble" value="7300">

                            <p>Triple <br>$8700</p>
                            <input class="radio-button" type="radio" name="Stacker coco triple" value="8700">
                            
                            
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(13)">Agregar al pedido</button>
            </div>
        </div>

        <div class="div-botones-submenu" data-button-number="14">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Coco house">
                <div class="div-contador">
                <button class="counter-button" onclick="updateCounter(14, 'decrement')">-</button>
                <span class="counter-value">0</span>
                <button class="counter-button" onclick="updateCounter(14, 'increment')">+</button>
                </div>
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="14">Coco House</button>
                <p id="parrafos-detalles">Blend de carne + Pan de papa + Barbacoa + Huevo Frito + Panceta + Cheddar</p>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>Simple $5800</p>
                            <input class="radio-button" type="radio" name="Coco House simple" value="5800">

                            <p>Doble <br>$7300</p>
                            <input class="radio-button" type="radio" name="Coco House doble" value="7300">

                            <p>Triple <br>$8700</p>
                            <input class="radio-button" type="radio" name="Coco House triple" value="8700">
                            
                            
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(14)">Agregar al pedido</button>
            </div>
        </div>

         <div class="div-botones-submenu" data-button-number="15">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Tasty burguer">
                <div class="div-contador">
                <button class="counter-button" onclick="updateCounter(15, 'decrement')">-</button>
                <span class="counter-value">0</span>
                <button class="counter-button" onclick="updateCounter(15, 'increment')">+</button>
                </div>
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="15">Tasty burguer</button>
                <p id="parrafos-detalles">Blen de carne + Pan de papa + Salsa Tasty + Lechuga + Tomate + Cebolla + Cheddar</p>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>Simple $5800</p>
                            <input class="radio-button" type="radio" name="Tasty burguer simple" value="5800">

                            <p>Doble <br>$7300</p>
                            <input class="radio-button" type="radio" name="Tasty burguer doble" value="7300">

                            <p>Triple <br>$8700</p>
                            <input class="radio-button" type="radio" name="Tasty burguer triple" value="8700">
                            
                            
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(15)">Agregar al pedido</button>
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
                 <div class="div-botones-submenu" data-button-number="16">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Papas Fritas chicas">
                <div class="div-contador">
                <button class="counter-button" onclick="updateCounter(16, 'decrement')">-</button>
                <span class="counter-value">0</span>
                <button class="counter-button" onclick="updateCounter(16, 'increment')">+</button>
                </div>
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="16">Papas Fritas</button>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>Chicas <br>$2500</p>
                            <input class="radio-button" type="radio" name="Papas fritas chicas" value="2500">

                            <p>Med. <br>$3000</p>
                            <input class="radio-button" type="radio" name="Papas fritas medianas" value="3000">

                            <p>Grandes <br>$4000</p>
                            <input class="radio-button" type="radio" name="Papas fritas grandes" value="4000">
                            
                            
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(16)">Agregar al pedido</button>
            </div>
        </div>

            <div class="div-botones-submenu" data-button-number="17">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Extra guarnicion">
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="17">Extra Guarnición</button>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>$1500</p>
                            <input class="radio-button" type="radio" name="Extra Guarnición" value="1500">
                            <button class="counter-button" onclick="updateCounter(17, 'decrement')">-</button>
                            <span class="counter-value">0</span>
                            <button class="counter-button" onclick="updateCounter(17, 'increment')">+</button>
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(17)">Agregar al pedido</button>
            </div>
        </div>


        <div class="div-botones-submenu" data-button-number="18">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Con cheddar">
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="18">Con cheddar</button>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>$1500</p>
                            <input class="radio-button" type="radio" name="Con cheddar" value="1500">                           
                            <button class="counter-button" onclick="updateCounter(18, 'decrement')">-</button>
                            <span class="counter-value">0</span>
                            <button class="counter-button" onclick="updateCounter(18, 'increment')">+</button>
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(18)">Agregar al pedido</button>
            </div>
        </div>


        <div class="div-botones-submenu" data-button-number="19">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Con cheddar y bacon">
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="19">Con Cheddar y Bacon</button>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>$2000</p>
                            <input class="radio-button" type="radio" name="Con cheddar y bacon" value="2000">                           
                            <button class="counter-button" onclick="updateCounter(19, 'decrement')">-</button>
                            <span class="counter-value">0</span>
                            <button class="counter-button" onclick="updateCounter(19, 'increment')">+</button>
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(19)">Agregar al pedido</button>
            </div>
        </div>


        <div class="div-botones-submenu" data-button-number="20">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Con cheddar, bacon y huevo">
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="20">Con Cheddar, Bacon y Huevo</button>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>$2200</p>
                            <input class="radio-button" type="radio" name="Con cheddar, bacon y huevo" value="2200">
                            <button class="counter-button" onclick="updateCounter(20, 'decrement')">-</button>
                            <span class="counter-value">0</span>
                            <button class="counter-button" onclick="updateCounter(20, 'increment')">+</button>
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(20)">Agregar al pedido</button>
            </div>
        </div>


        <div class="div-botones-submenu" data-button-number="21">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Aros de cebolla">
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="21">Aros de Cebolla</button>
                <p id="parrafos-detalles">Porción de 12 aros de cebolla con dip a elección</p>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>$5000</p>
                            <input class="radio-button" type="radio" name="Aros de cebolla" value="5000">                               
                            <button class="counter-button" onclick="updateCounter(21, 'decrement')">-</button>
                            <span class="counter-value">0</span>
                            <button class="counter-button" onclick="updateCounter(21, 'increment')">+</button>                       
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(21)">Agregar al pedido</button>
            </div>
        </div>



        <div class="div-botones-submenu" data-button-number="22">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Triangulos de muzza">
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="22">Triangulos de Muzza</button>
                <p id="parrafos-detalles">Porción de 12 unidades con dip a elección</p>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>$5000</p>
                            <input class="radio-button" type="radio" name="Triangulos de muzza" value="5000">
                            <button class="counter-button" onclick="updateCounter(22, 'decrement')">-</button>
                            <span class="counter-value">0</span>
                            <button class="counter-button" onclick="updateCounter(22, 'increment')">+</button>
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(22)">Agregar al pedido</button>
            </div>
        </div>


        <div class="div-botones-submenu" data-button-number="23">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Nuggets">
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="23">Nuggets</button>
                <p id="parrafos-detalles">Porción de 15 unidades con dip a elección</p>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>$5000</p>
                            <input class="radio-button" type="radio" name="Nuggets" value="5000">
                            <button class="counter-button" onclick="updateCounter(23, 'decrement')">-</button>
                            <span class="counter-value">0</span>
                            <button class="counter-button" onclick="updateCounter(23, 'increment')">+</button>
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(23)">Agregar al pedido</button>
            </div>
        </div>


        <div class="div-botones-submenu" data-button-number="24">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./burguer-prod.png" alt="Pochoclos">
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="24">Pochoclos</button>
                <p id="parrafos-detalles">Porción 25 unidades con dip a elección</p>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>Simple $5800</p>
                            <input class="radio-button" type="radio" name="Pochoclos" value="5800">
                            <button class="counter-button" onclick="updateCounter(24, 'decrement')">-</button>
                            <span class="counter-value">0</span>
                            <button class="counter-button" onclick="updateCounter(24, 'increment')">+</button>
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(24)">Agregar al pedido</button>
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
        <div class="div-botones-submenu" data-button-number="25">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./coca.png" alt="Cocacola">
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="25">Coca-cola 500ml</button>
                    <div class="div-detalles">

                        <div class="div-input">
                            <p>$1500</p>
                            <input class="radio-button" type="radio" name="Coca 500ml" value="1500">
                            <button class="counter-button" onclick="updateCounter(25, 'decrement')">-</button>
                            <span class="counter-value">0</span>
                            <button class="counter-button" onclick="updateCounter(25, 'increment')">+</button>
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(25)">Agregar al pedido</button>
            </div>
        </div>


        <div class="div-botones-submenu" data-button-number="26">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./coca-zero.png" alt="coca-zero">
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="26">Coca-zero 500ml</button>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>$1500</p>
                            <input class="radio-button" type="radio" name="Coca-zero 500ml" value="1500">
                            <button class="counter-button" onclick="updateCounter(26, 'decrement')">-</button>
                            <span class="counter-value">0</span>
                            <button class="counter-button" onclick="updateCounter(26, 'increment')">+</button>
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(26)">Agregar al pedido</button>
            </div>
        </div>


        <div class="div-botones-submenu" data-button-number="27">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./fanta.png" alt="Fanta">
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="27">Fanta 500ml</button>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>$1500</p>
                            <input class="radio-button" type="radio" name="Fanta" value="1500">
                            <button class="counter-button" onclick="updateCounter(27, 'decrement')">-</button>
                            <span class="counter-value">0</span>
                            <button class="counter-button" onclick="updateCounter(27, 'increment')">+</button>
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(27)">Agregar al pedido</button>
            </div>
        </div>



        <div class="div-botones-submenu" data-button-number="28">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./sprite.png" alt="Sprite">
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="28">Sprite 500ml</button>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>$1500</p>
                            <input class="radio-button" type="radio" name="Sprite 500ml" value="1500">
                            <button class="counter-button" onclick="updateCounter(28, 'decrement')">-</button>
                            <span class="counter-value">0</span>
                            <button class="counter-button" onclick="updateCounter(28, 'increment')">+</button>
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(28)">Agregar al pedido</button>
            </div>
        </div>


        <div class="div-botones-submenu" data-button-number="29">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./lata-andes.png" alt="Andes mendocina">
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="29">Lata Andes mendocina</button>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>$2000</p>
                            <input class="radio-button" type="radio" name="Lata andes mendocina" value="2000">
                            <button class="counter-button" onclick="updateCounter(29, 'decrement')">-</button>
                            <span class="counter-value">0</span>
                            <button class="counter-button" onclick="updateCounter(29, 'increment')">+</button>
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(29)">Agregar al pedido</button>
            </div>
        </div>


        <div class="div-botones-submenu" data-button-number="30">
            <div class="div-producto">
            <div class="div-img-prod">
                <img class="img-productos" src="./lata-schneider.png" alt="lata Schneider">
            </div>
                <div class="div-parrafos">
                    
                <button class="menu-button sub-menu-button" data-button-number="30">Lata Schneider</button>

                    <div class="div-detalles">

                        <div class="div-input">
                            <p>$1600</p>
                            <input class="radio-button" type="radio" name="lata schneider" value="1600">
                            <button class="counter-button" onclick="updateCounter(30, 'decrement')">-</button>
                            <span class="counter-value">0</span>
                            <button class="counter-button" onclick="updateCounter(30, 'increment')">+</button>
                        </div>
                    </div>
                </div>   
            </div>    

            <div class="div-boton-agregar">
                <button class="boton-agregar" onclick="agregarAlPedido(30)">Agregar al pedido</button>
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
    const selectedInputElement = document.querySelector(`.div-botones-submenu[data-button-number="${buttonNumber}"] input:checked`);

    if (!selectedInputElement) {
        console.error('No se encontraron elementos necesarios para agregar al pedido');
        return;
    }

    const itemName = selectedInputElement.name; // Obtener el nombre desde el atributo 'name' del input
    const itemPrice = parseFloat(selectedInputElement.value);
    const itemCount = counters[buttonNumber];

    const precioTotalProducto = itemPrice * itemCount;

    const pedido = {
        producto: {
            nombre: itemName, // Almacenar el nombre correctamente
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

    selectedInputElement.checked = false;

    // Actualizar el total en la interfaz
    actualizarTotal();
    actualizarTotalPedido();

    counters[buttonNumber] = 0;

    if (productos.length > 0) {
        document.getElementById('hacerPedidoButton').style.display = 'flex';
        document.getElementById('hacerPedidoButton').style.alignItems = 'center';
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

    tuPedidoBtn.style.display = "flex"
    tuPedidoBtn.style.alignItems = "center"

    // Togglear la visibilidad del div al hacer clic en el botón "Tu Pedido"
    if (pedidoDropdown.style.display === 'none') {
        actualizarPedido(); // Actualizar la lista de productos en el pedido
        pedidoDropdown.style.display = 'flex';
        pedidoDropdown.style.transition = 'transform 0.8s, opacity 0.8s';
        pedidoDropdown.style.transform = 'translateY(0px)';
        pedidoDropdown.style.opacity = '1';
        flecha.classList.remove('flecha-abajo');
        flecha.classList.add('flecha-arriba');
        tuPedidoBtn.style.display = "flex"
        tuPedidoBtn.style.alignItems = "center"
    } else {
        pedidoDropdown.style.transition = 'transform 0.8s , opacity 0.8s';
        pedidoDropdown.style.transform = 'translateY(-50px)';
        pedidoDropdown.style.opacity = '0';
        flecha.classList.remove('flecha-arriba');
        flecha.classList.add('flecha-abajo');
        tuPedidoBtn.style.display = "flex"
        tuPedidoBtn.style.alignItems = "center"
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

    // Verificar el contenido de productosGuardados
    console.log(productosGuardados); // <-- Asegúrate de que los nombres sean correctos

    if (productosGuardados && productosGuardados.length > 0) {
        let mensajeWhatsApp = `¡Hola Coco! Quiero realizar un pedido:\n\n`;

        productosGuardados.forEach((producto) => {
            mensajeWhatsApp += `${producto.producto.nombre} - Cantidad: ${producto.producto.cantidad} - Precio: $${producto.producto.precio}\n`;
            mensajeWhatsApp += `Precio Total del Producto: $${producto.producto.precioTotal}\n\n`;
        });

        mensajeWhatsApp += `Total del pedido: $${totalPedido}\n\n Muchas Gracias!`;

        const numeroWhatsApp = '541150090298';
        const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;

        window.location.href = enlaceWhatsApp;

        console.log('Pedido enviado por WhatsApp.');
    } else {
        console.error('No se encontró información de pedido almacenada.');
    }
}