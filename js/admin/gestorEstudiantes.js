// js/modules/gestionEstudiantes.js
// Módulo completo para gestión de estudiantes y sus cursos

export function renderGestionEstudiantes() {
  const container = document.createElement('section');
  container.id = 'section-gestion-estudiantes';

  container.innerHTML = `
    <style>
      .gestion-estudiantes {
        max-width: 1400px;
        margin: 0 auto;
        padding: 2rem;
        font-family: 'Segoe UI', sans-serif;
        background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
        min-height: 100vh;
      }
      .header-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1.5rem; }
      .header-section h1 { color: #00ADB5; font-size: 2.8rem; margin: 0; display: flex; align-items: center; gap: 1rem; }
      .action-buttons { display: flex; gap: 1rem; flex-wrap: wrap; }
      .btn { padding: 0.9rem 1.8rem; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 0.6rem; }
      .btn-primary { background: #00ADB5; color: white; }
      .btn-primary:hover { background: #009aa2; transform: translateY(-2px); }
      .btn-secondary { background: #6c757d; color: white; }
      .btn-secondary:hover { background: #5a6268; }

      .header-stats { display: flex; gap: 2rem; flex-wrap: wrap; margin-bottom: 2rem; }
      .stat-box { background: white; padding: 1.2rem; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center; min-width: 150px; }
      .stat-number { font-size: 2rem; font-weight: 700; color: #00ADB5; }
      .stat-label { font-size: 0.9rem; color: #666; margin-top: 0.3rem; }

      .filters { display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
      .search-box { flex: 1; min-width: 250px; }
      .search-box input { width: 100%; padding: 0.9rem 1.2rem; border: 1.5px solid #ddd; border-radius: 10px; font-size: 1rem; }
      .search-box input:focus { outline: none; border-color: #00ADB5; box-shadow: 0 0 0 3px rgba(0,173,181,0.15); }

      .table-responsive { background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden; }
      table { width: 100%; border-collapse: collapse; }
      thead { background: #00ADB5; color: white; }
      th, td { padding: 1.2rem; text-align: left; }
      tbody tr:hover { background: #f9f9f9; }
      .badge { padding: 0.4rem 0.9rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600; }
      .badge-cursos { background: #d4edda; color: #155724; }

      .acciones { display: flex; gap: 0.8rem; }
      .btn-icon { padding: 0.6rem 1rem; border: none; border-radius: 8px; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; }
      .btn-editar { background: #17a2b8; color: white; }
      .btn-editar:hover { background: #138496; }
      .btn-eliminar { background: #dc3545; color: white; }
      .btn-eliminar:hover { background: #c82333; }
      .btn-cursos { background: #28a745; color: white; }
      .btn-cursos:hover { background: #218838; }

      .alert { padding: 1rem 1.5rem; border-radius: 10px; margin-bottom: 1.5rem; display: none; border-left: 4px solid; }
      .alert.exito { background: #d4edda; color: #155724; border-left-color: #28a745; }
      .alert.error { background: #f8d7da; color: #721c24; border-left-color: #dc3545; }

      .modal { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 2000; align-items: center; justify-content: center; padding: 1rem; }
      .modal.active { display: flex; }
      .modal-content { background: white; border-radius: 12px; padding: 2rem; max-width: 650px; width: 100%; box-shadow: 0 10px 40px rgba(0,0,0,0.3); }
      .modal-header { font-size: 1.6rem; font-weight: 700; color: #2c3e50; margin-bottom: 1.5rem; }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
      .form-group { margin-bottom: 1.2rem; }
      .form-group.full { grid-column: span 2; }
      label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #2c3e50; }
      input, select { width: 100%; padding: 0.85rem; border: 1.5px solid #ddd; border-radius: 10px; font-size: 1rem; }
      .required { color: #e74c3c; }
      .cursos-list { max-height: 200px; overflow-y: auto; border: 1px solid #ddd; border-radius: 8px; padding: 0.5rem; background: #f9f9f9; }
      .curso-item { padding: 0.6rem; border-bottom: 1px solid #eee; }
      .curso-item:last-child { border-bottom: none; }

      @media (max-width: 768px) {
        .form-grid { grid-template-columns: 1fr; }
        .header-section { flex-direction: column; align-items: flex-start; }
      }
    </style>

    <div class="gestion-estudiantes">
      <div class="header-section">
        <h1>Gestión de Estudiantes</h1>
        <div class="action-buttons">
          <button class="btn btn-primary" id="btn-nuevo">+ Nuevo Estudiante</button>
          <button class="btn btn-secondary" id="btn-volver">Volver</button>
        </div>
      </div>

      <div class="header-stats">
        <div class="stat-box">
          <div class="stat-number" id="total-estudiantes">0</div>
          <div class="stat-label">Total Estudiantes</div>
        </div>
        <div class="stat-box">
          <div class="stat-number" id="con-cursos">0</div>
          <div class="stat-label">Con Cursos</div>
        </div>
      </div>

      <div id="alert" class="alert"></div>

      <div class="filters">
        <div class="search-box">
          <input type="text" id="buscar" placeholder="Buscar por nombres, apellidos o identificación...">
        </div>
      </div>

      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Identificación</th>
              <th>Nombre Completo</th>
              <th>Género</th>
              <th>Teléfono</th>
              <th>Cursos</th>
              <th style="text-align: center;">Acciones</th>
            </tr>
          </thead>
          <tbody id="tabla-estudiantes">
            <tr><td colspan="6" style="text-align:center; padding: 3rem; color:#999;">Cargando estudiantes...</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal para crear/editar estudiante -->
    <div id="modal-estudiante" class="modal">
      <div class="modal-content">
        <div class="modal-header" id="modal-title">Nuevo Estudiante</div>
        <form id="form-estudiante">
          <div class="form-grid">
            <div class="form-group">
              <label>Identificación <span class="required">*</span></label>
              <input type="text" id="input-id" required maxlength="20">
            </div>
            <div class="form-group">
              <label>Nombres <span class="required">*</span></label>
              <input type="text" id="input-nombres" required>
            </div>
            <div class="form-group">
              <label>Apellidos <span class="required">*</span></label>
              <input type="text" id="input-apellidos" required>
            </div>
            <div class="form-group">
              <label>Género <span class="required">*</span></label>
              <select id="input-genero" required>
                <option value="">Seleccionar</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div class="form-group">
              <label>Fecha de Nacimiento <span class="required">*</span></label>
              <input type="date" id="input-nacimiento" required>
            </div>
            <div class="form-group">
              <label>Teléfono</label>
              <input type="text" id="input-telefono" placeholder="Ej: 3001234567">
            </div>
            <div class="form-group full">
              <label>Dirección</label>
              <input type="text" id="input-direccion" placeholder="Calle 123 #45-67">
            </div>
            <div class="form-group full">
              <label>Cursos Inscritos</label>
              <div class="cursos-list" id="lista-cursos-seleccionados">
                <em>Seleccione cursos abajo</em>
              </div>
              <select id="select-cursos" multiple size="5" style="margin-top: 0.5rem;">
                <!-- Cursos se cargan dinámicamente -->
              </select>
              <small>Presiona Ctrl (o Cmd) para seleccionar varios cursos</small>
            </div>
          </div>

          <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
            <button type="button" class="btn btn-secondary" id="btn-cancelar">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar Estudiante</button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Verificar administrador
  const sesion = JSON.parse(localStorage.getItem('sesionActual') || 'null');
  if (!sesion || !sesion.isAdmin) {
    container.innerHTML = `<main style="text-align:center;padding:4rem;color:#B31312;"><h1>Acceso Denegado</h1><p>Solo administradores pueden acceder a esta sección.</p></main>`;
    return container;
  }

  // Elementos DOM
  const modal = container.querySelector('#modal-estudiante');
  const form = container.querySelector('#form-estudiante');
  const tabla = container.querySelector('#tabla-estudiantes');
  const alert = container.querySelector('#alert');
  const buscar = container.querySelector('#buscar');
  const totalEst = container.querySelector('#total-estudiantes');
  const conCursos = container.querySelector('#con-cursos');
  const listaCursosSelect = container.querySelector('#select-cursos');
  const listaSeleccionados = container.querySelector('#lista-cursos-seleccionados');

  let estudianteEditando = null;

  // Cargar cursos disponibles
  function cargarCursosDisponibles() {
    const cursos = JSON.parse(localStorage.getItem('cursos') || '[]');
    listaCursosSelect.innerHTML = '<option value="">-- Sin curso --</option>';
    cursos.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.codigo;
      opt.textContent = `${c.codigo} - ${c.nombre}`;
      listaCursosSelect.appendChild(opt);
    });
  }

  // Mostrar alerta
  function mostrarAlerta(msg, tipo = 'exito') {
    alert.textContent = msg;
    alert.className = `alert ${tipo}`;
    alert.style.display = 'block';
    setTimeout(() => alert.style.display = 'none', 4000);
  }

  // Renderizar tabla
  function renderizarEstudiantes(filtro = '') {
    let estudiantes = JSON.parse(localStorage.getItem('estudiantes') || '[]');
    const cursos = JSON.parse(localStorage.getItem('cursos') || '[]');

    // Estadísticas
    totalEst.textContent = estudiantes.length;
    conCursos.textContent = estudiantes.filter(e => e.cursos && e.cursos.length > 0).length;

    // Filtro
    if (filtro) {
      const f = filtro.toLowerCase();
      estudiantes = estudiantes.filter(e =>
        e.identificacion.includes(f) ||
        `${e.nombres} ${e.apellidos}`.toLowerCase().includes(f)
      );
    }

    if (estudiantes.length === 0) {
      tabla.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:3rem;color:#999;">No hay estudiantes registrados</td></tr>`;
      return;
    }

    tabla.innerHTML = '';
    estudiantes.forEach(est => {
      const cursosEst = est.cursos || [];
      const nombresCursos = cursosEst.map(cod => {
        const c = cursos.find(cur => cur.codigo === cod);
        return c ? c.nombre : cod;
      }).join(', ') || 'Ninguno';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${est.identificacion}</strong></td>
        <td>${est.nombres} ${est.apellidos}</td>
        <td>${est.genero}</td>
        <td>${est.telefono || '-'}</td>
        <td><span class="badge badge-cursos">${cursosEst.length} curso${cursosEst.length !== 1 ? 's' : ''}</span><br>
            <small>${nombresCursos}</small></td>
        <td style="text-align:center;">
          <div class="acciones">
            <button class="btn-icon btn-editar" data-id="${est.identificacion}">Editar</button>
            <button class="btn-icon btn-cursos" data-id="${est.identificacion}">Cursos</button>
            <button class="btn-icon btn-eliminar" data-id="${est.identificacion}">Eliminar</button>
          </div>
        </td>
      `;
      tabla.appendChild(tr);
    });

    // Eventos de botones
    tabla.querySelectorAll('.btn-editar').forEach(b => b.onclick = () => editarEstudiante(b.dataset.id));
    tabla.querySelectorAll('.btn-cursos').forEach(b => b.onclick = () => editarCursosEstudiante(b.dataset.id));
    tabla.querySelectorAll('.btn-eliminar').forEach(b => b.onclick = () => eliminarEstudiante(b.dataset.id));
  }

  function abrirModal(est = null) {
    estudianteEditando = est;
    form.reset();
    listaSeleccionados.innerHTML = '<em>Seleccione cursos abajo</em>';
    container.querySelector('#modal-title').textContent = est ? 'Editar Estudiante' : 'Nuevo Estudiante';

    if (est) {
      document.getElementById('input-id').value = est.identificacion;
      document.getElementById('input-id').disabled = true; // No se puede cambiar ID
      document.getElementById('input-nombres').value = est.nombres;
      document.getElementById('input-apellidos').value = est.apellidos;
      document.getElementById('input-genero').value = est.genero;
      document.getElementById('input-nacimiento').value = est.fechaNacimiento;
      document.getElementById('input-telefono').value = est.telefono || '';
      document.getElementById('input-direccion').value = est.direccion || '';

      // Marcar cursos actuales
      const opciones = listaCursosSelect.options;
      for (let i = 0; i < opciones.length; i++) {
        opciones[i].selected = (est.cursos || []).includes(opciones[i].value);
      }
      actualizarListaSeleccionados();
    }

    modal.classList.add('active');
  }

  function actualizarListaSeleccionados() {
    const seleccionados = Array.from(listaCursosSelect.selectedOptions).map(o => o.textContent);
    listaSeleccionados.innerHTML = seleccionados.length > 0
      ? seleccionados.map(c => `<div class="curso-item">${c}</div>`).join('')
      : '<em>Ningún curso seleccionado</em>';
  }

  function editarEstudiante(id) {
    const estudiantes = JSON.parse(localStorage.getItem('estudiantes') || '[]');
    const est = estudiantes.find(e => e.identificacion === id);
    if (est) abrirModal(est);
  }

  function editarCursosEstudiante(id) {
    const estudiantes = JSON.parse(localStorage.getItem('estudiantes') || '[]');
    const est = estudiantes.find(e => e.identificacion === id);
    if (est) abrirModal(est);
  }

  function eliminarEstudiante(id) {
    if (!confirm(`¿Eliminar al estudiante con ID ${id}?`)) return;
    let estudiantes = JSON.parse(localStorage.getItem('estudiantes') || '[]');
    estudiantes = estudiantes.filter(e => e.identificacion !== id);
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
    mostrarAlerta('Estudiante eliminado correctamente', 'exito');
    renderizarEstudiantes(buscar.value);
  }

  // Eventos
  container.querySelector('#btn-nuevo').onclick = () => abrirModal();
  container.querySelector('#btn-cancelar').onclick = () => modal.classList.remove('active');
  container.querySelector('#btn-volver').onclick = () => history.back();

  listaCursosSelect.onchange = actualizarListaSeleccionados;

  form.onsubmit = (e) => {
    e.preventDefault();

    const id = document.getElementById('input-id').value.trim();
    const nombres = document.getElementById('input-nombres').value.trim();
    const apellidos = document.getElementById('input-apellidos').value.trim();
    const genero = document.getElementById('input-genero').value;
    const nacimiento = document.getElementById('input-nacimiento').value;
    const telefono = document.getElementById('input-telefono').value.trim();
    const direccion = document.getElementById('input-direccion').value.trim();
    const cursosSeleccionados = Array.from(listaCursosSelect.selectedOptions).map(o => o.value);

    if (!id || !nombres || !apellidos || !genero || !nacimiento) {
      mostrarAlerta('Los campos obligatorios son requeridos', 'error');
      return;
    }

    let estudiantes = JSON.parse(localStorage.getItem('estudiantes') || '[]');

    if (!estudianteEditando) {
      // Crear nuevo
      if (estudiantes.some(e => e.identificacion === id)) {
        mostrarAlerta('Ya existe un estudiante con esta identificación', 'error');
        return;
      }
      estudiantes.push({
        identificacion: id,
        nombres,
        apellidos,
        genero,
        fechaNacimiento: nacimiento,
        telefono,
        direccion,
        cursos: cursosSeleccionados,
        fechaRegistro: new Date().toLocaleDateString('es-CO')
      });
      mostrarAlerta('Estudiante creado exitosamente', 'exito');
    } else {
      // Editar
      const index = estudiantes.findIndex(e => e.identificacion === estudianteEditando.identificacion);
      estudiantes[index] = {
        ...estudiantes[index],
        nombres, apellidos, genero, fechaNacimiento: nacimiento,
        telefono, direccion, cursos: cursosSeleccionados
      };
      mostrarAlerta('Estudiante actualizado correctamente', 'exito');
    }

    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
    modal.classList.remove('active');
    renderizarEstudiantes(buscar.value);
  };

  buscar.oninput = (e) => renderizarEstudiantes(e.target.value);

  // Cerrar modal al hacer clic fuera
  modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('active'); };

  // Inicializar
  cargarCursosDisponibles();
  renderizarEstudiantes();

  return container;
}