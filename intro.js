/* Abertura: logo se desenha, portas deslizam e o 3D começa a montar no mesmo instante.
   window.introGate resolve quando as portas começam a abrir (scene.js espera por ela). */
(function () {
  var intro = document.getElementById('intro');
  var body = document.body;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var release;
  window.introGate = new Promise(function (r) { release = r; });

  if (!intro || reduced) { body.classList.remove('intro-active'); if (intro) intro.remove(); release(); return; }

  var opened = false;
  function open() {
    if (opened) return;
    opened = true;
    clearTimeout(timer);
    intro.classList.add('open');
    release();                                   // 3D começa a montar junto com as portas
    setTimeout(function () { body.classList.remove('intro-active'); }, 350);
    setTimeout(function () { intro.remove(); }, 1300);
  }
  // Abre quando a linha dourada termina de preencher (última animação do logo),
  // assim o tempo segue a animação real mesmo se a página demorar a pintar.
  var line = intro.querySelector('.intro-line');
  line.addEventListener('animationstart', function () { intro.classList.add('ready'); });
  line.addEventListener('animationend', function () { setTimeout(open, 180); });
  var timer = setTimeout(open, 6000);               // segurança
  intro.querySelector('.intro-skip').addEventListener('click', open);
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') open(); });
})();
