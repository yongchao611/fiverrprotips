/* ============================================
   FiverrProTips.com - Main Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===========================
  // 1. Navbar Scroll Effect
  // ===========================
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ===========================
  // 2. Mobile Menu Toggle
  // ===========================
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking a nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }

  // ===========================
  // 3. FAQ Accordion
  // ===========================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const button = item.querySelector('.faq-question');
    if (button) {
      button.addEventListener('click', () => {
        // Close other open items
        faqItems.forEach(other => {
          if (other !== item && other.classList.contains('open')) {
            other.classList.remove('open');
            other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          }
        });
        // Toggle current
        const isOpen = item.classList.toggle('open');
        button.setAttribute('aria-expanded', isOpen.toString());
      });
    }
  });

  // ===========================
  // 4. Countdown Timer
  // ===========================
  const countdownDays = document.getElementById('countdown-days');
  const countdownHours = document.getElementById('countdown-hours');
  const countdownMins = document.getElementById('countdown-mins');
  const countdownSecs = document.getElementById('countdown-secs');

  if (countdownDays && countdownHours && countdownMins && countdownSecs) {
    // Set countdown target to 30 days from page load
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    targetDate.setHours(23, 59, 59, 0);

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        // Reset countdown
        targetDate.setDate(targetDate.getDate() + 30);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownDays.textContent = String(days).padStart(2, '0');
      countdownHours.textContent = String(hours).padStart(2, '0');
      countdownMins.textContent = String(minutes).padStart(2, '0');
      countdownSecs.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ===========================
  // 5. Cookie Consent Banner
  // ===========================
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');

  if (cookieBanner && cookieAccept) {
    // Show banner if not previously accepted
    if (!localStorage.getItem('cookiesAccepted')) {
      setTimeout(() => {
        cookieBanner.classList.add('show');
      }, 1000);
    }

    cookieAccept.addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieBanner.classList.remove('show');
      setTimeout(() => {
        cookieBanner.style.display = 'none';
      }, 300);
    });
  }

  // ===========================
  // 6. Contact Form Handling
  // ===========================
  const contactForm = document.getElementById('contactForm');
  const formCard = document.getElementById('contactFormCard');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      let isValid = true;

      // Clear previous error states
      contactForm.querySelectorAll('input, textarea').forEach(el => {
        el.style.borderColor = '';
      });

      // Validate required fields
      if (!name) {
        document.getElementById('name').style.borderColor = 'var(--color-accent)';
        isValid = false;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('email').style.borderColor = 'var(--color-accent)';
        isValid = false;
      }
      if (!message) {
        document.getElementById('message').style.borderColor = 'var(--color-accent)';
        isValid = false;
      }

      if (!isValid) return;

      // Simulate form submission (replace with actual backend endpoint)
      const submitBtn = contactForm.querySelector('.form-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // In production, replace this with a fetch() to your backend
      setTimeout(() => {
        // Show success message
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');

        // Reset form (in case user navigates back)
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // ===========================
  // 7. Scroll Animations
  // ===========================
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  const animateElements = document.querySelectorAll(
    '.feature-card, .testimonial-card, .benefit-item, .section-header'
  );
  animateElements.forEach(el => observer.observe(el));

  // ===========================
  // 8. Smooth Scroll for Anchor Links
  // ===========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 72;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
});
