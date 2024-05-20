const productsList = document.querySelector('.container-items');
const cartEmpty = document.querySelector('.cart-empty');
const rowProduct = document.querySelector('.row-product');
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartTotal = document.querySelector('.cart-total');
const iconCart = document.querySelector('.icon-cart');
const containerCart = document.querySelector('.container-cart-products');

let allProducts = [];

// Guardar el estado del carrito en Local Storage
const saveToLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(allProducts));
};

// Cargar el estado del carrito desde Local Storage
const loadFromLocalStorage = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (cart) {
    allProducts = cart;
    showHTML();
  }
};

// Función para mostrar u ocultar el carrito
const toggleCart = () => {
  containerCart.classList.toggle('hidden-cart');
};

// Evento al hacer clic en el icono del carrito
iconCart.addEventListener('click', toggleCart);

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

// Mostrar los productos en el carrito
const showHTML = () => {
  if (!allProducts.length) {
    cartEmpty.classList.remove('hidden');
    rowProduct.classList.add('hidden');
    cartTotal.classList.add('hidden');
  } else {
    cartEmpty.classList.add('hidden');
    rowProduct.classList.remove('hidden');
    cartTotal.classList.remove('hidden');
  }

  // Limpiar HTML
  rowProduct.innerHTML = '';

  let total = 0;
  let totalOfProducts = 0;

  allProducts.forEach(product => {
    const containerProduct = document.createElement('div');
    containerProduct.classList.add('cart-product');

    containerProduct.innerHTML = `
      <div class="info-cart-product">
        <span class="cantidad-producto-carrito">${product.quantity}</span>
        <p class="titulo-producto-carrito">${product.title}</p>
        <span class="precio-producto-carrito">${product.price}</span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="icon-close"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    `;

    rowProduct.append(containerProduct);

    total += product.quantity * parseFloat(product.price.replace('$', ''));
    totalOfProducts += product.quantity;
  });

  valorTotal.innerText = `$${total.toFixed(2)}`;
  countProducts.innerText = totalOfProducts;

  // Guardar el estado del carrito en Local Storage
  saveToLocalStorage();
};

// Agregar producto al carrito
productsList.addEventListener('click', e => {
  if (e.target.classList.contains('btn-add-cart')) {
    const product = e.target.parentElement;

    const infoProduct = {
      quantity: 1,
      title: product.querySelector('h2').textContent,
      price: product.querySelector('p').textContent,
    };

    const exists = allProducts.some(
      product => product.title === infoProduct.title
    );

    if (exists) {
      const products = allProducts.map(product => {
        if (product.title === infoProduct.title) {
          product.quantity++;
          return product;
        } else {
          return product;
        }
      });
      allProducts = [...products];
    } else {
      allProducts = [...allProducts, infoProduct];
    }

    showHTML();
  }
});

// Eliminar producto del carrito
rowProduct.addEventListener('click', e => {
  if (e.target.classList.contains('icon-close')) {
    const product = e.target.closest('.cart-product');
    const title = product.querySelector('p').textContent;

    allProducts = allProducts.filter(
      product => product.title !== title
    );

    showHTML();
  }
});


// Función para mostrar la notificación
const showNotification = (message) => {
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.textContent = message;
  document.body.appendChild(notification);

  // Eliminar la notificación después de 5 segundos
  setTimeout(() => {
    notification.remove();
  }, 10000);
};

// Agregar producto al carrito y mostrar notificación
productsList.addEventListener('click', e => {
  if (e.target.classList.contains('btn-add-cart')) {
    // ... (tu código existente para agregar el producto al carrito)

    // Mostrar notificación
    showNotification('Producto agregado al carrito satisfactoriamente');
  }
});
