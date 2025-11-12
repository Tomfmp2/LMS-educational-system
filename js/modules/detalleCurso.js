export function renderDetalleCurso(codigoCurso) {
  const container = document.createElement('section');
  container.id = 'section-detalle-curso';

  container.innerHTML = `
    <style>
      #section-detalle-curso main {
        max-width: 1200px;
        margin: 2rem auto;
        padding: 2rem;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        font-family: 'Segoe UI', sans-serif;
      }
      #section-detalle-curso .btn-volver {
        background: #6c757d;
        color: white;
        border: none;
        padding: 0.7rem 1.5rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        margin-bottom: 2rem;
        transition: 0.3s;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
      #section-detalle-curso .btn-volver:hover {
        background: #5a6268;
        transform: translateX(-3px);
      }
      #section-detalle-curso .curso-header {
        margin-bottom: 2.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 2px solid #eee;
      }
      #section-detalle-curso .curso-header h1 {
        color: #00ADB5;
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      #section-detalle-curso .curso-header .curso-meta {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
        margin-top: 1rem;
      }
      #section-detalle-curso .curso-header .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #555;
        font-size: 1rem;
      }
      #section-detalle-curso .curso-header .meta-item strong {
        color: #00ADB5;
        font-weight: 600;
      }
      #section-detalle-curso .curso-descripcion {
        color: #666;
        font-size: 1.1rem;
        line-height: 1.6;
        margin-top: 1rem;
      }
      #section-detalle-curso .modulos-container {
        margin-top: 2rem;
      }
      #section-detalle-curso .modulos-container h2 {
        color: #00ADB5;
        font-size: 2rem;
        margin-bottom: 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #00ADB5;
      }
      #section-detalle-curso .modulo-card {
        background: #f8f9fa;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        border-left: 4px solid #00ADB5;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      }
      #section-detalle-curso .modulo-header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 1rem;
      }
      #section-detalle-curso .modulo-header h3 {
        color: #2c3e50;
        font-size: 1.5rem;
        margin: 0;
      }
      #section-detalle-curso .modulo-codigo {
        background: #00ADB5;
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 6px;
        font-size: 0.85rem;
        font-weight: bold;
      }
      #section-detalle-curso .modulo-descripcion {
        color: #666;
        margin-bottom: 1.5rem;
        font-size: 1rem;
        line-height: 1.5;
      }
      #section-detalle-curso .lecciones-container {
        margin-top: 1rem;
      }
      #section-detalle-curso .lecciones-container h4 {
        color: #555;
        font-size: 1.2rem;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      #section-detalle-curso .leccion-item {
        background: white;
        border-radius: 8px;
        padding: 1.2rem;
        margin-bottom: 1rem;
        border: 1px solid #e0e0e0;
        transition: all 0.3s;
      }
      #section-detalle-curso .leccion-item:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transform: translateX(5px);
      }
      #section-detalle-curso .leccion-header {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 0.8rem;
      }
      #section-detalle-curso .leccion-titulo {
        color: #2c3e50;
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0;
      }
      #section-detalle-curso .leccion-horas {
        background: #28a745;
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 6px;
        font-size: 0.85rem;
        font-weight: bold;
      }
      #section-detalle-curso .leccion-contenido {
        color: #666;
        font-size: 0.95rem;
        line-height: 1.5;
        margin-bottom: 0.8rem;
      }
      #section-detalle-curso .multimedia-container {
        margin-top: 0.8rem;
        padding-top: 0.8rem;
        border-top: 1px solid #eee;
      }
      #section-detalle-curso .multimedia-container h5 {
        color: #555;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
      }
      #section-detalle-curso .multimedia-links {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      #section-detalle-curso .multimedia-link {
        background: #e9ecef;
        color: #00ADB5;
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        font-size: 0.85rem;
        text-decoration: none;
        transition: 0.3s;
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
      }
      #section-detalle-curso .multimedia-link:hover {
        background: #00ADB5;
        color: white;
      }
      #section-detalle-curso .sin-contenido {
        text-align: center;
        color: #999;
        font-style: italic;
        padding: 2rem;
      }
    </style>

    <main>
      <button class="btn-volver" id="btn-volver">
        Volver a Cursos
      </button>
      <div id="contenido-curso"></div>
    </main>
  `;

  // Obtener datos
  const cursos = JSON.parse(localStorage.getItem('cursos') || '[]');
  const modulos = JSON.parse(localStorage.getItem('modulos') || '[]');
  const lecciones = JSON.parse(localStorage.getItem('lecciones') || '[]');
  const profesores = JSON.parse(localStorage.getItem('profesores') || '[]');

  // Helpers para clasificar multimedia
  function getMediaType(url) {
    if (!url || typeof url !== 'string') return 'otro';
    const u = url.toLowerCase();
    const isData = u.startsWith('data:');
    if (isData) {
      if (u.startsWith('data:application/pdf')) return 'pdf';
      if (u.startsWith('data:image/')) return 'imagen';
      if (u.startsWith('data:text/markdown')) return 'markdown';
      if (u.startsWith('data:application/vnd.ms-powerpoint') ||
          u.startsWith('data:application/vnd.openxmlformats-officedocument.presentationml.presentation') ||
          u.startsWith('data:application/vnd.oasis.opendocument.presentation')) return 'presentacion';
      return 'otro';
    }
    // Por extensión
    try {
      const path = u.split('?')[0];
      if (path.endsWith('.pdf')) return 'pdf';
      if (/\.(png|jpg|jpeg|gif|webp|bmp|svg)$/.test(path)) return 'imagen';
      if (path.endsWith('.md') || path.endsWith('.markdown')) return 'markdown';
      if (/\.(ppt|pptx|odp)$/.test(path)) return 'presentacion';
    } catch (e) {}
    return 'otro';
  }

  function getLinkLabel(url, idx) {
    if (url && url.startsWith && url.startsWith('data:')) {
      if (url.startsWith('data:application/pdf')) return 'PDF (archivo local)';
      if (url.startsWith('data:image/')) return 'Imagen (archivo local)';
      if (url.startsWith('data:text/markdown')) return 'Markdown (archivo local)';
      if (url.startsWith('data:application/vnd.ms-powerpoint') || url.startsWith('data:application/vnd.openxmlformats-officedocument.presentationml.presentation') || url.startsWith('data:application/vnd.oasis.opendocument.presentation')) return 'Presentación (archivo local)';
      return 'Archivo (local)';
    }
    try {
      const last = url.split('/').pop();
      return last.length > 40 ? last.substring(0, 40) + '...' : last;
    } catch (e) {
      return `Recurso ${idx+1}`;
    }
  }

  // Buscar el curso
  const curso = cursos.find(c => c.codigo === codigoCurso);
  if (!curso) {
    container.querySelector('#contenido-curso').innerHTML = `
      <div class="sin-contenido">
        <h2>Curso no encontrado</h2>
        <p>El curso solicitado no existe.</p>
      </div>
    `;
    return container;
  }

  // Obtener módulos del curso
  const modulosDelCurso = modulos.filter(m => m.cursoCodigo === curso.codigo);
  
  // Obtener nombre del docente
  const docente = profesores.find(p => p.correo === curso.docente);
  const nombreDocente = docente ? docente.nombre : 'Profesor desconocido';

  // Construir HTML del curso
  let html = `
    <div class="curso-header">
      <h1>${curso.nombre}</h1>
      <div class="curso-meta">
        <div class="meta-item">
          <strong>Código:</strong> ${curso.codigo}
        </div>
        <div class="meta-item">
          <strong>Docente:</strong> ${nombreDocente}
        </div>
        <div class="meta-item">
          <strong>Módulos:</strong> ${modulosDelCurso.length}
        </div>
      </div>
      <div class="curso-descripcion">
        ${curso.descripcion}
      </div>
    </div>
  `;

  // Agregar módulos y lecciones
  if (modulosDelCurso.length === 0) {
    html += `
      <div class="modulos-container">
        <h2>Módulos del Curso</h2>
        <div class="sin-contenido">
          <p>Este curso aún no tiene módulos asignados.</p>
        </div>
      </div>
    `;
  } else {
    html += '<div class="modulos-container"><h2>Módulos del Curso</h2>';

    modulosDelCurso.forEach(modulo => {
      // Obtener lecciones del módulo
      const leccionesDelModulo = lecciones.filter(l => l.moduloCodigo === modulo.codigo);

      html += `
        <div class="modulo-card">
          <div class="modulo-header">
            <h3>${modulo.nombre}</h3>
            <span class="modulo-codigo">${modulo.codigo}</span>
          </div>
          ${modulo.descripcion ? `<div class="modulo-descripcion">${modulo.descripcion}</div>` : ''}
          <div class="lecciones-container">
            <h4>Lecciones (${leccionesDelModulo.length})</h4>
            ${leccionesDelModulo.length === 0 ? `
              <div class="sin-contenido">
                <p>Este módulo aún no tiene lecciones.</p>
              </div>
            ` : ''}
            ${leccionesDelModulo.map(leccion => {
              const horasTexto = leccion.horas === 1 ? 'hora' : 'horas';
              let multimediaHTML = '';
              
              if (leccion.multimedia && leccion.multimedia.length > 0) {
                // Agrupar por tipo
                const grupos = {
                  pdf: [],
                  imagen: [],
                  markdown: [],
                  presentacion: [],
                  otro: []
                };
                leccion.multimedia.forEach((u) => {
                  const tipo = getMediaType(u);
                  grupos[tipo].push(u);
                });

                const renderGrupo = (titulo, items, conMiniaturaImagen = false) => {
                  if (!items || items.length === 0) return '';
                  if (conMiniaturaImagen) {
                    // Mostrar miniaturas para imágenes
                    return `
                      <div class="multimedia-container">
                        <h5>${titulo} (${items.length})</h5>
                        <div class="multimedia-links">
                          ${items.map((url, i) => `
                            <a href="${url}" target="_blank" class="multimedia-link" rel="noopener noreferrer" style="gap:0.6rem;">
                              <img src="${url}" alt="img" style="width:80px;height:50px;object-fit:cover;border-radius:4px;border:1px solid #ddd;" />
                            </a>
                          `).join('')}
                        </div>
                      </div>
                    `;
                  }
                  return `
                    <div class="multimedia-container">
                      <h5>${titulo} (${items.length})</h5>
                      <div class="multimedia-links">
                        ${items.map((url, i) => `
                          <a href="${url}" target="_blank" class="multimedia-link" rel="noopener noreferrer">
                            ${getLinkLabel(url, i)}
                          </a>
                        `).join('')}
                      </div>
                    </div>
                  `;
                };

                multimediaHTML = `
                  ${renderGrupo('Imágenes', grupos.imagen, true)}
                  ${renderGrupo('PDF', grupos.pdf)}
                  ${renderGrupo('Markdown', grupos.markdown)}
                  ${renderGrupo('Presentaciones', grupos.presentacion)}
                  ${renderGrupo('Otros', grupos.otro)}
                `;
              }

              return `
                <div class="leccion-item">
                  <div class="leccion-header">
                    <h5 class="leccion-titulo">${leccion.titulo}</h5>
                    <span class="leccion-horas">${leccion.horas} ${horasTexto}</span>
                  </div>
                  <div class="leccion-contenido">${leccion.contenido}</div>
                  ${multimediaHTML}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    html += '</div>';
  }

  container.querySelector('#contenido-curso').innerHTML = html;

  // Agregar botón Inscribirse (solo usuario logueado no admin)
  const sesion = JSON.parse(localStorage.getItem('sesionActual') || 'null');
  if (sesion && !sesion.isAdmin) {
    const main = container.querySelector('main');
    const btnIns = document.createElement('button');
    btnIns.textContent = 'Inscribirse';
    btnIns.className = 'btn-inscribirse-detalle';
    btnIns.style.cssText = 'background:#00ADB5;color:#fff;border:none;padding:0.8rem 1.2rem;border-radius:10px;font-weight:bold;cursor:pointer;margin:0 0 1rem 0;';
    main.insertBefore(btnIns, main.querySelector('#contenido-curso'));

    btnIns.addEventListener('click', async () => {
      const key = `misCursos_${sesion.correo}`;
      const cursosUsuario = JSON.parse(localStorage.getItem(key) || '[]');
      if (!cursosUsuario.some(c => c.codigo === curso.codigo)) {
        cursosUsuario.push({
          codigo: curso.codigo,
          nombre: curso.nombre,
          descripcion: curso.descripcion,
          docente: curso.docente,
          imagen: curso.imagen
        });
        localStorage.setItem(key, JSON.stringify(cursosUsuario));
        
        // Mostrar notificación
        const { notificacionExito } = await import('../utils/notificaciones.js');
        notificacionExito(`Te inscribiste en "${curso.nombre}"`);
      } else {
        const { notificacionAdvertencia } = await import('../utils/notificaciones.js');
        notificacionAdvertencia(`Ya estás inscrito en "${curso.nombre}"`);
      }
    });
  }

  // Botón volver
  const btnVolver = container.querySelector('#btn-volver');
  btnVolver.addEventListener('click', async () => {
    const { renderCursos } = await import('./cursos.js');
    const section = document.getElementById('section-home');
    if (section) {
      section.innerHTML = '';
      section.appendChild(renderCursos());
    }
  });

  return container;
}

