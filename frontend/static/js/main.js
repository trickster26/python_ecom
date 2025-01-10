document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuButton = document.querySelector('[data-mobile-menu]');
    const sidebar = document.querySelector('aside');
    
    if (menuButton && sidebar) {
        menuButton.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
        });
    }

    // Active link highlighting
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('aside a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('bg-gray-100');
        }
    });

    // Notifications dropdown (if implemented)
    const notificationButton = document.querySelector('[data-notifications]');
    if (notificationButton) {
        notificationButton.addEventListener('click', () => {
            // Implement notifications dropdown
        });
    }
}); 