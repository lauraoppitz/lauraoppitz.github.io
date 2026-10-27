document.querySelectorAll('.link-container a').forEach(link => {
  link.addEventListener('click', () => {
    const href = link.getAttribute('href');
    document.querySelectorAll('.link-container a').forEach(l => l.classList.remove('clicked'));
    document.querySelectorAll(`.link-container a[href="${href}"]`).forEach(l => l.classList.add('clicked'));
  });
});

document.getElementById('worksLink').classList.add('clicked');

document.getElementById('worksLink').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.link-container').style.display = '';
  document.querySelector('.contacts').style.display = '';
  document.querySelector('.gallery-container').style.display = '';
  document.querySelector('.about-content').style.display = 'none';
  document.querySelector('.cv-section').style.display = 'none';
  document.getElementById('issueNumber').style.display = '';

  document.getElementById('worksLink').classList.add('clicked');
  document.getElementById('aboutLink').classList.remove('clicked');

  document.querySelector('.gallery-container').scrollTop = 0;
  document.querySelectorAll('.link-container a').forEach(l => l.classList.remove('clicked'));
  document.querySelectorAll('.link-container a[href="#work1"]').forEach(l => l.classList.add('clicked'));

  window.scrollTo({ top: 0, behavior: 'instant' });
});

document.getElementById('aboutLink').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.link-container').style.display = 'none';
  document.querySelector('.gallery-container').style.display = 'none';
  document.querySelector('.about-content').style.display = 'flex';
  document.querySelector('.cv-section').style.display = 'block';
  document.getElementById('issueNumber').style.display = 'none';

  document.getElementById('aboutLink').classList.add('clicked');
  document.getElementById('worksLink').classList.remove('clicked');

  window.scrollTo({ top: 0, behavior: 'instant' });
});

document.addEventListener('DOMContentLoaded', () => {
  const galleryContainer = document.querySelector('.gallery-container');
  const projects = document.querySelectorAll('.project');

  function updateActiveLink() {
    if (galleryContainer.offsetParent === null) return;

    let current = projects[0];

    projects.forEach(project => {
      const rect = project.getBoundingClientRect();
      if (rect.top <= 110) {
        current = project;
      }
    });

    document.querySelectorAll('.link-container a').forEach(l => l.classList.remove('clicked'));
    document.querySelectorAll(`.link-container a[href="#${current.id}"]`).forEach(l => l.classList.add('clicked'));
  }

  updateActiveLink();

  galleryContainer.addEventListener('scroll', updateActiveLink);
  window.addEventListener('scroll', updateActiveLink);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.to-top').forEach(arrow => {
    arrow.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.gallery-container').scrollTo({ top: 0, behavior: 'smooth' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.querySelector('.lightbox-content');
  const prevArrow = document.querySelector('.lightbox-prev');
  const nextArrow = document.querySelector('.lightbox-next');

  let currentGroup = [];
  let currentIndex = 0;
  let touchStartX = 0;
  let touchStartY = 0;

  function showItem(index) {
    const media = currentGroup[index];
    const isVideo = media.tagName === 'VIDEO';
    lightboxContent.innerHTML = isVideo
      ? `<video src="${media.src}" controls autoplay muted loop playsinline></video>`
      : `<img src="${media.src}">`;
    currentIndex = index;
  }

  document.querySelectorAll('.project img, .project video').forEach(media => {
    media.addEventListener('click', () => {
      const project = media.closest('.project');
      currentGroup = Array.from(project.querySelectorAll('img, video'));
      const index = currentGroup.indexOf(media);
      showItem(index);
      lightbox.classList.add('active');

      if (currentGroup.length > 1) {
        prevArrow.style.display = 'block';
        nextArrow.style.display = 'block';
      } else {
        prevArrow.style.display = 'none';
        nextArrow.style.display = 'none';
      }
    });
  });

  prevArrow.addEventListener('click', (e) => {
    e.stopPropagation();
    showItem((currentIndex - 1 + currentGroup.length) % currentGroup.length);
  });

  nextArrow.addEventListener('click', (e) => {
    e.stopPropagation();
    showItem((currentIndex + 1) % currentGroup.length);
  });

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    if (currentGroup.length < 2) return;

    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;

    // ignore short swipes and mostly vertical ones
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) {
      showItem((currentIndex + 1) % currentGroup.length);
    } else {
      showItem((currentIndex - 1 + currentGroup.length) % currentGroup.length);
    }
  }, { passive: true });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    lightboxContent.innerHTML = '';
  });
});

window.addEventListener('load', () => {
  document.querySelector('.gallery-container').scrollTo({ top: 0, behavior: 'instant' });
});