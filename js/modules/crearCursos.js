// js/modules/crearCursos.js
export function renderCrearCurso() {
  const container = document.createElement('section');
  container.id = 'section-gestion-cursos';
  container.className = 'gestion-cursos-modern';

  // === ESTILOS MODERNOS ===
  const style = document.createElement('style');
  style.textContent = `
    .gestion-cursos-modern {
      font-family: 'Inter', 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
      min-height: 100vh;
      padding: 1.5rem;
    }

    .gestion-cursos-modern .dashboard-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .gestion-cursos-modern .dashboard-header h1 {
      font-size: 2.4rem;
      font-weight: 700;
      color: #222;
      margin: 0 0 0.5rem;
    }

    .gestion-cursos-modern .dashboard-header p {
      color: #666;
      font-size: 1.1rem;
      margin: 0;
    }

    .gestion-cursos-modern .tabs-container {
      display: flex;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      margin-bottom: 1.5rem;
      flex-wrap: nowrap;
    }

    .gestion-cursos-modern .tab-btn {
      flex: 1;
      padding: 1rem 1.2rem;
      border: none;
      background: transparent;
      font-weight: 600;
      color: #666;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-size: 0.95rem;
      min-width: 120px;
    }

    .gestion-cursos-modern .tab-btn.active {
      background: #00ADB5;
      color: white;
      box-shadow: 0 2px 8px rgba(0,173,181,0.3);
    }

    .gestion-cursos-modern .tab-btn:hover:not(.active) {
      background: #f0f8f9;
      color: #00ADB5;
    }

    .gestion-cursos-modern .tab-content {
      display: none;
      animation: fadeIn 0.4s ease;
    }

    .gestion-cursos-modern .tab-content.active {
      display: block;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .gestion-cursos-modern .content-card {
      background: white;
      border-radius: 16px;
      padding: 1.8rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 6px 20px rgba(0,0,0,0.07);
      transition: transform 0.2s;
    }

    .gestion-cursos-modern .content-card:hover {
      transform: translateY(-2px);
    }

    .gestion-cursos-modern .form-grid {
      display: grid;
      gap: 1.2rem;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }

    .gestion-cursos-modern .form-group {
      display: flex;
      flex-direction: column;
    }

    .gestion-cursos-modern .form-group label {
      font-weight: 600;
      color: #333;
      margin-bottom: 0.4rem;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }

    .gestion-cursos-modern .form-group label .required {
      color: #e74c3c;
    }

    .gestion-cursos-modern .form-control {
      padding: 0.85rem 1rem;
      border: 1.8px solid #e0e0e0;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #fdfdfd;
    }

    .gestion-cursos-modern .form-control:focus {
      outline: none;
      border-color: #00ADB5;
      box-shadow: 0 0 0 4px rgba(0,173,181,0.15);
      background: white;
    }

    .gestion-cursos-modern textarea.form-control {
      min-height: 110px;
      resize: vertical;
    }

    .gestion-cursos-modern .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.95rem;
    }

    .gestion-cursos-modern .btn-primary {
      background: #00ADB5;
      color: white;
    }

    .gestion-cursos-modern .btn-primary:hover {
      background: #009aa2;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0,173,181,0.3);
    }

    .gestion-cursos-modern .btn-danger {
      background: #e74c3c;
      color: white;
      padding: 0.4rem 0.8rem;
      font-size: 0.8rem;
    }

    .gestion-cursos-modern .btn-danger:hover {
      background: #c0392b;
    }

    .gestion-cursos-modern .btn-small {
      padding: 0.35rem 0.7rem;
      font-size: 0.8rem;
    }

    .gestion-cursos-modern .image-preview {
      width: 100%;
      height: 180px;
      border-radius: 12px;
      object-fit: cover;
      margin-top: 0.8rem;
      border: 2px dashed #ddd;
      display: none;
    }

    .gestion-cursos-modern .image-preview.show {
      display: block;
      border: none;
    }

    .gestion-cursos-modern .radio-group {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .gestion-cursos-modern .radio-item {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.95rem;
      color: #555;
    }

    .gestion-cursos-modern .items-grid {
      display: grid;
      gap: 1.2rem;
      margin-top: 1.5rem;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }

    .gestion-cursos-modern .item-card {
      background: #f8fdfc;
      border-radius: 14px;
      padding: 1.3rem;
      border: 1px solid #e8f4f8;
      position: relative;
      transition: all 0.3s ease;
      overflow: hidden;
    }

    .gestion-cursos-modern .item-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0,173,181,0.15);
      border-color: #00ADB5;
    }

    .gestion-cursos-modern .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.6rem;
    }

    .gestion-cursos-modern .item-title {
      font-weight: 700;
      color: #222;
      font-size: 1.1rem;
      margin: 0;
    }

    .gestion-cursos-modern .item-badge {
      background: #00ADB5;
      color: white;
      font-size: 0.7rem;
      padding: 0.2rem 0.6rem;
      border-radius: 20px;
      font-weight: 600;
    }

    .gestion-cursos-modern .item-meta {
      font-size: 0.85rem;
      color: #666;
      margin: 0.4rem 0;
    }

    .gestion-cursos-modern .item-desc {
      font-size: 0.9rem;
      color: #444;
      line-height: 1.5;
      margin: 0.6rem 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .gestion-cursos-modern .multimedia-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.8rem;
    }

    .gestion-cursos-modern .multimedia-item {
      background: #e6f4f7;
      padding: 0.4rem 0.7rem;
      border-radius: 8px;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      max-width: 100%;
    }

    .gestion-cursos-modern .multimedia-item button {
      background: #dc3545;
      color: white;
      border: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      font-size: 0.7rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .gestion-cursos-modern .mensaje {
      padding: 1rem 1.5rem;
      border-radius: 12px;
      margin: 1rem 0;
      text-align: center;
      font-weight: 500;
      font-size: 0.95rem;
      display: none;
      animation: slideDown 0.4s ease;
    }

    .gestion-cursos-modern .mensaje.exito {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
      display: block;
    }

    .gestion-cursos-modern .mensaje.error {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
      display: block;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .gestion-cursos-modern .empty-state {
      text-align: center;
      padding: 3rem 1rem;
      color: #888;
      font-size: 1.1rem;
    }

    .gestion-cursos-modern .empty-state svg {
      width: 60px;
      height: 60px;
      margin-bottom: 1rem;
      opacity: 0.4;
    }

    @media (max-width: 768px) {
      .gestion-cursos-modern .tabs-container {
        flex-direction: column;
      }
      .gestion-cursos-modern .tab-btn {
        justify-content: flex-start;
      }
      .gestion-cursos-modern .form-grid {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);

  // === PLANTILLA HTML ===
  container.innerHTML = `
    <div class="dashboard-header">
      <h1>Contenido Educativo</h1>
      <p>Crea y organiza cursos, módulos y lecciones de forma clara y simple</p>
    </div>

    <div class="tabs-container">
      <button class="tab-btn active" data-tab="cursos">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
        Cursos
      </button>
      <button class="tab-btn" data-tab="modulos">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2H2v8h10V2z"></path><path d="M22 14H12v8h10v-8z"></path><path d="M2 14h8v8H2v-8z"></path></svg>
        Módulos
      </button>
      <button class="tab-btn" data-tab="lecciones">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        Lecciones
      </button>
    </div>

    <!-- PESTAÑA CURSOS -->
    <div id="tab-cursos" class="tab-content active">
      <div class="content-card">
        <h2 style="margin-top:0; color:#222; font-size:1.4rem;">Nuevo curso</h2>
        <form id="form-curso">
          <div class="form-grid">
            <div class="form-group">
              <label><span class="required">*</span> Código</label>
              <input type="text" class="form-control" id="curso-codigo" placeholder="Por ejemplo: MAT-101" required />
            </div>
            <div class="form-group">
              <label><span class="required">*</span> Nombre</label>
              <input type="text" class="form-control" id="curso-nombre" placeholder="Por ejemplo: Matemáticas Básicas" required />
            </div>
          </div>
          <div class="form-group">
            <label><span class="required">*</span> Descripción</label>
            <textarea class="form-control" id="curso-descripcion" placeholder="Escribe una descripción breve del objetivo y contenido del curso..." required></textarea>
          </div>

          <div class="form-group">
            <label><span class="required">*</span> Imagen de portada</label>
            <div class="radio-group">
              <label class="radio-item"><input type="radio" name="curso-imagen-tipo" value="url" checked /> Desde URL</label>
              <label class="radio-item"><input type="radio" name="curso-imagen-tipo" value="file" /> Desde archivo</label>
            </div>
            <input type="text" class="form-control" id="curso-imagen-url" placeholder="https://ejemplo.com/imagen.jpg" />
            <input type="file" class="form-control" id="curso-imagen-file" accept="image/*" style="display:none;" />
            <img id="curso-imagen-preview" class="image-preview" />
          </div>

          <div class="form-group">
            <label><span class="required">*</span> Docente</label>
            <select class="form-control" id="curso-docente" required></select>
          </div>

          <button type="submit" class="btn btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2-2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            Guardar curso
          </button>
        </form>
      </div>
      <div id="lista-cursos"></div>
    </div>

    <!-- PESTAÑA MÓDULOS -->
    <div id="tab-modulos" class="tab-content">
      <div class="content-card">
        <h2 style="margin-top:0; color:#222; font-size:1.4rem;">Nuevo módulo</h2>
        <form id="form-modulo">
          <div class="form-grid">
            <div class="form-group">
              <label><span class="required">*</span> Código</label>
              <input type="text" class="form-control" id="modulo-codigo" placeholder="Por ejemplo: MOD-01" required />
            </div>
            <div class="form-group">
              <label><span class="required">*</span> Nombre</label>
              <input type="text" class="form-control" id="modulo-nombre" placeholder="Por ejemplo: Introducción" required />
            </div>
          </div>
          <div class="form-group">
            <label>Descripción (opcional)</label>
            <textarea class="form-control" id="modulo-descripcion" placeholder="Describe el contenido del módulo..."></textarea>
          </div>
          <div class="form-group">
            <label><span class="required">*</span> Curso</label>
            <select class="form-control" id="modulo-curso" required></select>
          </div>
          <button type="submit" class="btn btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2H2v8h10V2z"></path><path d="M22 14H12v8h10v-8z"></path></svg>
            Guardar módulo
          </button>
        </form>
      </div>
      <div id="lista-modulos"></div>
    </div>

    <!-- PESTAÑA LECCIONES -->
    <div id="tab-lecciones" class="tab-content">
      <div class="content-card">
        <h2 style="margin-top:0; color:#222; font-size:1.4rem;">Nueva lección</h2>
        <form id="form-leccion">
          <div class="form-grid">
            <div class="form-group">
              <label><span class="required">*</span> Título</label>
              <input type="text" class="form-control" id="leccion-titulo" placeholder="Por ejemplo: Suma de fracciones" required />
            </div>
            <div class="form-group">
              <label><span class="required">*</span> Horas</label>
              <input type="number" class="form-control" id="leccion-horas" min="1" placeholder="2" required />
            </div>
          </div>
          <div class="form-group">
            <label><span class="required">*</span> Contenido</label>
            <textarea class="form-control" id="leccion-contenido" placeholder="Escribe el contenido principal de la lección..." required></textarea>
          </div>

          <div class="form-group">
            <label>Enlaces multimedia</label>
            <div id="multimedia-urls"></div>
            <button type="button" id="agregar-url" class="btn btn-small" style="background:#e9ecef; color:#495057; margin-top:0.5rem;">
              + Agregar enlace
            </button>
          </div>

          <div class="form-group">
            <label>Archivos (PDF, imágenes, video - máximo 4MB por archivo, 12MB en total)</label>
            <input type="file" class="form-control" id="leccion-archivos" multiple accept=".pdf,.jpg,.png,.mp4,.mp3" />
          </div>

          <div class="form-group">
            <label><span class="required">*</span> Módulo</label>
            <select class="form-control" id="leccion-modulo" required></select>
          </div>

          <button type="submit" class="btn btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            Guardar lección
          </button>
        </form>
      </div>
      <div id="lista-lecciones"></div>
    </div>

    <div id="mensaje" class="mensaje"></div>
  `;

  // === ELEMENTOS ===
  const tabs = container.querySelectorAll('.tab-btn');
  const contents = container.querySelectorAll('.tab-content');
  const forms = {
    curso: container.querySelector('#form-curso'),
    modulo: container.querySelector('#form-modulo'),
    leccion: container.querySelector('#form-leccion')
  };
  const listas = {
    cursos: container.querySelector('#lista-cursos'),
    modulos: container.querySelector('#lista-modulos'),
    lecciones: container.querySelector('#lista-lecciones')
  };
  const selects = {
    docente: container.querySelector('#curso-docente'),
    curso: container.querySelector('#modulo-curso'),
    modulo: container.querySelector('#leccion-modulo')
  };
  const mensaje = container.querySelector('#mensaje');

  // === STORAGE ===
  const storage = {
    cursos: (() => {
      const data = JSON.parse(localStorage.getItem('cursos') || '[]');
      return Array.isArray(data) ? data : [];
    })(),
    modulos: (() => {
      const data = JSON.parse(localStorage.getItem('modulos') || '[]');
      return Array.isArray(data) ? data : [];
    })(),
    lecciones: (() => {
      const data = JSON.parse(localStorage.getItem('lecciones') || '[]');
      return Array.isArray(data) ? data : [];
    })(),
    profesores: (() => {
      const data = JSON.parse(localStorage.getItem('profesores') || '[]');
      return Array.isArray(data) ? data : [];
    })()
  };

  // === HELPERS ===
  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const MAX_FILE_BYTES = 4 * 1024 * 1024;
  const MAX_TOTAL_BYTES = 12 * 1024 * 1024;

  // === TABS ===
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`#tab-${tab.dataset.tab}`).classList.add('active');
    });
  });

  // === SELECTS ===
  function cargarSelectDocentes() {
    selects.docente.innerHTML = '<option value="">Seleccione docente...</option>';
    if (storage.profesores.length === 0) {
      const opt = document.createElement('option');
      opt.disabled = true;
      opt.textContent = '(No hay profesores disponibles)';
      selects.docente.appendChild(opt);
    } else {
      // Filtrar profesores que NO tengan curso asignado
      const docentesOcupados = storage.cursos.map(c => c.docente);
      const disponibles = storage.profesores.filter(p => !docentesOcupados.includes(p.correo));
      if (disponibles.length === 0) {
        const opt = document.createElement('option');
        opt.disabled = true;
        opt.textContent = '(Todos los profesores ya tienen curso asignado)';
        selects.docente.appendChild(opt);
      } else {
        disponibles.forEach(p => {
          const opt = document.createElement('option');
          opt.value = p.correo;
          opt.textContent = p.nombre;
          selects.docente.appendChild(opt);
        });
      }
    }
  }

  function cargarSelectCursos() {
    selects.curso.innerHTML = '<option value="">Seleccione curso...</option>';
    storage.cursos.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.codigo;
      opt.textContent = `${c.codigo} - ${c.nombre}`;
      selects.curso.appendChild(opt);
    });
  }

  function cargarSelectModulos() {
    selects.modulo.innerHTML = '<option value="">Seleccione módulo...</option>';
    storage.modulos.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.codigo;
      const curso = storage.cursos.find(c => c.codigo === m.cursoCodigo)?.nombre || 'Curso no encontrado';
      opt.textContent = `${m.codigo} - ${m.nombre} (Curso: ${curso})`;
      selects.modulo.appendChild(opt);
    });
  }

  // === IMAGEN CURSO ===
  const radioUrl = container.querySelector('input[value="url"]')?.parentElement.parentElement;
  const radioFile = container.querySelector('input[value="file"]')?.parentElement.parentElement;
  const inputUrl = container.querySelector('#curso-imagen-url');
  const inputFile = container.querySelector('#curso-imagen-file');
  const preview = container.querySelector('#curso-imagen-preview');

  container.querySelector('input[name="curso-imagen-tipo"]').addEventListener('change', (e) => {
    if (e.target.value === 'url') {
      inputUrl.style.display = 'block';
      inputFile.style.display = 'none';
    } else {
      inputUrl.style.display = 'none';
      inputFile.style.display = 'block';
    }
  });

  inputUrl.addEventListener('input', () => {
    if (inputUrl.value.trim()) {
      preview.src = inputUrl.value.trim();
      preview.classList.add('show');
    } else {
      preview.classList.remove('show');
    }
  });

  inputFile.addEventListener('change', () => {
    if (inputFile.files[0]) {
      preview.src = URL.createObjectURL(inputFile.files[0]);
      preview.classList.add('show');
    }
  });

  // === MULTIMEDIA URLS ===
  const multimediaUrls = container.querySelector('#multimedia-urls');
  container.querySelector('#agregar-url').addEventListener('click', () => {
    const div = document.createElement('div');
    div.style.marginBottom = '0.5rem';
    div.innerHTML = `
      <input type="text" class="form-control" placeholder="https://..." style="margin-bottom:0.3rem;" />
      <button type="button" class="btn btn-danger btn-small">Eliminar</button>
    `;
    div.querySelector('button').addEventListener('click', () => div.remove());
    multimediaUrls.appendChild(div);
  });

  // === FORM SUBMITS ===
  forms.curso.addEventListener('submit', async (e) => {
    e.preventDefault();
    const codigo = forms.curso['curso-codigo'].value.trim();
    const nombre = forms.curso['curso-nombre'].value.trim();
    const descripcion = forms.curso['curso-descripcion'].value.trim();
    const docente = forms.curso['curso-docente'].value;

    if (!codigo || !nombre || !descripcion) {
      return mostrarMensaje('Completa el código, nombre y descripción del curso', 'error');
    }


    if (!docente) {
      return mostrarMensaje('Debes seleccionar un docente. Si no hay disponibles, crea profesores primero', 'error');
    }

    // Validar que el docente no tenga ya curso asignado
    if (storage.cursos.some(c => c.docente === docente)) {
      return mostrarMensaje('Este profesor ya tiene un curso asignado. Selecciona otro.', 'error');
    }

    if (storage.cursos.some(c => c.codigo === codigo)) {
      return mostrarMensaje(`Ya existe un curso con el código "${codigo}"`, 'error');
    }

    let imagen = '';
    if (container.querySelector('input[value="url"]').checked) {
      imagen = inputUrl.value.trim();
      if (!imagen.startsWith('http')) return mostrarMensaje('La URL de la imagen no es válida', 'error');
    } else {
      if (!inputFile.files[0]) return mostrarMensaje('Selecciona una imagen', 'error');
      if (inputFile.files[0].size > MAX_FILE_BYTES) return mostrarMensaje('La imagen debe pesar menos de 4MB', 'error');
      imagen = await readFileAsDataURL(inputFile.files[0]);
    }

    const curso = { codigo, nombre, descripcion, docente, imagen };
    storage.cursos.push(curso);
    localStorage.setItem('cursos', JSON.stringify(storage.cursos));
    forms.curso.reset();
    preview.classList.remove('show');
    cargarSelectCursos();
    actualizarListas();
    mostrarMensaje('Curso guardado correctamente', 'exito');
  });

  forms.modulo.addEventListener('submit', (e) => {
    e.preventDefault();
    const codigo = forms.modulo['modulo-codigo'].value.trim();
    const nombre = forms.modulo['modulo-nombre'].value.trim();
    const descripcion = forms.modulo['modulo-descripcion'].value.trim();
    const cursoCodigo = forms.modulo['modulo-curso'].value;

    if (!codigo || !nombre) {
      return mostrarMensaje('Completa el código y nombre del módulo', 'error');
    }

    if (!cursoCodigo) {
      return mostrarMensaje('Debes seleccionar un curso para este módulo', 'error');
    }

    if (storage.modulos.some(m => m.codigo === codigo)) {
      return mostrarMensaje(`Ya existe un módulo con el código "${codigo}"`, 'error');
    }

    const modulo = { codigo, nombre, descripcion, cursoCodigo };
    storage.modulos.push(modulo);
    localStorage.setItem('modulos', JSON.stringify(storage.modulos));
    forms.modulo.reset();
    cargarSelectModulos();
    actualizarListas();
    mostrarMensaje('Módulo guardado correctamente', 'exito');
  });

  forms.leccion.addEventListener('submit', async (e) => {
    e.preventDefault();

    const urls = Array.from(multimediaUrls.querySelectorAll('input')).map(i => i.value.trim()).filter(u => u);
    const archivosInput = container.querySelector('#leccion-archivos');
    let archivosData = [];

    if (archivosInput.files.length > 0) {
      let total = 0;
      for (const f of archivosInput.files) {
        if (f.size > MAX_FILE_BYTES) {
          return mostrarMensaje(`El archivo "${f.name}" pesa más de 4MB`, 'error');
        }
        total += f.size;
      }
      if (total > MAX_TOTAL_BYTES) {
        return mostrarMensaje('El tamaño total de archivos supera 12MB', 'error');
      }

      const lecturas = Array.from(archivosInput.files).map(f => readFileAsDataURL(f));
      archivosData = await Promise.all(lecturas);
    }

    const leccion = {
      id: Date.now().toString(),
      titulo: forms.leccion['leccion-titulo'].value.trim(),
      horas: parseInt(forms.leccion['leccion-horas'].value),
      contenido: forms.leccion['leccion-contenido'].value.trim(),
      multimedia: [...urls, ...archivosData],
      moduloCodigo: forms.leccion['leccion-modulo'].value
    };

    try {
      storage.lecciones.push(leccion);
      localStorage.setItem('lecciones', JSON.stringify(storage.lecciones));
    } catch (err) {
      return mostrarMensaje('No hay espacio disponible en el navegador para guardar', 'error');
    }

    forms.leccion.reset();
    multimediaUrls.innerHTML = '';
    actualizarListas();
    mostrarMensaje('Lección guardada correctamente', 'exito');
  });

  // === LISTAS ===
  function actualizarListas() {
    // Cursos
    listas.cursos.innerHTML = '';
    if (storage.cursos.length === 0) {
      listas.cursos.innerHTML = `<div class="empty-state"><p>No hay cursos creados</p></div>`;
    } else {
      storage.cursos.forEach(c => {
        const card = document.createElement('div');
        card.className = 'item-card';
        const docente = storage.profesores.find(p => p.correo === c.docente)?.nombre || 'Sin docente';
        card.innerHTML = `
          <div class="item-header">
            <h3 class="item-title">${c.codigo}</h3>
            <span class="item-badge">Curso</span>
          </div>
          <h4 style="margin:0.4rem 0; font-size:1rem; color:#00ADB5;">${c.nombre}</h4>
          <p class="item-desc">${c.descripcion}</p>
          <p class="item-meta">Docente: <strong>${docente}</strong></p>
          ${c.imagen ? `<img src="${c.imagen}" style="width:100%; height:120px; object-fit:cover; border-radius:10px; margin-top:0.8rem;">` : ''}
          <div style="margin-top:1rem; text-align:right;">
            <button class="btn btn-danger btn-small" data-type="curso" data-id="${c.codigo}">Eliminar</button>
          </div>
        `;
        listas.cursos.appendChild(card);
      });
    }

    // Módulos
    listas.modulos.innerHTML = '';
    if (storage.modulos.length === 0) {
      listas.modulos.innerHTML = `<div class="empty-state"><p>No hay módulos creados</p></div>`;
    } else {
      storage.modulos.forEach(m => {
        const card = document.createElement('div');
        card.className = 'item-card';
        const curso = storage.cursos.find(c => c.codigo === m.cursoCodigo)?.nombre || 'Curso no encontrado';
        const cantidadLecciones = storage.lecciones.filter(l => l.moduloCodigo === m.codigo).length;
        card.innerHTML = `
          <div class="item-header">
            <h3 class="item-title">${m.codigo}</h3>
            <span class="item-badge" style="background:#17a2b8;">Módulo</span>
          </div>
          <h4 style="margin:0.4rem 0; font-size:1rem;">${m.nombre}</h4>
          <p class="item-desc">${m.descripcion || 'Sin descripción'}</p>
          <div style="margin-top:1rem; padding:0.8rem; background:#f9f9f9; border-radius:8px; display:flex; gap:1rem; font-size:0.85rem;">
            <div style="flex:1;">
              <span style="color:#666; display:block; margin-bottom:0.2rem;">Lecciones</span>
              <strong style="font-size:1.2rem; color:#00ADB5;">${cantidadLecciones}</strong>
            </div>
            <div style="flex:2; border-left:1px solid #e0e0e0; padding-left:1rem;">
              <span style="color:#666; display:block; margin-bottom:0.2rem;">Pertenece a</span>
              <strong style="color:#222;">${curso}</strong>
            </div>
          </div>
          <div style="margin-top:1rem; text-align:right;">
            <button class="btn btn-danger btn-small" data-type="modulo" data-id="${m.codigo}">Eliminar</button>
          </div>
        `;
        listas.modulos.appendChild(card);
      });
    }

    // Lecciones
    listas.lecciones.innerHTML = '';
    if (storage.lecciones.length === 0) {
      listas.lecciones.innerHTML = `<div class="empty-state"><p>No hay lecciones creadas</p></div>`;
    } else {
      storage.lecciones.forEach(l => {
        const card = document.createElement('div');
        card.className = 'item-card';
        const modulo = storage.modulos.find(m => m.codigo === l.moduloCodigo);
        const moduloNombre = modulo?.nombre || 'Módulo no encontrado';
        const cursoNombre = modulo ? (storage.cursos.find(c => c.codigo === modulo.cursoCodigo)?.nombre || 'Curso no encontrado') : 'Curso no disponible';
        card.innerHTML = `
          <div class="item-header">
            <h3 class="item-title">${l.titulo}</h3>
            <span class="item-badge" style="background:#6c757d;">${l.horas}h</span>
          </div>
          <p class="item-desc">${l.contenido.substring(0, 120)}...</p>
          ${l.multimedia.length > 0 ? `
            <div class="multimedia-list">
              ${l.multimedia.map(url => `
                <div class="multimedia-item">
                  <span>${url.startsWith('data:') ? 'Archivo' : url.split('/').pop().substring(0,12)+'...'}</span>
                  <button data-url="${url}" data-leccion="${l.id}">×</button>
                </div>
              `).join('')}
            </div>
          ` : ''}
          <div style="margin-top:1rem; padding-top:1rem; border-top:1px solid #e0e0e0;">
            <p class="item-meta" style="margin:0.3rem 0; font-size:0.85rem; color:#666;">
              <span style="display:inline-block; background:#f0f0f0; padding:0.25rem 0.6rem; border-radius:4px; margin-right:0.5rem;">Curso: <strong>${cursoNombre}</strong></span>
            </p>
            <p class="item-meta" style="margin:0.3rem 0; font-size:0.85rem; color:#666;">
              <span style="display:inline-block; background:#f0f0f0; padding:0.25rem 0.6rem; border-radius:4px;">Módulo: <strong>${moduloNombre}</strong></span>
            </p>
          </div>
          <div style="margin-top:1rem; text-align:right;">
            <button class="btn btn-danger btn-small" data-type="leccion" data-id="${l.id}">Eliminar</button>
          </div>
        `;
        listas.lecciones.appendChild(card);
      });
    }

    // Eliminar
    container.querySelectorAll('[data-type]').forEach(btn => {
      btn.onclick = async () => {
        // Sin confirm, hacemos el delete directamente con feedback
        const tipo = btn.dataset.type;
        const id = btn.dataset.id;
        
        // Determinar nombre del elemento
        let nombreElemento = 'elemento';
        if (tipo === 'curso') {
          const curso = storage.cursos.find(c => c.codigo === id);
          nombreElemento = `curso "${curso?.nombre || id}"`;
        } else if (tipo === 'modulo') {
          const modulo = storage.modulos.find(m => m.codigo === id);
          nombreElemento = `módulo "${modulo?.nombre || id}"`;
        } else if (tipo === 'leccion') {
          nombreElemento = 'lección';
        }
        
        if (tipo === 'curso') {
          storage.cursos = storage.cursos.filter(c => c.codigo !== id);
          storage.modulos = storage.modulos.filter(m => m.cursoCodigo !== id);
          storage.lecciones = storage.lecciones.filter(l => !storage.modulos.some(m => m.codigo === l.moduloCodigo && m.cursoCodigo === id));
        } else if (tipo === 'modulo') {
          storage.modulos = storage.modulos.filter(m => m.codigo !== id);
          storage.lecciones = storage.lecciones.filter(l => l.moduloCodigo !== id);
        } else if (tipo === 'leccion') {
          storage.lecciones = storage.lecciones.filter(l => l.id !== id);
        }
        
        localStorage.setItem('cursos', JSON.stringify(storage.cursos));
        localStorage.setItem('modulos', JSON.stringify(storage.modulos));
        localStorage.setItem('lecciones', JSON.stringify(storage.lecciones));
        
        // Importar notificación
        const { notificacionExito } = await import('../utils/notificaciones.js');
        notificacionExito(`${nombreElemento} eliminado correctamente`);
        
        actualizarListas();
        cargarSelectCursos();
        cargarSelectModulos();
      };
    });

    // Eliminar multimedia
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
    setTimeout(() => mensaje.className = 'mensaje', 4000);
  }

  // === INICIO ===
  cargarSelectDocentes();
  cargarSelectCursos();
  cargarSelectModulos();
  actualizarListas();

  return container;
}