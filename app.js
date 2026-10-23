/* GH TOOLS — Copyright (c) 2026 Felipe Manrique. Todos los derechos reservados. */
(function () {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const KEY = 'gh-tools:v1';

  /* ---------- APPS: para sumar una nueva, agregá UNA línea acá (y subí VERSION en sw.js) ---------- */
  const BASE = 'https://infoghconsultora-prog.github.io/';
  const I = {
    campo: 'M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1z M8 6H6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-2 M9 14l2 2 4-4',
    hoja: 'M20 4c-9 0-15 4-15 11 0 2 .6 3.4 1.5 4.5C7.5 20 9 20 10 20c7 0 10-6 10-16z M4 21c2-5 5-8 9-10',
    barras: 'M5 20v-7 M12 20V5 M19 20v-10 M3 20h18',
    ajustes: 'M4 7h9 M17 7h3 M4 17h3 M11 17h9 M15 5v4 M9 15v4',
    doc: 'M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z M14 3v5h5 M9 13h6 M9 17h6',
    persona: 'M12 3.5a1.6 1.6 0 1 0 .01 0 M7 10l5-1.8 5 1.8 M12 8.2V14 M12 14l-3.2 6 M12 14l3.2 6',
    libro: 'M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z M5 17a3 3 0 0 1 3-3h10'
  };
  // [nombre, descripción, carpeta del repo en Pages, ícono]
  const APPS = [
    ['Auditorías de Campo', 'Cargá la visita sector por sector, con notas y fotos.', 'gh-auditorias-campo', I.campo],
    ['Seguimiento Ambiental', 'Habilitaciones, vencimientos y auditorías.', 'seguimiento-ambiental', I.hoja],
    ['Seguimiento de Mediciones', 'Estado de los monitoreos y su checklist.', 'gh-seguimiento-mediciones', I.barras],
    ['Calibraciones', 'Calibraciones de equipos y sus vencimientos.', 'gh-calibraciones', I.ajustes],
    ['Generador de Documentos', 'Notas y certificados en PDF o Word.', 'gh-documentos', I.doc],
    ['Ergonomía', 'Protocolo SRT 886/15 con evaluación REBA.', 'gh-ergonomia', I.persona],
    ['Biblioteca', 'Biblioteca técnica de GH.', 'gh-biblioteca-web', I.libro]
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
    APPS.forEach(([nombre, desc, repo, icono]) => {
      const a = document.createElement('a');
      a.className = 'app'; a.href = BASE + repo + '/'; a.target = '_blank'; a.rel = 'noopener';
      const ic = document.createElement('span'); ic.className = 'ic'; ic.appendChild(svg(icono));
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
