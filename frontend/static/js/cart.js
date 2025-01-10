// Cart Class Implementation
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.subtotal = 0;
        this.tax = 0;
        this.shipping = 9.99; // Default shipping
        this.promoCode = null;
        this.calculateTotals();
        this.initializeEventListeners();
    }

    // Cart Management Methods
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateDisplay();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateDisplay();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
            this.updateDisplay();
        }
    }

    // Cart Display Methods
    displayCartItems() {
        const cartItemsList = document.getElementById('cartItemsList');
        if (!cartItemsList) return;

        if (this.items.length === 0) {
            cartItemsList.innerHTML = `
                <div class="text-center py-8">
                    <p class="text-gray-600">Your cart is empty</p>
                    <a href="/products" class="text-blue-500 hover:text-blue-600 mt-4 inline-block">
                        Continue Shopping
                    </a>
                </div>
            `;
            return;
        }

        cartItemsList.innerHTML = this.items.map(item => `
            <div class="flex items-center border rounded-lg p-4 hover:shadow-md transition-shadow">
                <img src="${item.image}" alt="${item.name}" class="w-32 h-32 object-cover rounded">
                <div class="flex-1 ml-4">
                    <h3 class="font-semibold">${item.name}</h3>
                    <p class="text-gray-600">$${item.price.toFixed(2)}</p>
                    <div class="flex items-center mt-2">
                        <button onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})" 
                                class="quantity-btn">-</button>
                        <span class="mx-4">${item.quantity}</span>
                        <button onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})" 
                                class="quantity-btn">+</button>
                        <button onclick="cart.removeItem('${item.id}')" 
                                class="remove-item">Remove</button>
                    </div>
                </div>
                <div class="text-right">
                    <p class="font-bold">$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        `).join('');
    }

    // Checkout Methods
    updateShipping(cost) {
        this.shipping = parseFloat(cost);
        this.calculateTotals();
        this.updateSummary();
    }

    applyPromoCode() {
        const promoInput = document.getElementById('promoCode');
        if (!promoInput) return;

        const code = promoInput.value.trim().toUpperCase();
        // Example promo codes
        const promoCodes = {
            'WELCOME10': 0.10,
            'SAVE20': 0.20
        };

        if (promoCodes[code]) {
            this.promoCode = {
                code: code,
                discount: promoCodes[code]
            };
            this.calculateTotals();
            this.updateSummary();
            promoInput.value = '';
            alert('Promo code applied successfully!');
        } else {
            alert('Invalid promo code');
        }
    }

    processPayment() {
        // Validate forms
        const shippingForm = document.getElementById('shippingForm');
        const cardForm = document.getElementById('cardForm');
        const paypalForm = document.getElementById('paypalForm');

        if (shippingForm && !shippingForm.checkValidity()) {
            alert('Please complete shipping information');
            return;
        }

        const activePaymentMethod = document.querySelector('.payment-method-btn.active');
        if (!activePaymentMethod) {
            alert('Please select a payment method');
            return;
        }

        if (activePaymentMethod.dataset.method === 'card' && cardForm && !cardForm.checkValidity()) {
            alert('Please complete payment information');
            return;
        }

        // Simulate payment processing
        const loadingBtn = document.querySelector('button[onclick="cart.processPayment()"]');
        loadingBtn.disabled = true;
        loadingBtn.innerHTML = 'Processing...';

        setTimeout(() => {
            // Success! Clear cart and redirect
            this.clearCart();
            window.location.href = '/order-confirmation';
        }, 2000);
    }

    // Utility Methods
    calculateTotals() {
        this.subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Apply promo code if exists
        if (this.promoCode) {
            this.subtotal *= (1 - this.promoCode.discount);
        }

        this.tax = this.subtotal * 0.08; // 8% tax
        this.total = this.subtotal + this.tax + this.shipping;
    }

    updateSummary() {
        const elements = {
            subtotal: document.getElementById('subtotal'),
            shipping: document.getElementById('shipping'),
            tax: document.getElementById('tax'),
            total: document.getElementById('total'),
            orderTotal: document.getElementById('orderTotal')
        };

        // Update summary elements if they exist
        if (elements.subtotal) elements.subtotal.textContent = `$${this.subtotal.toFixed(2)}`;
        if (elements.shipping) elements.shipping.textContent = `$${this.shipping.toFixed(2)}`;
        if (elements.tax) elements.tax.textContent = `$${this.tax.toFixed(2)}`;
        if (elements.total) elements.total.textContent = `$${this.total.toFixed(2)}`;
        if (elements.orderTotal) elements.orderTotal.textContent = `$${this.total.toFixed(2)}`;
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.calculateTotals();
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateDisplay();
    }

    updateDisplay() {
        this.displayCartItems();
        this.updateSummary();
        this.updateCartCount();
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = itemCount;
            cartCount.classList.toggle('hidden', itemCount === 0);
        }
    }

    initializeEventListeners() {
        // Add to cart buttons
        document.querySelectorAll('[data-add-to-cart]').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.addToCart;
                const productCard = e.target.closest('[data-product]');
                
                const product = {
                    id: productId,
                    name: productCard.querySelector('[data-product-name]').textContent,
                    price: parseFloat(productCard.querySelector('[data-product-price]').dataset.price),
                    image: productCard.querySelector('[data-product-image]').src
                };

                this.addItem(product);
            });
        });
    }
}

// Initialize cart
const cart = new Cart(); 