import './menu.js';

document.addEventListener('DOMContentLoaded', () => {
    // Forçar a página a carregar no topo e prevenir restauração automática do scroll do navegador
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // --- NAVBAR MOBILE TOGGLE ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.lab-nav-link');
    const header = document.getElementById('header');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
            
            // Hamburger to X transition
            const bars = menuToggle.querySelectorAll('.lab-bar');
            if (menuToggle.classList.contains('open')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                navMenu.classList.remove('open');
                const bars = menuToggle.querySelectorAll('.lab-bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // --- STICKY HEADER & ACTIVE LINK ON SCROLL ---
    const sections = document.querySelectorAll('section[id]');
    
    function updateHeaderAndActiveLink() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // offset for navbar
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.lab-nav a[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('.lab-nav a[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateHeaderAndActiveLink);
    updateHeaderAndActiveLink(); // run once on load

    // --- DINAMIC MENU SYSTEM (menu.js Integration) ---
    const searchInput = document.getElementById('menu-search-input');
    const categoryTabsContainer = document.getElementById('menu-category-tabs');
    const productsGrid = document.getElementById('menu-products-grid');
    const whatsappPhone = "5521965243034"; // Default phone number for LLBURGER
    
    let activeCategoryIndex = 0;

    function formatPrice(value) {
        return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function initMenu() {
        if (!window.llburguerMenu || window.llburguerMenu.length === 0) {
            console.warn('Base de dados do cardápio não encontrada (menu.js).');
            if (productsGrid) {
                productsGrid.innerHTML = '<div class="no-products-found">Erro: menu.js não pôde ser carregado.</div>';
            }
            return;
        }
        
        renderCategoryTabs();
        renderMenuItems();
        
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                renderMenuItems();
            });
        }
    }

    function renderCategoryTabs() {
        if (!categoryTabsContainer) return;
        categoryTabsContainer.innerHTML = '';
        
        window.llburguerMenu.forEach((category, index) => {
            const btn = document.createElement('button');
            btn.className = `category-tab-btn ${index === activeCategoryIndex ? 'active' : ''}`;
            btn.innerText = category.name;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.category-tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                activeCategoryIndex = index;
                if (searchInput) searchInput.value = '';
                
                renderMenuItems();
            });
            categoryTabsContainer.appendChild(btn);
        });
    }

    function renderMenuItems() {
        if (!productsGrid) return;
        productsGrid.innerHTML = '';
        
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        let itemsToRender = [];
        
        if (query) {
            window.llburguerMenu.forEach(category => {
                category.items.forEach(item => {
                    if (item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)) {
                        itemsToRender.push({ ...item, categoryName: category.name });
                    }
                });
            });
            if (categoryTabsContainer) categoryTabsContainer.style.opacity = '0.5';
        } else {
            const activeCategory = window.llburguerMenu[activeCategoryIndex];
            if (activeCategory) {
                itemsToRender = activeCategory.items;
            }
            if (categoryTabsContainer) categoryTabsContainer.style.opacity = '1';
        }
        
        if (itemsToRender.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products-found" style="grid-column: 1/-1; text-align: center; padding: 40px 20px; color: var(--color-primary);">
                    <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.5rem; display: block; margin-bottom: 15px;"></i>
                    NENHUM ITEM LOCALIZADO PARA "${query.toUpperCase()}"
                </div>`;
            return;
        }
        
        itemsToRender.forEach(item => {
            const card = document.createElement('div');
            card.className = 'menu-product-card';
            
            const badgeHtml = item.badge ? `<span class="product-badge">${item.badge}</span>` : '';
            
            let mediaHtml = '';
            if (item.image_url) {
                mediaHtml = `<img src="${item.image_url}" alt="${item.name}" class="product-img" loading="lazy">`;
            } else {
                mediaHtml = `
                    <div class="product-no-image">
                        <i class="fa-solid fa-burger"></i>
                        <span>LL_LAB_BURGER</span>
                    </div>
                `;
            }
            
            const message = `Olá! Gostaria de fazer o seguinte pedido do chapa quente: ${item.name} (${formatPrice(item.price)})`;
            const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
            
            card.innerHTML = `
                <div class="product-image-wrapper">
                    ${badgeHtml}
                    ${mediaHtml}
                </div>
                <div class="product-body">
                    <h3>${item.name}</h3>
                    <p class="product-desc">${item.description || 'Blend exclusivo grelhado na chapa quente com a receita secreta da casa.'}</p>
                    <div class="product-footer">
                        <span class="product-price">${formatPrice(item.price)}</span>
                        <a href="${whatsappUrl}" target="_blank" class="lab-btn lab-btn-primary btn-sm">
                            <i class="fa-brands fa-whatsapp"></i> GRELHAR PEDIDO
                        </a>
                    </div>
                </div>
            `;
            productsGrid.appendChild(card);
        });
    }

    // Initialize the menu system
    initMenu();
});
