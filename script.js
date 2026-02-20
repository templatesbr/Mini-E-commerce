const products = [
    { id:1,  name:'Blazer Oversized',   brand:'FORMA Studio',     price:389,              category:'roupas',     emoji:'🧥', tag:'new',  stars:5 },
    { id:2,  name:'Calça Alfaiataria',  brand:'FORMA Studio',     price:259, oldPrice:320, category:'roupas',     emoji:'👖', tag:'sale', stars:4 },
    { id:3,  name:'Camiseta Essential', brand:'FORMA Basics',     price:129,              category:'roupas',     emoji:'👕',             stars:5 },
    { id:4,  name:'Vestido Midi',       brand:'FORMA Studio',     price:449,              category:'roupas',     emoji:'👗', tag:'new',  stars:5 },
    { id:5,  name:'Bolsa Estruturada',  brand:'FORMA Acessórios', price:599,              category:'acessorios', emoji:'👜', tag:'new',  stars:5 },
    { id:6,  name:'Cinto Couro',        brand:'FORMA Acessórios', price:189, oldPrice:240, category:'acessorios', emoji:'🪢', tag:'sale', stars:4 },
    { id:7,  name:'Óculos Gatinho',     brand:'FORMA Eyewear',    price:229,              category:'acessorios', emoji:'🕶️',            stars:4 },
    { id:8,  name:'Scarpin Clássico',   brand:'FORMA Shoes',      price:499,              category:'calcados',   emoji:'👠',             stars:5 },
    { id:9,  name:'Loafer Premium',     brand:'FORMA Shoes',      price:429, oldPrice:529, category:'calcados',   emoji:'🥿', tag:'sale', stars:4 },
    { id:10, name:'Tênis Minimalista',  brand:'FORMA Sport',      price:349,              category:'calcados',   emoji:'👟', tag:'new',  stars:5 },
    { id:11, name:'Cachecol Lã',        brand:'FORMA Winter',     price:159, oldPrice:199, category:'acessorios', emoji:'🧣', tag:'sale', stars:4 },
    { id:12, name:'Jaqueta Couro',      brand:'FORMA Studio',     price:899,              category:'roupas',     emoji:'🫶', tag:'new',  stars:5 },
  ];
  
  let cart = [];
  let currentFilter = 'todos';
  
  function renderProducts(filter) {
    const grid = document.getElementById('productsGrid');
    const filtered = filter === 'todos' ? products
      : filter === 'sale' ? products.filter(p => p.tag === 'sale')
      : products.filter(p => p.category === filter);
  
    document.getElementById('productCount').textContent =
      `${filtered.length} produto${filtered.length !== 1 ? 's' : ''}`;
  
    grid.innerHTML = filtered.map((p, i) => `
      <div class="product-card" style="animation-delay:${i * 0.06}s">
        <div class="product-img">
          <div class="product-img-content">${p.emoji}</div>
          ${p.tag ? `<div class="product-tag ${p.tag}">${p.tag === 'new' ? 'Novo' : 'Sale'}</div>` : ''}
          <div class="product-actions" onclick="addToCart(${p.id})">+ Adicionar ao Carrinho</div>
        </div>
        <div class="stars">${'★'.repeat(p.stars)}${'☆'.repeat(5 - p.stars)}</div>
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price">
          ${p.oldPrice
            ? `<span class="old">R$ ${p.oldPrice.toFixed(2).replace('.', ',')}</span>
               <span class="sale-price">R$ ${p.price.toFixed(2).replace('.', ',')}</span>`
            : `R$ ${p.price.toFixed(2).replace('.', ',')}`}
        </div>
      </div>
    `).join('');
  }
  
  function filterProducts(filter, btn) {
    currentFilter = filter;
    document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(filter);
  }
  
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(c => c.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    updateCartUI();
    showToast(`"${product.name}" adicionado ao carrinho!`);
  }
  
  function removeFromCart(id) {
    cart = cart.filter(c => c.id !== id);
    updateCartUI();
  }
  
  function changeQty(id, delta) {
    const item = cart.find(c => c.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) return removeFromCart(id);
    updateCartUI();
  }
  
  function updateCartUI() {
    const total    = cart.reduce((s, c) => s + c.price * c.qty, 0);
    const totalQty = cart.reduce((s, c) => s + c.qty, 0);
  
    document.getElementById('cartCount').textContent = totalQty;
    document.getElementById('cartTotal').textContent = 'R$ ' + total.toFixed(2).replace('.', ',');
  
    const itemsEl = document.getElementById('cartItems');
    const footer  = document.getElementById('cartFooter');
    footer.style.display = cart.length ? '' : 'none';
  
    if (!cart.length) {
      itemsEl.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon">🛍</div>
          <p>Seu carrinho está vazio</p>
        </div>`;
      return;
    }
  
    itemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-img">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
          <div class="qty-controls">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="remove-item" onclick="removeFromCart(${item.id})">✕ Remover</button>
      </div>
    `).join('');
  }
  
  function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('open');
  }
  
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
  }
  
  function checkout() {
    const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
    cart = [];
    updateCartUI();
    toggleCart();
    showToast(`✓ Pedido de R$ ${total.toFixed(2).replace('.', ',')} realizado com sucesso!`);
  }
  
  // Init
  renderProducts('todos');
  updateCartUI();