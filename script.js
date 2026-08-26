/* =====================================================================
   ogiovaniazzi — configuração e comportamento
   ---------------------------------------------------------------------
   ► TUDO O QUE VOCÊ PRECISA EDITAR ESTÁ NESTE BLOCO DE CONFIG ◄
   ===================================================================== */

/* -------- CONTATOS (edite os links) -------- */
const CONTATO = {
  whatsapp:  'https://wa.me/5599999999999',              // ► seu número (formato internacional, sem símbolos)
  instagram: 'https://instagram.com/ogiovaniazzi',        // ► seu Instagram
  email:     'contato@ogiovaniazzi.com'                   // ► seu e-mail
};

/* -------- CATEGORIAS (edite / adicione / remova livremente) -------- */
const CATEGORIAS = ['Todos', 'Filmes', 'Eventos', 'Marcas', 'Conteúdo'];

/* -------- VÍDEO DE FUNDO DO HERO (loop, sem som) -------- */
const HERO_BG = { src: 'videos/hero.mp4', poster: 'videos/projeto-002.jpg' };

/* -------- LISTA DE VÍDEOS --------
   Campos:
     type:     'file' (MP4 local) | 'youtube' | 'vimeo'
     src:      caminho do arquivo  OU  ID do YouTube/Vimeo
     poster:   imagem de capa (gerada por build-videos.sh)
     title / category / desc
     featured: true = aparece também em "Em Destaque"
     order:    ordem de exibição (menor primeiro)

   ► Para adicionar um vídeo: coloque o original na pasta, registre-o em
     build-videos.sh, rode `bash build-videos.sh` e acrescente o bloco aqui.
--------------------------------------------------------------------- */
const VIDEOS = [
  {
    type: 'file',
    src: 'videos/vivian.mp4',
    poster: 'videos/vivian.jpg',
    title: 'Vivian',                 // ► edite
    category: 'Filmes',              // ► edite
    desc: 'Retrato em movimento.',   // ► edite
    featured: true,
    order: 1
  },
  {
    type: 'file',
    src: 'videos/projeto-002.mp4',
    poster: 'videos/projeto-002.jpg',
    title: 'Projeto 002',            // ► edite
    category: 'Marcas',
    desc: '',
    featured: true,
    order: 2
  },
  {
    type: 'file',
    src: 'videos/projeto-003.mp4',
    poster: 'videos/projeto-003.jpg',
    title: 'Projeto 003',            // ► edite
    category: 'Eventos',
    desc: '',
    featured: false,
    order: 3
  },
  {
    type: 'file',
    src: 'videos/projeto-004.mp4',
    poster: 'videos/projeto-004.jpg',
    title: 'Projeto 004',            // ► edite
    category: 'Conteúdo',
    desc: '',
    featured: false,
    order: 4
  },
  {
    type: 'file',
    src: 'videos/projeto-005.mp4',
    poster: 'videos/projeto-005.jpg',
    title: 'Projeto 005',            // ► edite
    category: 'Conteúdo',
    desc: '',
    featured: false,
    order: 5
  }
];

/* =====================================================================
   ▼▼▼  A PARTIR DAQUI É O MOTOR DO SITE — não precisa editar  ▼▼▼
   ===================================================================== */

const enc = (p) => encodeURI(p);
const byOrder = (a, b) => (a.order || 0) - (b.order || 0);
const ordered = () => VIDEOS.slice().sort(byOrder);

function embedURL(v, autoplay) {
  if (v.type === 'youtube') return `https://www.youtube.com/embed/${v.src}?rel=0&playsinline=1${autoplay ? '&autoplay=1' : ''}`;
  if (v.type === 'vimeo')   return `https://player.vimeo.com/video/${v.src}?byline=0&title=0${autoplay ? '&autoplay=1' : ''}`;
  return null;
}
function posterURL(v) {
  if (v.poster) return enc(v.poster);
  if (v.type === 'youtube') return `https://img.youtube.com/vi/${v.src}/maxresdefault.jpg`;
  return '';
}

/* ---- Ícones ---- */
const IC = {
  play:  '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>',
  replay:'<svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z"/></svg>',
  vol:   '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 2v2a8 8 0 0 1 0 16v2a10 10 0 0 0 0-20z"/></svg>',
  mute:  '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm18.6 3l2.1-2.1-1.4-1.4L20.2 10l-2.1-2.1-1.4 1.4L18.8 12l-2.1 2.1 1.4 1.4 2.1-2.1 2.1 2.1 1.4-1.4z"/></svg>',
  fs:    '<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',
  fsx:   '<svg viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>',
  prev:  '<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>',
  next:  '<svg viewBox="0 0 24 24"><path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z"/></svg>'
};

const fmtTime = (s) => {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60), r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, '0')}`;
};

/* =====================================================================
   PLAYER CINEMATOGRÁFICO — controles próprios
   ===================================================================== */
function createPlayer(video) {
  const wrap = document.createElement('div');
  wrap.className = 'vp';
  wrap.tabIndex = 0;

  const vid = document.createElement('video');
  vid.className = 'vp__video';
  vid.src = enc(video.src);
  vid.poster = posterURL(video);
  vid.playsInline = true;
  vid.preload = 'auto';
  vid.volume = getSavedVolume();

  wrap.innerHTML = `
    <div class="vp__spinner" hidden></div>
    <button class="vp__bigplay" aria-label="Reproduzir">${IC.play}</button>
    <div class="vp__controls">
      <div class="vp__track" role="slider" tabindex="0" aria-label="Progresso"
           aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
        <div class="vp__buffer"></div>
        <div class="vp__played"></div>
        <div class="vp__knob"></div>
      </div>
      <div class="vp__row">
        <button class="vp__btn js-play" aria-label="Reproduzir">${IC.play}</button>
        <div class="vp__volwrap">
          <button class="vp__btn js-mute" aria-label="Silenciar">${IC.vol}</button>
          <input class="vp__vol" type="range" min="0" max="1" step="0.02" aria-label="Volume">
        </div>
        <span class="vp__time">0:00 / 0:00</span>
        <span class="vp__spacer"></span>
        <button class="vp__btn js-fs" aria-label="Tela cheia">${IC.fs}</button>
      </div>
    </div>`;
  wrap.prepend(vid);

  const $ = (s) => wrap.querySelector(s);
  const spinner = $('.vp__spinner');
  const bigplay = $('.vp__bigplay');
  const btnPlay = $('.js-play');
  const btnMute = $('.js-mute');
  const btnFs   = $('.js-fs');
  const vol     = $('.vp__vol');
  const track   = $('.vp__track');
  const played  = $('.vp__played');
  const buffer  = $('.vp__buffer');
  const knob    = $('.vp__knob');
  const timeEl  = $('.vp__time');

  vol.value = vid.volume;

  /* ---- estado visual ---- */
  const setState = (s) => wrap.dataset.state = s;
  function syncPlayBtn() {
    const ended = vid.ended;
    const icon = ended ? IC.replay : (vid.paused ? IC.play : IC.pause);
    btnPlay.innerHTML = icon;
    bigplay.innerHTML = icon;
    const label = ended ? 'Reproduzir de novo' : (vid.paused ? 'Reproduzir' : 'Pausar');
    btnPlay.setAttribute('aria-label', label);
    bigplay.setAttribute('aria-label', label);
  }
  function syncVolBtn() {
    btnMute.innerHTML = (vid.muted || vid.volume === 0) ? IC.mute : IC.vol;
    btnMute.setAttribute('aria-label', vid.muted ? 'Ativar som' : 'Silenciar');
    vol.value = vid.muted ? 0 : vid.volume;
  }

  /* ---- play / pause ---- */
  const toggle = () => { if (vid.paused || vid.ended) vid.play().catch(() => {}); else vid.pause(); };
  btnPlay.addEventListener('click', toggle);
  bigplay.addEventListener('click', toggle);
  vid.addEventListener('click', toggle);
  vid.addEventListener('dblclick', () => toggleFs());

  vid.addEventListener('play',  () => { setState('playing'); syncPlayBtn(); hideSoon(); });
  vid.addEventListener('pause', () => { setState('paused');  syncPlayBtn(); showControls(); });
  vid.addEventListener('ended', () => { setState('ended');   syncPlayBtn(); showControls(); });

  /* ---- buffering ---- */
  vid.addEventListener('waiting',  () => spinner.hidden = false);
  vid.addEventListener('canplay',  () => spinner.hidden = true);
  vid.addEventListener('playing',  () => spinner.hidden = true);

  /* ---- progresso ---- */
  function renderProgress() {
    const d = vid.duration;
    const pct = (isFinite(d) && d > 0) ? (vid.currentTime / d) * 100 : 0;
    played.style.width = pct + '%';
    knob.style.left = pct + '%';
    track.setAttribute('aria-valuenow', Math.round(pct));
    timeEl.textContent = `${fmtTime(vid.currentTime)} / ${fmtTime(d)}`;
  }
  vid.addEventListener('timeupdate', renderProgress);
  vid.addEventListener('loadedmetadata', renderProgress);
  vid.addEventListener('progress', () => {
    const d = vid.duration;
    if (vid.buffered.length && isFinite(d) && d > 0) {
      buffer.style.width = (vid.buffered.end(vid.buffered.length - 1) / d) * 100 + '%';
    }
  });

  /* ---- scrub (arrastar a barra) ---- */
  let scrubbing = false;
  const seekFromEvent = (e) => {
    const r = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    if (isFinite(vid.duration)) { vid.currentTime = ratio * vid.duration; renderProgress(); }
  };
  track.addEventListener('pointerdown', (e) => {
    scrubbing = true; track.setPointerCapture(e.pointerId); wrap.classList.add('is-scrubbing');
    seekFromEvent(e);
  });
  track.addEventListener('pointermove', (e) => { if (scrubbing) seekFromEvent(e); });
  const endScrub = () => { scrubbing = false; wrap.classList.remove('is-scrubbing'); };
  track.addEventListener('pointerup', endScrub);
  track.addEventListener('pointercancel', endScrub);
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { vid.currentTime -= 5; e.preventDefault(); }
    if (e.key === 'ArrowRight') { vid.currentTime += 5; e.preventDefault(); }
  });

  /* ---- volume ---- */
  vol.addEventListener('input', () => {
    vid.volume = parseFloat(vol.value);
    vid.muted = vid.volume === 0;
    saveVolume(vid.volume);
    syncVolBtn();
  });
  btnMute.addEventListener('click', () => {
    vid.muted = !vid.muted;
    if (!vid.muted && vid.volume === 0) { vid.volume = 0.6; saveVolume(0.6); }
    syncVolBtn();
  });

  /* ---- fullscreen ---- */
  function toggleFs() {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (wrap.requestFullscreen) wrap.requestFullscreen();
    else if (vid.webkitEnterFullscreen) vid.webkitEnterFullscreen(); // iOS
  }
  btnFs.addEventListener('click', toggleFs);
  document.addEventListener('fullscreenchange', () => {
    const on = document.fullscreenElement === wrap;
    wrap.classList.toggle('is-fs', on);
    btnFs.innerHTML = on ? IC.fsx : IC.fs;
  });

  /* ---- auto-ocultar controles ---- */
  let hideTimer;
  function showControls() { wrap.classList.remove('is-idle'); clearTimeout(hideTimer); }
  function hideSoon() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => { if (!vid.paused && !scrubbing) wrap.classList.add('is-idle'); }, 2600);
  }
  wrap.addEventListener('pointermove', () => { showControls(); hideSoon(); });
  wrap.addEventListener('pointerleave', () => { if (!vid.paused) wrap.classList.add('is-idle'); });

  /* ---- teclado ---- */
  wrap.addEventListener('keydown', (e) => {
    if (e.target === vol || e.target === track) return;
    switch (e.key.toLowerCase()) {
      case ' ': case 'k': toggle(); break;
      case 'arrowleft':  vid.currentTime -= 5; break;
      case 'arrowright': vid.currentTime += 5; break;
      case 'j': vid.currentTime -= 10; break;
      case 'l': vid.currentTime += 10; break;
      case 'arrowup':   vid.volume = Math.min(1, vid.volume + .1); saveVolume(vid.volume); syncVolBtn(); break;
      case 'arrowdown': vid.volume = Math.max(0, vid.volume - .1); saveVolume(vid.volume); syncVolBtn(); break;
      case 'm': vid.muted = !vid.muted; syncVolBtn(); break;
      case 'f': toggleFs(); break;
      default:
        if (/^[0-9]$/.test(e.key) && isFinite(vid.duration)) vid.currentTime = vid.duration * (+e.key / 10);
        else return;
    }
    e.preventDefault();
    showControls(); hideSoon();
  });

  syncPlayBtn(); syncVolBtn(); setState('paused');

  // play() disparado logo após definir o src pode ser abortado pelo carregamento
  const play = () => {
    const go = () => vid.play().catch(() => {});
    vid.addEventListener('canplay', go, { once: true });
    go();
  };
  return { el: wrap, video: vid, play };
}

/* volume lembrado entre sessões (falha em silêncio se o storage estiver bloqueado) */
function getSavedVolume() {
  try { const v = parseFloat(localStorage.getItem('og_vol')); return isFinite(v) ? v : 0.8; }
  catch (e) { return 0.8; }
}
function saveVolume(v) { try { localStorage.setItem('og_vol', v); } catch (e) {} }

/* =====================================================================
   HERO
   ===================================================================== */
(function initHero() {
  const el = document.getElementById('heroVideo');
  if (!el) return;
  if (HERO_BG.poster) el.poster = enc(HERO_BG.poster);
  el.muted = true;            // alguns navegadores ignoram o atributo; sem isto o autoplay é bloqueado
  el.src = enc(HERO_BG.src);

  const tryPlay = () => el.play().catch(() => {});
  // play() logo após definir o src é abortado pelo carregamento — tentamos de novo quando dá
  el.addEventListener('canplay', tryPlay, { once: true });
  el.addEventListener('loadeddata', tryPlay, { once: true });
  tryPlay();
  // último recurso: retomar na primeira interação do visitante
  document.addEventListener('pointerdown', tryPlay, { once: true });

  // economiza CPU/bateria enquanto o hero está fora da tela
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) tryPlay(); else el.pause();
    }, { threshold: 0.05 }).observe(el);
  }
})();

/* =====================================================================
   PRÉVIA EM HOVER — a capa é uma imagem; o vídeo só carrega no hover
   ===================================================================== */
function attachHoverPreview(container, mediaBox, v) {
  if (v.type !== 'file') return;
  let vid = null;
  const enter = () => {
    if (window.matchMedia('(hover: none)').matches) return;   // não faz sentido no toque
    if (!vid) {
      vid = document.createElement('video');
      vid.className = 'preview';
      vid.src = enc(v.src);
      vid.muted = true; vid.loop = true; vid.playsInline = true; vid.preload = 'none';
      mediaBox.appendChild(vid);
    }
    vid.currentTime = 0;
    vid.play().then(() => vid.classList.add('is-on')).catch(() => {});
  };
  const leave = () => { if (vid) { vid.classList.remove('is-on'); vid.pause(); } };
  container.addEventListener('mouseenter', enter);
  container.addEventListener('mouseleave', leave);
}

/* =====================================================================
   GRID DE PROJETOS
   ===================================================================== */
const grid = document.getElementById('projectGrid');

function makeCard(v) {
  const card = document.createElement('article');
  card.className = 'card';
  card.tabIndex = 0;
  card.dataset.category = v.category || '';

  const media = document.createElement('div');
  media.className = 'card__media';
  const img = document.createElement('img');
  img.src = posterURL(v);
  img.alt = v.title;
  img.loading = 'lazy';
  media.appendChild(img);

  card.innerHTML = `
    <div class="card__grad"></div>
    <div class="card__play">${IC.play}</div>
    <div class="card__info">
      <div class="card__cat">${v.category || ''}</div>
      <div class="card__title">${v.title}</div>
      ${v.desc ? `<div class="card__meta">${v.desc}</div>` : ''}
    </div>`;
  card.prepend(media);

  attachHoverPreview(card, media, v);
  card.addEventListener('click', () => openModal(v));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(v); }
  });
  return card;
}

function renderGrid(filter = 'Todos') {
  grid.innerHTML = '';
  ordered()
    .filter(v => filter === 'Todos' || v.category === filter)
    .forEach(v => grid.appendChild(makeCard(v)));
}

/* ============================ FILTROS ============================ */
const filtersEl = document.getElementById('filters');
CATEGORIAS.forEach((cat, i) => {
  const b = document.createElement('button');
  b.textContent = cat;
  if (i === 0) b.classList.add('is-active');
  b.addEventListener('click', () => {
    filtersEl.querySelectorAll('button').forEach(x => x.classList.remove('is-active'));
    b.classList.add('is-active');
    renderGrid(cat);
    observeReveals();
  });
  filtersEl.appendChild(b);
});

/* ============================ EM DESTAQUE ============================ */
const featuredList = document.getElementById('featuredList');
function renderFeatured() {
  ordered().filter(v => v.featured).forEach(v => {
    const item = document.createElement('div');
    item.className = 'featured__item reveal';

    const frame = document.createElement('div');
    frame.className = 'featured__frame';
    frame.tabIndex = 0;

    const img = document.createElement('img');
    img.src = posterURL(v); img.alt = v.title; img.loading = 'lazy';
    frame.appendChild(img);
    frame.insertAdjacentHTML('beforeend', `<div class="card__grad"></div><div class="card__play">${IC.play}</div>`);

    attachHoverPreview(frame, frame, v);
    frame.addEventListener('click', () => openModal(v));
    frame.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(v); }
    });

    const cap = document.createElement('div');
    cap.className = 'featured__caption';
    cap.innerHTML = `<h3>${v.title}</h3><span class="cat">${v.category || ''}</span>${v.desc ? `<p>${v.desc}</p>` : ''}`;

    item.appendChild(frame);
    item.appendChild(cap);
    featuredList.appendChild(item);
  });
}

/* =====================================================================
   MODAL
   ===================================================================== */
const modal = document.getElementById('modal');
const modalPlayer = document.getElementById('modalPlayer');
const modalCat = document.getElementById('modalCat');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const btnPrev = document.getElementById('modalPrev');
const btnNext = document.getElementById('modalNext');

let current = null;   // player ativo
let lastFocus = null;

function openModal(v) {
  lastFocus = document.activeElement;
  modalPlayer.className = 'modal__player';
  modalPlayer.innerHTML = '';
  current = null;

  if (v.type === 'file') {
    const p = createPlayer(v);
    modalPlayer.appendChild(p.el);
    current = p;
    p.play();
    setTimeout(() => p.el.focus(), 60);
  } else {
    // YouTube/Vimeo usam o player nativo do serviço (não dá para controlar de fora)
    modalPlayer.classList.add('is-embed');
    const iframe = document.createElement('iframe');
    iframe.src = embedURL(v, true);
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    modalPlayer.appendChild(iframe);
  }

  modalCat.textContent = v.category || '';
  modalTitle.textContent = v.title || '';
  modalDesc.textContent = v.desc || '';

  // navegação entre projetos
  const list = ordered();
  const i = list.indexOf(v);
  btnPrev.disabled = i <= 0;
  btnNext.disabled = i >= list.length - 1;
  btnPrev.onclick = () => { if (i > 0) openModal(list[i - 1]); };
  btnNext.onclick = () => { if (i < list.length - 1) openModal(list[i + 1]); };
  modal.dataset.index = i;

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (current) { current.video.pause(); current.video.removeAttribute('src'); current.video.load(); }
  current = null;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  modalPlayer.innerHTML = '';
  document.body.style.overflow = '';
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}

modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('is-open')) return;
  if (e.key === 'Escape') { closeModal(); return; }
  // setas navegam entre projetos quando o foco não está no player
  const inPlayer = modalPlayer.contains(document.activeElement);
  if (!inPlayer) {
    if (e.key === 'ArrowLeft'  && !btnPrev.disabled) btnPrev.click();
    if (e.key === 'ArrowRight' && !btnNext.disabled) btnNext.click();
  }
});

/* ============================ CONTATOS ============================ */
(function initContacts() {
  const set = (id, href) => { const el = document.getElementById(id); if (el) el.href = href; };
  set('ctaWhatsapp', CONTATO.whatsapp);
  set('footInstagram', CONTATO.instagram);
  set('footWhatsapp', CONTATO.whatsapp);
  set('footEmail', 'mailto:' + CONTATO.email);
})();

/* ============================ NAV / SCROLL / MOBILE ============================ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 40);
}, { passive: true });

const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => {
  const open = navToggle.classList.toggle('is-open');
  mobileMenu.classList.toggle('is-open', open);
  navToggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

document.querySelectorAll('[data-scroll]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id && id.startsWith('#')) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
      navToggle.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    }
  });
});

/* ============================ REVEAL ON SCROLL ============================ */
let io;
function observeReveals() {
  if (!io) {
    io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.14 });
  }
  document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => io.observe(el));
}

/* ============================ INIT ============================ */
document.getElementById('year').textContent = new Date().getFullYear();
renderGrid('Todos');
renderFeatured();
observeReveals();
