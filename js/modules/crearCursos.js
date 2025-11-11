// js/modules/crearCursos.js
/**
 * renderCrearCurso()
 * Módulo CRUD completo para:
 * - Cursos (Código, Nombre, Descripción, Docente)
 * - Módulos (Código, Nombre, Descripción)
 * - Lecciones (Título, Horas, Contenido, Multimedia)
 */
export function renderCrearCurso() {
  const container = document.createElement('section');
  container.id = 'section-gestion-cursos';

  // Añadir estilo al head para asegurar aplicación
  const style = document.createElement('style');
  style.textContent = `
    #section-gestion-cursos main {
      max-width: 1000px;
      margin: 2rem auto;
      padding: 2rem;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      font-family: 'Segoe UI', sans-serif;
    }
    #section-gestion-cursos h1 { 
      text-align: center; 
      color: #00ADB5; 
      margin-bottom: 1.5rem; 
      font-size: 2.2rem;
    }
    #section-gestion-cursos .tabs {
      display: flex;
      border-bottom: 2px solid #eee;
      margin-bottom: 1.5rem;
      overflow-x: auto;
    }
    #section-gestion-cursos .tab {
      padding: 0.8rem 1.5rem;
      cursor: pointer;
      font-weight: 600;
      color: #555;
      border-bottom: 3px solid transparent;
      transition: all 0.3s;
    }
    #section-gestion-cursos .tab.active {
      color: #00ADB5;
      border-bottom-color: #00ADB5;
    }
    #section-gestion-cursos .tab-content { display: none; }
    #section-gestion-cursos .tab-content.active { display: block; }

    #section-gestion-cursos .form-group { margin-bottom: 1.2rem; }
    #section-gestion-cursos label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333; }
    #section-gestion-cursos input, #section-gestion-cursos textarea, #section-gestion-cursos select {
      width: 100%;
      padding: 0.9rem;
      border: 1.5px solid #ddd;
      border-radius: 10px;
      font-size: 1rem;
      transition: border 0.3s;
    }
    #section-gestion-cursos input:focus, #section-gestion-cursos textarea:focus, #section-gestion-cursos select:focus {
      outline: none;
      border-color: #00ADB5;
      box-shadow: 0 0 0 3px rgba(0,173,181,0.15);
    }
    #section-gestion-cursos textarea { resize: vertical; min-height: 100px; }
    #section-gestion-cursos .btn {
      padding: 0.8rem 1.5rem;
      border: none;
      border-radius: 10px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s;
    }
    #section-gestion-cursos .btn-primary { background: #00ADB5; color: white; }
    #section-gestion-cursos .btn-primary:hover { background: #009aa2; }
    #section-gestion-cursos .btn-danger { background: #dc3545; color: white; }
    #section-gestion-cursos .btn-danger:hover { background: #c82333; }
    #section-gestion-cursos .btn-small { padding: 0.4rem 0.8rem; font-size: 0.85rem; }

    #section-gestion-cursos .lista-items { display: grid; gap: 1rem; margin-top: 1.5rem; }
    #section-gestion-cursos .item-card {
      background: #f8f9fa;
      padding: 1.2rem;
      border-radius: 12px;
      border: 1px solid #eee;
      position: relative;
    }
    #section-gestion-cursos .item-actions {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      gap: 0.5rem;
    }
    #section-gestion-cursos .multimedia-list { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem; }
    #section-gestion-cursos .multimedia-item {
      background: #e9ecef;
      padding: 0.3rem 0.6rem;
      border-radius: 6px;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    #section-gestion-cursos .multimedia-item button {
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 0.8rem;
      cursor: pointer;
    }
    #section-gestion-cursos .mensaje {
      padding: 1rem;
      border-radius: 8px;
      margin: 1rem 0;
      text-align: center;
      font-weight: 500;
      display: none;
    }
    #section-gestion-cursos .mensaje.exito { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; display: block; }
    #section-gestion-cursos .mensaje.error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; display: block; }
  `;
  document.head.appendChild(style);

  container.innerHTML += `
    <main>
      <h1>Gestión de Contenido Educativo</h1>
      <div class="tabs">
        <div class="tab active" data-tab="cursos">Cursos</div>
        <div class="tab" data-tab="modulos">Módulos</div>
        <div class="tab" data-tab="lecciones">Lecciones</div>
      </div>

      <!-- CURSOS -->
      <div id="tab-cursos" class="tab-content active">
        <h2>Crear Curso</h2>
        <form id="form-curso">
          <div class="form-group"><label>Código *</label><input type="text" id="curso-codigo" required /></div>
          <div class="form-group"><label>Nombre *</label><input type="text" id="curso-nombre" required /></div>
          <div class="form-group"><label>Descripción *</label><textarea id="curso-descripcion" required></textarea></div>
          <div class="form-group">
            <label>Portada del curso (obligatoria)</label>
            <div style="display:flex; gap:1rem; align-items:center; margin-bottom:0.5rem;">
              <label style="display:flex; align-items:center; gap:0.3rem;">
                <input type="radio" name="curso-imagen-tipo" value="url" checked /> URL
              </label>
              <label style="display:flex; align-items:center; gap:0.3rem;">
                <input type="radio" name="curso-imagen-tipo" value="file" /> Archivo
              </label>
            </div>
            <input type="text" id="curso-imagen-url" placeholder="https://..." />
            <input type="file" id="curso-imagen-file" accept="image/*" style="display:none; margin-top:0.5rem;" />
            <small id="curso-imagen-help" style="color:#666; display:block; margin-top:0.4rem;">Proporciona una URL válida o selecciona un archivo de imagen.</small>
          </div>
          <div class="form-group"><label>Docente *</label><select id="curso-docente" required></select></div>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </form>
        <div id="lista-cursos" class="lista-items"></div>
      </div>

      <!-- MÓDULOS -->
      <div id="tab-modulos" class="tab-content">
        <h2>Crear Módulo</h2>
        <form id="form-modulo">
          <div class="form-group"><label>Código *</label><input type="text" id="modulo-codigo" required /></div>
          <div class="form-group"><label>Nombre *</label><input type="text" id="modulo-nombre" required /></div>
          <div class="form-group"><label>Descripción</label><textarea id="modulo-descripcion"></textarea></div>
          <div class="form-group"><label>Curso *</label><select id="modulo-curso" required></select></div>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </form>
        <div id="lista-modulos" class="lista-items"></div>
      </div>

      <!-- LECCIONES -->
      <div id="tab-lecciones" class="tab-content">
        <h2>Crear Lección</h2>
        <form id="form-leccion">
          <div class="form-group"><label>Título *</label><input type="text" id="leccion-titulo" required /></div>
          <div class="form-group"><label>Horas *</label><input type="number" id="leccion-horas" min="1" value="2" required /></div>
          <div class="form-group"><label>Contenido *</label><textarea id="leccion-contenido" required></textarea></div>
          <div class="form-group"><label>Multimedia (URLs, separadas por coma)</label><input type="text" id="leccion-multimedia" placeholder="https://... , https://..." /></div>
          <div class="form-group">
            <label>Adjuntar archivos (PDF, imágenes, Markdown, PowerPoint)</label>
            <input 
              type="file" 
              id="leccion-archivos" 
              multiple
              accept="application/pdf,image/*,text/markdown,.md,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.oasis.opendocument.presentation"
            />
            <small style="color:#666; display:block; margin-top:0.4rem;">Puedes combinar URLs y archivos locales.</small>
          </div>
          <div class="form-group"><label>Módulo *</label><select id="leccion-modulo" required></select></div>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </form>
        <div id="lista-lecciones" class="lista-items"></div>
      </div>

      <div id="mensaje-global" class="mensaje"></div>
    </main>
  `;

  // === DATOS ===
  const storage = {
    cursos: JSON.parse(localStorage.getItem('cursos') || '[]'),
    modulos: JSON.parse(localStorage.getItem('modulos') || '[]'),
    lecciones: JSON.parse(localStorage.getItem('lecciones') || '[]'),
    profesores: JSON.parse(localStorage.getItem('profesores') || '[]')
  };

  // === DOM ===
  const tabs = container.querySelectorAll('.tab');
  const contents = container.querySelectorAll('.tab-content');
  const selects = {
    docente: container.querySelector('#curso-docente'),
    curso: container.querySelector('#modulo-curso'),
    modulo: container.querySelector('#leccion-modulo')
  };
  const listas = {
    cursos: container.querySelector('#lista-cursos'),
    modulos: container.querySelector('#lista-modulos'),
    lecciones: container.querySelector('#lista-lecciones')
  };
  const forms = {
    curso: container.querySelector('#form-curso'),
    modulo: container.querySelector('#form-modulo'),
    leccion: container.querySelector('#form-leccion')
  };
  const mensaje = container.querySelector('#mensaje-global');

  // === PESTAÑAS ===
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      container.querySelector(`#tab-${target}`).classList.add('active');
      if (target === 'cursos') cargarSelectDocentes();
      if (target === 'modulos') cargarSelectCursos();
      if (target === 'lecciones') cargarSelectModulos();
      actualizarListas();
    });
  });

  // === PORTADA: TOGGLE URL/FILE ===
  const radioImagenTipo = container.querySelectorAll('input[name="curso-imagen-tipo"]');
  const inputImagenUrl = container.querySelector('#curso-imagen-url');
  const inputImagenFile = container.querySelector('#curso-imagen-file');
  radioImagenTipo.forEach(r => {
    r.addEventListener('change', () => {
      const tipo = container.querySelector('input[name="curso-imagen-tipo"]:checked')?.value || 'url';
      if (tipo === 'url') {
        inputImagenUrl.style.display = '';
        inputImagenFile.style.display = 'none';
      } else {
        inputImagenUrl.style.display = 'none';
        inputImagenFile.style.display = '';
      }
    });
  });

  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // === SELECTS ===
  function cargarSelectDocentes() {
    const select = selects.docente;
    select.innerHTML = '<option value="">Seleccione docente</option>';
    storage.profesores.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.correo;
      opt.textContent = p.nombre;
      select.appendChild(opt);
    });
  }

  function cargarSelectCursos() {
    const select = selects.curso;
    select.innerHTML = '<option value="">Seleccione curso</option>';
    storage.cursos.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.codigo;
      opt.textContent = `${c.codigo} - ${c.nombre}`;
      select.appendChild(opt);
    });
  }

  function cargarSelectModulos() {
    const select = selects.modulo;
    select.innerHTML = '<option value="">Seleccione módulo</option>';
    storage.modulos.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.codigo;
      opt.textContent = `${m.codigo} - ${m.nombre}`;
      select.appendChild(opt);
    });
  }

  // === CRUD ===
  forms.curso.addEventListener('submit', async e => {
    e.preventDefault();
    const codigo = forms.curso['curso-codigo'].value.trim();
    if (storage.cursos.some(c => c.codigo === codigo)) return mostrarMensaje('Código duplicado', 'error');

    // Portada obligatoria (URL o Archivo)
    const tipoImagen = container.querySelector('input[name="curso-imagen-tipo"]:checked')?.value || 'url';
    let imagen = '';
    if (tipoImagen === 'url') {
      const url = inputImagenUrl.value.trim();
      if (!url) return mostrarMensaje('La portada es obligatoria (URL vacía)', 'error');
      imagen = url;
    } else {
      const file = inputImagenFile.files && inputImagenFile.files[0];
      if (!file) return mostrarMensaje('La portada es obligatoria (seleccione un archivo)', 'error');
      try {
        imagen = await readFileAsDataURL(file);
      } catch (err) {
        console.error(err);
        return mostrarMensaje('No se pudo leer la imagen seleccionada', 'error');
      }
    }

    const curso = {
      codigo,
      nombre: forms.curso['curso-nombre'].value.trim(),
      descripcion: forms.curso['curso-descripcion'].value.trim(),
      docente: forms.curso['curso-docente'].value,
      imagen
    };
    storage.cursos.push(curso);
    localStorage.setItem('cursos', JSON.stringify(storage.cursos));
    forms.curso.reset();
    // Reestablecer vista de URL por defecto
    const radioUrl = container.querySelector('input[name="curso-imagen-tipo"][value="url"]');
    if (radioUrl) radioUrl.checked = true;
    inputImagenUrl.style.display = '';
    inputImagenFile.style.display = 'none';
    actualizarListas();
    cargarSelectCursos();
    mostrarMensaje('Curso creado', 'exito');
  });

  forms.modulo.addEventListener('submit', e => {
    e.preventDefault();
    const codigo = forms.modulo['modulo-codigo'].value.trim();
    if (storage.modulos.some(m => m.codigo === codigo)) return mostrarMensaje('Código duplicado', 'error');
    const modulo = {
      codigo,
      nombre: forms.modulo['modulo-nombre'].value.trim(),
      descripcion: forms.modulo['modulo-descripcion'].value.trim(),
      cursoCodigo: forms.modulo['modulo-curso'].value
    };
    storage.modulos.push(modulo);
    localStorage.setItem('modulos', JSON.stringify(storage.modulos));
    forms.modulo.reset();
    actualizarListas();
    cargarSelectModulos();
    mostrarMensaje('Módulo creado', 'exito');
  });

  forms.leccion.addEventListener('submit', async e => {
    e.preventDefault();
    // Construir multimedia a partir de URLs + archivos locales
    const urls = (forms.leccion['leccion-multimedia'].value || '')
      .split(',')
      .map(u => u.trim())
      .filter(u => u);
    const archivosInput = container.querySelector('#leccion-archivos');
    let archivosData = [];
    if (archivosInput && archivosInput.files && archivosInput.files.length > 0) {
      try {
        // Validaciones de tamaño: límites más altos por material de estudio
        const MAX_FILE_BYTES = 4 * 1024 * 1024; // 4MB por archivo
        const MAX_TOTAL_BYTES = 12 * 1024 * 1024; // 12MB total por lección
        let total = 0;
        for (const f of archivosInput.files) {
          if (f.size > MAX_FILE_BYTES) {
            return mostrarMensaje(`El archivo "${f.name}" supera 4MB. Reduce su tamaño.`, 'error');
          }
          total += f.size;
        }
        if (total > MAX_TOTAL_BYTES) {
          return mostrarMensaje('El total de archivos supera 12MB. Adjunta menos o más livianos.', 'error');
        }

        const lecturas = Array.from(archivosInput.files).map(f => readFileAsDataURL(f));
        archivosData = await Promise.all(lecturas);
      } catch (err) {
        console.error(err);
        return mostrarMensaje('No se pudieron leer algunos archivos adjuntos', 'error');
      }
    }

    const leccion = {
      id: Date.now().toString(),
      titulo: forms.leccion['leccion-titulo'].value.trim(),
      horas: parseInt(forms.leccion['leccion-horas'].value),
      contenido: forms.leccion['leccion-contenido'].value.trim(),
      multimedia: [...urls, ...archivosData],
      moduloCodigo: forms.leccion['leccion-modulo'].value
    };

    // Guardado con manejo de errores (cuota localStorage)
    try {
      storage.lecciones.push(leccion);
      localStorage.setItem('lecciones', JSON.stringify(storage.lecciones));
    } catch (err) {
      console.error('Error guardando lección:', err);
      return mostrarMensaje('No se pudo guardar la lección (límite de almacenamiento). Reduce archivos.', 'error');
    }
    forms.leccion.reset();
    actualizarListas();
    mostrarMensaje('Lección creada', 'exito');
  });

  // === LISTAS ===
  function actualizarListas() {
    listas.cursos.innerHTML = '';
    storage.cursos.forEach(c => {
      const card = document.createElement('div');
      card.className = 'item-card';
      const docente = storage.profesores.find(p => p.correo === c.docente)?.nombre || 'Sin docente';
      card.innerHTML = `
        <strong>${c.codigo}</strong> - ${c.nombre}
        <p><small>${c.descripcion}</small></p>
        <p><em>Docente: ${docente}</em></p>
        <div class="item-actions">
          <button class="btn btn-danger btn-small" data-type="curso" data-id="${c.codigo}">Eliminar</button>
        </div>
      `;
      listas.cursos.appendChild(card);
    });

    listas.modulos.innerHTML = '';
    storage.modulos.forEach(m => {
      const card = document.createElement('div');
      card.className = 'item-card';
      const curso = storage.cursos.find(c => c.codigo === m.cursoCodigo)?.nombre || 'Sin curso';
      card.innerHTML = `
        <strong>${m.codigo}</strong> - ${m.nombre}
        <p><small>${m.descripcion || 'Sin descripción'}</small></p>
        <p><em>Curso: ${curso}</em></p>
        <div class="item-actions">
          <button class="btn btn-danger btn-small" data-type="modulo" data-id="${m.codigo}">Eliminar</button>
        </div>
      `;
      listas.modulos.appendChild(card);
    });

    listas.lecciones.innerHTML = '';
    storage.lecciones.forEach(l => {
      const card = document.createElement('div');
      card.className = 'item-card';
      const modulo = storage.modulos.find(m => m.codigo === l.moduloCodigo)?.nombre || 'Sin módulo';
      const getMediaLabel = (u) => {
        if (u && u.startsWith && u.startsWith('data:')) {
          // Derivar etiqueta por mime
          if (u.startsWith('data:application/pdf')) return 'PDF (archivo local)';
          if (u.startsWith('data:image/')) return 'Imagen (archivo local)';
          if (u.startsWith('data:text/markdown')) return 'Markdown (archivo local)';
          if (u.startsWith('data:application/vnd.ms-powerpoint') || u.startsWith('data:application/vnd.openxmlformats-officedocument.presentationml.presentation') || u.startsWith('data:application/vnd.oasis.opendocument.presentation')) return 'Presentación (archivo local)';
          return 'Archivo (local)';
        }
        try {
          return u.split('/').pop().substring(0, 15) + '...';
        } catch (e) {
          return 'Recurso';
        }
      };
      card.innerHTML = `
        <strong>${l.titulo}</strong> (${l.horas}h)
        <p><small>${l.contenido.substring(0, 100)}...</small></p>
        ${l.multimedia.length > 0 ? `
          <div class="multimedia-list">
            ${l.multimedia.map(url => `
              <div class="multimedia-item">
                <span>${getMediaLabel(url)}</span>
                <button data-url="${url}" data-leccion="${l.id}">X</button>
              </div>
            `).join('')}
          </div>
        ` : ''}
        <p><em>Módulo: ${modulo}</em></p>
        <div class="item-actions">
          <button class="btn btn-danger btn-small" data-type="leccion" data-id="${l.id}">Eliminar</button>
        </div>
      `;
      listas.lecciones.appendChild(card);
    });

    container.querySelectorAll('[data-type]').forEach(btn => {
      btn.onclick = () => {
        if (confirm('¿Eliminar?')) {
          const tipo = btn.dataset.type;
          const id = btn.dataset.id;
          if (tipo === 'curso') {
            storage.cursos = storage.cursos.filter(c => c.codigo !== id);
            storage.modulos = storage.modulos.filter(m => m.cursoCodigo !== id);
            storage.lecciones = storage.lecciones.filter(l => storage.modulos.find(m => m.codigo === l.moduloCodigo)?.cursoCodigo !== id);
          } else if (tipo === 'modulo') {
            storage.modulos = storage.modulos.filter(m => m.codigo !== id);
            storage.lecciones = storage.lecciones.filter(l => l.moduloCodigo !== id);
          } else if (tipo === 'leccion') {
            storage.lecciones = storage.lecciones.filter(l => l.id !== id);
          }
          localStorage.setItem('cursos', JSON.stringify(storage.cursos));
          localStorage.setItem('modulos', JSON.stringify(storage.modulos));
          localStorage.setItem('lecciones', JSON.stringify(storage.lecciones));
          actualizarListas();
        }
      };
    });
    container.querySelectorAll('.multimedia-item button').forEach(btn => {
      btn.onclick = () => {
        const leccion = storage.lecciones.find(l => l.id === btn.dataset.leccion);
        if (leccion) {
          leccion.multimedia = leccion.multimedia.filter(u => u !== btn.dataset.url);
          localStorage.setItem('lecciones', JSON.stringify(storage.lecciones));
          actualizarListas();
        }
      };
    });
  }

  function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
    setTimeout(() => mensaje.className = 'mensaje hidden', 4000);
  }

  // === INICIO ===
  cargarSelectDocentes();
  cargarSelectCursos();
  cargarSelectModulos();
  actualizarListas();

  return container;
}