const products = [
    { id: 1, name: 'JavaScript入門ノート', price: 1800, category: 'book', tag: 'Book' },
    { id: 2, name: 'スマートライト', price: 3200, category: 'home', tag: 'Home' },
    { id: 3, name: 'モバイル充電器', price: 2600, category: 'tech', tag: 'Tech' },
    { id: 4, name: 'デザイン手帖', price: 2200, category: 'book', tag: 'Book' },
    { id: 5, name: 'ワイヤレススピーカー', price: 4500, category: 'tech', tag: 'Tech' },
    { id: 6, name: '温度計付きマグ', price: 1900, category: 'home', tag: 'Home' }
];

let cart = [];
let activeFilter = 'all';

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutButton = document.getElementById('checkoutButton');
const filterGroup = document.getElementById('filterGroup');

function renderProducts() {
    const keyword = searchInput.value.trim().toLowerCase();

    const filteredProducts = products.filter((product) => {
        const matchesFilter = activeFilter === 'all' || product.category === activeFilter;
        const matchesKeyword = product.name.toLowerCase().includes(keyword);
        return matchesFilter && matchesKeyword;
    });

    productGrid.innerHTML = filteredProducts.map((product) => `
    <article class="product-card">
      <div class="product-tag">${product.tag}</div>
      <h3>${product.name}</h3>
      <p>¥${product.price.toLocaleString()}</p>
      <button class="add-cart-button" data-id="${product.id}">カートに入れる</button>
    </article>
  `).join('');

    const addButtons = productGrid.querySelectorAll('.add-cart-button');
    addButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const id = Number(button.dataset.id);
            const product = products.find((item) => item.id === id);
            cart.push({ ...product, cartId: `${product.id}-${Date.now()}-${Math.random().toString(16).slice(2)}` });
            renderCart();
        });
    });
}

function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">カートは空です</p>';
        cartCount.textContent = '0点';
        cartTotal.textContent = '¥0';
        return;
    }

    cartItems.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <div>
        <span>${item.name}</span>
        <small>¥${item.price.toLocaleString()}</small>
      </div>
      <button class="remove-cart-button" data-cart-id="${item.cartId}">削除</button>
    </div>
  `).join('');

    cartItems.querySelectorAll('.remove-cart-button').forEach((button) => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.cartId;
            cart = cart.filter((item) => item.cartId !== targetId);
            renderCart();
        });
    });

    cartCount.textContent = `${cart.length}点`;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `¥${total.toLocaleString()}`;
}

searchInput.addEventListener('input', renderProducts);

filterGroup.addEventListener('click', (event) => {
    const button = event.target.closest('.filter-chip');
    if (!button) return;

    document.querySelectorAll('.filter-chip').forEach((chip) => chip.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    renderProducts();
});

checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('まず商品をカートに入れてください。');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`購入手続きへ進みます。合計: ¥${total.toLocaleString()}`);
});

renderProducts();
renderCart();
