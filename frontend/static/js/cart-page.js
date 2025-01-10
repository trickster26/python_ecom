// Additional cart page specific functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart display
    cart.displayCartItems();
    cart.updateSummary();

    // Setup promo code handling
    const promoInput = document.getElementById('promoCode');
    if (promoInput) {
        promoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                cart.applyPromoCode();
            }
        });
    }
}); 