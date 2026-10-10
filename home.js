/* Original photographs only. A decoded image is ready before any transition. */
(() => {
  const carousel = document.querySelector('.home-slideshow');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('.home-slide')];
  const dots = [...carousel.querySelectorAll('[data-slide]')];
  const counter = carousel.querySelector('.home-counter');
  const play = carousel.querySelector('.home-play');
  const status = carousel.querySelector('[role="status"]');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, timer, request = 0, paused = motion.matches;
  let hovered = false, focused = false, visible = true;
  function schedule() {
    clearTimeout(timer);
    if (!paused && !hovered && !focused && visible && !document.hidden)
      timer = setTimeout(() => show(current + 1), 5000);
  }
  function updatePlay() {
    play.textContent = paused ? '▷' : 'Ⅱ';
    play.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
    play.setAttribute('aria-pressed', String(paused));
  }
  async function show(index, manual = false) {
    const ticket = ++request;
    const next = (index + slides.length) % slides.length;
    clearTimeout(timer);
    try { await slides[next].decode(); }
    catch { status.textContent = 'This photograph could not load.'; schedule(); return; }
    if (ticket !== request) return;
    current = next;
    slides.forEach((img, i) => {
      img.classList.toggle('is-active', i === current);
      img.setAttribute('aria-hidden', String(i !== current));
    });
    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === current)));
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    if (manual) status.textContent = `${slides[current].alt}. Image ${current + 1} of ${slides.length}.`;
    schedule();
  }
  carousel.querySelector('[data-prev]').addEventListener('click', () => show(current - 1, true));
  carousel.querySelector('[data-next]').addEventListener('click', () => show(current + 1, true));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i, true)));
  play.addEventListener('click', () => { paused = !paused; updatePlay(); schedule(); });
  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault(); show(current + (e.key === 'ArrowRight' ? 1 : -1), true);
    }
  });
  carousel.addEventListener('mouseenter', () => { hovered = true; schedule(); });
  carousel.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  carousel.addEventListener('focusin', () => { focused = true; schedule(); });
  carousel.addEventListener('focusout', e => { focused = carousel.contains(e.relatedTarget); schedule(); });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => { paused = motion.matches; updatePlay(); schedule(); });
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting; schedule();
  }, {threshold: .15}).observe(carousel);
  updatePlay(); schedule();
})();
