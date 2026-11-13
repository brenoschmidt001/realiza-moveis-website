/* Guarda-roupa em 3D (Three.js r128).
   Monta peça por peça ao carregar, gira com o mouse/arrasto e abre portas e gavetas. */
(function () {
  var stage = document.getElementById('stage');
  var canvas = document.getElementById('scene');
  if (!stage || !canvas) return;

  function hasWebGL() {
    try { var c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); }
    catch (e) { return false; }
  }
  if (!window.THREE || !hasWebGL()) { stage.classList.add('no-webgl'); return; }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 1.35, 6.4);

  // Ambiente para reflexos (espelho e metais): gradiente quente com "janelas" claras
  (function () {
    var c = document.createElement('canvas'); c.width = 512; c.height = 256;
    var g = c.getContext('2d');
    var grd = g.createLinearGradient(0, 0, 0, 256);
    grd.addColorStop(0, '#fffaf2'); grd.addColorStop(0.5, '#e9dfcf'); grd.addColorStop(1, '#8a6a4a');
    g.fillStyle = grd; g.fillRect(0, 0, 512, 256);
    g.fillStyle = '#ffffff';
    g.fillRect(60, 60, 70, 80); g.fillRect(300, 50, 110, 90);
    var tex = new THREE.CanvasTexture(c);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.encoding = THREE.sRGBEncoding;
    var pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromEquirectangular(tex).texture;
    tex.dispose(); pmrem.dispose();
  })();

  // Luzes
  scene.add(new THREE.HemisphereLight(0xfff6ea, 0x6b5440, 0.55));
  var key = new THREE.DirectionalLight(0xfff1de, 1.6);
  key.position.set(3.5, 5, 4.5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -3; key.shadow.camera.right = 3;
  key.shadow.camera.top = 3.5; key.shadow.camera.bottom = -1;
  key.shadow.radius = 4; key.shadow.bias = -0.0005;
  scene.add(key);
  var rim = new THREE.DirectionalLight(0xd9e4ff, 0.35);
  rim.position.set(-4, 2.5, -2);
  scene.add(rim);

  // Textura de madeira procedural
  function woodTexture(base, dark, light) {
    var c = document.createElement('canvas'); c.width = 256; c.height = 512;
    var g = c.getContext('2d');
    g.fillStyle = base; g.fillRect(0, 0, 256, 512);
    for (var i = 0; i < 90; i++) {
      var x = Math.random() * 256, w = 0.6 + Math.random() * 2.4;
      g.strokeStyle = Math.random() > 0.5 ? dark : light;
      g.globalAlpha = 0.08 + Math.random() * 0.18;
      g.lineWidth = w;
      g.beginPath(); g.moveTo(x, 0);
      for (var y = 0; y <= 512; y += 32) g.lineTo(x + Math.sin(y * 0.012 + i) * 4, y);
      g.stroke();
    }
    g.globalAlpha = 1;
    var t = new THREE.CanvasTexture(c);
    t.encoding = THREE.sRGBEncoding;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 4;
    return t;
  }

  var woodMap = woodTexture('#b07a46', '#6e4422', '#d8a774');
  var mat = {
    wood: new THREE.MeshStandardMaterial({ map: woodMap, roughness: 0.62, metalness: 0 }),
    inner: new THREE.MeshStandardMaterial({ color: 0xefe7da, roughness: 0.85 }),
    door: new THREE.MeshStandardMaterial({ color: 0x8c9b8c, roughness: 0.55 }),
    mirror: new THREE.MeshStandardMaterial({ color: 0xe6edf0, metalness: 1, roughness: 0.04, envMapIntensity: 1.2 }),
    metal: new THREE.MeshStandardMaterial({ color: 0x2b2a28, metalness: 0.8, roughness: 0.3 }),
    rod: new THREE.MeshStandardMaterial({ color: 0xc9c3b8, metalness: 0.9, roughness: 0.25 })
  };
  var finishes = {
    salvia:   { color: 0x8c9b8c, map: null },
    grafite:  { color: 0x3a3936, map: null },
    offwhite: { color: 0xece6da, map: null },
    freijo:   { color: 0xffffff, map: woodMap }
  };

  var model = new THREE.Group();
  scene.add(model);

  var parts = [];      // { mesh, home: Vector3, open: Vector3 (deslocamento quando aberto), delay }
  function add(geo, material, x, y, z, opts) {
    opts = opts || {};
    var m = new THREE.Mesh(geo, material);
    m.castShadow = true; m.receiveShadow = true;
    m.position.set(x, y, z);
    model.add(m);
    var p = { mesh: m, home: new THREE.Vector3(x, y, z), open: opts.open || new THREE.Vector3(), delay: parts.length * 0.045, spin: (Math.random() - 0.5) * 0.8 };
    parts.push(p);
    return p;
  }
  function box(w, h, d) { return new THREE.BoxGeometry(w, h, d); }

  // Dimensões (m)
  var W = 2.4, H = 2.2, D = 0.6, t = 0.03, base = 0.08;
  var xL = -W / 2, xDiv = xL + 0.9;            // módulo aberto à esquerda (0,9 m)
  var front = D / 2;

  // Caixa
  add(box(W, H, 0.012), mat.inner, 0, H / 2, -D / 2 + 0.006);
  add(box(t, H, D), mat.wood, xL + t / 2, H / 2, 0);
  add(box(t, H, D), mat.wood, W / 2 - t / 2, H / 2, 0);
  add(box(W, t, D), mat.wood, 0, H - t / 2, 0);
  add(box(W - 2 * t, t, D), mat.wood, 0, base + t / 2, 0);
  add(box(W - 0.06, base, D - 0.06), mat.metal, 0, base / 2, -0.02);
  add(box(t, H - base - 2 * t, D - 0.02), mat.wood, xDiv, (H + base) / 2, -0.01);

  // Módulo aberto: prateleiras, cabideiro, roupas e gavetas
  var openW = xDiv - xL - t * 1.5, openX = (xL + t + xDiv) / 2 - t / 4;
  add(box(openW, t, D - 0.04), mat.wood, openX, 1.92, -0.02);
  add(box(openW, t, D - 0.04), mat.wood, openX, 1.62, -0.02);
  var rod = new THREE.CylinderGeometry(0.012, 0.012, openW, 16);
  var rp = add(rod, mat.rod, openX, 1.5, 0);
  rp.mesh.rotation.z = Math.PI / 2;
  var clothes = [0x6d7f8c, 0xd8cfc0, 0x4e5b4f, 0xb88b62, 0x2f3238, 0xc9b9a3];
  for (var i = 0; i < clothes.length; i++) {
    var cm = new THREE.MeshStandardMaterial({ color: clothes[i], roughness: 0.95 });
    var h = 0.55 + (i % 3) * 0.08;
    add(box(0.035, h, 0.42), cm, openX - openW / 2 + 0.12 + i * 0.12, 1.5 - h / 2 - 0.03, 0);
  }
  add(box(openW, t, D - 0.04), mat.wood, openX, 0.82, -0.02);
  for (var d = 0; d < 3; d++) {
    var y = base + t + 0.12 + d * 0.23;
    var out = new THREE.Vector3(0, 0, 0.32 - d * 0.07);
    add(box(openW - 0.01, 0.2, 0.02), mat.wood, openX, y, front - 0.012, { open: out });
    add(box(openW - 0.06, 0.14, D - 0.08), mat.inner, openX, y - 0.01, -0.02, { open: out });
    add(box(0.22, 0.012, 0.02), mat.metal, openX, y + 0.06, front + 0.006, { open: out });
  }

  // Interior das portas de correr
  var slideX0 = xDiv + t / 2, slideW = W / 2 - t - slideX0, slideX = slideX0 + slideW / 2;
  add(box(slideW, t, D - 0.06), mat.wood, slideX, 1.75, -0.03);
  add(box(slideW, t, D - 0.06), mat.wood, slideX, 0.95, -0.03);
  var rod2 = add(new THREE.CylinderGeometry(0.012, 0.012, slideW, 16), mat.rod, slideX, 1.62, -0.02);
  rod2.mesh.rotation.z = Math.PI / 2;
  var boxes = [0xd9cbb4, 0x9aa79a, 0xe9e2d6];
  for (var b = 0; b < 3; b++) add(box(0.32, 0.18, 0.36), new THREE.MeshStandardMaterial({ color: boxes[b], roughness: 0.9 }), slideX - 0.45 + b * 0.45, 1.85, -0.04);

  // Portas de correr (2 trilhos). A do meio é espelhada.
  var doorW = slideW / 3 + 0.02, doorH = H - base - 2 * t - 0.01, doorY = base + t + doorH / 2 + 0.005;
  var d0x = slideX0 + doorW / 2 - 0.005, d1x = slideX, d2x = W / 2 - t - doorW / 2 + 0.005;
  add(box(doorW, doorH, 0.022), mat.door, d0x, doorY, front + 0.014);
  add(box(doorW, doorH, 0.022), mat.door, d2x, doorY, front + 0.014, { open: new THREE.Vector3(-(d2x - d1x) * 0.02, 0, 0) });
  var mirrorDoor = add(box(doorW, doorH, 0.022), mat.mirror, d1x, doorY, front + 0.042, { open: new THREE.Vector3(d0x - d1x, 0, 0) });
  add(box(doorW + 0.004, doorH + 0.004, 0.018), mat.metal, d1x, doorY, front + 0.034, { open: mirrorDoor.open });
  add(box(0.014, 0.5, 0.012), mat.metal, d0x + doorW / 2 - 0.05, doorY, front + 0.03);
  add(box(0.014, 0.5, 0.012), mat.metal, d2x - doorW / 2 + 0.05, doorY, front + 0.03);
  // Trilho superior
  add(box(slideW + 0.02, 0.02, 0.07), mat.metal, slideX, H - t - 0.01, front + 0.03);

  model.position.y = -1.0;

  // Cores definidas em sRGB → espaço linear (senão ficam lavadas com sRGBEncoding)
  var seen = [];
  model.traverse(function (o) {
    if (o.material && seen.indexOf(o.material) < 0) { seen.push(o.material); o.material.color.convertSRGBToLinear(); }
  });

  // Chão que recebe sombra
  var floor = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), new THREE.ShadowMaterial({ opacity: 0.18 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.0;
  floor.receiveShadow = true;
  scene.add(floor);

  // Estado de interação
  var baseYaw = -0.42, yaw = baseYaw - 1.2, targetYaw = baseYaw, dragYaw = 0;
  var pointerX = 0, pointerY = 0, dragging = false, lastX = 0, moved = false;
  var openToggle = 0, openScroll = 0, openNow = 0;
  // Só começa a montar quando a abertura abre as portas (intro.js)
  var start = Infinity;
  model.visible = false;
  (window.introGate || Promise.resolve()).then(function () {
    start = performance.now();
    model.visible = true;
  });
  var visible = true;
  var hint = stage.querySelector('.stage-hint');

  stage.addEventListener('pointermove', function (e) {
    var r = stage.getBoundingClientRect();
    pointerX = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointerY = ((e.clientY - r.top) / r.height) * 2 - 1;
    if (dragging) {
      dragYaw = Math.max(-1.0, Math.min(1.3, dragYaw + (e.clientX - lastX) * 0.006));
      lastX = e.clientX;
      if (!moved && hint) hint.classList.add('hide');
      moved = true;
    }
  });
  stage.addEventListener('pointerleave', function () { pointerX = 0; pointerY = 0; });
  canvas.addEventListener('pointerdown', function (e) { dragging = true; lastX = e.clientX; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointerup', function () { dragging = false; });
  canvas.addEventListener('pointercancel', function () { dragging = false; });

  var toggle = document.getElementById('toggleDoors');
  toggle && toggle.addEventListener('click', function () {
    openToggle = openToggle ? 0 : 1;
    toggle.setAttribute('aria-pressed', String(!!openToggle));
    toggle.textContent = openToggle ? 'Fechar portas' : 'Abrir portas';
  });

  document.querySelectorAll('.finishes button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = finishes[btn.dataset.finish];
      mat.door.map = f.map; mat.door.color.setHex(f.color).convertSRGBToLinear(); mat.door.needsUpdate = true;
      document.querySelectorAll('.finishes button').forEach(function (b) { b.setAttribute('aria-checked', String(b === btn)); });
    });
  });

  window.addEventListener('scroll', function () {
    var r = stage.getBoundingClientRect();
    // abre conforme o palco sobe na tela
    openScroll = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - r.top) / (r.height * 0.6)));
  }, { passive: true });

  new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) loop(); }).observe(stage);

  var camZ = 6.4;
  function resize() {
    var w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camZ = w / h < 0.9 ? 7.4 : 6.4;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  function easeOut(x) { return 1 - Math.pow(1 - x, 3); }
  function easeInOut(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }

  var tmp = new THREE.Vector3();
  var raf = 0;
  function loop() {
    cancelAnimationFrame(raf);
    if (!visible) return;
    raf = requestAnimationFrame(loop);
    var now = performance.now();
    var time = Math.max(0, (now - start) / 1000);
    // Câmera aproxima e desce enquanto as peças se encaixam (sincronizado com as portas da abertura)
    var cam = reduced ? 1 : easeOut(Math.min(1, time / 2.2));
    camera.position.z = camZ + (1 - cam) * 3.2;
    camera.position.y = 1.35 + (1 - cam) * 1.1;

    // Montagem: cada peça desce no lugar com atraso
    var assembled = true;
    var openTarget = Math.max(openToggle, openScroll);
    openNow += (openTarget - openNow) * 0.07;
    var o = easeInOut(Math.min(1, Math.max(0, openNow)));

    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      var k = reduced ? 1 : Math.min(1, Math.max(0, (time - 0.2 - p.delay) / 0.9));
      if (k < 1) assembled = false;
      var e = easeOut(k);
      tmp.copy(p.open).multiplyScalar(o).add(p.home);
      tmp.y += (1 - e) * 2.6;
      p.mesh.position.copy(tmp);
      p.mesh.rotation.y = (1 - e) * p.spin;
    }
    // rotação base do cabideiro deve permanecer
    rp.mesh.rotation.z = rod2.mesh.rotation.z = Math.PI / 2;

    targetYaw = baseYaw + dragYaw + pointerX * 0.28 + (reduced ? 0 : Math.sin(time * 0.35) * 0.06);
    if (start !== Infinity) yaw += (targetYaw - yaw) * (assembled ? 0.06 : 0.035);
    model.rotation.y = yaw;
    model.rotation.x = pointerY * 0.04;

    camera.lookAt(0, 0.05, 0);
    renderer.render(scene, camera);
  }
  loop();
})();
