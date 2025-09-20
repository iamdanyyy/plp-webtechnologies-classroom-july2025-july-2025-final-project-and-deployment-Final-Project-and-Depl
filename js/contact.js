// JavaScript functionality specific to the contact page

document.addEventListener('DOMContentLoaded', () => {
  // Supabase configuration
  const SUPABASE_URL = "https://padjrdqnfpsgxobakgnv.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhZGpyZHFuZnBzZ3hvYmFrZ252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNzMzMTksImV4cCI6MjA3Mzk0OTMxOX0.1tcL_xTfRpgWs5v-XEBhacN4MhF1bttm029QVtppCko";
  
  // Initialize Supabase client
  const { createClient } = supabase;
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Contact form handling
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone') || '';
      const message = formData.get('message');
      
      // Basic validation
      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      try {
        // Show loading state
        const submitBtn = contactForm.querySelector('.contact-form-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Insert data into Supabase
        const { data, error } = await supabaseClient
          .from('inquiries')
          .insert([
            {
              name: name,
              email: email,
              phone: phone,
              message: message,
              created_at: new Date().toISOString()
            }
          ]);
        
        if (error) {
          throw error;
        }
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        contactForm.reset();
        
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
      } finally {
        // Reset button state
        const submitBtn = contactForm.querySelector('.contact-form-btn');
        submitBtn.textContent = "Send Inquiry";
        submitBtn.disabled = false;
      }
    });
  }
  
  function showSuccessMessage() {
    // Create success message overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    `;
    
    const message = document.createElement('div');
    message.style.cssText = `
      background: white;
      padding: 40px;
      border-radius: 20px;
      text-align: center;
      max-width: 500px;
      margin: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    `;
    
    message.innerHTML = `
      <div style="font-size: 4rem; margin-bottom: 20px;">✅</div>
      <h2 style="color: #8B6F4E; margin-bottom: 15px;">Thank You!</h2>
      <p style="margin-bottom: 30px; color: #666;">Your inquiry has been received successfully. We will get back to you as soon as possible.</p>
      <button onclick="this.parentElement.parentElement.remove()" style="
        background: #8B6F4E;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
      ">Close</button>
    `;
    
    overlay.appendChild(message);
    document.body.appendChild(overlay);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (overlay.parentElement) {
        overlay.remove();
      }
    }, 5000);
  }
});
