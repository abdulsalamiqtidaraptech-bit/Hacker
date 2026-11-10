const CART_KEY = 'ak_cart';
const WHATSAPP_NUMBER = '923151034354';

const productCatalog = {
  'classic-leather-jacket': {
    id: 'classic-leather-jacket',
    name: 'Classic Leather Jacket',
    price: 24999,
    oldPrice: 29999,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    description: 'A refined leather jacket with clean lines, premium hardware and a confident silhouette designed for day-to-night wear.',
    category: 'Leather Jackets',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Brown', 'Sand']
  },
  'winter-elite-puffer': {
    id: 'winter-elite-puffer',
    name: 'Winter Elite Puffer',
    price: 21999,
    oldPrice: 26999,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    description: 'High-utility warmth with sharp finishing, ideal for everyday city layering and winter-ready styling.',
    category: 'Puffer Jackets',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Charcoal', 'Olive', 'Navy']
  },
  'urban-oversized-hoodie': {
    id: 'urban-oversized-hoodie',
    name: 'Urban Oversized Hoodie',
    price: 16999,
    oldPrice: 19999,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
    description: 'An oversized hoodie with a premium finish, designed to blend comfort, attitude and effortless layering.',
    category: 'Oversized Hoodies',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Cream', 'Black', 'Ash']
  },
  'elegant-trench-coat': {
    id: 'elegant-trench-coat',
    name: 'Elegant Trench Coat',
    price: 28999,
    oldPrice: 34999,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
    description: 'Sculpted trench styling with elevated details for a polished, statement-ready winter wardrobe.',
    category: 'Trench Coats',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Black', 'Ivory']
  },
  'women-leather-jacket': {
    id: 'women-leather-jacket',
    name: "Women's Leather Jacket",
    price: 26999,
    oldPrice: 31999,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    description: 'A sleek women’s leather jacket tailored for confidence, movement and premium everyday style.',
    category: "Women's Leather Jackets",
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Sand', 'Taupe']
  },
  'puffer-coat': {
    id: 'puffer-coat',
    name: 'Puffer Coat',
    price: 22999,
    oldPrice: 27999,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
    description: 'A lightweight insulated puffer coat built for warmth, movement and modern winter layering.',
    category: 'Puffer Coats',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'Stone', 'Cream']
  },
  'long-winter-coat': {
    id: 'long-winter-coat',
    name: 'Long Winter Coat',
    price: 31999,
    oldPrice: 36999,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
    description: 'Long-line winter coverage with a luxe finish for structured styling across cold weather days.',
    category: 'Long Winter Coats',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Charcoal', 'Black', 'Camel']
  },
  'fashion-outerwear': {
    id: 'fashion-outerwear',
    name: 'Fashion Outerwear',
    price: 17999,
    oldPrice: 21999,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    description: 'Minimalist statement outerwear crafted for effortless styling, comfort and premium winter appeal.',
    category: 'Fashion Outerwear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Ivory', 'Taupe']
  }
};

function formatPKR(value) {
  return `PKR ${Number(value).toLocaleString('en-PK')}`;
}

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function updateCartBadge() {
  const badge = document.querySelector('#cart-count');
  if (!badge) return;
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = count;
}

function createWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function addToCart(product, quantity = 1, selectedSize = 'M', selectedColor = 'Black') {
  const cart = getCart();
  const existingIndex = cart.findIndex(
    (item) => item.id === product.id && item.size === selectedSize && item.color === selectedColor
  );

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      size: selectedSize,
      color: selectedColor,
      quantity,
      image: product.image
    });
  }

  saveCart(cart);
  updateCartBadge();

  const cartPage = window.location.pathname.endsWith('cart.html');
  if (cartPage) {
    renderCartPage();
  }
}

function bindAddToCartButtons() {
  const buttons = document.querySelectorAll('.add-to-cart');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.product-card');
      const product = {
        id: card.dataset.id,
        name: card.dataset.name || 'Sample Product',
        price: Number(card.dataset.price || 0),
        image: card.dataset.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80'
      };

      addToCart(product, 1, 'M', 'Black');
    });
  });
}

function bindWhatsAppOrderButtons() {
  document.querySelectorAll('.whatsapp-order').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const card = button.closest('.product-card');
      const productName = card?.dataset.name || 'Product';
      const message = `Hello Abdul Karim Outerwear! I am interested in ordering ${productName}. Size: M. Color: Black. Quantity: 1. Please share the order details.`;
      window.open(createWhatsAppLink(message), '_blank', 'noopener');
    });
  });
}

function bindQuickView() {
  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;

  const modalImage = document.getElementById('modal-image');
  const modalName = document.getElementById('modal-name');
  const modalPrice = document.getElementById('modal-price');
  const modalDescription = document.getElementById('modal-description');
  const closeButton = document.querySelector('.modal-close');

  document.querySelectorAll('.quick-view-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.product-card');
      const product = productCatalog[card.dataset.id] || {
        id: card.dataset.id,
        name: card.dataset.name,
        price: Number(card.dataset.price || 0),
        image: card.dataset.image,
        description: 'Premium winter essentials designed for everyday confidence.'
      };

      modalImage.src = product.image;
      modalImage.alt = product.name;
      modalName.textContent = product.name;
      modalPrice.textContent = formatPKR(product.price);
      modalDescription.textContent = product.description;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  closeButton.addEventListener('click', () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
}

function bindFaqs() {
  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const parent = button.closest('.faq-list');
      parent.querySelectorAll('.faq-item').forEach((faq) => {
        if (faq !== item) {
          faq.classList.remove('active');
        }
      });
      item.classList.toggle('active');
    });
  });
}

function bindHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll);

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }
}

function renderProductDetailPage() {
  const root = document.getElementById('product-detail-root');
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 'classic-leather-jacket';
  const product = productCatalog[id];
  if (!product) return;

  const productName = document.getElementById('product-name');
  const productPrice = document.getElementById('product-price');
  const oldPrice = document.getElementById('product-old-price');
  const description = document.getElementById('product-description');
  const fullDescription = document.getElementById('full-description');
  const mainImage = document.getElementById('main-product-image');
  const whatsappButton = document.getElementById('whatsapp-order-button');
  const addToCartButton = document.getElementById('add-to-cart-detail');
  const buyNowButton = document.getElementById('buy-now-button');
  const quantityValue = document.getElementById('quantity-value');

  productName.textContent = product.name;
  productPrice.textContent = formatPKR(product.price);
  oldPrice.textContent = formatPKR(product.oldPrice || product.price * 1.2);
  description.textContent = product.description;
  fullDescription.textContent = `${product.description} Crafted for comfort and confidence, this ${product.category.toLowerCase()} offers elevated styling with premium finishing and everyday winter functionality.`;
  mainImage.src = product.image;
  mainImage.alt = product.name;

  const sizeOptions = document.querySelectorAll('#size-options .option-pill');
  const colorOptions = document.querySelectorAll('#color-options .option-pill');
  let currentSize = product.sizes[0];
  let currentColor = product.colors[0];
  let quantity = 1;

  const updateSelection = () => {
    sizeOptions.forEach((button) => {
      button.classList.toggle('active', button.textContent === currentSize);
    });
    colorOptions.forEach((button) => {
      button.classList.toggle('active', button.textContent === currentColor);
    });
    quantityValue.textContent = quantity;
  };

  sizeOptions.forEach((button) => {
    button.addEventListener('click', () => {
      currentSize = button.textContent;
      updateSelection();
    });
  });

  colorOptions.forEach((button) => {
    button.addEventListener('click', () => {
      currentColor = button.textContent;
      updateSelection();
    });
  });

  document.querySelectorAll('.qty-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      quantity = action === 'plus' ? quantity + 1 : Math.max(1, quantity - 1);
      updateSelection();
    });
  });

  addToCartButton.addEventListener('click', () => {
    addToCart(product, quantity, currentSize, currentColor);
  });

  buyNowButton.addEventListener('click', () => {
    addToCart(product, quantity, currentSize, currentColor);
    window.location.href = 'cart.html';
  });

  whatsappButton.href = createWhatsAppLink(
    `Hello Abdul Karim Outerwear! I am interested in ordering ${product.name}. Size: ${currentSize}. Color: ${currentColor}. Quantity: ${quantity}. Please share the order details.`
  );

  const sizeGuideButton = document.getElementById('size-guide-button');
  if (sizeGuideButton) {
    sizeGuideButton.addEventListener('click', () => {
      alert('Size guide: S = 36-38, M = 39-40, L = 41-42, XL = 43-44, XXL = 45-46. Please confirm your size through WhatsApp for precise guidance.');
    });
  }

  updateSelection();
}

function renderCartPage() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  const cart = getCart();
  const itemCount = document.getElementById('item-count');
  const subtotal = document.getElementById('subtotal-value');
  const total = document.getElementById('total-value');

  if (!cart.length) {
    container.innerHTML = '<p class="empty-cart-message">Your cart is currently empty.</p>';
    if (itemCount) itemCount.textContent = '0 items';
    if (subtotal) subtotal.textContent = 'PKR 0';
    if (total) total.textContent = 'PKR 0';
    return;
  }

  const subtotalValue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (itemCount) itemCount.textContent = `${cart.reduce((sum, item) => sum + item.quantity, 0)} items`;
  if (subtotal) subtotal.textContent = formatPKR(subtotalValue);
  if (total) total.textContent = formatPKR(subtotalValue);

  container.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}">
          <img src="${item.image}" alt="${item.name}" />
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p class="item-details">Size: ${item.size} | Color: ${item.color}</p>
            <div class="item-controls">
              <div class="cart-qty">
                <button type="button" class="qty-btn reduce-item" data-action="minus">−</button>
                <span>${item.quantity}</span>
                <button type="button" class="qty-btn add-item" data-action="plus">+</button>
              </div>
              <button type="button" class="cart-remove">Remove</button>
            </div>
          </div>
          <div class="cart-item-price">${formatPKR(item.price * item.quantity)}</div>
        </div>
      `
    )
    .join('');

  container.querySelectorAll('.add-item').forEach((button) => {
    button.addEventListener('click', () => {
      const itemElement = button.closest('.cart-item');
      const cartItem = cart.find(
        (item) => item.id === itemElement.dataset.id && item.size === itemElement.dataset.size && item.color === itemElement.dataset.color
      );
      if (!cartItem) return;
      cartItem.quantity += 1;
      saveCart(cart);
      renderCartPage();
      updateCartBadge();
    });
  });

  container.querySelectorAll('.reduce-item').forEach((button) => {
    button.addEventListener('click', () => {
      const itemElement = button.closest('.cart-item');
      const cartItem = cart.find(
        (item) => item.id === itemElement.dataset.id && item.size === itemElement.dataset.size && item.color === itemElement.dataset.color
      );
      if (!cartItem) return;
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        saveCart(cart);
        renderCartPage();
        updateCartBadge();
      }
    });
  });

  container.querySelectorAll('.cart-remove').forEach((button) => {
    button.addEventListener('click', () => {
      const itemElement = button.closest('.cart-item');
      const updatedCart = cart.filter(
        (item) => !(item.id === itemElement.dataset.id && item.size === itemElement.dataset.size && item.color === itemElement.dataset.color)
      );
      saveCart(updatedCart);
      renderCartPage();
      updateCartBadge();
    });
  });
}

function bindCheckoutForm() {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const cart = getCart();
    const customerName = formData.get('customerName')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const address = formData.get('address')?.toString().trim();
    const city = formData.get('city')?.toString().trim();

    if (!cart.length) {
      alert('Your cart is empty. Please add at least one item before submitting your order.');
      return;
    }

    const itemsSummary = cart
      .map((item) => `${item.name} (Size: ${item.size}, Color: ${item.color}, Qty: ${item.quantity})`)
      .join('\n');

    const message = `Hello Abdul Karim Outerwear! I would like to place an order.\n\nCustomer Name: ${customerName}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nAddress: ${address}\nCity: ${city}\n\nSelected Products:\n${itemsSummary}\n\nTotal: ${formatPKR(cart.reduce((sum, item) => sum + item.price * item.quantity, 0))}`;

    window.open(createWhatsAppLink(message), '_blank', 'noopener');
  });
}

function bindContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const subject = formData.get('subject')?.toString().trim();
    const message = formData.get('message')?.toString().trim();

    const whatsappMessage = `Hello Abdul Karim Outerwear! My name is ${name}. Phone: ${phone}. Email: ${email}. Subject: ${subject}. Message: ${message}`;
    window.open(createWhatsAppLink(whatsappMessage), '_blank', 'noopener');
  });
}

function init() {
  bindHeader();
  bindFaqs();
  bindAddToCartButtons();
  bindWhatsAppOrderButtons();
  bindQuickView();
  bindCheckoutForm();
  bindContactForm();
  updateCartBadge();
  renderProductDetailPage();
  renderCartPage();
}

document.addEventListener('DOMContentLoaded', init);
