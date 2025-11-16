// js/admin/gestionAdministrativos.js
import { validadores } from '../utils/validadores.js';

export function renderGestionAdministrativos() {
  const container = document.createElement('section');
  container.id = 'section-gestion-administrativos';

  container.innerHTML = `
    <style>
      .gestion-admin-modern {
        max-width: 1400px;
        margin: 0 auto;
        padding: 2rem;
        font-family: 'Segoe UI', sans-serif;
        background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
        min-height: 100vh;
      }

      .header-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2.5rem;
        flex-wrap: wrap;
        gap: 1.5rem;
      }

      .header-section h2 {
        color: var(--primary-variant, #00ADB5);
        font-size: 2.8rem;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .header-subtitle {
        color: #666;
        font-size: 0.95rem;
        margin-top: 0.5rem;
      }

      .header-stats {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
        margin-bottom: 2rem;
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

      .content-card {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        margin-bottom: 2rem;
      }

      .form-section-title {
        font-size: 1.4rem;
        font-weight: 700;
        color: #2c3e50;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.8rem;
      }

      .admin-form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.2rem;
        margin-bottom: 1.5rem;
      }

      .form-group {
        display: flex;
        flex-direction: column;
      }

      .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #2c3e50;
        font-size: 0.95rem;
      }

      .form-control {
        width: 100%;
        padding: 0.85rem 1rem;
        border: 1.5px solid #ddd;
        border-radius: 10px;
        font-size: 1rem;
        transition: all 0.3s ease;
        font-family: inherit;
      }

      .form-control:focus {
        outline: none;
        border-color: var(--primary-variant, #00ADB5);
        box-shadow: 0 0 0 3px rgba(0,173,181,0.15);
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
        transform: translateY(-2px);
      }

      .btn-sm {
        padding: 0.6rem 1rem;
        font-size: 0.85rem;
      }

      .btn-danger {
        background: #dc3545;
        color: white;
      }

      .btn-danger:hover {
        background: #c82333;
        transform: scale(1.05);
      }

      .alert {
        padding: 1rem 1.5rem;
        border-radius: 10px;
        margin-bottom: 1.5rem;
        animation: slideDown 0.3s ease;
        border-left: 4px solid;
        display: flex;
        align-items: center;
        gap: 0.8rem;
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

      .list-section-title {
        font-size: 1.4rem;
        font-weight: 700;
        color: #2c3e50;
        margin-bottom: 1.2rem;
      }

      .admin-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .admin-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.2rem;
        border-radius: 12px;
        background: white;
        border: 1px solid #e8e8e8;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      }

      .admin-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        border-color: var(--primary-variant, #00ADB5);
      }

      .admin-item .meta {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        flex: 1;
      }

      .admin-item .meta .names {
        font-weight: 700;
        color: #0f3446;
        font-size: 1.1rem;
      }

      .admin-item .meta .small {
        color: #6b7280;
        font-size: 0.92rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .admin-item .meta .small::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 4px;
        background: #6b7280;
        border-radius: 50%;
      }

      .admin-item .meta .small:first-of-type::before {
        display: none;
      }

      .badge {
        display: inline-block;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        white-space: nowrap;
        background: #e7f3ff;
        color: #0066cc;
        margin-left: 0.5rem;
      }

      .admin-actions {
        display: flex;
        gap: 0.8rem;
        align-items: center;
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
        margin-bottom: 0.5rem;
      }

      /* Modal */
      .modal-overlay-crear {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        animation: fadeIn 0.3s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .modal-contenedor-crear {
        background: white;
        border-radius: 12px;
        padding: 0;
        max-width: 600px;
        width: 100%;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        animation: slideUp 0.3s ease;
        max-height: 90vh;
        overflow-y: auto;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .modal-header {
        font-size: 1.6rem;
        font-weight: 700;
        color: #2c3e50;
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e8e8e8;
      }

      .modal-subtitle {
        padding: 0.5rem 2rem;
        color: #666;
        font-size: 0.95rem;
        background: #f8f9fa;
      }

      .modal-body {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
      }

      .modal-footer {
        padding: 1.5rem 2rem;
        border-top: 1px solid #e8e8e8;
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
      }

      @media (max-width: 768px) {
        .gestion-admin-modern {
          padding: 1rem;
        }

        .header-section {
          flex-direction: column;
          align-items: flex-start;
        }

        .header-section h2 {
          font-size: 2rem;
        }

        .admin-form-grid {
          grid-template-columns: 1fr;
        }

        .admin-item {
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }

        .admin-actions {
          width: 100%;
          justify-content: flex-end;
        }

        .modal-contenedor-crear {
          margin: 1rem;
          max-height: 95vh;
        }
      }
    </style>

    <div class="gestion-admin-modern">
      <!-- Header -->
      <div class="header-section">
        <div>
          <h2>Gestión de Administrativos</h2>
          <div class="header-subtitle">Crea, edita y administra cuentas administrativas</div>
        </div>
      </div>

      <!-- Estadísticas -->
      <div class="header-stats">
        <div class="stat-box">
          <div class="stat-number" id="total-admins">0</div>
          <div class="stat-label">Total Administrativos</div>
        </div>
      </div>

      <!-- Formulario -->
      <div class="content-card">
        <div class="form-section-title">Nuevo Administrativo</div>
        
        <form id="form-nuevo-admin" class="admin-form-grid">
          <div class="form-group">
            <label>Identificación <span style="color: #e74c3c;">*</span></label>
            <input id="admin-id" class="form-control" placeholder="Número de identificación" />
          </div>
          <div class="form-group">
            <label>Nombres <span style="color: #e74c3c;">*</span></label>
            <input id="admin-nombres" class="form-control" placeholder="Nombres" />
          </div>
          <div class="form-group">
            <label>Apellidos <span style="color: #e74c3c;">*</span></label>
            <input id="admin-apellidos" class="form-control" placeholder="Apellidos" />
          </div>
          <div class="form-group">
            <label>Email <span style="color: #e74c3c;">*</span></label>
            <input id="admin-email" class="form-control" placeholder="correo@dominio.com" />
          </div>
          <div class="form-group">
            <label>Teléfono</label>
            <input id="admin-telefono" class="form-control" placeholder="+57 300 0000000" />
          </div>
          <div class="form-group">
            <label>Cargo</label>
            <input id="admin-cargo" class="form-control" placeholder="Coordinador / Secretaria" />
          </div>
        </form>

        <div class="action-buttons">
          <button id="btn-crear-admin" class="btn btn-primary">Crear Administrativo</button>
          <button id="btn-reset-admin" class="btn btn-secondary">Limpiar</button>
        </div>
      </div>

      <!-- Listado -->
      <div class="content-card">
        <div class="list-section-title">Listado de Administrativos</div>
        <div id="administrativos-list" class="admin-list"></div>
      </div>
    </div>
  `;

  // State and storage
  const storageKey = 'administrativos';
  let administrativos = JSON.parse(localStorage.getItem(storageKey) || '[]');

  const form = container.querySelector('#form-nuevo-admin');
  const inputId = container.querySelector('#admin-id');
  const inputNombres = container.querySelector('#admin-nombres');
  const inputApellidos = container.querySelector('#admin-apellidos');
  const inputEmail = container.querySelector('#admin-email');
  const inputTelefono = container.querySelector('#admin-telefono');
  const inputCargo = container.querySelector('#admin-cargo');
  const btnCrear = container.querySelector('#btn-crear-admin');
  const btnReset = container.querySelector('#btn-reset-admin');
  const listContainer = container.querySelector('#administrativos-list');
  const totalAdmins = container.querySelector('#total-admins');

  function mostrarMensaje(texto, tipo = 'exito') {
    const existingAlert = container.querySelector('.alert');
    if (existingAlert) existingAlert.remove();

    const msg = document.createElement('div');
    msg.className = `alert ${tipo}`;
    msg.innerHTML = `
      <span style="font-size: 1.2rem;">${tipo === 'error' ? '⚠️' : '✓'}</span>
      <span>${texto}</span>
    `;
    
    const firstCard = container.querySelector('.content-card');
    firstCard.parentNode.insertBefore(msg, firstCard);
    
    setTimeout(() => msg.remove(), 4000);
  }

  function persist() {
    localStorage.setItem(storageKey, JSON.stringify(administrativos));
    actualizarEstadisticas();
  }

  function actualizarEstadisticas() {
    totalAdmins.textContent = administrativos.length;
  }

  function resetForm() {
    inputId.value = '';
    inputNombres.value = '';
    inputApellidos.value = '';
    inputEmail.value = '';
    inputTelefono.value = '';
    inputCargo.value = '';
  }

  function renderList() {
    if (administrativos.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-state">
          <p>No hay administrativos registrados</p>
          <p style="font-size: 0.95rem; color: #999;">Completa el formulario para crear uno</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = '';
    administrativos.forEach(admin => {
      const item = document.createElement('div');
      item.className = 'admin-item';
      item.innerHTML = `
        <div class="meta">
          <div class="names">${admin.nombres} ${admin.apellidos}</div>
          <div class="small">ID: ${admin.identificacion}</div>
          <div class="small">
            ${admin.email}
            ${admin.cargo ? `<span class="badge">${admin.cargo}</span>` : ''}
          </div>
          ${admin.telefono ? `<div class="small">${admin.telefono}</div>` : ''}
        </div>
        <div class="admin-actions">
          <button class="btn btn-secondary btn-sm" data-edit="${admin.identificacion}">Editar</button>
          <button class="btn btn-danger btn-sm" data-del="${admin.identificacion}">Eliminar</button>
        </div>
      `;

      listContainer.appendChild(item);

      item.querySelector('[data-del]').addEventListener('click', () => {
        if (!confirm(`¿Eliminar administrativo ${admin.nombres} ${admin.apellidos}?`)) return;
        administrativos = administrativos.filter(a => a.identificacion !== admin.identificacion);
        persist();
        renderList();
        mostrarMensaje('Administrativo eliminado exitosamente', 'exito');
      });

      item.querySelector('[data-edit]').addEventListener('click', () => {
        openEditModal(admin);
      });
    });
  }

  function openEditModal(admin) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay-crear';
    const modal = document.createElement('div');
    modal.className = 'modal-contenedor-crear';
    modal.innerHTML = `
      <div class="modal-header">✏️ Editar Administrativo</div>
      <div class="modal-subtitle">ID: ${admin.identificacion}</div>
      <form class="modal-body">
        <div class="form-group">
          <label>Identificación</label>
          <input id="edit-id" class="form-control" value="${admin.identificacion}" disabled />
        </div>
        <div class="form-group">
          <label>Nombres <span style="color: #e74c3c;">*</span></label>
          <input id="edit-nombres" class="form-control" value="${admin.nombres}" />
        </div>
        <div class="form-group">
          <label>Apellidos <span style="color: #e74c3c;">*</span></label>
          <input id="edit-apellidos" class="form-control" value="${admin.apellidos}" />
        </div>
        <div class="form-group">
          <label>Email <span style="color: #e74c3c;">*</span></label>
          <input id="edit-email" class="form-control" value="${admin.email}" />
        </div>
        <div class="form-group">
          <label>Teléfono</label>
          <input id="edit-telefono" class="form-control" value="${admin.telefono}" />
        </div>
        <div class="form-group">
          <label>Cargo</label>
          <input id="edit-cargo" class="form-control" value="${admin.cargo}" />
        </div>
      </form>
      <div class="modal-footer">
        <button class="btn btn-secondary" id="modal-cancel">Cancelar</button>
        <button class="btn btn-primary" id="modal-save">Guardar</button>
      </div>
    `;
    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);

    const inNombres = modal.querySelector('#edit-nombres');
    const inApellidos = modal.querySelector('#edit-apellidos');
    const inEmail = modal.querySelector('#edit-email');
    const inTelefono = modal.querySelector('#edit-telefono');
    const inCargo = modal.querySelector('#edit-cargo');
    const btnCancel = modal.querySelector('#modal-cancel');
    const btnSave = modal.querySelector('#modal-save');

    function close() { modalOverlay.remove(); }
    btnCancel.addEventListener('click', close);
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) close(); });

    btnSave.addEventListener('click', () => {
      const nombres = inNombres.value.trim();
      const apellidos = inApellidos.value.trim();
      const email = inEmail.value.trim();
      const telefono = inTelefono.value.trim();
      const cargo = inCargo.value.trim();
      
      if (!validadores.isNotEmpty(nombres) || !validadores.isNotEmpty(apellidos)) {
        alert('Nombres y apellidos son requeridos');
        return;
      }
      if (!validadores.isValidEmail(email)) {
        alert('Email inválido');
        inEmail.focus();
        return;
      }

      const idx = administrativos.findIndex(a => a.identificacion === admin.identificacion);
      if (idx !== -1) {
        administrativos[idx] = { ...administrativos[idx], nombres, apellidos, email, telefono, cargo };
        persist();
        renderList();
        mostrarMensaje('Administrativo actualizado exitosamente', 'exito');
        close();
      }
    });
  }

  // Crear nuevo administrativo
  btnCrear.addEventListener('click', () => {
    const identificacion = inputId.value.trim();
    const nombres = inputNombres.value.trim();
    const apellidos = inputApellidos.value.trim();
    const email = inputEmail.value.trim();
    const telefono = inputTelefono.value.trim();
    const cargo = inputCargo.value.trim();

    if (!validadores.isNotEmpty(identificacion) || !validadores.isNotEmpty(nombres) || !validadores.isNotEmpty(apellidos)) {
      mostrarMensaje('Identificación, nombres y apellidos son requeridos', 'error');
      return;
    }
    if (!validadores.isValidEmail(email)) {
      mostrarMensaje('Email inválido', 'error');
      inputEmail.focus();
      return;
    }
    if (administrativos.some(a => a.identificacion === identificacion)) {
      mostrarMensaje('Ya existe un administrativo con esa identificación', 'error');
      inputId.focus();
      return;
    }

    administrativos.push({ identificacion, nombres, apellidos, email, telefono, cargo });
    persist();
    renderList();
    resetForm();
    mostrarMensaje('Administrativo creado exitosamente', 'exito');
  });

  btnReset.addEventListener('click', (e) => {
    e.preventDefault();
    resetForm();
  });

  // Initial render
  actualizarEstadisticas();
  renderList();

  return container;
}