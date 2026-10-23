# GH TOOLS

Portada tipo linktree con los accesos a las herramientas web de GH Consultora. Una sola pantalla, mobile first, instalable como PWA. Solo enlaces: sin login, sin backend, sin datos.

Página: https://infoghconsultora-prog.github.io/gh-tools/

## Herramientas listadas
| Herramienta | Enlace |
|---|---|
| Auditorías de Campo | https://infoghconsultora-prog.github.io/gh-auditorias-campo/ |
| Seguimiento Ambiental | https://infoghconsultora-prog.github.io/seguimiento-ambiental/ |
| Seguimiento de Mediciones | https://infoghconsultora-prog.github.io/gh-seguimiento-mediciones/ |
| Calibraciones | https://infoghconsultora-prog.github.io/gh-calibraciones/ |
| Generador de Documentos | https://infoghconsultora-prog.github.io/gh-documentos/ |
| Ergonomía | https://infoghconsultora-prog.github.io/gh-ergonomia/ |
| Biblioteca | https://infoghconsultora-prog.github.io/gh-biblioteca-web/ |

## Cómo agregar una app nueva
1. En `app.js`, al inicio, sumá **una línea** al array `APPS`: `['Nombre', 'Descripción corta.', 'carpeta-del-repo', I.icono]`. Los íconos disponibles están en el objeto `I` (para uno nuevo, agregá un trazo SVG de 24×24).
2. Subí `VERSION` en `sw.js` (si no, los teléfonos siguen viendo la lista vieja).
3. `node ~/.claude/skills/nueva-webapp/scripts/check-shell.mjs .`, commit y push.

Si hay más de ~8 apps, conviene sumar un buscador.

## Correr local
```
python3 -m http.server 8812
```

© 2026 Felipe Manrique. Todos los derechos reservados.
