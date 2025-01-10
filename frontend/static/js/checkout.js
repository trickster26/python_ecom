document.addEventListener('DOMContentLoaded', () => {
    // Initialize shipping options
    const shippingOptions = document.querySelectorAll('.shipping-option');
    shippingOptions.forEach(option => {
        option.addEventListener('click', () => {
            selectShippingOption(option);
        });
    });

    // Initialize payment methods
    const paymentMethods = document.querySelectorAll('.payment-method-btn');
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            selectPaymentMethod(method.dataset.method);
        });
    });
});

function selectShippingOption(option) {
    // Remove selected state from all options
    document.querySelectorAll('.shipping-option').forEach(opt => {
        opt.classList.remove('selected');
        opt.querySelector('.shipping-radio-selected').classList.add('hidden');
    });

    // Add selected state to clicked option
    option.classList.add('selected');
    option.querySelector('.shipping-radio-selected').classList.remove('hidden');
    
    // Update order summary
    cart.updateShipping(option.dataset.cost);
}

function selectPaymentMethod(method) {
    const cardForm = document.getElementById('cardForm');
    const paypalForm = document.getElementById('paypalForm');
    
    document.querySelectorAll('.payment-method-btn').forEach(btn => {
        btn.classList.remove('active', 'border-blue-500');
    });
    
    if (method === 'card') {
        cardForm.classList.remove('hidden');
        paypalForm.classList.add('hidden');
        document.querySelector('[data-method="card"]').classList.add('active', 'border-blue-500');
    } else {
        cardForm.classList.add('hidden');
        paypalForm.classList.remove('hidden');
        document.querySelector('[data-method="paypal"]').classList.add('active', 'border-blue-500');
    }
} 