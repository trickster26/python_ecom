document.addEventListener('DOMContentLoaded', function() {
    // Sample product data - In production, this would come from an API
    const products = [
        {
            id: 1,
            name: 'Product 1',
            description: 'Description for product 1',
            price: 99.99,
            image: 'https://via.placeholder.com/300x200',
            stock: 50
        },
        {
            id: 2,
            name: 'Product 2',
            description: 'Description for product 2',
            price: 149.99,
            image: 'https://via.placeholder.com/300x200',
            stock: 30
        },
        {
            id: 3,
            name: 'Product 3',
            description: 'Description for product 3',
            price: 199.99,
            image: 'https://via.placeholder.com/300x200',
            stock: 20
        }
    ];

    const productsGrid = document.getElementById('productsGrid');
    const searchInput = document.querySelector('input[type="search"]');

    // Render products grid
    function renderProducts(productsToRender) {
        productsGrid.innerHTML = productsToRender.map(product => `
            <div class="bg-white shadow rounded-lg overflow-hidden">
                <img class="w-full h-48 object-cover" src="${product.image}" alt="${product.name}">
                <div class="p-4">
                    <h3 class="text-lg font-medium text-gray-900">${product.name}</h3>
                    <p class="mt-1 text-sm text-gray-500">${product.description}</p>
                    <div class="mt-2 flex items-center justify-between">
                        <span class="text-lg font-bold text-gray-900">$${product.price}</span>
                        <span class="text-sm text-gray-600">Stock: ${product.stock}</span>
                    </div>
                    <div class="mt-4 flex justify-end space-x-3">
                        <button onclick="editProduct(${product.id})" 
                                class="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-900">
                            Edit
                        </button>
                        <button onclick="deleteProduct(${product.id})" 
                                class="px-3 py-1 text-sm text-red-600 hover:text-red-900">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });

    // Edit product
    window.editProduct = function(productId) {
        // Implement edit product functionality
        console.log('Edit product:', productId);
    };

    // Delete product
    window.deleteProduct = function(productId) {
        if (confirm('Are you sure you want to delete this product?')) {
            // Implement delete product functionality
            console.log('Delete product:', productId);
        }
    };

    // Initial render
    renderProducts(products);
}); 