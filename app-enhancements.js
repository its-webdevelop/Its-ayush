/* 0xNULLEx — direct-link + interaction layer */
document.addEventListener('DOMContentLoaded', () => {
  // Make the whole portfolio card open its real data-link, while preserving the details button.
  document.querySelectorAll('.portfolio-card[data-link]').forEach(card => {
    const url = card.dataset.link;
    if (!url || url === '#') return;
    card.setAttribute('role','link');
    card.setAttribute('tabindex','0');
    const go = () => window.open(url, '_blank', 'noopener');
    card.addEventListener('click', e => {
      if (e.target.closest('button,a')) return;
      go();
    });
    card.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('button,a')) {
        e.preventDefault(); go();
      }
    });
  });

  // Service cards become direct CTAs to the enquiry form.
  document.querySelectorAll('.service-card[data-service]').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('a,button')) return;
      const select = document.getElementById('client-project-type');
      if (select) select.value = card.dataset.service;
      document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});
    });
  });

  // Keep every internal anchor usable and close the mobile menu after navigation.
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => {
      const menu = document.getElementById('mobile-menu-container');
      const overlay = document.getElementById('mobile-overlay');
      const burger = document.getElementById('mobile-hamburger');
      if (menu?.classList.contains('active')) {
        menu.classList.remove('active'); overlay?.classList.remove('active'); burger?.classList.remove('active');
      }
    });
  });

  // Copy-email helper: clicking the email card copies the address only when supported.
  const email = '0xnullex@gmail.com';
  document.querySelectorAll('.contact-email-copy').forEach(el => {
    el.addEventListener('click', async e => {
      e.preventDefault(); e.stopPropagation();
      try { await navigator.clipboard.writeText(email); el.innerHTML = 'Copied email <i class="fa-solid fa-check"></i>'; setTimeout(()=>el.innerHTML='Email directly <i class="fa-solid fa-arrow-up-right-from-square"></i>',1800); } catch {}
    });
  });
});

// 0xNULLEx v3 utility layer: keyboard shortcuts, copy actions and resilient modal UX.
document.addEventListener('DOMContentLoaded', () => {
  // Copy phone number from the contact card without breaking normal tel: navigation.
  document.querySelectorAll('.contact-info-details p').forEach((el) => {
    if (el.textContent.trim() !== '+91 7004106326') return;
    el.parentElement?.parentElement?.addEventListener('contextmenu', async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText('+91 7004106326');
        const old = el.textContent;
        el.textContent = 'Copied: +91 7004106326';
        setTimeout(() => { el.textContent = old; }, 1400);
      } catch (_) {}
    });
  });

  // Escape closes common overlays without interfering with normal page behavior.
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.modal-overlay.active,.terminal-overlay.active').forEach((el) => {
      el.classList.remove('active');
      document.body.style.overflow = '';
    });
    const menu = document.getElementById('mobile-menu-container');
    const overlay = document.getElementById('mobile-overlay');
    const burger = document.getElementById('mobile-hamburger');
    if (menu?.classList.contains('active')) {
      menu.classList.remove('active'); overlay?.classList.remove('active'); burger?.classList.remove('active');
      burger?.setAttribute('aria-expanded','false');
    }
  });

  // Add a lightweight page-ready state so content never depends on the preloader.
  window.setTimeout(() => document.documentElement.classList.add('page-ready'), 1200);
});
