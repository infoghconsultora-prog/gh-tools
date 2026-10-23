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
