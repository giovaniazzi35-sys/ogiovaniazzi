/* =====================================================================
   Azzi Assessoria MKT — configuração e comportamento
   ---------------------------------------------------------------------
   ► TUDO O QUE VOCÊ PRECISA EDITAR ESTÁ NESTE BLOCO DE CONFIG ◄
   ===================================================================== */

/* -------- CONTATOS (edite os links) -------- */
const CONTATO = {
  // 55 (Brasil) + 11 (DDD) + número
  whatsapp:  'https://wa.me/5511970799985',
  instagram: 'https://instagram.com/giovaniazzi1',
  email:     ''                                           // ► preencha para exibir o link de e-mail no rodapé
};

/* Mensagem padrão ao abrir o WhatsApp (deixe '' para abrir vazio) */
const WHATSAPP_MSG = 'Olá! Vi seu portfólio e gostaria de falar sobre um projeto.';

/* -------- MENSAGENS RÁPIDAS do botão flutuante --------
   Aparecem acima do botão do WhatsApp. Edite, adicione ou remova à vontade.
   'id' é opcional: serve para um botão da página abrir direto essa mensagem
   (ex.: <a class="js-wa" data-msg="orcamento">). */
const WHATSAPP_ACOES = [
  { id: 'orcamento', icone: '💰', label: 'Solicitar orçamento',
    msg: 'Olá! Gostaria de solicitar um orçamento para um vídeo.' },
  { id: 'contratar', icone: '🎬', label: 'Quero contratar um serviço',
    msg: 'Olá! Quero contratar seu serviço de produção de vídeo. Podemos conversar?' },
  { id: 'data',      icone: '📅', label: 'Consultar uma data',
    msg: 'Olá! Gostaria de saber sua disponibilidade para uma data específica.' },
  { id: 'duvida',    icone: '💬', label: 'Tirar uma dúvida',
    msg: 'Olá! Tenho uma dúvida sobre o seu trabalho.' }
];

/* -------- CATEGORIAS (edite / adicione / remova livremente) -------- */
const CATEGORIAS = ['Todos', 'Filmes', 'Eventos', 'Marcas', 'Conteúdo'];

/* -------- DEPOIMENTOS DE CLIENTES --------
   Preencha com o texto REAL de cada cliente. Só aparece na página quem tiver 'texto'.
   Se nenhum estiver preenchido, a seção inteira fica escondida. */
const DEPOIMENTOS = [
  { nome: '', empresa: '', texto: '' },   // ► cliente 1
  { nome: '', empresa: '', texto: '' },   // ► cliente 2
  { nome: '', empresa: '', texto: '' }    // ► cliente 3
];

/* -------- CASES NA PRIMEIRA TELA (3 celulares: esquerda, centro, direita) --------
   Use o 'src' de vídeos já listados em VIDEOS abaixo. */
const HERO_CASES = ['videos/papilon.mp4', 'videos/vivian.mp4', 'videos/projeto-004.mp4'];
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
    src: 'videos/projeto-002.mp4',
    poster: 'videos/projeto-002.jpg',
    title: '',
    category: 'Marcas',
    desc: '',
    featured: true,
    order: 1
  },
  {
    type: 'file',
    src: 'videos/projeto-003.mp4',
    poster: 'videos/projeto-003.jpg',
    title: '',
    category: 'Eventos',
    desc: '',
    featured: false,
    order: 2
  },
  {
    type: 'file',
    src: 'videos/vivian.mp4',
    poster: 'videos/vivian.jpg',
    title: '',
    category: 'Filmes',              // ► edite
    desc: '',
    featured: true,
    order: 3
  },
  {
    type: 'file',
    src: 'videos/projeto-004.mp4',
    poster: 'videos/projeto-004.jpg',
    title: '',
    category: 'Conteúdo',
    desc: '',
    featured: false,
    order: 4
  },
  {
    type: 'file',
    src: 'videos/projeto-005.mp4',
    poster: 'videos/projeto-005.jpg',
    title: '',
    category: 'Conteúdo',
    desc: '',
    featured: false,
    order: 5
  },
  {
    type: 'file',
    src: 'videos/papilon.mp4',
    poster: 'videos/papilon.jpg',
    title: '',
    category: 'Marcas',
    desc: '',
    featured: false,
    order: 6
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

  el.loop = true;             // loop infinito
  let onScreen = true;
  const tryPlay = () => { if (onScreen && !document.hidden) el.play().catch(() => {}); };

  // play() logo após definir o src é abortado pelo carregamento — tentamos de novo quando dá
  el.addEventListener('canplay', tryPlay, { once: true });
  el.addEventListener('loadeddata', tryPlay, { once: true });
  tryPlay();

  // rede de segurança: se por algum motivo o loop nativo falhar, reinicia na mão
  el.addEventListener('ended', () => { el.currentTime = 0; tryPlay(); });
  // o navegador pausa vídeos em abas em segundo plano — retomamos ao voltar
  document.addEventListener('visibilitychange', () => { if (!document.hidden) tryPlay(); });
  // último recurso: retomar na primeira interação do visitante
  document.addEventListener('pointerdown', tryPlay, { once: true });

  // economiza CPU/bateria enquanto o hero está fora da tela
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen) tryPlay(); else el.pause();
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
  img.alt = v.category || 'Case em vídeo';
  img.loading = 'lazy';
  media.appendChild(img);

  card.innerHTML = `
    <div class="card__grad"></div>
    <div class="card__play">${IC.play}</div>
    <div class="card__info">
      <div class="card__cat">${v.category || ''}</div>
      ${v.title ? `<div class="card__title">${v.title}</div>` : ''}
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
    .filter(v => !HERO_CASES.includes(v.src))          // quem já aparece na primeira tela não se repete
    .filter(v => filter === 'Todos' || v.category === filter)
    .forEach((v, i) => {
      const card = makeCard(v);
      card.classList.add('reveal');
      card.dataset.delay = i * 90;      // entram em cascata
      grid.appendChild(card);
    });
}

/* ============================ FILTROS ============================ */
const filtersEl = document.getElementById('filters');
if (filtersEl) CATEGORIAS.forEach((cat, i) => {
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
  if (!featuredList) return;
  ordered().filter(v => v.featured).forEach(v => {
    const item = document.createElement('div');
    item.className = 'featured__item reveal';

    const frame = document.createElement('div');
    frame.className = 'featured__frame';
    frame.tabIndex = 0;

    const img = document.createElement('img');
    img.src = posterURL(v); img.alt = v.category || 'Case em vídeo'; img.loading = 'lazy';
    frame.appendChild(img);
    frame.insertAdjacentHTML('beforeend', `<div class="card__grad"></div><div class="card__play">${IC.play}</div>`);

    attachHoverPreview(frame, frame, v);
    frame.addEventListener('click', () => openModal(v));
    frame.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(v); }
    });

    const cap = document.createElement('div');
    cap.className = 'featured__caption';
    cap.innerHTML = `<h3>${v.title || v.category || ''}</h3>${v.title && v.category ? `<span class="cat">${v.category}</span>` : ''}${v.desc ? `<p>${v.desc}</p>` : ''}`;

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
const waURL = (msg) => CONTATO.whatsapp + (msg ? '?text=' + encodeURIComponent(msg) : '');

(function initContacts() {
  const padrao = waURL(WHATSAPP_MSG);
  const set = (id, href) => { const el = document.getElementById(id); if (el) el.href = href; };

  set('ctaWhatsapp', padrao);
  set('footWhatsapp', padrao);
  set('footInstagram', CONTATO.instagram);

  // qualquer link com .js-wa vira um atalho de WhatsApp;
  // data-msg="<id>" escolhe uma das WHATSAPP_ACOES
  document.querySelectorAll('.js-wa').forEach(el => {
    const acao = WHATSAPP_ACOES.find(a => a.id === el.dataset.msg);
    el.href = waURL(acao ? acao.msg : WHATSAPP_MSG);
    el.target = '_blank';
    el.rel = 'noopener';
  });

  // sem e-mail definido, o link é removido em vez de virar um "mailto:" quebrado
  const mail = document.getElementById('footEmail');
  if (mail) {
    if (CONTATO.email) mail.href = 'mailto:' + CONTATO.email;
    else mail.remove();
  }
})();

/* ---- botão flutuante + mensagens rápidas ---- */
(function initFloatingWa() {
  const dock = document.getElementById('waDock');
  const btn  = document.getElementById('waFloat');
  const quick = document.getElementById('waQuick');
  if (!dock || !btn || !quick) return;

  // monta as mensagens rápidas
  WHATSAPP_ACOES.forEach((a, i) => {
    const link = document.createElement('a');
    link.className = 'wa-quick__item';
    link.href = waURL(a.msg);
    link.target = '_blank';
    link.rel = 'noopener';
    link.setAttribute('role', 'menuitem');
    link.style.transitionDelay = (i * 45) + 'ms';
    link.innerHTML = `<span class="wa-quick__ico" aria-hidden="true">${a.icone || '💬'}</span><span>${a.label}</span>`;
    quick.appendChild(link);
  });

  const setOpen = (open) => {
    dock.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open);
  };
  btn.addEventListener('click', (e) => { e.stopPropagation(); setOpen(!dock.classList.contains('is-open')); });
  document.addEventListener('click', (e) => { if (!dock.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  quick.addEventListener('click', () => setOpen(false));

  // sempre visível, desde o topo da página
  dock.classList.add('is-visible');
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

/* ============================ ANIMAÇÕES ============================ */
const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* reveal ao rolar — respeita data-delay para escalonar */
let io;
function observeReveals() {
  if (!io) {
    io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const d = en.target.dataset.delay;
        if (d) en.target.style.transitionDelay = d + 'ms';
        en.target.classList.add('is-visible');
        io.unobserve(en.target);
      });
    }, { threshold: 0.14 });
  }
  document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => io.observe(el));
}

/* títulos que entram palavra a palavra */
(function splitTitles() {
  if (semAnimacao) return;
  document.querySelectorAll('[data-split]').forEach(el => {
    const palavras = el.textContent.trim().split(/\s+/);
    el.innerHTML = palavras
      .map((p, i) => `<span class="word"><span style="transition-delay:${i * 70}ms">${p}</span></span>`)
      .join(' ');
    el.classList.add('split');
    new IntersectionObserver(([e], obs) => {
      if (e.isIntersecting) { el.classList.add('is-in'); obs.disconnect(); }
    }, { threshold: 0.3 }).observe(el);
  });
})();

/* parallax discreto no vídeo do hero */
(function heroParallax() {
  if (semAnimacao) return;
  const bg = document.querySelector('.hero__bg');
  const content = document.querySelector('.hero__content');
  if (!bg) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        bg.style.transform = `translate3d(0, ${y * 0.28}px, 0) scale(1.06)`;
        if (content) {
          content.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
          content.style.opacity = Math.max(0, 1 - y / (window.innerHeight * 0.75));
        }
      }
      ticking = false;
    });
  }, { passive: true });
})();

/* barra fina de progresso de leitura */
(function scrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'progress';
  document.body.appendChild(bar);
  const upd = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  window.addEventListener('scroll', upd, { passive: true });
  window.addEventListener('resize', upd);
  upd();
})();

/* ============================ HERO: CASES EM CELULARES ============================ */
(function initHeroCases() {
  const stage = document.getElementById('heroStage');
  if (!stage) return;
  const pos = ['l', 'c', 'r'];
  HERO_CASES.slice(0, 3).forEach((src, i) => {
    const v = VIDEOS.find(x => x.src === src);
    if (!v) return;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'hphone hphone--' + pos[i];
    b.setAttribute('aria-label', 'Assistir case' + (v.category ? ' de ' + v.category : ''));
    b.innerHTML = `<video muted loop playsinline preload="metadata" poster="${posterURL(v)}"></video><span class="hphone__tag">${v.title || v.category || ""}</span>`;
    const vid = b.querySelector('video');
    vid.muted = true;
    vid.src = enc(v.src);
    let onScreen = true;
    const play = () => { if (onScreen && !document.hidden) vid.play().catch(() => {}); };
    vid.addEventListener('canplay', play, { once: true });
    document.addEventListener('visibilitychange', play);
    document.addEventListener('pointerdown', play, { once: true });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; if (onScreen) play(); else vid.pause(); }, { threshold: 0.1 }).observe(b);
    }
    b.addEventListener('click', () => openModal(v));
    stage.appendChild(b);
  });
})();

/* ============================ DEPOIMENTOS ============================ */
(function renderQuotes() {
  const sec = document.getElementById('clientes');
  const list = document.getElementById('quotes');
  if (!sec || !list) return;
  const itens = DEPOIMENTOS.filter(d => d.texto && d.texto.trim());
  if (!itens.length) { sec.remove(); document.querySelectorAll('a[href="#clientes"]').forEach(l => l.remove()); return; }
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  list.innerHTML = itens.map((d, i) => `
    <figure class="quote reveal" data-delay="${i * 120}">
      <svg class="quote__mark" viewBox="0 0 32 24" aria-hidden="true"><path d="M0 24V14C0 6 4.5 1.3 12 0l1.4 3C9.5 4.2 7.6 6.6 7.4 10H13v14H0zm18 0V14c0-8 4.5-12.7 12-14l1.4 3c-3.9 1.2-5.8 3.6-6 7H31v14H18z"/></svg>
      <blockquote>${esc(d.texto)}</blockquote>
      <figcaption><strong>${esc(d.nome || 'Cliente')}</strong>${d.empresa ? `<span>${esc(d.empresa)}</span>` : ''}</figcaption>
    </figure>`).join('');
})();

/* contador do número em destaque */
(function countUp() {
  const el = document.querySelector('[data-count]');
  if (!el) return;
  const alvo = parseFloat(el.dataset.count);
  if (semAnimacao || !('IntersectionObserver' in window)) { el.textContent = alvo; return; }
  el.textContent = '0';
  new IntersectionObserver(([e], obs) => {
    if (!e.isIntersecting) return;
    obs.disconnect();
    const t0 = performance.now(), dur = 1800;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(alvo * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, { threshold: 0.5 }).observe(el);
})();

/* ============================ INIT ============================ */
document.getElementById('year').textContent = new Date().getFullYear();
renderGrid('Todos');
renderFeatured();
observeReveals();


/* ============================ INTRO (motion) ============================ */
(function intro() {
  const el = document.getElementById('intro');
  const go = () => document.documentElement.classList.add('hero-go');
  if (!el) { go(); return; }
  if (document.documentElement.classList.contains('no-intro') || semAnimacao) { el.remove(); go(); return; }
  document.body.style.overflow = 'hidden';
  let done = false;
  const end = () => {
    if (done) return; done = true;
    document.body.style.overflow = '';
    go();
    try { sessionStorage.setItem('intro', '1'); } catch (e) {}
    setTimeout(() => el.remove(), 1200);
  };
  setTimeout(end, 7400);
  const skip = document.getElementById('introSkip');
  if (skip) skip.addEventListener('click', () => {
    el.style.animation = 'introOut .7s cubic-bezier(.77,0,.18,1) forwards';
    end();
  });
})();
