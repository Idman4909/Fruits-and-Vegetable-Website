 // Product Data
        const products = [
            {
                id: 1,
                name: "Fresh Apples",
                category: "fruits",
                price: 2.99,
                image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 2,
                name: "Organic Bananas",
                category: "fruits",
                price: 1.49,
                image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 3,
                name: "Juicy Oranges",
                category: "fruits",
                price: 3.29,
                image: "https://images.unsplash.com/photo-1547514701-42782101795e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 4,
                name: "Sweet Strawberries",
                category: "fruits",
                price: 4.99,
                image: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 5,
                name: "Fresh Carrots",
                category: "vegetables",
                price: 1.99,
                image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 6,
                name: "Fresh harvest",
                category: "vegetables",
                price: 2.49,
                image: "qudar1.jpeg"
            },
            {
                id: 7,
                name: "Fresh Tomatoes",
                category: "vegetables",
                price: 2.79,
                image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            },
            {
                id: 8,
                name: "white pumpkin",
                category: "vegetables",
                price: 1.89,
                image: "qudar 2.jpeg"
            }
        ];

        // DOM Elements
        const productsContainer = document.getElementById('products-container');
        const searchInput = document.getElementById('search-input');
        const categoryFilter = document.getElementById('category-filter');
        const maxPriceInput = document.getElementById('max-price');
        const cartCount = document.querySelector('.cart-count');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        const contactForm = document.getElementById('contactForm');

        // Cart functionality
        let cartItems = [];

        // Display products
        function displayProducts(productsToDisplay) {
            productsContainer.innerHTML = '';

            if (productsToDisplay.length === 0) {
                productsContainer.innerHTML = '<div class="no-products">No products found matching your criteria.</div>';
                return;
            }

            productsToDisplay.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                `;
                productsContainer.appendChild(productCard);
            });

            // Add event listeners to Add to Cart buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', addToCart);
            });
        }

        // Filter products
        function filterProducts() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedCategory = categoryFilter.value;
            const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

            const filteredProducts = products.filter(product => {
                const matchesSearch = product.name.toLowerCase().includes(searchTerm);
                const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
                const matchesPrice = product.price <= maxPrice;

                return matchesSearch && matchesCategory && matchesPrice;
            });

            displayProducts(filteredProducts);
        }

        // Add to cart function
        function addToCart(event) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            
            cartItems.push(product);
            cartCount.textContent = cartItems.length;
            
            // Show a quick confirmation
            event.target.textContent = 'Added!';
            setTimeout(() => {
                event.target.textContent = 'Add to Cart';
            }, 1000);
        }

        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Contact form submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    navLinks.classList.remove('active');
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Update active navigation link on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Event listeners for filters
        searchInput.addEventListener('input', filterProducts);
        categoryFilter.addEventListener('change', filterProducts);
        maxPriceInput.addEventListener('input', filterProducts);

        // Initialize the page
        displayProducts(products);