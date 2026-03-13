/**
 * YALA NKWU - JavaScript Moderno e Otimizado
 * Sistema completo para experiência excepcional
 */

class YalaNkwu {
    constructor() {
        this.init();
    }

    init() {
        console.log('🍽️ Yala Nkwu - Inicializando...');
        this.cacheElements();
        this.bindEvents();
        this.initAnimations();
        this.initScrollEffects();
        this.initForms();
    }

    cacheElements() {
        // Header e navegação
        this.header = document.querySelector('.header');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.mobileMenu = document.querySelector('.mobile-menu');

        // Formulários
        this.reservationForm = document.getElementById('reservationForm');
        this.newsletterForm = document.getElementById('newsletterForm');

        // Elementos para animação
        this.animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale');

        // Cards interativos
        this.cards = document.querySelectorAll('.dish-card, .gastro-card, .tourism-card, .feature-pill');
        this.buttons = document.querySelectorAll('.btn');

        // Hero elements
        this.heroTitle = document.querySelector('.hero-title');
        this.heroSubtitle = document.querySelector('.hero-subtitle');
        this.heroActions = document.querySelector('.hero-actions');
    }

    bindEvents() {
        // Scroll
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());

        // Navegação
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavLinkClick(e));
        });

        // Menu mobile
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Fechar menu mobile ao clicar fora
        document.addEventListener('click', (e) => this.handleDocumentClick(e));

        // Formulários
        if (this.reservationForm) {
            this.reservationForm.addEventListener('submit', (e) => this.handleReservationSubmit(e));
        }

        if (this.newsletterForm) {
            this.newsletterForm.addEventListener('submit', (e) => this.handleNewsletterSubmit(e));
        }

        // Cards
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.handleCardHover(card));
            card.addEventListener('mouseleave', () => this.handleCardLeave(card));
        });

        // Botões
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => this.handleButtonClick(e, button));
        });

        // Teclado
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    handleScroll() {
        const scrolled = window.scrollY > 50;
        
        if (this.header) {
            this.header.classList.toggle('scrolled', scrolled);
        }

        // Animações ao scroll
        this.animateOnScroll();
    }

    handleResize() {
        // Fechar menu mobile em resize
        if (window.innerWidth > 768 && this.mobileMenu) {
            this.mobileMenu.classList.remove('active');
        }
    }

    handleNavLinkClick(e) {
        const link = e.currentTarget;
        const href = link.getAttribute('href');

        // Atualizar estado active
        this.navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Smooth scroll para links âncora
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = this.header ? this.header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }

        // Fechar menu mobile
        if (this.mobileMenu && this.mobileMenu.classList.contains('active')) {
            this.toggleMobileMenu();
        }
    }

    toggleMobileMenu() {
        if (!this.mobileMenu) return;

        this.mobileMenu.classList.toggle('active');
        
        // Animar ícone
        const icon = this.mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.className = this.mobileMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        }

        // Prevenir scroll do body
        document.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    handleDocumentClick(e) {
        // Fechar menu mobile ao clicar fora
        if (this.mobileMenu && this.mobileMenu.classList.contains('active') &&
            !this.mobileMenuBtn.contains(e.target) && 
            !this.mobileMenu.contains(e.target)) {
            this.toggleMobileMenu();
        }
    }

    handleReservationSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Validação simples
        if (this.validateReservationForm(data)) {
            this.showNotification('✅ Reserva solicitada com sucesso! Entraremos em contato em breve.', 'success');
            e.target.reset();
        }
    }

    handleNewsletterSubmit(e) {
        e.preventDefault();
        
        const email = e.target.querySelector('input[type="email"]').value;
        
        if (this.validateEmail(email)) {
            this.showNotification('🎉 Cadastro realizado com sucesso! Aguarde nossas novidades.', 'success');
            e.target.reset();
        } else {
            this.showNotification('❌ Por favor, insira um email válido.', 'error');
        }
    }

    validateReservationForm(data) {
        const requiredFields = ['nome', 'email', 'telefone', 'data', 'hora', 'pessoas'];
        
        for (const field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                this.showNotification('⚠️ Por favor, preencha todos os campos obrigatórios.', 'error');
                return false;
            }
        }
        
        if (!this.validateEmail(data.email)) {
            this.showNotification('⚠️ Por favor, insira um email válido.', 'error');
            return false;
        }
        
        return true;
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    handleCardHover(card) {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 20px 25px -5px rgba(139, 69, 19, 0.1)';
    }

    handleCardLeave(card) {
        card.style.transform = '';
        card.style.boxShadow = '';
    }

    handleButtonClick(e, button) {
        // Efeito ripple
        this.createRippleEffect(button, e);

        // Loading state para formulários
        if (button.type === 'submit') {
            this.setButtonLoading(button, true);
            setTimeout(() => this.setButtonLoading(button, false), 2000);
        }
    }

    createRippleEffect(button, e) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    setButtonLoading(button, loading) {
        if (loading) {
            button.classList.add('loading');
            button.disabled = true;
            button.setAttribute('data-original-text', button.innerHTML);
            button.innerHTML = '<span class="spinner"></span> Processando...';
        } else {
            button.classList.remove('loading');
            button.disabled = false;
            button.innerHTML = button.getAttribute('data-original-text') || 'Enviar';
        }
    }

    handleKeydown(e) {
        // ESC fecha menu mobile
        if (e.key === 'Escape' && this.mobileMenu && this.mobileMenu.classList.contains('active')) {
            this.toggleMobileMenu();
        }
    }

    initAnimations() {
        // Animar hero
        this.animateHero();
        
        // Preparar elementos para animação
        this.prepareElements();
    }

    animateHero() {
        if (!this.heroTitle) return;

        const heroElements = [
            { el: this.heroTitle, delay: 0 },
            { el: this.heroSubtitle, delay: 200 },
            { el: this.heroActions, delay: 400 }
        ];

        heroElements.forEach(({ el, delay }) => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }

    prepareElements() {
        // Preparar elementos animados
        this.animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
        });

        // Preparar cards
        this.cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        });
    }

    animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observar elementos
        this.animatedElements.forEach(el => observer.observe(el));
        this.cards.forEach(el => observer.observe(el));
    }

    initScrollEffects() {
        // Scroll suave já implementado no handleNavLinkClick
        // Podemos adicionar mais efeitos aqui se necessário
    }

    initForms() {
        // Validação em tempo real
        const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        if (field.type === 'email') {
            isValid = this.validateEmail(value);
            errorMessage = 'Email inválido';
        } else if (field.required && !value) {
            isValid = false;
            errorMessage = 'Campo obrigatório';
        }

        this.showFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    showFieldValidation(field, isValid, errorMessage) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;

        // Remover validação anterior
        this.clearFieldValidation(formGroup);

        if (!isValid) {
            formGroup.classList.add('error');
            
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.textContent = errorMessage;
            errorElement.style.cssText = `
                color: #dc3545;
                font-size: 0.875rem;
                margin-top: 0.25rem;
            `;
            
            formGroup.appendChild(errorElement);
            field.style.borderColor = '#dc3545';
        } else {
            field.style.borderColor = '#28a745';
        }
    }

    clearFieldValidation(formGroup) {
        formGroup.classList.remove('error');
        const errorElement = formGroup.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            this.clearFieldValidation(formGroup);
            field.style.borderColor = '';
        }
    }

    showNotification(message, type = 'info', duration = 5000) {
        // Remover notificações existentes
        this.removeNotifications();
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Fechar">&times;</button>
            </div>
        `;
        
        // Estilos
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Evento de fechar
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.removeNotifications());
        }
        
        // Auto remover
        setTimeout(() => this.removeNotifications(), duration);
    }

    getNotificationColor(type) {
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        return colors[type] || colors.info;
    }

    removeNotifications() {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
    }
}

// Estilos adicionais para componentes dinâmicos
const additionalStyles = `
    <style>
        /* Animação ripple */
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Spinner loading */
        .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Field validation */
        .form-group.error input,
        .form-group.error select,
        .form-group.error textarea {
            border-color: #dc3545;
        }
        
        .field-error {
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }
        
        /* Loading state */
        .loading {
            opacity: 0.6;
            pointer-events: none;
        }
        
        /* Mobile menu animations */
        .mobile-menu {
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        }
        
        .mobile-menu.active {
            transform: translateY(0);
        }
        
        /* Notification styles */
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            margin-left: 12px;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
    </style>
`;

// Adicionar estilos ao head
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.YalaNkwu = new YalaNkwu();
    console.log('✨ Yala Nkwu - Sistema carregado com sucesso!');
});

// Expor classe para uso externo se necessário
window.YalaNkwu = YalaNkwu;
