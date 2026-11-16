/* ITS AYUSH — direct-link + interaction layer */
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
