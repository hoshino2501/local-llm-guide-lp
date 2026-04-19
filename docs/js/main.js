// スクロールフェードイン（Intersection Observer）
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// FAQのGA4イベント計測（GA4が設定されている場合のみ動作）
document.querySelectorAll('.faq-item details').forEach((details) => {
  details.addEventListener('toggle', () => {
    if (details.open && typeof gtag === 'function') {
      const question = details.querySelector('summary')?.textContent?.trim();
      gtag('event', 'faq_open', { faq_question: question });
    }
  });
});

// CTAクリックイベント計測
document.querySelectorAll('[data-ga-event]').forEach((el) => {
  el.addEventListener('click', () => {
    if (typeof gtag === 'function') {
      gtag('event', el.dataset.gaEvent, { event_label: el.textContent?.trim() });
    }
  });
});
