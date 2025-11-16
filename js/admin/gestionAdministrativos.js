// js/admin/gestionAdministrativos.js
import { validadores } from '../utils/validadores.js';

export function renderGestionAdministrativos() {
  const container = document.createElement('section');
  container.id = 'section-gestion-administrativos';
  container.className = 'gestion-admin-modern';

  // Styles (reuse project classes)
  const style = document.createElement('style');
  style.textContent = `
    .gestion-admin-modern { padding: 1.5rem; font-family: Inter, 'Segoe UI', sans-serif; }
    .content-card { background: #fff; border-radius:12px; padding:1.25rem; box-shadow:0 6px 18px rgba(16,24,40,0.04); }
    .admin-form-grid { display:flex; gap:1rem; flex-wrap:wrap; }
    .admin-form-grid .form-group { flex:1 1 220px; }
    .admin-list { margin-top:1rem; display:flex; flex-direction:column; gap:0.75rem; }
    .admin-item { display:flex; justify-content:space-between; align-items:center; padding:0.8rem; border-radius:10px; background:#fbfeff; border:1px solid #eef6f8; }
    .admin-item .meta { display:flex; gap:1rem; align-items:center; }
    .admin-item .meta .names { font-weight:700; color:#0f3446; }
    .admin-item .meta .small { color:#6b7280; font-size:0.92rem; }
    .admin-actions button { margin-left:0.5rem; }
  `;
  document.head.appendChild(style);

  container.innerHTML = `
    <div class="content-card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
        <div>
          <h2 style="margin:0;">Gestionar Administrativos</h2>
          <div style="color:#666; font-size:0.95rem;">Crea, edita y administra cuentas administrativas</div>
        </div>
      </div>

      <form id="form-nuevo-admin" class="admin-form-grid">
        <div class="form-group">
          <label>Identificación</label>
          <input id="admin-id" class="form-control" placeholder="Número de identificación" />
        </div>
        <div class="form-group">
          <label>Nombres</label>
          <input id="admin-nombres" class="form-control" placeholder="Nombres" />
        </div>
        <div class="form-group">
          <label>Apellidos</label>
          <input id="admin-apellidos" class="form-control" placeholder="Apellidos" />
        </div>
        <div class="form-group">
          <label>Email</label>
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

      <div style="display:flex; gap:0.8rem; margin-top:1rem;">
        <button id="btn-crear-admin" class="btn btn-primary">Crear Administrativo</button>
        <button id="btn-reset-admin" class="btn btn-secondary">Limpiar</button>
      </div>

      <div style="margin-top:1.4rem;">
        <h3 style="margin:0 0 0.6rem 0;">Listado de Administrativos</h3>
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

  function mostrarMensaje(texto, tipo = 'exito') {
    const msg = document.createElement('div');
    msg.textContent = texto;
    msg.style.padding = '0.6rem 0.9rem';
    msg.style.borderRadius = '8px';
    msg.style.marginTop = '0.8rem';
    msg.style.background = tipo === 'error' ? '#ffe9e9' : '#eafff9';
    msg.style.color = tipo === 'error' ? '#b02a2a' : '#046c4e';
    container.querySelector('.content-card').insertBefore(msg, listContainer);
    setTimeout(() => msg.remove(), 3500);
  }

  function persist() {
    localStorage.setItem(storageKey, JSON.stringify(administrativos));
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
    listContainer.innerHTML = administrativos.length === 0 ? '<div class="empty-state">No hay administrativos</div>' : '';
    administrativos.forEach(admin => {
      const item = document.createElement('div');
      item.className = 'admin-item';
      item.innerHTML = `
        <div class="meta">
          <div>
            <div class="names">${admin.nombres} ${admin.apellidos}</div>
            <div class="small">ID: ${admin.identificacion} • ${admin.cargo} • ${admin.telefono}</div>
            <div class="small">${admin.email}</div>
          </div>
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
        mostrarMensaje('Administrativo eliminado', 'exito');
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
      <div class="modal-header">Editar Administrativo</div>
      <div class="modal-subtitle">ID: ${admin.identificacion}</div>
      <form class="modal-body">
        <div class="form-group"><label>Identificación</label><input id="edit-id" class="form-control" value="${admin.identificacion}" disabled /></div>
        <div class="form-group"><label>Nombres</label><input id="edit-nombres" class="form-control" value="${admin.nombres}" /></div>
        <div class="form-group"><label>Apellidos</label><input id="edit-apellidos" class="form-control" value="${admin.apellidos}" /></div>
        <div class="form-group"><label>Email</label><input id="edit-email" class="form-control" value="${admin.email}" /></div>
        <div class="form-group"><label>Teléfono</label><input id="edit-telefono" class="form-control" value="${admin.telefono}" /></div>
        <div class="form-group"><label>Cargo</label><input id="edit-cargo" class="form-control" value="${admin.cargo}" /></div>
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
      if (!validadores.isNotEmpty(nombres) || !validadores.isNotEmpty(apellidos)) { alert('Nombres y apellidos son requeridos'); return; }
      if (!validadores.isValidEmail(email)) { alert('Email inválido'); inEmail.focus(); return; }

      const idx = administrativos.findIndex(a => a.identificacion === admin.identificacion);
      if (idx !== -1) {
        administrativos[idx] = { ...administrativos[idx], nombres, apellidos, email, telefono, cargo };
        persist();
        renderList();
        mostrarMensaje('Administrativo actualizado', 'exito');
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
    if (!validadores.isValidEmail(email)) { mostrarMensaje('Email inválido', 'error'); inputEmail.focus(); return; }
    if (administrativos.some(a => a.identificacion === identificacion)) { mostrarMensaje('Ya existe un administrativo con esa identificación', 'error'); inputId.focus(); return; }

    administrativos.push({ identificacion, nombres, apellidos, email, telefono, cargo });
    persist();
    renderList();
    resetForm();
    mostrarMensaje('Administrativo creado', 'exito');
  });

  btnReset.addEventListener('click', (e) => { e.preventDefault(); resetForm(); });

  // Initial render
  renderList();

  return container;
}
