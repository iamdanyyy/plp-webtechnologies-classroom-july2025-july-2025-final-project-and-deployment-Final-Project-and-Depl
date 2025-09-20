// JavaScript functionality specific to the about page

document.addEventListener('DOMContentLoaded', () => {
  // Testimonial slider with navigation dots (same as index page)
  const testimonials = document.querySelectorAll('.testimonial');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  let current = 0;

  function showTestimonial(index) {
    testimonials.forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      current = (current - 1 + testimonials.length) % testimonials.length;
      showTestimonial(current);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      current = (current + 1) % testimonials.length;
      showTestimonial(current);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      current = parseInt(dot.getAttribute('data-index'));
      showTestimonial(current);
    });
  });

  // Per-card animation logic for material cards
  const cards = document.querySelectorAll('.material-card');
  cards.forEach(card => {
    const info = card.querySelector('.material-info');
    card.addEventListener('mouseenter', () => {
      card.classList.add('show-info');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('show-info');
    });
  });

  // Spin-in animation for stats
  const statNumbers = document.querySelectorAll('.spin-animate');
  const statObserver = new window.IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => {
    statObserver.observe(stat);
  });

  // Count-up effect for stats
  function animateCountUp(el, target, duration = 1200) {
    let start = 0;
    let startTime = null;
    const isPlus = String(target).includes('+');
    const isK = String(target).toLowerCase().includes('k');
    const cleanTarget = parseInt(target.replace(/[^0-9]/g, ''));
    
    function step(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const value = Math.floor(progress * cleanTarget);
      el.textContent = isK ? value + 'k' : value + (isPlus ? '+' : '');
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  statNumbers.forEach(stat => {
    stat.addEventListener('animationstart', () => {
      const target = stat.getAttribute('data-target') || stat.textContent;
      animateCountUp(stat, target);
    }, { once: true });
  });
});
