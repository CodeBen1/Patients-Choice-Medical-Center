document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
  
    hamburger.addEventListener('click', () => {
      navList.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navList.contains(e.target) && !hamburger.contains(e.target)) {
        navList.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  
    // Smooth scroll for anchor links (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Form submission for Contact page
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Add FormSubmit-specific hidden fields (optional but recommended)
    const hiddenSubject = document.createElement('input');
    hiddenSubject.type = 'hidden';
    hiddenSubject.name = '_subject';
    hiddenSubject.value = 'New Message from Website';
    form.appendChild(hiddenSubject);

    // Disable CAPTCHA (optional)
    const hiddenCaptcha = document.createElement('input');
    hiddenCaptcha.type = 'hidden';
    hiddenCaptcha.name = '_captcha';
    hiddenCaptcha.value = 'false';
    form.appendChild(hiddenCaptcha);

    try {
      // Send data to FormSubmit
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert('Thank you for your message. We will respond shortly.');
        form.reset();
      } else {
        alert('Oops! Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Failed to send message. Check your internet connection.');
    }
  });
}
  });
  
  // Text Rotator Functionality
function initializeTextRotator() {
  const messages = document.querySelectorAll('.rotator-message');
  let currentIndex = 0;

  function showNextMessage() {
    messages[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % messages.length;
    messages[currentIndex].classList.add('active');
  }

  // Initial interval setup
  let rotateInterval = setInterval(showNextMessage, 3000);

  // Pause on hover
  const rotator = document.querySelector('.text-rotator');
  rotator.addEventListener('mouseenter', () => clearInterval(rotateInterval));
  rotator.addEventListener('mouseleave', () => {
    rotateInterval = setInterval(showNextMessage, 3000);
  });
}

// Initialize when document loads
document.addEventListener('DOMContentLoaded', initializeTextRotator);