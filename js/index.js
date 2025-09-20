// JavaScript functionality specific to the home page

document.addEventListener('DOMContentLoaded', () => {
  // Testimonial slider with navigation dots
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
});
