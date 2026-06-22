import './menu.js';

document.addEventListener('DOMContentLoaded', () => {
    // Forçar a página a carregar no topo e prevenir restauração automática do scroll do navegador
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // --- ELEMENTOS GERAIS ---
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // --- STICKY HEADER ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        updateActiveLink();
    });

    // --- MENU MOBILE ---
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // --- INDICADOR DE LINK ATIVO NO SCROLL ---
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // offset para compensar a navbar
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    }

    // --- SISTEMA DE ADMINISTRAÇÃO E PERSONALIZAÇÃO DE CONTEÚDO ---
    const defaultContent = {
        colors: {
            primary: "#eab308",
            accent: "#f59e0b"
        },
        themeLightness: "dark",
        titleFont: "'Outfit', sans-serif",
        bodyFont: "'Inter', sans-serif",
        bgParticlesEnabled: true,
        bgParticlesCount: 16,
        bgParticlesSpeed: "medium",
        bgParticlesSize: "medium",
        whatsappNumber: "5521965243034",
        instagramUrl: "https://www.instagram.com/llburgeroficial/",
        facebookUrl: "https://facebook.com",
        hero: {
            badge: "Fogo, Chapa e Suculência",
            title: "O SABOR REAL QUE <br><span class=\"text-gradient\">DOMINA A CHAPA</span>",
            desc: "Sem firulas, sem frescura. Hambúrgueres premium grelhados com a maestria que você vê no nosso Instagram. Saboreie a verdadeira qualidade artesanal.",
            ctaText: "Ver Destaques",
            ctaSecondaryText: "Nossa História"
        },
        destaques: {
            subtitle: "Os Mais Pedidos",
            title: "DESTAQUES DA CASA",
            desc: "Hambúrgueres de assinatura elogiados e filmados no Instagram. Escolha o seu e faça o pedido direto pelo WhatsApp!",
            card1: {
                badge: "Mais Vendido",
                title: "LL Angus Double",
                desc: "Duplo Angus de 180g (2x blend de 90g), cheddar duplo super cremoso e bacon crocante no pão brioche amanteigado.",
                price: "38,00",
                img: "https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/2858028/f89e8abd664cfab021a0b.png"
            },
            card2: {
                badge: "Favorito de Bacon",
                title: "Bacon Lover",
                desc: "Blend Angus de 150g suculento na chapa, muito cheddar legítimo derretido, tiras crocantes de bacon e maionese artesanal da casa.",
                price: "34,00",
                img: "https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/2858012/894923c968508f13d6db1.png"
            },
            card3: {
                badge: "Prensado na Chapa",
                title: "Smash Cheddar",
                desc: "Blend Smash 90g prensado na chapa com cebola picada, queijo cheddar derretido e molho especial.",
                price: "28,00",
                img: "https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3329806/48875dc5smash.jpg"
            },
            card4: {
                badge: "Especial Kids",
                title: "Combo Kids",
                desc: "Hambúrguer clássico com queijo derretido, porção individual de fritas fininhas e suco natural de laranja espremido na hora.",
                price: "25,00",
                img: "https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/2858022/ada2c4a5664cb19c8d27e.png"
            }
        },
        kids: {
            badge: "Espaço Kids Integrado",
            title: "DIVERSÃO PARA ELES, <br><span class=\"text-gradient-kids\">TRANQUILIDADE PARA VOCÊ</span>",
            desc1: "Na LLBURGUER, acreditamos que comer fora deve ser um prazer para todos. Pensando nisso, integramos uma incrível área infantil aconchegante e totalmente segura diretamente ao nosso salão de refeições.",
            desc2: "Nosso Espaço Kids conta com brinquedos em madeira, escorregadores, espaço de colorir e jogos dinâmicos. O espaço é posicionado de forma estratégica para que os pais mantenham visibilidade completa a partir de mesas confortáveis, permitindo saborear um burger quentinho enquanto os filhos brincam à vontade.",
            videoLink: "assets/real_kids_area.png"
        },
        stores: [
            {
                name: "LLBURGUER - Jardim Tropical",
                open: true,
                address: "R. Damas Batista, 947 - Jardim Tropical, Nova Iguaçu - RJ",
                hours: "Todos os dias: 18h às 00h",
                kids: true,
                pet: false,
                maps: "https://maps.google.com"
            },
            {
                name: "LLBURGUER - Valverde",
                open: true,
                address: "Av. Abílio Augusto Távora, 3200 - Valverde, Nova Iguaçu - RJ",
                hours: "Todos os dias: 18h às 00h",
                kids: true,
                pet: true,
                maps: "https://maps.google.com"
            }
        ]
    };

    // Inicializa o estado lendo do LocalStorage ou usando os padrões de fábrica
    let currentContent = JSON.parse(localStorage.getItem('llburguer_admin_content')) || {};
    
    // Migração de tema para dark e link da Área Kids
    if (!localStorage.getItem('llburguer_theme_migrated_to_dark_v2')) {
        currentContent.themeLightness = "dark";
        if (currentContent.kids) {
            currentContent.kids.videoLink = "https://www.instagram.com/stories/highlights/17946366145699258/";
        }
        localStorage.setItem('llburguer_admin_content', JSON.stringify({ ...currentContent, themeLightness: "dark" }));
        localStorage.setItem('llburguer_theme_migrated_to_dark_v2', 'true');
    }

    // Migração de imagens dos destaques para fotos reais do cardápio e área kids
    if (!localStorage.getItem('llburguer_highlights_migrated_v3')) {
        if (currentContent.destaques) {
            currentContent.destaques.card1 = {
                ...currentContent.destaques.card1,
                img: "https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/2858028/f89e8abd664cfab021a0b.png"
            };
            currentContent.destaques.card2 = {
                ...currentContent.destaques.card2,
                img: "https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/2858012/894923c968508f13d6db1.png"
            };
            currentContent.destaques.card3 = {
                ...currentContent.destaques.card3,
                img: "https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3329806/48875dc5smash.jpg"
            };
            currentContent.destaques.card4 = {
                ...currentContent.destaques.card4,
                img: "https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/2858022/ada2c4a5664cb19c8d27e.png"
            };
        }
        if (currentContent.kids) {
            currentContent.kids.videoLink = "assets/real_kids_area.png";
        }
        localStorage.setItem('llburguer_admin_content', JSON.stringify(currentContent));
        localStorage.setItem('llburguer_highlights_migrated_v3', 'true');
    }

    currentContent = { ...defaultContent, ...currentContent };
    
    // Mesclagem profunda para sub-objetos
    currentContent.colors = { ...defaultContent.colors, ...currentContent.colors };
    currentContent.hero = { ...defaultContent.hero, ...currentContent.hero };
    currentContent.destaques = { ...defaultContent.destaques, ...currentContent.destaques };
    currentContent.kids = { ...defaultContent.kids, ...currentContent.kids };
    if (!currentContent.stores) currentContent.stores = [ ...defaultContent.stores ];

    // --- PARSERS DE MÍDIA INTELIGENTE (YOUTUBE / INSTAGRAM EMBEDS) ---
    function getYouTubeEmbedUrl(url) {
        if (!url) return null;
        let videoId = '';
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            videoId = match[2];
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    function getInstagramEmbedUrl(url) {
        if (!url) return null;
        if (url.includes('instagram.com/p/') || url.includes('instagram.com/reel/') || url.includes('instagram.com/tv/')) {
            let cleanUrl = url.split('?')[0];
            if (!cleanUrl.endsWith('/')) {
                cleanUrl += '/';
            }
            return `${cleanUrl}embed/`;
        }
        return null;
    }

    function renderMediaElement(container, mediaUrl, altText = "Mídia") {
        if (!container) return;
        container.innerHTML = ''; // Limpa contêiner

        const ytEmbed = getYouTubeEmbedUrl(mediaUrl);
        const igEmbed = getInstagramEmbedUrl(mediaUrl);
        const isMp4 = mediaUrl && (mediaUrl.toLowerCase().endsWith('.mp4') || mediaUrl.toLowerCase().includes('.mp4') || mediaUrl.includes('data:video/mp4'));

        if (ytEmbed) {
            container.innerHTML = `<iframe src="${ytEmbed}" allowfullscreen></iframe>`;
        } else if (igEmbed) {
            container.innerHTML = `<iframe src="${igEmbed}" allowtransparency="true" scrolling="no"></iframe>`;
        } else if (isMp4) {
            container.innerHTML = `<video src="${mediaUrl}" autoplay loop muted playsinline class="highlight-video"></video>`;
        } else {
            // Imagem normal fallback
            container.innerHTML = `<img src="${mediaUrl}" alt="${altText}" class="highlight-img">`;
        }
    }

    // Função para aplicar os textos, cores, fontes, tema e mídias salvos na página web
    function loadContentIntoDOM() {
        // --- 1. APLICAR PALETA DE CORES ---
        const themeColors = currentContent.colors || defaultContent.colors;
        document.documentElement.style.setProperty('--color-primary', themeColors.primary);
        document.documentElement.style.setProperty('--color-accent', themeColors.accent);
        
        // Atualiza seletores no painel se existirem
        const cpPrimary = document.getElementById('input-color-primary');
        const cpAccent = document.getElementById('input-color-accent');
        const lblPrimary = document.getElementById('label-color-primary');
        const lblAccent = document.getElementById('label-color-accent');
        if (cpPrimary) cpPrimary.value = themeColors.primary;
        if (cpAccent) cpAccent.value = themeColors.accent;
        if (lblPrimary) lblPrimary.innerText = themeColors.primary;
        if (lblAccent) lblAccent.innerText = themeColors.accent;

        // --- 2. APLICAR ESQUEMA DE TEMA (CLARO / ESCURO) ---
        const body = document.body;
        if (currentContent.themeLightness === 'light') {
            body.classList.add('light-theme');
            document.documentElement.style.setProperty('--bg-grad-1', '#fffdf9');
            document.documentElement.style.setProperty('--bg-grad-2', '#fef6e0');
            document.documentElement.style.setProperty('--bg-grad-3', '#fffaf0');
            document.documentElement.style.setProperty('--bg-grad-4', '#fdf0d5');
            document.documentElement.style.setProperty('--bg-grad-5', '#fffefb');
            document.documentElement.style.setProperty('--bg-speed', '25s');
        } else {
            body.classList.remove('light-theme');
            document.documentElement.style.setProperty('--bg-grad-1', '#241a0e');
            document.documentElement.style.setProperty('--bg-grad-2', '#362714');
            document.documentElement.style.setProperty('--bg-grad-3', '#2a1f10');
            document.documentElement.style.setProperty('--bg-grad-4', '#423119');
            document.documentElement.style.setProperty('--bg-grad-5', '#22190d');
            document.documentElement.style.setProperty('--bg-speed', '18s');
        }

        // --- 3. APLICAR FONTES ---
        document.documentElement.style.setProperty('--font-title', currentContent.titleFont || defaultContent.titleFont);
        document.documentElement.style.setProperty('--font-body', currentContent.bodyFont || defaultContent.bodyFont);

        // --- 4. APLICAR WHATSAPP DE FORMA GLOBAL ---
        const phone = currentContent.whatsappNumber || "5521965243034";
        const btnPedirNav = document.getElementById('btn-pedir-nav');
        if (btnPedirNav) {
            btnPedirNav.href = `https://wa.me/${phone}?text=${encodeURIComponent("Olá! Gostaria de pedir um hambúrguer artesanal.")}`;
        }
        const socialWhatsapp = document.getElementById('social-whatsapp');
        if (socialWhatsapp) {
            socialWhatsapp.href = `https://wa.me/${phone}`;
        }
        // Exibição do telefone formatada no rodapé
        const footerPhone = document.querySelector('.footer-contact p');
        if (footerPhone) {
            let formatted = phone;
            if (phone.startsWith('55') && phone.length >= 12) {
                const ddd = phone.substring(2, 4);
                const bodyNum = phone.substring(4);
                const part1 = bodyNum.substring(0, bodyNum.length - 4);
                const part2 = bodyNum.substring(bodyNum.length - 4);
                formatted = `(${ddd}) ${part1}-${part2}`;
            } else if (phone.length === 11) {
                const ddd = phone.substring(0, 2);
                const bodyNum = phone.substring(2);
                const part1 = bodyNum.substring(0, 5);
                const part2 = bodyNum.substring(5);
                formatted = `(${ddd}) ${part1}-${part2}`;
            }
            footerPhone.innerHTML = `<i class="fa-solid fa-phone"></i> ${formatted}`;
        }

        // --- 5. APLICAR INSTAGRAM GLOBAL E IFRAMES ---
        const socialInstagram = document.getElementById('social-instagram');
        if (socialInstagram) {
            socialInstagram.href = currentContent.instagramUrl || "#";
        }
        const aboutInstaLink = document.querySelector('.about-instagram-promo a');
        if (aboutInstaLink) {
            aboutInstaLink.href = currentContent.instagramUrl || "#";
            let username = "@llburgeroficial";
            try {
                const cleanUrl = currentContent.instagramUrl.replace(/\/$/, '');
                const parts = cleanUrl.split('/');
                if (parts.length > 0) {
                    username = `@${parts[parts.length - 1]}`;
                }
            } catch (e) {}
            aboutInstaLink.innerHTML = `<i class="fa-brands fa-instagram"></i> ${username}`;
        }
        // Atualiza os Iframe de Feed e Perfil
        if (currentContent.instagramUrl) {
            let cleanBaseUrl = currentContent.instagramUrl.split('?')[0];
            if (!cleanBaseUrl.endsWith('/')) cleanBaseUrl += '/';
            const embedUrl = `${cleanBaseUrl}embed/`;
            
            const profileIframe = document.querySelector('.instagram-profile-iframe');
            const feedIframe = document.querySelector('.instagram-feed-iframe');
            if (profileIframe) profileIframe.src = embedUrl;
            if (feedIframe) feedIframe.src = embedUrl;
        }

        // --- 6. APLICAR TEXTOS GERAIS ---
        // Hero
        const hBadge = document.getElementById('editable-hero-badge');
        const hTitle = document.getElementById('editable-hero-title');
        const hDesc = document.getElementById('editable-hero-description');
        if (hBadge) hBadge.innerText = currentContent.hero.badge;
        if (hTitle) hTitle.innerHTML = currentContent.hero.title;
        if (hDesc) hDesc.innerHTML = currentContent.hero.desc;

        // Botões do Hero
        const btnPedirHero = document.getElementById('btn-pedir-hero');
        const btnConhecerHero = document.getElementById('btn-conhecer-hero');
        if (btnPedirHero) {
            btnPedirHero.innerHTML = `<i class="fa-solid fa-burger"></i> ${currentContent.hero.ctaText || 'Ver Destaques'}`;
            btnPedirHero.href = `#destaques`;
        }
        if (btnConhecerHero) {
            btnConhecerHero.innerText = currentContent.hero.ctaSecondaryText || 'Nossa História';
        }

        // Destaques Section Header
        const dSubtitle = document.getElementById('editable-destaques-subtitle');
        const dTitle = document.getElementById('editable-destaques-title');
        const dDesc = document.getElementById('editable-destaques-desc');
        if (dSubtitle) dSubtitle.innerText = currentContent.destaques.subtitle;
        if (dTitle) dTitle.innerText = currentContent.destaques.title;
        if (dDesc) dDesc.innerHTML = currentContent.destaques.desc;

        // Cards dos Lanches (Textos & Mídias)
        for (let i = 1; i <= 4; i++) {
            const card = currentContent.destaques[`card${i}`];
            if (!card) continue;

            const cBadge = document.getElementById(`editable-card${i}-badge`);
            const cTitle = document.getElementById(`editable-card${i}-title`);
            const cDesc = document.getElementById(`editable-card${i}-desc`);
            const cPrice = document.getElementById(`editable-card${i}-price`);
            const cMediaBox = document.getElementById(`editable-card${i}-media`);
            const cLink = document.getElementById(`editable-card${i}-link`);

            if (cBadge) cBadge.innerText = card.badge;
            if (cTitle) cTitle.innerText = card.title;
            if (cDesc) cDesc.innerHTML = card.desc;
            if (cPrice) cPrice.innerText = `R$ ${card.price}`;
            
            if (cMediaBox) {
                renderMediaElement(cMediaBox, card.img, card.title);
            }

            if (cLink) {
                const message = `Olá! Gostaria de pedir o lanche ${card.title} de R$ ${card.price}.`;
                cLink.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            }
        }

        // Seção Kids (Textos & Mídias)
        const kBadge = document.getElementById('editable-kids-badge');
        const kTitle = document.getElementById('editable-kids-title');
        const kDesc1 = document.getElementById('editable-kids-desc1');
        const kDesc2 = document.getElementById('editable-kids-desc2');
        const kMediaContainer = document.getElementById('editable-kids-media-container');

        if (kBadge) kBadge.innerText = currentContent.kids.badge;
        if (kTitle) kTitle.innerHTML = currentContent.kids.title;
        if (kDesc1) kDesc1.innerHTML = currentContent.kids.desc1;
        if (kDesc2) kDesc2.innerHTML = currentContent.kids.desc2;
        
        if (kMediaContainer) {
            let url = currentContent.kids.videoLink;
            // Se for um link do Instagram/YouTube ou vídeo, filtramos e mostramos as imagens locais padrão
            let displayImg = "assets/real_kids_area.png";
            if (url && !url.includes('instagram.com') && !url.includes('youtube.com') && !url.includes('youtu.be') && !url.includes('.mp4') && !url.includes('stories/highlights')) {
                displayImg = url;
            }
            
            if (displayImg === "assets/real_kids_area.png") {
                kMediaContainer.innerHTML = `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div class="kids-image-wrapper">
                            <img src="assets/real_kids_area.png" alt="Área Kids LLBURGUER 1" class="kids-img" style="width: 100%; height: 100%; border-radius: 8px; object-fit: cover; box-shadow: 0 10px 25px rgba(0,0,0,0.4); border: 1px solid rgba(234, 179, 8, 0.15);">
                        </div>
                        <div class="kids-image-wrapper">
                            <img src="assets/kids_area.png" alt="Área Kids LLBURGUER 2" class="kids-img" style="width: 100%; height: 100%; border-radius: 8px; object-fit: cover; box-shadow: 0 10px 25px rgba(0,0,0,0.4); border: 1px solid rgba(234, 179, 8, 0.15);">
                        </div>
                    </div>
                `;
            } else {
                kMediaContainer.innerHTML = `
                    <div class="kids-image-wrapper">
                        <img src="${displayImg}" alt="Área Kids LLBURGUER" class="kids-img" style="width: 100%; border-radius: 8px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); border: 1px solid rgba(234, 179, 8, 0.15); display: block; object-fit: cover;">
                    </div>
                `;
            }
        }

        // --- 7. APLICAR FILIAIS / LOJAS DINÂMICAS ---
        const storesGrid = document.getElementById('dynamic-stores-grid');
        if (storesGrid && currentContent.stores) {
            storesGrid.innerHTML = '';
            currentContent.stores.forEach((store) => {
                const statusClass = store.open ? 'open' : 'closed';
                const statusText = store.open ? 'Aberto Agora' : 'Fechado';
                const statusIcon = store.open ? 'fa-solid fa-circle' : 'fa-solid fa-circle-xmark';
                
                let details = '';
                details += `<span class="detail-item"><i class="fa-solid fa-calendar-days"></i> ${store.hours}</span>`;
                if (store.kids) {
                    details += `<span class="detail-item"><i class="fa-solid fa-gamepad"></i> Área Kids & Brinquedoteca</span>`;
                }
                if (store.pet) {
                    details += `<span class="detail-item"><i class="fa-solid fa-paw"></i> Pet Friendly</span>`;
                }

                const storeMsg = `Olá! Gostaria de saber mais sobre a filial ${store.name}.`;
                const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(storeMsg)}`;

                storesGrid.innerHTML += `
                    <div class="store-card no-image">
                        <div class="store-info">
                            <span class="store-status ${statusClass}"><i class="${statusIcon}"></i> ${statusText}</span>
                            <h3>${store.name}</h3>
                            <p class="store-address"><i class="fa-solid fa-map-pin"></i> ${store.address}</p>
                            
                            <div class="store-details">
                                ${details}
                            </div>
                            
                            <div class="store-actions">
                                <a href="${store.maps}" target="_blank" class="btn btn-secondary btn-sm">
                                    <i class="fa-solid fa-route"></i> Traçar Rota
                                </a>
                                <a href="${whatsappUrl}" target="_blank" class="btn btn-primary btn-sm">
                                    <i class="fa-solid fa-location-arrow"></i> Chamar WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        // --- 8. REINICIALIZAR O PLANO DE FUNDO ANIMADO ---
        initFloatingBackground();

        // --- 9. INICIALIZAR O CARDÁPIO DINÂMICO ---
        initMenu();
    }

    // --- SISTEMA DE CARDÁPIO COMPLETO DINÂMICO ---
    const searchInput = document.getElementById('menu-search-input');
    const categoryTabsContainer = document.getElementById('menu-category-tabs');
    const productsGrid = document.getElementById('menu-products-grid');
    
    let activeCategoryIndex = 0;
    
    function initMenu() {
        if (!window.llburguerMenu || window.llburguerMenu.length === 0) {
            console.warn('Base de dados do cardápio não encontrada (menu.js).');
            return;
        }
        
        renderCategoryTabs();
        renderMenuItems();
        
        if (searchInput && !searchInput.dataset.listenerAdded) {
            searchInput.addEventListener('input', () => {
                renderMenuItems();
            });
            searchInput.dataset.listenerAdded = 'true';
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
    
    function formatPrice(value) {
        return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    
    function renderMenuItems() {
        if (!productsGrid) return;
        productsGrid.innerHTML = '';
        
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const phone = currentContent.whatsappNumber || "5521965243034";
        
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
            productsGrid.innerHTML = `<div class="no-products-found"><i class="fa-solid fa-face-frown" style="font-size: 2.5rem; display: block; margin-bottom: 15px; color: var(--color-accent);"></i> Nenhum produto encontrado com o termo "${query}".</div>`;
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
                        <span>LLBURGUER</span>
                    </div>
                `;
            }
            
            const message = `Olá! Gostaria de pedir o item "${item.name}" (${formatPrice(item.price)}) do cardápio online.`;
            const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            
            card.innerHTML = `
                <div class="product-image-wrapper">
                    ${badgeHtml}
                    ${mediaHtml}
                </div>
                <div class="product-body">
                    <h3>${item.name}</h3>
                    <p class="product-desc">${item.description}</p>
                    <div class="product-footer">
                        <span class="product-price">${formatPrice(item.price)}</span>
                        <a href="${whatsappUrl}" target="_blank" class="btn btn-primary btn-sm">
                            <i class="fa-brands fa-whatsapp"></i> Pedir
                        </a>
                    </div>
                </div>
            `;
            productsGrid.appendChild(card);
        });
    }

    // Aplica o conteúdo na tela inicialmente
    loadContentIntoDOM();

    // --- GERENCIADOR DE INTERFACE DO ADMIN ---
    const adminLoginTrigger = document.getElementById('admin-login-trigger');
    const adminLoginModal = document.getElementById('admin-login-modal');
    const adminLoginClose = document.getElementById('admin-login-close');
    const adminLoginSubmit = document.getElementById('admin-login-submit');
    const adminPasswordInput = document.getElementById('admin-password-input');
    const adminLoginError = document.getElementById('admin-login-error');
    
    const adminDrawer = document.getElementById('admin-dashboard-drawer');
    const adminDrawerClose = document.getElementById('admin-drawer-close');
    const adminLogoutBtn = document.getElementById('btn-admin-logout');
    const adminSaveBtn = document.getElementById('btn-admin-save');
    const btnResetFactory = document.getElementById('btn-reset-factory');
    const btnCopyJson = document.getElementById('btn-copy-json');

    // Abre Modal de Login
    if (adminLoginTrigger) {
        adminLoginTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            adminLoginModal.classList.add('open');
            adminPasswordInput.value = '';
            adminLoginError.classList.remove('show');
            adminPasswordInput.focus();
        });
    }

    // Fecha Modal de Login
    if (adminLoginClose) {
        adminLoginClose.addEventListener('click', () => {
            adminLoginModal.classList.remove('open');
        });
    }

    // Fecha modal clicando fora
    window.addEventListener('click', (e) => {
        if (e.target === adminLoginModal) {
            adminLoginModal.classList.remove('open');
        }
    });

    // Submete senha
    if (adminLoginSubmit) {
        adminLoginSubmit.addEventListener('click', verifyAdminLogin);
    }
    if (adminPasswordInput) {
        adminPasswordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                verifyAdminLogin();
            }
        });
    }

    function verifyAdminLogin() {
        const password = adminPasswordInput.value;
        if (password === 'admin123') {
            adminLoginModal.classList.remove('open');
            adminDrawer.classList.add('open');
            populateAdminInputs();
        } else {
            adminLoginError.classList.add('show');
        }
    }

    // Fecha Drawer
    if (adminDrawerClose) {
        adminDrawerClose.addEventListener('click', () => {
            adminDrawer.classList.remove('open');
        });
    }

    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', () => {
            adminDrawer.classList.remove('open');
        });
    }

    // Popula formulários do Admin Drawer
    function populateAdminInputs() {
        // Cores e Temas
        const themeColors = currentContent.colors || defaultContent.colors;
        document.getElementById('input-color-primary').value = themeColors.primary;
        document.getElementById('input-color-accent').value = themeColors.accent;
        document.getElementById('label-color-primary').innerText = themeColors.primary;
        document.getElementById('label-color-accent').innerText = themeColors.accent;

        document.getElementById('input-theme-lightness').value = currentContent.themeLightness || "dark";
        document.getElementById('input-font-title').value = currentContent.titleFont || "'Outfit', sans-serif";
        document.getElementById('input-font-body').value = currentContent.bodyFont || "'Inter', sans-serif";

        // Elementos Flutuantes
        document.getElementById('input-particles-enabled').value = String(currentContent.bgParticlesEnabled !== false);
        document.getElementById('input-particles-count').value = String(currentContent.bgParticlesCount || 16);
        document.getElementById('input-particles-speed').value = currentContent.bgParticlesSpeed || "medium";
        document.getElementById('input-particles-size').value = currentContent.bgParticlesSize || "medium";

        // Canais de Contato
        document.getElementById('input-contact-whatsapp').value = currentContent.whatsappNumber || "5521965243034";
        document.getElementById('input-contact-instagram').value = currentContent.instagramUrl || "";

        // Lojas Físicas
        for (let i = 1; i <= 2; i++) {
            const store = currentContent.stores[i - 1];
            if (store) {
                document.getElementById(`input-store${i}-name`).value = store.name || "";
                document.getElementById(`input-store${i}-open`).value = String(store.open !== false);
                document.getElementById(`input-store${i}-address`).value = store.address || "";
                document.getElementById(`input-store${i}-hours`).value = store.hours || "";
                document.getElementById(`input-store${i}-kids`).value = String(store.kids !== false);
                document.getElementById(`input-store${i}-pet`).value = String(store.pet !== false);
                document.getElementById(`input-store${i}-maps`).value = store.maps || "";
            }
        }

        // Hero
        document.getElementById('input-hero-badge').value = currentContent.hero.badge;
        document.getElementById('input-hero-title').value = currentContent.hero.title;
        document.getElementById('input-hero-desc').value = currentContent.hero.desc;
        document.getElementById('input-hero-cta').value = currentContent.hero.ctaText || "Ver Destaques";
        document.getElementById('input-hero-cta-sec').value = currentContent.hero.ctaSecondaryText || "Nossa História";

        // Destaques Header
        document.getElementById('input-destaques-subtitle').value = currentContent.destaques.subtitle;
        document.getElementById('input-destaques-title').value = currentContent.destaques.title;
        document.getElementById('input-destaques-desc').value = currentContent.destaques.desc;

        // Destaques Cards
        for (let i = 1; i <= 4; i++) {
            const card = currentContent.destaques[`card${i}`];
            document.getElementById(`input-card${i}-badge`).value = card.badge;
            document.getElementById(`input-card${i}-title`).value = card.title;
            document.getElementById(`input-card${i}-price`).value = card.price;
            document.getElementById(`input-card${i}-img`).value = card.img;
            document.getElementById(`input-card${i}-desc`).value = card.desc;
        }

        // Kids
        document.getElementById('input-kids-badge').value = currentContent.kids.badge;
        document.getElementById('input-kids-title').value = currentContent.kids.title;
        document.getElementById('input-kids-desc1').value = currentContent.kids.desc1;
        document.getElementById('input-kids-desc2').value = currentContent.kids.desc2;
        document.getElementById('input-kids-video-link').value = currentContent.kids.videoLink;

        // Export Config Box
        document.getElementById('output-json-config').value = JSON.stringify(currentContent, null, 2);
    }

    // Salva formulários do Admin Drawer
    function saveAdminContent() {
        // Cores e Temas
        currentContent.colors = {
            primary: document.getElementById('input-color-primary').value,
            accent: document.getElementById('input-color-accent').value
        };
        currentContent.themeLightness = document.getElementById('input-theme-lightness').value;
        currentContent.titleFont = document.getElementById('input-font-title').value;
        currentContent.bodyFont = document.getElementById('input-font-body').value;

        // Elementos Flutuantes
        currentContent.bgParticlesEnabled = document.getElementById('input-particles-enabled').value === 'true';
        currentContent.bgParticlesCount = parseInt(document.getElementById('input-particles-count').value);
        currentContent.bgParticlesSpeed = document.getElementById('input-particles-speed').value;
        currentContent.bgParticlesSize = document.getElementById('input-particles-size').value;

        // Canais de Contatos
        currentContent.whatsappNumber = document.getElementById('input-contact-whatsapp').value.replace(/\D/g, ''); // Apenas números
        currentContent.instagramUrl = document.getElementById('input-contact-instagram').value;

        // Lojas Físicas
        currentContent.stores = [];
        for (let i = 1; i <= 2; i++) {
            currentContent.stores.push({
                name: document.getElementById(`input-store${i}-name`).value,
                open: document.getElementById(`input-store${i}-open`).value === 'true',
                address: document.getElementById(`input-store${i}-address`).value,
                hours: document.getElementById(`input-store${i}-hours`).value,
                kids: document.getElementById(`input-store${i}-kids`).value === 'true',
                pet: document.getElementById(`input-store${i}-pet`).value === 'true',
                maps: document.getElementById(`input-store${i}-maps`).value
            });
        }

        // Hero
        currentContent.hero.badge = document.getElementById('input-hero-badge').value;
        currentContent.hero.title = document.getElementById('input-hero-title').value;
        currentContent.hero.desc = document.getElementById('input-hero-desc').value;
        currentContent.hero.ctaText = document.getElementById('input-hero-cta').value;
        currentContent.hero.ctaSecondaryText = document.getElementById('input-hero-cta-sec').value;

        // Destaques Header
        currentContent.destaques.subtitle = document.getElementById('input-destaques-subtitle').value;
        currentContent.destaques.title = document.getElementById('input-destaques-title').value;
        currentContent.destaques.desc = document.getElementById('input-destaques-desc').value;

        // Destaques Cards
        for (let i = 1; i <= 4; i++) {
            currentContent.destaques[`card${i}`] = {
                badge: document.getElementById(`input-card${i}-badge`).value,
                title: document.getElementById(`input-card${i}-title`).value,
                price: document.getElementById(`input-card${i}-price`).value,
                img: document.getElementById(`input-card${i}-img`).value,
                desc: document.getElementById(`input-card${i}-desc`).value
            };
        }

        // Kids
        currentContent.kids.badge = document.getElementById('input-kids-badge').value;
        currentContent.kids.title = document.getElementById('input-kids-title').value;
        currentContent.kids.desc1 = document.getElementById('input-kids-desc1').value;
        currentContent.kids.desc2 = document.getElementById('input-kids-desc2').value;
        currentContent.kids.videoLink = document.getElementById('input-kids-video-link').value;

        // Salva localmente
        localStorage.setItem('llburguer_admin_content', JSON.stringify(currentContent));
        
        // Atualiza a visualização
        loadContentIntoDOM();

        // Atualiza caixa de exportação
        document.getElementById('output-json-config').value = JSON.stringify(currentContent, null, 2);
        
        alert('Configurações salvas e aplicadas com sucesso!');
    }

    if (adminSaveBtn) {
        adminSaveBtn.addEventListener('click', saveAdminContent);
    }

    // --- LÓGICA DO SELETOR DE CORES NATIVO (LIVE REVIEW) ---
    const cpPrimary = document.getElementById('input-color-primary');
    const cpAccent = document.getElementById('input-color-accent');
    const lblPrimary = document.getElementById('label-color-primary');
    const lblAccent = document.getElementById('label-color-accent');

    if (cpPrimary) {
        cpPrimary.addEventListener('input', (e) => {
            const color = e.target.value;
            if (lblPrimary) lblPrimary.innerText = color;
            document.documentElement.style.setProperty('--color-primary', color);
        });
    }
    if (cpAccent) {
        cpAccent.addEventListener('input', (e) => {
            const color = e.target.value;
            if (lblAccent) lblAccent.innerText = color;
            document.documentElement.style.setProperty('--color-accent', color);
        });
    }

    // --- FERRAMENTA AUXILIAR DE FORMATAR TEXTO (B, I, U) ---
    function insertHTMLTag(fieldId, tag) {
        const textarea = document.getElementById(fieldId);
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selected = text.substring(start, end);
        
        const replacement = `<${tag}>${selected}</${tag}>`;
        textarea.value = text.substring(0, start) + replacement + text.substring(end);
        
        // Foca e mantém cursor na posição
        textarea.focus();
        textarea.selectionStart = start + tag.length + 2;
        textarea.selectionEnd = end + tag.length + 2;
    }

    document.querySelectorAll('.text-toolbar').forEach(toolbar => {
        const targetFieldId = toolbar.getAttribute('data-for');
        toolbar.querySelectorAll('.toolbar-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const tag = btn.getAttribute('data-tag');
                insertHTMLTag(targetFieldId, tag);
            });
        });
    });

    // Controle de Tabs do Admin Drawer
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            const targetEl = document.getElementById(targetTab);
            if (targetEl) targetEl.classList.add('active');
        });
    });

    // Controle de Accordion (Lista de Produtos / Lojas)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isOpen = item.classList.contains('open');
            
            // Fecha todos os outros accordions do mesmo container
            const container = item.parentElement;
            container.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
            
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // Botão de Copiar JSON
    if (btnCopyJson) {
        btnCopyJson.addEventListener('click', () => {
            const configTextarea = document.getElementById('output-json-config');
            configTextarea.select();
            document.execCommand('copy');
            alert('JSON copiado com sucesso! Você pode salvá-lo ou enviá-lo ao desenvolvedor.');
        });
    }

    // Botão Reset (Restaurar padrões de fábrica)
    if (btnResetFactory) {
        btnResetFactory.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja apagar todas as customizações e voltar ao padrão de fábrica?')) {
                localStorage.removeItem('llburguer_admin_content');
                currentContent = { ...defaultContent };
                loadContentIntoDOM();
                populateAdminInputs();
                alert('Padrões originais restaurados com sucesso!');
            }
        });
    }

    // --- SELETORES DE IMAGENS E UPLOADS DO PAINEL ADMIN ---
    // Gatilho de cliques nos botões de upload que abrem o input de arquivo oculto
    document.querySelectorAll('.upload-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const fileInputId = btn.getAttribute('data-target');
            const fileInput = document.getElementById(fileInputId);
            if (fileInput) {
                fileInput.click();
            }
        });
    });

    // Trata o upload e conversão para Base64 (DataURL)
    document.querySelectorAll('.admin-file-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            // Alerta se o arquivo for muito grande (por causa dos limites do localStorage)
            if (file.size > 800 * 1024) { // 800KB
                alert('Aviso: Esta imagem é relativamente grande. Para não sobrecarregar as configurações do site, recomendamos fotos comprimidas ou menores que 800KB.');
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                let targetTextInputId = '';
                if (e.target.id.startsWith('file-card')) {
                    const cardNum = e.target.id.replace('file-card', '');
                    targetTextInputId = `input-card${cardNum}-img`;
                } else if (e.target.id === 'file-kids') {
                    targetTextInputId = 'input-kids-video-link';
                }

                const textInput = document.getElementById(targetTextInputId);
                if (textInput) {
                    textInput.value = event.target.result;
                    textInput.dispatchEvent(new Event('input', { bubbles: true }));
                    alert('Foto carregada com sucesso! Clique em "Salvar Alterações" no rodapé para aplicar de vez no site.');
                }
            };
            reader.readAsDataURL(file);
        });
    });

    // Trata o clique nas miniaturas da galeria
    document.querySelectorAll('.gallery-thumb').forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTextInputId = thumb.getAttribute('data-target');
            const targetInput = document.getElementById(targetTextInputId);
            if (targetInput) {
                targetInput.value = thumb.getAttribute('src');
                targetInput.dispatchEvent(new Event('input', { bubbles: true }));
                thumb.style.borderColor = 'var(--color-primary)';
                setTimeout(() => {
                    thumb.style.borderColor = '';
                }, 1000);
            }
        });
    });

    // --- GERADOR DE ELEMENTOS FLUTUANTES NO BACKGOUND (BURGERS, BATATAS, DRINKS) ---
    function initFloatingBackground() {
        const bgContainer = document.querySelector('.floating-background-container');
        if (!bgContainer) return;

        // Limpa qualquer elemento anterior
        bgContainer.innerHTML = '';

        // Se estiver desativado nas opções, não renderiza e retorna
        if (currentContent.bgParticlesEnabled === false) {
            return;
        }

        // Vetores SVG em string
        const SVGS = {
            // Hambúrguer
            burger: `<svg viewBox="0 0 24 24">
                <!-- Pão Superior -->
                <path d="M3 11c0-4 3-7 9-7s9 3 9 7H3z"/>
                <!-- Gergelim -->
                <path d="M7 7h.01M12 6h.01M17 7h.01M10 8.5h.01M14 8.5h.01" stroke-width="1.5" stroke-linecap="round"/>
                <!-- Queijo Derretido -->
                <path d="M3 14l2 1.5 3-1.5 4 2 4-2 3 1.5 2-1.5" />
                <!-- Hambúrguer (Carne) -->
                <rect x="2" y="11" width="20" height="2.5" rx="1"/>
                <!-- Pão Inferior -->
                <path d="M3 16.5c0 1.5 2 2.5 9 2.5s9-1 9-2.5H3z"/>
            </svg>`,
            
            // Batata Frita
            fries: `<svg viewBox="0 0 24 24">
                <!-- Caixinha de Batata -->
                <path d="M5 11l1.5 9h11l1.5-9" />
                <path d="M5 11c3 1.5 6 1.5 9 0s5-1 5-1l-1 4H6l-1-3" fill="rgba(234, 179, 8, 0.03)" />
                <!-- Logo da Caixinha (Detalhe Curvo) -->
                <path d="M9 16c1.5-1 3.5-1 5 0" />
                <!-- Batatas Individuais -->
                <path d="M7 11V4M9 11V3M11 11V5M13 11V3.5M15 11V5M17 11V4.5" />
            </svg>`,
            
            // Copo de Refrigerante / Bebida
            drink: `<svg viewBox="0 0 24 24">
                <!-- Copo Copo -->
                <path d="M6 8l1.5 12h9L18 8H6z" />
                <!-- Tampa -->
                <path d="M5 8h14v-1.5H5V8z" />
                <!-- Canudo -->
                <path d="M12 6.5V3l3-1" />
                <!-- Detalhe/Linha de Design do Copo -->
                <path d="M8 12h8M8 15h8" stroke-dasharray="2 2" />
            </svg>`
        };

        const keys = Object.keys(SVGS);
        const numberOfItems = currentContent.bgParticlesCount || 16;

        // Mapeamentos de Velocidade
        let speedMult = 1.0;
        if (currentContent.bgParticlesSpeed === "slow") speedMult = 1.5;
        if (currentContent.bgParticlesSpeed === "fast") speedMult = 0.6;

        // Mapeamentos de Tamanho
        let minSize = 40, maxSizeDiff = 40;
        if (currentContent.bgParticlesSize === "small") {
            minSize = 25;
            maxSizeDiff = 25;
        }
        if (currentContent.bgParticlesSize === "large") {
            minSize = 65;
            maxSizeDiff = 50;
        }

        for (let i = 0; i < numberOfItems; i++) {
            const item = document.createElement('div');
            item.classList.add('floating-bg-item');

            const type = keys[Math.floor(Math.random() * keys.length)];
            item.innerHTML = SVGS[type];

            // Define propriedades e posições aleatórias
            const size = Math.floor(Math.random() * maxSizeDiff) + minSize;
            const left = Math.random() * 100;
            const delay = Math.random() * -40; // Espalhar imediatamente
            const duration = (Math.random() * 15 + 15) * speedMult;
            const driftDist = Math.random() * 40 + 20;
            const driftDur = Math.random() * 4 + 4;
            const rotStart = Math.random() * 360;
            const rotEnd = rotStart + (Math.random() > 0.5 ? 360 : -360);
            
            // Fator de Opacidade Base (Aumentado em 1.5x caso o tema seja claro, para dar contraste na subida)
            let baseOpacity = Math.random() * 0.03 + 0.02;
            if (currentContent.themeLightness === "light") {
                baseOpacity = Math.random() * 0.05 + 0.04;
            }
            const opacity = baseOpacity.toFixed(4);

            // Seta as variáveis CSS locais no elemento
            item.style.setProperty('--size', `${size}px`);
            item.style.left = `${left}%`;
            item.style.animationDelay = `${delay}s, ${delay}s, ${Math.random() * -5}s`;
            item.style.setProperty('--dur', `${duration}s`);
            item.style.setProperty('--drift-dist', `${driftDist}px`);
            item.style.setProperty('--drift-dur', `${driftDur}s`);
            item.style.setProperty('--rot-start', `${rotStart}deg`);
            item.style.setProperty('--rot-end', `${rotEnd}deg`);
            item.style.setProperty('--item-opacity', opacity);

            bgContainer.appendChild(item);
        }
    }

    // Inicializa os elementos flutuantes no carregamento
    initFloatingBackground();
});
