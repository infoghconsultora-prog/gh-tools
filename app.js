/* GH TOOLS — Copyright (c) 2026 Felipe Manrique. Todos los derechos reservados. */
(function () {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const KEY = 'gh-tools:v1';

  /* ---------- APPS: para sumar una nueva, agregá UNA línea acá (y subí VERSION en sw.js) ---------- */
  const BASE = 'https://infoghconsultora-prog.github.io/';
  // [nombre, descripción, carpeta del repo en Pages]. El ícono es icons/app-<carpeta>.png: el MISMO de la pestaña e instalación de cada app
  // (se genera con ~/.claude/skills/nueva-webapp/scripts/hacer_iconos_gh.py).
  const APPS = [
    ['Auditorías de Campo', 'Cargá la visita sector por sector, con notas y fotos.', 'gh-auditorias-campo'],
    ['Seguimiento Ambiental', 'Habilitaciones, vencimientos y auditorías.', 'seguimiento-ambiental'],
    ['Seguimiento de Mediciones', 'Estado de los monitoreos y su checklist.', 'gh-seguimiento-mediciones'],
    ['Calibraciones', 'Calibraciones de equipos y sus vencimientos.', 'gh-calibraciones'],
    ['Generador de Documentos', 'Notas y certificados en PDF o Word.', 'gh-documentos'],
    ['Ergonomía', 'Protocolo SRT 886/15 con evaluación REBA.', 'gh-ergonomia'],
    ['Biblioteca', 'Biblioteca técnica de GH.', 'gh-biblioteca-web']
  ];

  /* ---------- tema ---------- */
  const tema = { get() { try { return localStorage.getItem(KEY + ':tema'); } catch (e) { return null; } },
                 set(v) { try { localStorage.setItem(KEY + ':tema', v); } catch (e) {} } };
  function aplicarTema() { const t = tema.get(); if (t) document.documentElement.dataset.theme = t; }
  aplicarTema();
  $('btnTema').addEventListener('click', () => {
    const oscuro = (document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
    tema.set(oscuro ? 'light' : 'dark'); aplicarTema();
  });

  /* ---------- lista ---------- */
  const NS = 'http://www.w3.org/2000/svg';
  function svg(d, cls) {
    const s = document.createElementNS(NS, 'svg'); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true');
    if (cls) s.setAttribute('class', cls);
    d.split(' M').forEach((seg, i) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('d', (i ? 'M' : '') + seg); s.appendChild(p); });
    return s;
  }
  function pintar() {
    const nav = $('apps');
    APPS.forEach(([nombre, desc, repo]) => {
      const a = document.createElement('a');
      a.className = 'app'; a.href = BASE + repo + '/'; a.target = '_blank'; a.rel = 'noopener';
      const ic = document.createElement('span'); ic.className = 'ic'; const im = document.createElement('img'); im.src = 'icons/app-' + repo + '.png'; im.alt = ''; im.width = 40; im.height = 40; ic.appendChild(im);
      const tx = document.createElement('span'); tx.className = 'tx';
      const n = document.createElement('b'); n.textContent = nombre;
      const d = document.createElement('small'); d.textContent = desc;
      tx.append(n, d);
      a.append(ic, tx, svg('M9 6l6 6-6 6', 'chev'));
      nav.appendChild(a);
    });
  }
  pintar();

  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
