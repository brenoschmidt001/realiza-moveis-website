(function () {
  // Inserir aqui o link oficial da loja quando estiver disponível.
  var MERCADO_LIVRE_URL = '';
  var WA = '5561981863221';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Produtos (dados do site original)
  var products = [
    {"slug": "guarda-roupa-branco-6", "code": "PM0003", "cat": "guarda-roupas", "catName": "Guarda-roupas", "title": "Guarda-roupa branco de 6 portas com espelhos", "short": "Acabamento branco brilhante, seis gavetas, cabideiros e prateleiras.", "desc": "Acabamento branco brilhante, seis gavetas, cabideiros e prateleiras.", "img": "assets/guarda-roupa-branco-6-1.jpg", "images": ["assets/guarda-roupa-branco-6-1.jpg", "assets/guarda-roupa-branco-6-2.jpg"]},
    {"slug": "guarda-roupa-amadeirado-6", "code": "PM0015", "cat": "guarda-roupas", "catName": "Guarda-roupas", "title": "Guarda-roupa amadeirado de 6 portas com espelhos", "short": "Acabamento amadeirado, puxadores alongados e espelhos centrais.", "desc": "Acabamento amadeirado, puxadores alongados e espelhos centrais.", "img": "assets/guarda-roupa-amadeirado-6-1.jpg", "images": ["assets/guarda-roupa-amadeirado-6-1.jpg"]},
    {"slug": "guarda-roupa-branco-correr", "code": "PM0002", "cat": "guarda-roupas", "catName": "Guarda-roupas", "title": "Guarda-roupa branco de 3 portas de correr com espelho", "short": "Acabamento branco brilhante, prateleiras, gavetas e cabideiro.", "desc": "Acabamento branco brilhante, prateleiras, gavetas e cabideiro.", "img": "assets/guarda-roupa-branco-correr-1.jpg", "images": ["assets/guarda-roupa-branco-correr-1.jpg", "assets/guarda-roupa-branco-correr-2.jpg", "assets/guarda-roupa-branco-correr-3.jpg"]},
    {"slug": "guarda-roupa-amadeirado-correr", "code": "PM0016", "cat": "guarda-roupas", "catName": "Guarda-roupas", "title": "Guarda-roupa amadeirado de 3 portas de correr com espelho", "short": "Portas claras, acabamento amadeirado, gavetas, prateleiras e cabideiro.", "desc": "Portas claras, acabamento amadeirado, gavetas, prateleiras e cabideiro.", "img": "assets/guarda-roupa-amadeirado-correr-1.jpg", "images": ["assets/guarda-roupa-amadeirado-correr-1.jpg", "assets/guarda-roupa-amadeirado-correr-2.jpg", "assets/guarda-roupa-amadeirado-correr-3.jpg"]},
    {slug: 'cozinha-armario-fechado', code: 'PM0001', cat: 'cozinha', catName: 'Cozinha',
      title: 'Armário de cozinha multifuncional com acabamento ripado', short: 'Acabamento amadeirado e grafite, portas ripadas, nichos e gaveta.', desc: 'Armário de cozinha multifuncional com acabamento amadeirado e grafite, portas ripadas, nichos abertos, gaveta e compartimentos para organização.', img: 'assets/cozinha-armario-fechado.jpg'},
    {slug: 'cozinha-armario-aberto', code: 'PM0004', cat: 'cozinha', catName: 'Cozinha',
      title: 'Armário multifuncional — compartimentos internos', short: 'Veja as prateleiras e os espaços de armazenamento do armário.', desc: 'Vista interna do armário multifuncional com portas abertas, prateleiras, nichos e compartimentos inferiores.', img: 'assets/cozinha-armario-aberto.jpg'},
    {slug: 'mesa-redonda', code: 'PM0005', cat: 'mesas-cadeiras', catName: 'Mesas com cadeiras',
      title: 'Mesa redonda de madeira com seis cadeiras', short: 'Mesa amadeirada com cadeiras de palhinha e assentos verdes.', desc: 'Conjunto de mesa redonda amadeirada e seis cadeiras com encosto em palhinha e assentos estofados em verde.', img: 'assets/mesa-redonda.jpg'},
    {slug: 'mesa-branca', code: 'PM0006', cat: 'mesas-cadeiras', catName: 'Mesas com cadeiras',
      title: 'Mesa branca com cadeiras estofadas', short: 'Tampo branco e cadeiras cinza com pés amadeirados.', desc: 'Conjunto com mesa de tampo branco, base amadeirada e cadeiras estofadas em tecido cinza.', img: 'assets/mesa-branca.jpg'},
    {slug: 'mesa-vidro-4', code: 'PM0007', cat: 'mesas-cadeiras', catName: 'Mesas com cadeiras',
      title: 'Mesa de vidro com quatro cadeiras', short: 'Tampo de vidro e cadeiras com assentos marrons.', desc: 'Mesa de jantar com tampo de vidro e quatro cadeiras de madeira com assentos estofados marrons.', img: 'assets/mesa-vidro-4.jpg'},
    {slug: 'mesa-vidro-estofadas', code: 'PM0008', cat: 'mesas-cadeiras', catName: 'Mesas com cadeiras',
      title: 'Mesa de jantar com tampo de vidro e base amadeirada ripada', short: 'Tampo de vidro, base ripada e cadeiras estofadas.', desc: 'Mesa de jantar com tampo de vidro, base amadeirada ripada e cadeiras estofadas.', img: 'assets/mesa-ripada-nova-1.jpg', images: ['assets/mesa-ripada-nova-1.jpg', 'assets/mesa-ripada-nova-2.jpg', 'assets/mesa-ripada-nova-3.jpg']},
    {slug: 'sofa-bege-1', code: 'PM0009', cat: 'sofas', catName: 'Sofás',
      title: 'Sofá retrátil bege com assentos amplos', short: 'Encostos acolchoados e acabamento bege.', desc: 'Sofá retrátil em tecido bege, com assentos amplos, encostos acolchoados e linhas modernas.', img: 'assets/sofa-bege-1.jpg'},
    {slug: 'sofa-bege-2', code: 'PM0010', cat: 'sofas', catName: 'Sofás',
      title: 'Sofá retrátil bege com encostos acolchoados', short: 'Assentos amplos e almofadas de apoio.', desc: 'Sofá bege com assentos extensíveis, encostos acolchoados e almofadas de apoio.', img: 'assets/sofa-bege-2.jpg'},
    {"slug": "sofa-cinza-chaise", "code": "PM0017", "cat": "sofas", "catName": "Sofás", "title": "Sofá cinza-claro com chaise e almofadas decorativas", "short": "Assentos amplos, almofadas decorativas e design moderno.", "desc": "Sofá cinza-claro com chaise, almofadas decorativas e design moderno. Confira os detalhes do assento e do acabamento traseiro.", "img": "assets/sofa-cinza-chaise-1.jpg", "images": ["assets/sofa-cinza-chaise-1.jpg", "assets/sofa-cinza-chaise-2.jpg", "assets/sofa-cinza-chaise-3.jpg"]},
    {slug: 'colchao-naturart', code: 'PM0011', cat: 'colchoes', catName: 'Colchões',
      title: 'Colchão MinasPuma Naturart com base estofada', short: 'Superfície acolchoada e acabamento em tons claros.', desc: 'Colchão MinasPuma Naturart com acabamento matelassado e base estofada em tom claro.', img: 'assets/colchao-naturart.jpg'},
    {slug: 'colchao-detalhe', code: 'PM0012', cat: 'colchoes', catName: 'Colchões',
      title: 'Detalhe do acabamento do colchão', short: 'Vista próxima do tecido acolchoado e costuras.', desc: 'Detalhe do tecido, costuras e superfície acolchoada do colchão.', img: 'assets/colchao-detalhe.jpg'},
    {slug: 'colchao-molas-base', code: 'PM0013', cat: 'colchoes', catName: 'Colchões',
      title: 'Colchão de molas ensacadas com base', short: 'Colchão com superfície estampada e base estofada.', desc: 'Conjunto de colchão de molas ensacadas com acabamento lateral matelassado e base estofada.', img: 'assets/colchao-molas-base.jpg'},
    {slug: 'colchao-molas-duas-vistas', code: 'PM0014', cat: 'colchoes', catName: 'Colchões',
      title: 'Colchão de molas ensacadas — duas vistas', short: 'Duas perspectivas do colchão e sua base.', desc: 'Imagem mostrando duas perspectivas de colchão de molas ensacadas, incluindo o conjunto com base.', img: 'assets/colchao-molas-duas-vistas.jpg'}
  ];

  function waLink(text) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(text); }
  function productMsg(p, name) {
    var link = location.origin + location.pathname + '#produto-' + p.slug;
    return (name ? 'Olá! Meu nome é ' + name + '. ' : 'Olá! ') +
      'Tenho interesse no produto ' + p.title + ' (código ' + p.code + '). Link: ' + link +
      '\nPoderia informar o preço e a disponibilidade?';
  }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function mercadoLivreButton() {
    var label = 'Ver nossa loja no Mercado Livre';
    return MERCADO_LIVRE_URL ? '<a class="btn btn-ml" href="' + esc(MERCADO_LIVRE_URL) + '" target="_blank" rel="noopener noreferrer">' + label + '</a>' : '<button class="btn btn-ml" type="button" disabled title="Link da loja em breve">' + label + '</button>';
  }

  // Grade de produtos
  var grid = document.getElementById('productGrid');
  grid.innerHTML = products.map(function (p, i) {
    return '<article class="card tilt reveal" data-cat="' + p.cat + '" data-i="' + i + '">' +
      '<div class="card-media" data-open="' + i + '"><img src="' + p.img + '" alt="' + esc(p.title) + '" loading="eager"></div>' +
      '<div class="card-body"><p class="card-cat">' + p.catName + '</p><h3>' + esc(p.title) + '</h3>' +
      '<p class="card-desc">' + esc(p.short) + '</p><div class="card-purchase"><p class="card-price">Consulte os valores</p>' + mercadoLivreButton() + '</div>' +
      '<div class="card-actions"><button class="btn btn-ghost" type="button" data-open="' + i + '">Ver detalhes</button>' +
      '<a class="btn btn-wa" target="_blank" rel="noopener" href="' + waLink(productMsg(p)) + '">Consultar preço</a></div></div></article>';
  }).join('');

  // Filtros
  var countEl = document.getElementById('productCount');
  var emptyEl = document.getElementById('emptyProducts');
  var prevEl = document.getElementById('productsPrev');
  var nextEl = document.getElementById('productsNext');
  function updateArrows() {
    var max = grid.scrollWidth - grid.clientWidth;
    prevEl.disabled = grid.scrollLeft < 8 || max < 8;
    nextEl.disabled = grid.scrollLeft >= max - 8 || max < 8;
  }
  function slideProducts(dir) { grid.scrollBy({left: dir * (grid.querySelector('.card')?.getBoundingClientRect().width || 380) + dir * 24, behavior:'smooth'}); }
  prevEl.addEventListener('click', function(){ slideProducts(-1); });
  nextEl.addEventListener('click', function(){ slideProducts(1); });
  grid.addEventListener('scroll', updateArrows, {passive:true});
  grid.addEventListener('keydown', function(e){ if(e.key === 'ArrowRight' || e.key === 'ArrowLeft'){e.preventDefault();slideProducts(e.key === 'ArrowRight' ? 1 : -1);} });
  window.addEventListener('resize', updateArrows);
  var dragX = 0, dragScroll = 0, dragging = false, moved = false;
  grid.addEventListener('pointerdown', function(e){ if(e.pointerType !== 'mouse' || e.button !== 0 || e.target.closest('a,button')) return; dragging=true; moved=false; dragX=e.clientX; dragScroll=grid.scrollLeft; });
  window.addEventListener('pointermove', function(e){ if(!dragging)return; if(Math.abs(e.clientX-dragX)>5)moved=true; if(moved)grid.scrollLeft=dragScroll-(e.clientX-dragX); });
  window.addEventListener('pointerup', function(){dragging=false;});
  grid.addEventListener('click', function(e){if(moved){e.preventDefault();e.stopImmediatePropagation();moved=false;}}, true);
  function applyFilter(f) {
    var n = 0;
    grid.querySelectorAll('.card').forEach(function (c) {
      var show = f === 'todos' || c.dataset.cat === f;
      c.classList.toggle('is-hidden', !show);
      if (show) n++;
    });
    document.querySelectorAll('.filter').forEach(function (b) {
      var on = b.dataset.filter === f;
      b.classList.toggle('is-on', on); b.setAttribute('aria-selected', String(on));
    });
    countEl.textContent = n + (n === 1 ? ' produto encontrado' : ' produtos encontrados');
    emptyEl.hidden = n !== 0;
    grid.scrollLeft = 0;
    requestAnimationFrame(updateArrows);
  }
  document.querySelectorAll('.filter').forEach(function (b) { b.addEventListener('click', function () { applyFilter(b.dataset.filter); }); });
  document.querySelectorAll('.cat[data-filter]').forEach(function (a) { a.addEventListener('click', function () { applyFilter(a.dataset.filter); }); });
  applyFilter('todos');

  // Modal de produto
  var modal = document.getElementById('productModal');
  var mName = document.getElementById('mName');
  var current = null;
  function openProduct(p) {
    current = p;
    var photos = p.images || [p.img];
    var track = document.getElementById('mTrack');
    track.innerHTML = photos.map(function(src, i){return '<img src="'+src+'" alt="'+esc(p.title)+' — foto '+(i+1)+'" draggable="false">';}).join('');
    document.getElementById('mGalleryNav').hidden = photos.length < 2;
    track.scrollLeft = 0;
    requestAnimationFrame(function(){track.scrollLeft=0; updatePhotoCount();});
    document.getElementById('mCrumb').textContent = 'Produtos › ' + p.catName;
    document.getElementById('mCode').textContent = 'Código ' + p.code;
    document.getElementById('mTitle').textContent = p.title;
    document.getElementById('mDesc').textContent = p.desc;
    updateWa();
    if (modal.showModal) modal.showModal(); else modal.setAttribute('open', '');
    history.replaceState(null, '', '#produto-' + p.slug);
  }
  var photoTrack = document.getElementById('mTrack');
  function updatePhotoCount(){var n=photoTrack.children.length; var i=Math.round(photoTrack.scrollLeft/(photoTrack.clientWidth||1)); document.getElementById('mPhotoCount').textContent=(Math.min(i+1,n))+' / '+n;}
  photoTrack.addEventListener('scroll',updatePhotoCount,{passive:true});
  document.getElementById('mPhotoPrev').addEventListener('click',function(){photoTrack.scrollBy({left:-photoTrack.clientWidth,behavior:'smooth'});});
  document.getElementById('mPhotoNext').addEventListener('click',function(){photoTrack.scrollBy({left:photoTrack.clientWidth,behavior:'smooth'});});
  var photoX=0, photoStart=0, photoDragging=false;
  photoTrack.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||e.button!==0)return;photoDragging=true;photoX=e.clientX;photoStart=photoTrack.scrollLeft;photoTrack.setPointerCapture(e.pointerId);photoTrack.classList.add('dragging');});
  photoTrack.addEventListener('pointermove',function(e){if(photoDragging)photoTrack.scrollLeft=photoStart+photoX-e.clientX;});
  function finishPhotoDrag(){if(!photoDragging)return;photoDragging=false;photoTrack.classList.remove('dragging');photoTrack.scrollTo({left:Math.round(photoTrack.scrollLeft/(photoTrack.clientWidth||1))*photoTrack.clientWidth,behavior:'smooth'});}
  photoTrack.addEventListener('pointerup',finishPhotoDrag);photoTrack.addEventListener('pointercancel',finishPhotoDrag);
  function updateWa() { if (current) document.getElementById('mWa').href = waLink(productMsg(current, mName.value.trim())); }
  function closeModal() { modal.close ? modal.close() : modal.removeAttribute('open'); }
  mName.addEventListener('input', updateWa);
  grid.addEventListener('click', function (e) {
    var t = e.target.closest('[data-open]');
    if (t) openProduct(products[+t.dataset.open]);
  });
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.querySelector('[data-close]').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  modal.addEventListener('close', function () { if (/^#produto-/.test(location.hash)) history.replaceState(null, '', location.pathname); });
  var deep = location.hash.match(/^#produto-(.+)$/);
  if (deep) { var hit = products.filter(function (p) { return p.slug === deep[1]; })[0]; if (hit) openProduct(hit); }

  // Cabeçalho e menu
  var top = document.getElementById('top');
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');
  function onScroll() { top.classList.toggle('scrolled', window.scrollY > 20); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  burger.addEventListener('click', function () {
    var open = burger.getAttribute('aria-expanded') !== 'true';
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('open', open); top.classList.toggle('menu-open', open);
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a') && burger.getAttribute('aria-expanded') === 'true') burger.click();
  });

  // Revelação ao rolar
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      var sibs = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.transitionDelay = Math.min(sibs, 5) * 80 + 'ms';
      el.classList.add('in');
      setTimeout(function () { el.style.transitionDelay = ''; }, 1200);
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Vídeos dos ambientes: alternância de dois arquivos sem interrupção.
  // Os demais vídeos continuam em loop individual.
  var videos = Array.prototype.slice.call(document.querySelectorAll('video[data-autoplay]'));
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var v = entry.target;
      v.dataset.inView = entry.isIntersecting ? 'true' : 'false';
      if (entry.isIntersecting) resumeVideo(v);
      else v.pause();
    });
  }, { threshold: 0.05 });
  function resumeVideo(v) {
    if (document.hidden || v.dataset.inView !== 'true' || reduced) return;
    v.muted = true;
    var attempt = v.play();
    if (attempt && attempt.catch) attempt.catch(function () {});
  }
  function resumeVisibleVideos() {
    if (document.hidden) return;
    videos.forEach(function (v) {
      var rect = v.getBoundingClientRect();
      var visible = rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth;
      v.dataset.inView = visible ? 'true' : 'false';
      if (visible) resumeVideo(v);
      else v.pause();
    });
  }
  videos.forEach(function (v) {
    v.autoplay = true;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    var second = v.getAttribute('data-playlist');
    if (second) {
      var first = v.getAttribute('src');
      var sequence = [first, second];
      var index = 0;
      v.loop = false;
      v.removeAttribute('loop');
      v.addEventListener('ended', function () {
        index = (index + 1) % sequence.length;
        v.src = sequence[index];
        v.load();
        resumeVideo(v);
      });
      v.addEventListener('error', function () {
        // Evita travar em um arquivo indisponível.
        if (index === 1) {
          index = 0;
          v.src = first;
          v.load();
          resumeVideo(v);
        }
      });
    } else {
      v.loop = true;
      v.addEventListener('ended', function () { v.currentTime = 0; resumeVideo(v); });
    }
    v.addEventListener('canplay', function () { resumeVideo(v); });
    observer.observe(v);
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) videos.forEach(function (v) { v.pause(); });
    else resumeVisibleVideos();
  });
  window.addEventListener('pageshow', resumeVisibleVideos);
  window.addEventListener('focus', resumeVisibleVideos);
  window.addEventListener('resize', resumeVisibleVideos);
  resumeVisibleVideos();

  if (reduced) return;

  // Inclinação 3D nos cartões
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fine) {
    document.addEventListener('pointermove', function (e) {
      var el = e.target.closest && e.target.closest('.tilt');
      if (!el) return;
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = 'perspective(900px) rotateX(' + (-y * 7) + 'deg) rotateY(' + (x * 9) + 'deg) translateZ(6px)';
    });
    document.querySelectorAll('.tilt').forEach(function (el) {
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  // Parallax suave na galeria
  var px = document.querySelectorAll('.parallax');
  var ticking = false;
  function parallax() {
    ticking = false;
    var vh = window.innerHeight;
    px.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var off = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.speed);
      el.querySelector('img').style.transform = 'translateY(' + off.toFixed(1) + 'px) scale(1.12)';
    });
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(parallax); } }, { passive: true });
  parallax();
})();

// Formulário de contato → WhatsApp (o site é estático, sem servidor)
(function () {
  var form = document.getElementById('contactForm');
  var msg = document.getElementById('formMsg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var nome = (d.get('nome') || '').trim(), tel = (d.get('telefone') || '').trim(),
        email = (d.get('email') || '').trim(), texto = (d.get('mensagem') || '').trim();
    if (!nome || !tel || !texto) { msg.textContent = 'Preencha nome, telefone e mensagem.'; return; }
    var body = 'Olá! Meu nome é ' + nome + '.\nTelefone: ' + tel + (email ? '\nE-mail: ' + email : '') + '\n\n' + texto;
    window.open('https://wa.me/5561981863221?text=' + encodeURIComponent(body), '_blank', 'noopener');
    msg.textContent = 'Abrimos o WhatsApp com sua mensagem. É só tocar em enviar.';
    form.reset();
  });
})();
