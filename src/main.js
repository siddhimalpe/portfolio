// 1. Stop browser from remembering old scroll position on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const aboutRow = document.querySelector('#row-about');
const workRow = document.querySelector('#row-work');
const contactRow = document.querySelector('#row-contact');

if (aboutRow && workRow && contactRow) {

  function setExpanded(row, expanded) {
    row.classList.toggle('is-active', expanded);
    row.setAttribute('aria-expanded', String(expanded));
  }

  // ABOUT click
  aboutRow.addEventListener('click', () => {
    setExpanded(workRow, false);
    setExpanded(contactRow, false);
    setExpanded(aboutRow, !aboutRow.classList.contains('is-active'));
  });

  // WORK click
  workRow.addEventListener('click', (event) => {
    if (event.target.closest('.work-card')) return;
    setExpanded(aboutRow, false);
    setExpanded(contactRow, false);
    setExpanded(workRow, !workRow.classList.contains('is-active'));
  });

  // CONTACT click
  contactRow.addEventListener('click', (event) => {
    if (event.target.closest('a')) return;
    setExpanded(aboutRow, false);
    setExpanded(workRow, false);
    setExpanded(contactRow, !contactRow.classList.contains('is-active'));
  });

  function checkUrlHash() {
    if (window.location.hash === '#work') {
      setExpanded(aboutRow, false);
      setExpanded(contactRow, false);
      setExpanded(workRow, true);

      setTimeout(() => {
        workRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
        history.replaceState(null, '', window.location.pathname);
      }, 150);

    } else if (window.location.hash === '#contact') {
      setExpanded(aboutRow, false);
      setExpanded(workRow, false);
      setExpanded(contactRow, true);

      setTimeout(() => {
        contactRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
        history.replaceState(null, '', window.location.pathname);
      }, 150);

    } else {
      window.scrollTo(0, 0);
    }
  }

  checkUrlHash();
  window.addEventListener('hashchange', checkUrlHash);
}

/* ===========================================
   AUTO RICKSHAW CURSOR DRIVING PHYSICS
=========================================== */
const rickshaw = document.getElementById('auto-rickshaw-cursor');

if (rickshaw && window.matchMedia('(pointer: fine)').matches) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let autoX = mouseX;
  let autoY = mouseY;
  let prevX = mouseX;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      rickshaw.style.opacity = '1';
      isVisible = true;
    }

    // Moving right -> flip it
    // Moving left  -> keep standard (faces left)
    const deltaX = mouseX - prevX;
    if (deltaX > 2) {
      rickshaw.classList.add('facing-right');
    } else if (deltaX < -2) {
      rickshaw.classList.remove('facing-right');
    }
    prevX = mouseX;
  });

  window.addEventListener('mouseleave', () => {
    rickshaw.style.opacity = '0';
    isVisible = false;
  });

  // Smooth rickshaw trailing physics
  function driveAuto() {
    autoX += (mouseX - autoX) * 0.18;
    autoY += (mouseY - autoY) * 0.18;

    rickshaw.style.left = `${autoX}px`;
    rickshaw.style.top = `${autoY}px`;

    requestAnimationFrame(driveAuto);
  }
  requestAnimationFrame(driveAuto);

  // Suspension dip on click
  window.addEventListener('mousedown', () => {
    rickshaw.classList.add('is-clicked');
  });

  window.addEventListener('mouseup', () => {
    rickshaw.classList.remove('is-clicked');
  });
}