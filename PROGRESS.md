# GH TOOLS — estado

- Variante: pwa · Paleta: gh · Cuenta GitHub: infoghconsultora-prog
- Creada 2026-10-23 con la skill nueva-webapp. Publicada en https://infoghconsultora-prog.github.io/gh-tools/

## Decisiones
- Lista agrupada estilo iOS (ícono, nombre, descripción, chevron), sin buscador: son 7 apps (<8).
- Orden para uso diario: campo primero, después seguimiento, documentos y consulta.
- Descripciones tomadas de los README de cada repo; se excluyen `gh-*-backend` (privados).
- Enlaces con `target="_blank" rel="noopener"`; CSP básica en el `<head>`. Sin datos de clientes.
- Verificado: check-shell OK, probar-offline OK, 375 px claro/oscuro.

## Pendiente
- Sumar cada app nueva que se publique (ver README).

## 2026-10-23 · Marca unificada
- Ícono de pestaña/instalación = logo oficial GH (favicon, apple-touch-icon, 192/512 y maskable). `VERSION` 1.1.0.
- La lista usa `icons/app-<repo>.png`: el mismo PNG que la pestaña/instalación de cada app (ícono de línea + insignia GH), generado con `hacer_iconos_gh.py` de la skill.

## 2026-10-23 · Accesibilidad: tamaño
Control de tamaño de interfaz (lupa con "+", 100 → 115 → 130 → 150 → 100 %), junto a la luna o solo en la barra donde no hay luna. Escala **toda la interfaz** con `html[data-escala]{zoom}` (las apps usan `px`, no `rem`); se aplica en el `<head>` antes del primer pintado y se guarda por app en `localStorage` (`gh-escala:<repo>`, con try/catch).

**Cómo se midió.** A 375 px (computed styles en el navegador integrado) en lo público: GH TOOLS completa y los logins. Las pantallas internas de las otras apps están detrás de Google: se revelaron a mano con datos vacíos (para ver el diseño) y se contó en el CSS cuántas reglas de `font-size` hay por tramo. Eso mide el tamaño de diseño, no tablas con datos reales.

| App | Base | Textos mínimos (reglas de font-size) | Veredicto | Por qué |
|---|---|---|---|---|
| GH TOOLS | 17 px | descripciones de la lista 13 px (8 de 17 textos < 14 px); objetivos ≥ 44 px | **Sí** | Es la puerta de entrada y las descripciones son chicas. |
| Seguimiento Ambiental | 17 px en login; panel con base del sistema | ≤ 12 px: 20 · 13–14 px: 34 · ≥ 15 px: 30; chips y leyendas de 13–15 px | **Sí** (no "no hace falta": el login es grande pero el panel es denso) | Contra lo que se suponía: el panel interno tiene mucho texto de 12–13 px (chips, leyenda, listas). |
| Calibraciones | sin base declarada (13.5 px en tablas) | ≤ 12 px: 17 · 13–14 px: 11 · ≥ 15 px: 7 | **Sí** | Tablas de 13.5 px, etiquetas de 10.5–12.5 px. |
| Seguimiento de Mediciones | idem | ≤ 12 px: **72** · 13–14 px: 20 · ≥ 15 px: 8 | **Sí (la más urgente)** | Casi todo entre 10.5 y 12.5 px. |
| Biblioteca (web) | 15 px | ≤ 12 px: 23 · 13–14 px: 26 · ≥ 15 px: 14 | **Sí** | Etiquetas, fichas y filtros de 11–13 px. |
| Ergonomía | 15 px | ≤ 12 px: 13 · 13–14 px: 30 · ≥ 15 px: 24 | **Sí** | Formularios REBA y tablas densas de 12–14 px. |
| Generador de Documentos | 15 px | ≤ 12 px: 7 · 13–14 px: 13 · ≥ 15 px: 6 | **Opcional** (se agregó) | Pocos textos chicos (ayudas de 11–13 px); cuesta una línea en la barra. |
| Auditoría de campo | **17 px / 22 px** (tamaño iOS) | ≤ 12 px: 4 · 13–14 px: 9 · ≥ 15 px: 15; botones ≥ 44 px | **No hace falta** | Ya está pensada para el celular en el campo: base grande y objetivos de 44 px. Lo chico es solo secundario (hora, contador). Si se pide después, el control entra en 4 líneas con la pieza `escala-gh.html`. |

**Dónde quedó el botón.** GH TOOLS: botón-ícono idéntico a la luna, a su izquierda. Calibraciones y Mediciones: contenedor fijo arriba a la derecha con la lupa a la izquierda de la píldora de la luna (en ≤ 640 px pasa a flujo normal para no tapar el título, que antes quedaba tapado). Seguimiento Ambiental: junto al selector Auto/claro/oscuro del encabezado. Documentos, Ergonomía y Biblioteca **no tenían botón de luna** (siguen al sistema): ahí la lupa va sola en la barra superior. Auditoría de campo: nada.

**Resueltos al verificar (375 px, 100/115/130/150 %).** Las pantallas con `100vh/100dvh` se multiplican con `zoom` (login quedaba corrido): se divide por `--gh-z`. El botón de Google necesita ~215 px: en 130/150 % se achican los rellenos del login. Barras que desbordaban a 150 % (GH TOOLS, Ergonomía, pestañas de Biblioteca, fila de botones de Calibraciones/Mediciones) ahora acomodan o hacen scroll. Biblioteca se regenera con `gh-biblioteca/herramientas/construir_web.py`.

**Limitaciones.** `zoom` va en Chrome, Safari y Firefox ≥ 126; en uno anterior el botón se oculta (`@supports`). Las tablas con datos reales no se pudieron ver (login): las revisa Felipe con una sesión. El botón no está en la pantalla de login (ya es grande); la elección guardada sí se aplica ahí.

**Ajuste (2026-10-23, pedido de Felipe).** Calibraciones y Mediciones: la luna/sol ahora es un botón-ícono de 44 px (sin texto "Modo claro/oscuro") y la barra de controles dejó de ser fija: queda arriba de la página (se va con el scroll) y el panel reserva ese lugar, así no pisa el correo ni "Cerrar sesión". Todas las apps: al agrandar aparece una segunda lupa con "−" a la izquierda de la "+" (3 botones: menos, más, tema) que baja un nivel; en 100 % no se ve. En 130/150 % GH TOOLS oculta el logo de la barra y Ergonomía el rótulo para que entren los botones. GH TOOLS `VERSION` 1.2.2.
