// js/modules/gestionProfesores.js
// Módulo para gestionar profesores (ver, editar, eliminar)
// Solo disponible para administradores

export function renderGestionProfesores() {
  const container = document.createElement('section');
  container.id = 'section-gestion-profesores';
  
  container.innerHTML = `
    <style>
      .gestion-profesores {
        max-width: 1400px;
        margin: 0 auto;
        padding: 2rem;
        font-family: 'Segoe UI', sans-serif;
        background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
        min-height: 100vh;
      }
      #buscar{
        margin-top:2%;
      }
      .header-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2.5rem;
        flex-wrap: wrap;
        gap: 1.5rem;
      }
      
      .header-section h1 {
        color: var(--primary-variant, #00ADB5);
        font-size: 2.8rem;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      
      .header-stats {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
      }
      
      .stat-box {
        background: white;
        padding: 1.2rem;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        text-align: center;
        min-width: 150px;
      }
      
      .stat-number {
        font-size: 2rem;
        font-weight: 700;
        color: var(--primary-variant, #00ADB5);
      }
      
      .stat-label {
        font-size: 0.9rem;
        color: #666;
        margin-top: 0.3rem;
      }
      
      .action-buttons {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
      
      .btn {
        padding: 0.9rem 1.8rem;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.6rem;
        white-space: nowrap;
      }
      
      .btn-primary {
        background: var(--primary-variant, #00ADB5);
        color: white;
      }
      
      .btn-primary:hover {
        background: #009aa2;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,173,181,0.3);
      }
      
      .btn-secondary {
        background: #6c757d;
        color: white;
      }
      
      .btn-secondary:hover {
        background: #5a6268;
      }
      
      .alert {
        padding: 1rem 1.5rem;
        border-radius: 10px;
        margin-bottom: 1.5rem;
        display: none;
        animation: slideDown 0.3s ease;
        border-left: 4px solid;
      }
      
      .alert.exito {
        background: #d4edda;
        color: #155724;
        border-left-color: #28a745;
      }
      
      .alert.error {
        background: #f8d7da;
        color: #721c24;
        border-left-color: #dc3545;
      }
      
      .alert.info {
        background: #d1ecf1;
        color: #0c5460;
        border-left-color: #17a2b8;
      }
      
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .filters {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
      }
      
      .search-box {
        flex: 1;
        min-width: 250px;
      }
      
      .search-box input {
        width: 100%;
        padding: 0.9rem 1.2rem;
        border: 1.5px solid #ddd;
        border-radius: 10px;
        font-size: 1rem;
        transition: all 0.3s ease;
      }
      
      .search-box input:focus {
        outline: none;
        border-color: var(--primary-variant, #00ADB5);
        box-shadow: 0 0 0 3px rgba(0,173,181,0.15);
      }
      
      .table-responsive {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        overflow: hidden;
      }
      
      table {
        width: 100%;
        border-collapse: collapse;
      }
      
      thead {
        background: var(--primary-variant, #00ADB5);
        color: white;
      }
      
      th {
        padding: 1.2rem;
        text-align: left;
        font-weight: 600;
        font-size: 0.95rem;
      }
      
      td {
        padding: 1.2rem;
        border-bottom: 1px solid #f0f0f0;
      }
      
      tbody tr:hover {
        background: #f9f9f9;
      }
      
      .profesor-nombre {
        font-weight: 600;
        color: #2c3e50;
      }
      
      .profesor-email {
        color: #666;
        font-size: 0.9rem;
      }
      
      .badge {
        display: inline-block;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        white-space: nowrap;
      }
      
      .badge-especialidad {
        background: #e7f3ff;
        color: #0066cc;
      }
      
      .badge-asociado {
        background: #d4edda;
        color: #155724;
      }
      
      .badge-sin-cursos {
        background: #f8f9fa;
        color: #666;
      }
      
      .acciones {
        display: flex;
        gap: 0.8rem;
      }

      .info-cursos {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.4rem 0.8rem;
        background: #e8f4f8;
        color: #0066cc;
        border-radius: 6px;
        font-size: 0.85rem;
        font-weight: 500;
        margin-top: 0.3rem;
      }

      .info-cursos::before {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #0066cc;
        border-radius: 50%;
      }
      
      .btn-icon {
        padding: 0.6rem 1rem;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 0.4rem;
      }
      
      .btn-editar {
        background: #17a2b8;
        color: white;
      }
      
      .btn-editar:hover {
        background: #138496;
        transform: scale(1.05);
      }
      
      .btn-eliminar {
        background: #dc3545;
        color: white;
      }
      
      .btn-eliminar:hover:not(:disabled) {
        background: #c82333;
        transform: scale(1.05);
      }
      
      .btn-eliminar:disabled {
        background: #e8e8e8;
        cursor: not-allowed;
        opacity: 0.7;
        position: relative;
      }

      .btn-eliminar:disabled::after {
        content: attr(data-tooltip);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(-8px);
        background: #2c3e50;
        color: white;
        padding: 0.6rem 1rem;
        border-radius: 8px;
        font-size: 0.85rem;
        font-weight: 500;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        z-index: 1000;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      }

      .btn-eliminar:disabled::before {
        content: '';
        position: absolute;
        bottom: calc(100% - 2px);
        left: 50%;
        transform: translateX(-50%);
        border: 6px solid transparent;
        border-top-color: #2c3e50;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        z-index: 1000;
      }

      .btn-eliminar:disabled:hover::after,
      .btn-eliminar:disabled:hover::before {
        opacity: 1;
      }
      
      .empty-state {
        text-align: center;
        padding: 4rem 2rem;
        background: white;
        border-radius: 12px;
        color: #999;
      }
      
      .empty-state p {
        font-size: 1.2rem;
        margin-bottom: 1rem;
      }
      
      .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 2000;
        align-items: center;
        justify-content: center;
        padding: 1rem;
      }
      
      .modal.active {
        display: flex;
      }
      
      .modal-content {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        max-width: 600px;
        width: 100%;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        animation: slideDown 0.3s ease;
      }
      
      .modal-header {
        font-size: 1.6rem;
        font-weight: 700;
        color: #2c3e50;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.8rem;
      }
      
      .modal-body {
        color: #555;
        line-height: 1.6;
        margin-bottom: 2rem;
      }
      
      .modal-footer {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
      }
      
      @media (max-width: 768px) {
        .header-section {
          flex-direction: column;
          align-items: flex-start;
        }
        
        .gestion-profesores {
          padding: 1rem;
        }
        
        table {
          font-size: 0.9rem;
        }
        
        th, td {
          padding: 0.8rem;
        }
        
        .btn-icon {
          padding: 0.5rem 0.8rem;
          font-size: 0.75rem;
        }
        
        .acciones {
          flex-direction: column;
        }
      }
    </style>

    <div class="gestion-profesores">
      <!-- Header -->
      <div class="header-section">
        <h1>Gestion de Profesores</h1>
        <div class="action-buttons">
          <button class="btn btn-primary" id="btn-nuevo">+ Nuevo Profesor</button>
          <button class="btn btn-secondary" id="btn-volver">Volver</button>
        </div>
      </div>

      <!-- Estadísticas -->
      <div class="header-stats">
        <div class="stat-box">
          <div class="stat-number" id="total-profesores">0</div>
          <div class="stat-label">Total Profesores</div>
        </div>
        <div class="stat-box">
          <div class="stat-number" id="profesores-activos">0</div>
          <div class="stat-label">Con Cursos</div>
        </div>
        <div class="stat-box">
          <div class="stat-number" id="profesores-sin-cursos">0</div>
          <div class="stat-label">Sin Cursos</div>
        </div>
      </div>

      <!-- Alertas -->
      <div id="alert" class="alert"></div>

      <!-- Búsqueda -->
      <div class="filters">
        <div class="search-box">
          <input type="text" id="buscar" placeholder="Buscar por nombre o email...">
        </div>
      </div>

      <!-- Tabla -->
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Especialidad</th>
              <th>Estado</th>
              <th style="text-align: center;">Acciones</th>
            </tr>
          </thead>
          <tbody id="tabla-profesores">
            <tr>
              <td colspan="5" style="text-align: center; padding: 2rem; color: #999;">Cargando...</td>
            </tr>
          </tbody>
        </table>
        <div id="empty-state" class="empty-state" style="display: none;">
          <p>No hay profesores registrados</p>
          <p style="font-size: 0.95rem; color: #999;">Haz clic en "+ Nuevo Profesor" para crear uno</p>
        </div>
      </div>
    </div>

    <!-- Modal para nuevo/editar profesor -->
    <div id="modal-profesor" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <span id="modal-title">Nuevo Profesor</span>
        </div>
        <form id="form-profesor">
          <div style="margin-bottom: 1.2rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #2c3e50;">
              Nombre Completo <span style="color: #e74c3c;">*</span>
            </label>
            <input type="text" id="input-nombre" placeholder="Ej: María González" required style="width: 100%; padding: 0.85rem; border: 1.5px solid #ddd; border-radius: 10px; font-size: 1rem;">
          </div>

          <div style="margin-bottom: 1.2rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #2c3e50;">
              Email <span style="color: #e74c3c;">*</span>
            </label>
            <input type="email" id="input-email" placeholder="profesor@abc.edu" required style="width: 100%; padding: 0.85rem; border: 1.5px solid #ddd; border-radius: 10px; font-size: 1rem;">
          </div>

          <div style="margin-bottom: 1.2rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #2c3e50;">
              Especialidad
            </label>
            <input type="text" id="input-especialidad" placeholder="Ej: Desarrollo Frontend" style="width: 100%; padding: 0.85rem; border: 1.5px solid #ddd; border-radius: 10px; font-size: 1rem;">
          </div>

          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #2c3e50;">
              Biografía
            </label>
            <textarea id="input-bio" placeholder="Breve descripción..." style="width: 100%; padding: 0.85rem; border: 1.5px solid #ddd; border-radius: 10px; font-size: 1rem; min-height: 100px; font-family: inherit;"></textarea>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="btn-cancelar">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal para confirmar eliminación -->
    <div id="modal-eliminar" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          Confirmar Eliminacion
        </div>
        <div class="modal-body" id="modal-eliminar-texto">
          ¿Estás seguro de que deseas eliminar a este profesor?
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" id="btn-eliminar-cancelar">Cancelar</button>
          <button class="btn btn-primary" id="btn-eliminar-confirmar" style="background: #dc3545;">Eliminar</button>
        </div>
      </div>
    </div>
  `;

  // Verificación de admin
  const sesion = JSON.parse(localStorage.getItem('sesionActual') || 'null');
  if (!sesion || !sesion.isAdmin) {
    container.innerHTML = `
      <main style="text-align: center; padding: 3rem; color: #B31312;">
        <h1>Acceso Restringido</h1>
        <p>Esta sección es exclusiva para administradores.</p>
        <button class="btn btn-secondary" onclick="location.reload()" style="margin-top: 1rem;">Volver al Inicio</button>
      </main>
    `;
    return container;
  }

  // Elementos del DOM
  const modalProfesor = container.querySelector('#modal-profesor');
  const modalEliminar = container.querySelector('#modal-eliminar');
  const formProfesor = container.querySelector('#form-profesor');
  const inputNombre = container.querySelector('#input-nombre');
  const inputEmail = container.querySelector('#input-email');
  const inputEspecialidad = container.querySelector('#input-especialidad');
  const inputBio = container.querySelector('#input-bio');
  const tablaProfesores = container.querySelector('#tabla-profesores');
  const emptyState = container.querySelector('#empty-state');
  const alert = container.querySelector('#alert');
  const btnNuevo = container.querySelector('#btn-nuevo');
  const btnCancelar = container.querySelector('#btn-cancelar');
  const btnVolver = container.querySelector('#btn-volver');
  const btnBuscar = container.querySelector('#buscar');
  const totalProfesores = container.querySelector('#total-profesores');
  const profesoresActivos = container.querySelector('#profesores-activos');
  const profesoresSinCursos = container.querySelector('#profesores-sin-cursos');
  const btnEliminarCancelar = container.querySelector('#btn-eliminar-cancelar');
  const btnEliminarConfirmar = container.querySelector('#btn-eliminar-confirmar');

  let profesorEnEdicion = null;
  let profesorEnEliminacion = null;

  // Funciones auxiliares
  function mostrarAlerta(mensaje, tipo) {
    alert.textContent = mensaje;
    alert.className = `alert ${tipo}`;
    alert.style.display = 'block';
    setTimeout(() => {
      alert.style.display = 'none';
    }, 4000);
  }

  function cargarProfesores(filtro = '') {
    let profesores = JSON.parse(localStorage.getItem('profesores') || '[]');
    let cursos = JSON.parse(localStorage.getItem('cursos') || '[]');

    // Validar que sean arrays
    if (!Array.isArray(profesores)) {
      profesores = Object.values(profesores || {});
    }
    if (!Array.isArray(cursos)) {
      cursos = Object.values(cursos || {});
    }

    // Actualizar estadísticas
    const conCursos = profesores.filter(p => cursos.some(c => c.docente === p.correo)).length;
    totalProfesores.textContent = profesores.length;
    profesoresActivos.textContent = conCursos;
    profesoresSinCursos.textContent = profesores.length - conCursos;

    // Filtrar - búsqueda insensible a mayúsculas/minúsculas
    let filtrados = profesores;
    if (filtro.trim()) {
      const filtroMinusculas = filtro.trim().toLowerCase();
      filtrados = profesores.filter(p => {
        const nombre = (p.nombre || '').toLowerCase();
        const correo = (p.correo || '').toLowerCase();
        const especialidad = (p.especialidad || '').toLowerCase();
        
        // Buscar en nombre, correo o especialidad
        return nombre.includes(filtroMinusculas) || 
               correo.includes(filtroMinusculas) ||
               especialidad.includes(filtroMinusculas);
      });
    }

    if (filtrados.length === 0) {
      tablaProfesores.parentElement.style.display = 'none';
      emptyState.style.display = 'block';
      return;
    }

    tablaProfesores.parentElement.style.display = 'block';
    emptyState.style.display = 'none';
    tablaProfesores.innerHTML = '';

    filtrados.forEach(profesor => {
      const tieneCursos = cursos.some(c => c.docente === profesor.correo);
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>
          <div class="profesor-nombre">${profesor.nombre}</div>
          <div class="profesor-email">${profesor.correo}</div>
          ${tieneCursos ? '<div class="info-cursos">Tiene cursos asignados</div>' : ''}
        </td>
        <td>${profesor.correo}</td>
        <td>
          <span class="badge badge-especialidad">${profesor.especialidad}</span>
        </td>
        <td>
          <span class="badge ${tieneCursos ? 'badge-asociado' : 'badge-sin-cursos'}">
            ${tieneCursos ? 'Activo' : 'Inactivo'}
          </span>
        </td>
        <td style="text-align: center;">
          <div class="acciones">
            <button class="btn-icon btn-editar" data-id="${profesor.id}">Editar</button>
            <button class="btn-icon btn-eliminar" data-id="${profesor.id}" ${tieneCursos ? 'disabled data-tooltip="Este profesor tiene cursos asignados. Elimina sus cursos primero"' : ''}>Eliminar</button>
          </div>
        </td>
      `;
      tablaProfesores.appendChild(fila);
    });

    // Event listeners
    tablaProfesores.querySelectorAll('.btn-editar').forEach(btn => {
      btn.addEventListener('click', () => abrirEditar(btn.dataset.id));
    });

    tablaProfesores.querySelectorAll('.btn-eliminar:not(:disabled)').forEach(btn => {
      btn.addEventListener('click', () => abrirEliminar(btn.dataset.id));
    });
  }

  function abrirEditar(id) {
    let profesores = JSON.parse(localStorage.getItem('profesores') || '[]');
    
    // Validar que sea array
    if (!Array.isArray(profesores)) {
      profesores = Object.values(profesores || {});
    }
    
    const profesor = profesores.find(p => p.id === id);
    if (!profesor) return;

    profesorEnEdicion = id;
    inputNombre.value = profesor.nombre;
    inputEmail.value = profesor.correo;
    inputEspecialidad.value = profesor.especialidad;
    inputBio.value = profesor.bio;

    container.querySelector('#modal-title').textContent = 'Editar Profesor';
    modalProfesor.classList.add('active');
  }

  function abrirEliminar(id) {
    let profesores = JSON.parse(localStorage.getItem('profesores') || '[]');
    
    // Validar que sea array
    if (!Array.isArray(profesores)) {
      profesores = Object.values(profesores || {});
    }
    
    const profesor = profesores.find(p => p.id === id);
    if (!profesor) return;

    profesorEnEliminacion = id;
    container.querySelector('#modal-eliminar-texto').textContent = 
      `¿Estás seguro de que deseas eliminar al profesor "${profesor.nombre}"? Esta acción no se puede deshacer.`;
    modalEliminar.classList.add('active');
  }

  function cerrarModales() {
    modalProfesor.classList.remove('active');
    modalEliminar.classList.remove('active');
    profesorEnEdicion = null;
    profesorEnEliminacion = null;
  }

  // Event listeners
  btnNuevo.addEventListener('click', () => {
    profesorEnEdicion = null;
    formProfesor.reset();
    container.querySelector('#modal-title').textContent = 'Nuevo Profesor';
    modalProfesor.classList.add('active');
  });

  btnCancelar.addEventListener('click', cerrarModales);
  btnEliminarCancelar.addEventListener('click', cerrarModales);

  formProfesor.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = inputNombre.value.trim();
    const email = inputEmail.value.trim().toLowerCase();
    const especialidad = inputEspecialidad.value.trim() || 'No especificada';
    const bio = inputBio.value.trim() || 'Sin biografía';

    if (!nombre || !email) {
      mostrarAlerta('Nombre y email son obligatorios', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      mostrarAlerta('Email invalido', 'error');
      return;
    }

    let profesores = JSON.parse(localStorage.getItem('profesores') || '[]');
    
    // Validar que sea array
    if (!Array.isArray(profesores)) {
      profesores = Object.values(profesores || {});
    }

    if (profesorEnEdicion) {
      // Editar
      const profesor = profesores.find(p => p.id === profesorEnEdicion);
      if (!profesor) return;

      if (email !== profesor.correo && profesores.some(p => p.correo === email)) {
        mostrarAlerta('Este email ya esta en uso', 'error');
        return;
      }

      profesor.nombre = nombre;
      profesor.correo = email;
      profesor.especialidad = especialidad;
      profesor.bio = bio;

      localStorage.setItem('profesores', JSON.stringify(profesores));
      mostrarAlerta(`Profesor "${nombre}" actualizado exitosamente`, 'exito');
    } else {
      // Crear nuevo
      if (profesores.some(p => p.correo === email)) {
        mostrarAlerta('Ya existe un profesor con este email', 'error');
        return;
      }

      const nuevoProfesor = {
        id: Date.now().toString(),
        nombre,
        correo: email,
        especialidad,
        bio,
        fechaRegistro: new Date().toLocaleDateString('es-CO')
      };

      profesores.push(nuevoProfesor);
      localStorage.setItem('profesores', JSON.stringify(profesores));
      mostrarAlerta(`Profesor "${nombre}" agregado exitosamente`, 'exito');
    }

    cerrarModales();
    cargarProfesores(btnBuscar.value);
  });

  btnEliminarConfirmar.addEventListener('click', () => {
    if (!profesorEnEliminacion) return;

    let profesores = JSON.parse(localStorage.getItem('profesores') || '[]');
    
    // Validar que sea array
    if (!Array.isArray(profesores)) {
      profesores = Object.values(profesores || {});
    }
    
    const profesor = profesores.find(p => p.id === profesorEnEliminacion);

    if (profesor) {
      profesores.splice(profesores.indexOf(profesor), 1);
      localStorage.setItem('profesores', JSON.stringify(profesores));
      mostrarAlerta(`Profesor "${profesor.nombre}" eliminado exitosamente`, 'exito');
    }

    cerrarModales();
    cargarProfesores(btnBuscar.value);
  });

  btnBuscar.addEventListener('input', (e) => {
    const filtro = e.target.value.trim();
    cargarProfesores(filtro);
  });

  btnVolver.addEventListener('click', async () => {
    const { renderCursos } = await import('./cursos.js');
    const sectionHome = document.getElementById('section-home');
    if (sectionHome) {
      sectionHome.innerHTML = '';
      sectionHome.appendChild(renderCursos());
    }
  });

  // Cerrar modal al hacer clic fuera
  modalProfesor.addEventListener('click', (e) => {
    if (e.target === modalProfesor) cerrarModales();
  });

  modalEliminar.addEventListener('click', (e) => {
    if (e.target === modalEliminar) cerrarModales();
  });

  // Inicializar
  cargarProfesores();

  return container;
}
