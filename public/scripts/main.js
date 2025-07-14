// Variables globales
let isMenuOpen = false;
let mousePosition = { x: 0, y: 0 };
let isLoaded = false;

// Elementos del DOM
const cursorFollower = document.getElementById('cursor-follower');
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
  initializeAnimations();
  setupEventListeners();
  setupScrollEffects();
});

// Configurar animaciones iniciales
function initializeAnimations() {
  setTimeout(() => {
    isLoaded = true;

    // Animar logo
    const logo = document.getElementById('logo');
    logo.classList.remove('opacity-0', 'translate-y-4');

    // Animar navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
      setTimeout(() => {
        link.classList.remove('opacity-0', 'translate-y-4');
      }, index * 100 + 200);
    });

    // Animar botón móvil
    const mobileBtn = document.getElementById('mobile-menu-btn');
    if (mobileBtn) {
      mobileBtn.classList.remove('opacity-0', 'translate-y-4');
    }

    // Animar hero
    animateHeroSection();
  }, 500);
}

// Animar sección hero
function animateHeroSection() {
  const heroTitle = document.getElementById('hero-title');
  const heroSubtitle = document.getElementById('hero-subtitle');
  const heroDescription = document.getElementById('hero-description');
  const heroButtons = document.getElementById('hero-buttons');
  const scrollIndicator = document.getElementById('scroll-indicator');

  setTimeout(() => {
    if (heroTitle) heroTitle.classList.remove('opacity-0', 'translate-y-8');
  }, 0);

  setTimeout(() => {
    if (heroSubtitle)
      heroSubtitle.classList.remove('opacity-0', 'translate-y-8');
  }, 300);

  setTimeout(() => {
    if (heroDescription)
      heroDescription.classList.remove('opacity-0', 'translate-y-8');
  }, 600);

  setTimeout(() => {
    if (heroButtons) heroButtons.classList.remove('opacity-0', 'translate-y-8');
  }, 900);

  setTimeout(() => {
    if (scrollIndicator)
      scrollIndicator.classList.remove('opacity-0', 'translate-y-8');
  }, 1200);
}

// Configurar event listeners
function setupEventListeners() {
  // Seguimiento del cursor
  document.addEventListener('mousemove', handleMouseMove);

  // Scroll
  window.addEventListener('scroll', handleScroll);

  // Navegación
  setupNavigation();

  // Menú móvil
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
}

// Manejar movimiento del mouse
function handleMouseMove(e) {
  mousePosition = { x: e.clientX, y: e.clientY };

  if (cursorFollower) {
    cursorFollower.style.left = `${mousePosition.x - 100}px`;
    cursorFollower.style.top = `${mousePosition.y - 100}px`;
    cursorFollower.style.background = `radial-gradient(200px circle at center, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)`;
  }
}

// Manejar scroll
function handleScroll() {
  const scrollY = window.scrollY;

  // Navbar background
  if (scrollY > 100) {
    navbar.classList.add(
      'bg-white/95',
      'backdrop-blur-md',
      'border-b',
      'border-gray-100'
    );
  } else {
    navbar.classList.remove(
      'bg-white/95',
      'backdrop-blur-md',
      'border-b',
      'border-gray-100'
    );
  }
}

// Configurar navegación
function setupNavigation() {
  const scrollButtons = document.querySelectorAll('[data-scroll]');

  scrollButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const targetId = this.getAttribute('data-scroll');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }

      // Cerrar menú móvil si está abierto
      if (isMenuOpen) {
        toggleMobileMenu();
      }
    });
  });
}

// Toggle menú móvil
function toggleMobileMenu() {
  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    mobileMenu.classList.remove('hidden');
    mobileMenuBtn.textContent = 'Close';

    // Animar elementos del menú
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach((link, index) => {
      link.style.animation = `fadeIn 0.6s ease-out forwards`;
      link.style.animationDelay = `${index * 100}ms`;
      link.style.opacity = '0';
    });
  } else {
    mobileMenu.classList.add('hidden');
    mobileMenuBtn.textContent = 'Menu';
  }
}

// Efectos de scroll
function setupScrollEffects() {
  // Intersection Observer para animaciones al scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, observerOptions);

  // Observar secciones
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Estilos CSS adicionales
  const style = document.createElement('style');
  style.textContent = `
      @keyframes fadeIn {
          from {
              opacity: 0;
              transform: translateY(20px);
          }
          to {
              opacity: 1;
              transform: translateY(0);
          }
      }
      .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
      }
      html {
          scroll-behavior: smooth;
      }
      body {
          font-family: 'Inter', sans-serif;
      }
  `;
  document.head.appendChild(style);
}
