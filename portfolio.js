(() => {
  const projects = [...document.querySelectorAll('.portfolio-project')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(other => {
      const active = other === button;
      other.classList.toggle('active', active);
      other.setAttribute('aria-pressed', String(active));
    });
    projects.forEach(project => {
      project.hidden = button.dataset.filter !== 'all' && !project.dataset.category.split(' ').includes(button.dataset.filter);
    });
    const visible = projects.filter(project => !project.hidden);
    const count = visible.reduce((total, project) => total + project.querySelectorAll('[data-image]').length, 0);
    document.getElementById('portfolio-status').textContent = `${count} photographs / ${visible.length} ${visible.length === 1 ? 'project' : 'projects'}`;
  }));
  const dialog = document.getElementById('project-lightbox');
  const image = document.getElementById('viewer-image');
  let images = [], index = 0, opener, start;
  function show(next) {
    index = (next + images.length) % images.length;
    image.src = images[index].src;
    image.alt = images[index].alt;
    document.getElementById('viewer-count').textContent = `${index + 1} / ${images.length}`;
  }
  projects.forEach(project => project.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
    images = [...project.querySelectorAll('.project-gallery img')];
    opener = button;
    document.getElementById('viewer-title').textContent = project.querySelector('h3').textContent;
    show(Number(button.dataset.image));
    dialog.showModal();
    dialog.querySelector('.viewer-close').focus();
  })));
  dialog.querySelector('.viewer-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.viewer-prev').addEventListener('click', () => show(index - 1));
  dialog.querySelector('.viewer-next').addEventListener('click', () => show(index + 1));
  dialog.addEventListener('close', () => { image.removeAttribute('src'); opener?.focus({preventScroll:true}); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); show(index + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  image.addEventListener('pointerdown', event => {start = {x:event.clientX,y:event.clientY};});
  image.addEventListener('pointerup', event => {
    if (!start) return;
    const dx = event.clientX - start.x, dy = event.clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
    start = null;
  });
  image.addEventListener('pointercancel', () => {start = null;});
})();
