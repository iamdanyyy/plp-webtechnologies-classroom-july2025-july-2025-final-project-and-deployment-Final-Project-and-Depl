// Common JavaScript functionality for Safisha Rugs website

// Navbar toggle for mobile
function initNavbarToggle() {
  const navbarToggle = document.getElementById('navbar-toggle');
  const navbarLinks = document.querySelector('.navbar-links');
  
  if (navbarToggle && navbarLinks) {
    navbarToggle.addEventListener('click', () => {
      navbarLinks.classList.toggle('active');
      navbarToggle.classList.toggle('active');
      navbarToggle.classList.remove('spin');
      // Force reflow to restart animation
      void navbarToggle.offsetWidth;
      navbarToggle.classList.add('spin');
      setTimeout(() => navbarToggle.classList.remove('spin'), 500);
    });
  }
}

// Custom cursor functionality
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) return;
  
  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  // Animate cursor position
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = 1;
  });

  function animateCursor() {
    currentX += (mouseX - currentX) * 0.18;
    currentY += (mouseY - currentY) * 0.18;
    cursor.style.left = currentX + 'px';
    cursor.style.top = currentY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = 0;
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = 1;
  });

  // Hover effect for interactive elements
  const interactiveSelectors = 'a, button, input, textarea, select, [role="button"], .btn-primary, .btn-secondary';
  document.querySelectorAll(interactiveSelectors).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });

  // Click animation
  document.addEventListener('mousedown', () => {
    cursor.classList.add('cursor-click');
  });
  cursor.addEventListener('animationend', () => {
    cursor.classList.remove('cursor-click');
  });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
  const animatedSections = document.querySelectorAll('.fade-in, .slide-up');
  const observer = new window.IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  
  animatedSections.forEach(section => {
    observer.observe(section);
  });
}

// Initialize all common functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initNavbarToggle();
  initCustomCursor();
  initScrollAnimations();
});
