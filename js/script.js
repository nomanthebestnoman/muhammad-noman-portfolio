/**
 * ==========================================================================
 * MUHAMMAD NOMAN - PORTFOLIO INTERACTIVE JAVASCRIPT
 * Full-featured Vanilla JS for 5-Page Futuristic Portfolio
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initStickyNavbar();
  initMobileMenu();
  initActiveNavLink();
  initTypingAnimation();
  initBackgroundCanvas();
  initScrollReveal();
  initAnimatedCounters();
  initSkillBars();
  initProjectFilters();
  initFaqAccordion();
  initContactForm();
  initResumeModal();
  initBackToTop();
  initCursorGlow();
  initButtonRipples();
  initImageFallbacks();
  initDynamicYear();
});

/* --------------------------------------------------------------------------
   1. SCROLL PROGRESS BAR
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const progress = totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  });
}

/* --------------------------------------------------------------------------
   2. STICKY NAVBAR
   -------------------------------------------------------------------------- */
function initStickyNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   3. MOBILE HAMBURGER MENU
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-overlay');

  if (!hamburger || !drawer) return;

  function toggleMenu() {
    hamburger.classList.toggle('active');
    drawer.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
    document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* --------------------------------------------------------------------------
   4. ACTIVE NAV LINK DETECTION
   -------------------------------------------------------------------------- */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   5. TYPING ANIMATION FOR HERO
   -------------------------------------------------------------------------- */
function initTypingAnimation() {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;

  const roles = [
    "Hi, I'm Muhammad Noman",
    "AI Web Developer",
    "UI Designer",
    "Frontend Developer",
    "Full-Stack Creator"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const deleteSpeed = 45;
  const delayBetweenWords = 2000;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let currentSpeed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      currentSpeed = delayBetweenWords;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      currentSpeed = 500;
    }

    setTimeout(type, currentSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   6. INTERACTIVE BACKGROUND CANVAS (NEON PARTICLES)
   -------------------------------------------------------------------------- */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 25), 55);

  let mouseX = width / 2;
  let mouseY = height / 2;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? '#00e5ff' : '#8b5cf6';
      this.alpha = Math.random() * 0.6 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactive repulse
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        this.x -= (dx / dist) * 1.5;
        this.y -= (dy / dist) * 1.5;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#00e5ff';
          ctx.globalAlpha = (1 - dist / 130) * 0.15;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   7. SCROLL REVEAL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   8. ANIMATED COUNTERS
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
          const suffix = counter.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 2000;
          const step = Math.max(1, Math.floor(target / (duration / 20)));

          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              counter.textContent = `${target}${suffix}`;
              clearInterval(timer);
            } else {
              counter.textContent = `${count}${suffix}`;
            }
          }, 20);

          obs.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(c => observer.observe(c));
}

/* --------------------------------------------------------------------------
   9. INTERACTIVE SKILL PROGRESS BARS
   -------------------------------------------------------------------------- */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-fill');
  if (!skillBars.length) return;

  function triggerFill(bar) {
    const percentage = bar.getAttribute('data-percent') || '85%';
    bar.style.width = percentage;
  }

  if (!('IntersectionObserver' in window)) {
    skillBars.forEach(triggerFill);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerFill(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  skillBars.forEach(bar => {
    // Check if already in viewport
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      triggerFill(bar);
    } else {
      observer.observe(bar);
    }
  });
}

/* --------------------------------------------------------------------------
   10. PROJECT CATEGORY FILTERING
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   11. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isOpen = question.classList.contains('active');

      // Close all others
      document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
        if (q.nextElementSibling) q.nextElementSibling.style.maxHeight = null;
        const icon = q.querySelector('i');
        if (icon) icon.className = 'fas fa-chevron-down';
      });

      if (!isOpen) {
        question.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        const icon = question.querySelector('i');
        if (icon) icon.className = 'fas fa-chevron-up';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   12. CONTACT FORM VALIDATION & SUBMISSION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    let isValid = true;

    if (!name || name.value.trim().length < 2) {
      showFieldError(name, 'Please enter a valid name (at least 2 characters)');
      isValid = false;
    } else {
      clearFieldError(name);
    }

    if (!email || !validateEmail(email.value.trim())) {
      showFieldError(email, 'Please enter a valid email address');
      isValid = false;
    } else {
      clearFieldError(email);
    }

    if (!message || message.value.trim().length < 5) {
      showFieldError(message, 'Message should be at least 5 characters long');
      isValid = false;
    } else {
      clearFieldError(message);
    }

    if (isValid) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';

      setTimeout(() => {
        showToast('Message sent successfully! Muhammad Noman will respond soon.', 'success');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1500);
    }
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showFieldError(field, msg) {
    if (!field) return;
    field.style.borderColor = '#ef4444';
    let errorEl = field.parentElement.querySelector('.field-error');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'field-error';
      errorEl.style.color = '#ef4444';
      errorEl.style.fontSize = '0.8rem';
      errorEl.style.marginTop = '0.3rem';
      errorEl.style.display = 'block';
      field.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = msg;
  }

  function clearFieldError(field) {
    if (!field) return;
    field.style.borderColor = '';
    const errorEl = field.parentElement.querySelector('.field-error');
    if (errorEl) errorEl.remove();
  }
}

/* --------------------------------------------------------------------------
   13. TOAST NOTIFICATION SYSTEM
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';

  toast.innerHTML = `
    <i class="fas ${iconClass}" style="color: var(--primary);"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

/* --------------------------------------------------------------------------
   14. RESUME DOWNLOAD MODAL
   -------------------------------------------------------------------------- */
function initResumeModal() {
  const resumeBtns = document.querySelectorAll('.resume-btn');
  const modal = document.getElementById('resume-modal');
  const closeBtn = document.getElementById('modal-close');

  if (!modal) return;

  resumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* --------------------------------------------------------------------------
   15. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backBtn = document.getElementById('back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backBtn.classList.add('show');
    } else {
      backBtn.classList.remove('show');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   16. CURSOR GLOW EFFECT FOR DESKTOP
   -------------------------------------------------------------------------- */
function initCursorGlow() {
  if (window.innerWidth < 1024) return;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  window.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

/* --------------------------------------------------------------------------
   17. BUTTON RIPPLE EFFECT
   -------------------------------------------------------------------------- */
function initButtonRipples() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

/* --------------------------------------------------------------------------
   18. STUNNING CSS IMAGE FALLBACK & ARTWORK GENERATOR
   -------------------------------------------------------------------------- */
function initImageFallbacks() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    const handleImageError = () => {
      const altText = img.getAttribute('alt') || 'AI Web Solution';
      const isClientAvatar = img.classList.contains('client-avatar');
      const isAvatarImg = img.classList.contains('avatar-img');
      const isAboutImg = img.classList.contains('about-img');

      if (isClientAvatar) {
        // Generate a glowing initials avatar badge
        const initials = altText.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'MN';
        const avatarBadge = document.createElement('div');
        avatarBadge.className = 'client-avatar-badge';
        avatarBadge.innerHTML = `<span>${initials}</span>`;
        img.replaceWith(avatarBadge);
      } else if (isAvatarImg || isAboutImg) {
        // Generate a full glowing portrait art card
        const portraitCard = document.createElement('div');
        portraitCard.className = 'css-portrait-art-card';
        portraitCard.innerHTML = `
          <div class="art-card-badge">MN</div>
          <div class="art-card-title">MUHAMMAD NOMAN</div>
          <div class="art-card-subtitle">Senior AI Web Developer & UI Designer</div>
          <div class="art-card-chips">
            <span>⚡ React 19</span>
            <span>🤖 Gemini AI</span>
            <span>🎨 UI/UX</span>
          </div>
        `;
        img.replaceWith(portraitCard);
      } else {
        // Project / Service image fallback card
        const projectCard = document.createElement('div');
        projectCard.className = 'css-project-art-card';
        projectCard.innerHTML = `
          <div class="project-art-icon"><i class="fas fa-cube"></i></div>
          <div class="project-art-title">${altText}</div>
          <div class="project-art-sub">Interactive AI & Web Solution</div>
          <div class="project-art-badge">MN DIGITAL CREATION</div>
        `;
        img.replaceWith(projectCard);
      }
    };

    img.addEventListener('error', handleImageError);

    // If already broken
    if (img.complete && img.naturalWidth === 0) {
      handleImageError();
    }
  });
}

/* --------------------------------------------------------------------------
   19. DYNAMIC FOOTER YEAR
   -------------------------------------------------------------------------- */
function initDynamicYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

