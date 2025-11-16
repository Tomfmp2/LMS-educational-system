// js/admin/crearCursos.js
// Gestión de cursos, módulos y lecciones
import { validadores } from '../utils/validadores.js';

export function renderCrearCurso() {
  const container = document.createElement('section');
  container.id = 'section-gestion-cursos';
  container.className = 'gestion-cursos-modern';

  // === ESTADO ===
  let cursoEnEdicion = null;
  let filtroSearch = '';

  // === STORAGE ===
  const storage = {
    cursos: (() => { const data = JSON.parse(localStorage.getItem('cursos') || '[]'); return Array.isArray(data) ? data : []; })(),
    modulos: (() => { const data = JSON.parse(localStorage.getItem('modulos') || '[]'); return Array.isArray(data) ? data : []; })(),
    lecciones: (() => { const data = JSON.parse(localStorage.getItem('lecciones') || '[]'); return Array.isArray(data) ? data : []; })(),
    profesores: (() => { const data = JSON.parse(localStorage.getItem('profesores') || '[]'); return Array.isArray(data) ? data : []; })()
  };

  // === ESTILOS ===
  const style = document.createElement('style');
  style.textContent = `
    .gestion-cursos-modern {
      font-family: 'Inter', 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
      min-height: 100vh;
      padding: 1.5rem;
    }
    .gestion-cursos-modern .dashboard-header { text-align: center; margin-bottom: 2rem; }
    .gestion-cursos-modern .dashboard-header h1 { font-size: 2.4rem; font-weight: 700; color: #222; margin: 0 0 0.5rem; }
    .gestion-cursos-modern .dashboard-header p { color: #666; font-size: 1.1rem; margin: 0; }
    
    .gestion-cursos-modern .search-container { margin-bottom: 1.5rem; }
    .gestion-cursos-modern .search-input {
      width: 100%;
      max-width: 400px;
      padding: 0.8rem 1.2rem;
      border: 2px solid #ddd;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s;
      background: white;
    }
    .gestion-cursos-modern .search-input:focus { outline: none; border-color: #00ADB5; box-shadow: 0 0 0 4px rgba(0,173,181,0.15); }

    .gestion-cursos-modern .content-card {
      background: white;
      border-radius: 16px;
      padding: 1.8rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 6px 20px rgba(0,0,0,0.07);
    }
    .gestion-cursos-modern .form-grid { display: grid; gap: 1.2rem; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
    .gestion-cursos-modern .form-group { display: flex; flex-direction: column; }
    .gestion-cursos-modern .form-group label { font-weight: 600; color: #333; margin-bottom: 0.4rem; font-size: 0.95rem; }
    .gestion-cursos-modern .required { color: #e74c3c; }
    .gestion-cursos-modern .form-control {
      padding: 0.85rem 1rem;
      border: 1.8px solid #e0e0e0;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #fdfdfd;
    }
    .gestion-cursos-modern .form-control:focus { outline: none; border-color: #00ADB5; box-shadow: 0 0 0 4px rgba(0,173,181,0.15); background: white; }
    .gestion-cursos-modern textarea.form-control { min-height: 100px; resize: vertical; }

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
    .gestion-cursos-modern .btn-primary { background: #00ADB5; color: white; }
    .gestion-cursos-modern .btn-primary:hover { background: #009aa2; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,173,181,0.3); }
    .gestion-cursos-modern .btn-primary:disabled { background: #ccc; cursor: not-allowed; }
    .gestion-cursos-modern .btn-secondary { background: #e9ecef; color: #495057; }
    .gestion-cursos-modern .btn-secondary:hover { background: #dee2e6; }
    .gestion-cursos-modern .btn-danger { background: #e74c3c; color: white; }
    .gestion-cursos-modern .btn-danger:hover { background: #c0392b; }
    .gestion-cursos-modern .btn-sm { padding: 0.4rem 0.8rem; font-size: 0.85rem; }

    .gestion-cursos-modern .image-preview { width: 100%; height: 150px; border-radius: 12px; object-fit: cover; margin-top: 0.8rem; display: none; }
    .gestion-cursos-modern .image-preview.show { display: block; }

    /* MÓDULOS */
    .gestion-cursos-modern .modulos-section {
      background: #f8fbfc;
      border-radius: 12px;
      padding: 1.2rem;
      margin-top: 1.5rem;
      border-left: 4px solid #00ADB5;
    }
    .gestion-cursos-modern .modulos-section h3 { color: #0f3446; margin: 0 0 1rem; font-size: 1.1rem; }

    .gestion-cursos-modern .modulo-card {
      background: white;
      border-radius: 10px;
      padding: 1rem;
      margin-bottom: 1rem;
      border-left: 4px solid #20c997;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .gestion-cursos-modern .modulo-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .gestion-cursos-modern .modulo-header:hover {
      opacity: 0.8;
    }
    .gestion-cursos-modern .modulo-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #e8f5f7;
      color: #00ADB5;
      font-weight: bold;
      transition: transform 0.3s ease;
      margin-right: 0.8rem;
      flex-shrink: 0;
    }
    .gestion-cursos-modern .modulo-header.collapsed .modulo-toggle {
      transform: rotate(-90deg);
    }
    .gestion-cursos-modern .modulo-title-container {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .gestion-cursos-modern .modulo-title { font-weight: 600; color: #1a3d47; }
    .gestion-cursos-modern .modulo-info { font-size: 0.85rem; color: #666; margin: 0.3rem 0; }
    .gestion-cursos-modern .modulo-actions {
      display: flex;
      gap: 0.5rem;
      margin-left: 1rem;
    }
    .gestion-cursos-modern .modulo-content {
      max-height: 1000px;
      overflow: hidden;
      transition: max-height 0.3s ease, opacity 0.3s ease;
      opacity: 1;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }
    .gestion-cursos-modern .modulo-content.hidden {
      max-height: 0;
      opacity: 0;
      margin-top: 0;
      padding-top: 0;
      border-top: none;
    }

    /* LECCIONES */
    .gestion-cursos-modern .lecciones-list {
      background: #fff9f0;
      border-radius: 8px;
      padding: 0.8rem;
      margin-top: 0.8rem;
      border-left: 3px solid #ffc107;
    }
    .gestion-cursos-modern .leccion-item {
      background: white;
      padding: 0.7rem 0.9rem;
      margin-bottom: 0.5rem;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #ffe082;
    }
    .gestion-cursos-modern .leccion-info { flex: 1; }
    .gestion-cursos-modern .leccion-titulo { font-weight: 500; color: #333; font-size: 0.9rem; }
    .gestion-cursos-modern .leccion-horas { font-size: 0.75rem; color: #888; margin-top: 0.2rem; }

    /* AGREGAR LECCIÓN EN MODULO */
    .gestion-cursos-modern .form-leccion-inline {
      background: #f5f5f5;
      padding: 0.8rem;
      border-radius: 8px;
      margin-top: 0.8rem;
      display: flex;
      gap: 0.8rem;
      align-items: flex-end;
    }
    .gestion-cursos-modern .form-leccion-inline input { flex: 1; min-width: 150px; }
    .gestion-cursos-modern .form-leccion-inline input[type="number"] { max-width: 100px; }

    /* MENSAJES */
    .gestion-cursos-modern .mensaje {
      padding: 1rem 1.5rem;
      border-radius: 12px;
      margin: 1rem 0;
      font-weight: 500;
      display: none;
      animation: slideDown 0.4s ease;
    }
    .gestion-cursos-modern .mensaje.exito { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; display: block; }
    .gestion-cursos-modern .mensaje.error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; display: block; }
    @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

    .gestion-cursos-modern .empty-state { text-align: center; padding: 2rem; color: #999; }

    /* MODAL OVERLAY */
    .gestion-cursos-modern .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      backdrop-filter: blur(8px);
      animation: fadeInOverlay 0.3s ease;
    }
    @keyframes fadeInOverlay {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* MODAL CONTENT */
    .gestion-cursos-modern .modal-container {
      background: linear-gradient(135deg, #ffffff 0%, #f9fbfd 100%);
      border-radius: 28px;
      padding: 4rem;
      max-width: 600px;
      width: 95%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 
        0 0 0 2px rgba(0, 173, 181, 0.1),
        0 25px 100px rgba(0, 0, 0, 0.35),
        0 0 80px rgba(0, 173, 181, 0.2);
      animation: modalSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      border: 2px solid rgba(0, 173, 181, 0.12);
    }
    @keyframes modalSlideUp {
      from {
        opacity: 0;
        transform: translateY(40px) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .gestion-cursos-modern .modal-header {
      font-size: 2rem;
      font-weight: 800;
      color: #0f3446;
      margin-bottom: 0.7rem;
      letter-spacing: -0.7px;
      background: linear-gradient(135deg, #00ADB5 0%, #0091A0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .gestion-cursos-modern .modal-subtitle {
      font-size: 0.95rem;
      color: #7a8fa6;
      margin-bottom: 2.5rem;
      font-weight: 500;
    }

    .gestion-cursos-modern .modal-body {
      margin-bottom: 2.5rem;
    }

    .gestion-cursos-modern .modal-body .form-group {
      margin-bottom: 2.2rem;
      display: flex;
      flex-direction: column;
    }

    .gestion-cursos-modern .modal-body .form-group:last-child {
      margin-bottom: 0;
    }

    .gestion-cursos-modern .modal-body label {
      display: block;
      font-weight: 700;
      color: #2d3e50;
      font-size: 1.08rem;
      margin-bottom: 1rem;
      letter-spacing: 0.2px;
    }
    .gestion-cursos-modern .modal-body .required {
      color: #e74c3c;
      font-weight: 900;
      margin-right: 0.4rem;
    }

    .gestion-cursos-modern .modal-body .form-control {
      width: 100%;
      padding: 1.4rem 1.8rem;
      border: 2.5px solid #e5f0f5;
      border-radius: 18px;
      font-size: 1.05rem;
      background: linear-gradient(135deg, #ffffff 0%, #f5fbfd 100%);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: 'Inter', 'Segoe UI', sans-serif;
      color: #1a3d47;
      font-weight: 500;
    }

    .gestion-cursos-modern .modal-body .form-control::placeholder {
      color: #a0adc0;
      font-weight: 500;
    }

    .gestion-cursos-modern .modal-body .form-control:focus {
      outline: none;
      border-color: #00ADB5;
      background: white;
      box-shadow: 
        0 0 0 5px rgba(0, 173, 181, 0.15),
        0 8px 24px rgba(0, 173, 181, 0.2);
      transform: translateY(-2px);
    }

    .gestion-cursos-modern .modal-body textarea.form-control {
      min-height: 130px;
      resize: vertical;
      font-family: 'Inter', 'Segoe UI', monospace;
    }

    .gestion-cursos-modern .modal-footer {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      border-top: 2px solid #e8eef5;
      padding-top: 2rem;
    }

    .gestion-cursos-modern .modal-footer .btn {
      padding: 1rem 2rem;
      border: none;
      border-radius: 12px;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .gestion-cursos-modern .modal-footer .btn-secondary {
      background: #ecf0f7;
      color: #4a5568;
      border: 2px solid #dae3ef;
    }

    .gestion-cursos-modern .modal-footer .btn-secondary:hover {
      background: #dae3ef;
      border-color: #c0d0e0;
      transform: translateY(-2px);
    }

    .gestion-cursos-modern .modal-footer .btn-primary {
      background: linear-gradient(135deg, #00ADB5 0%, #0091A0 100%);
      color: white;
      box-shadow: 0 6px 20px rgba(0, 173, 181, 0.35);
    }

    .gestion-cursos-modern .modal-footer .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(0, 173, 181, 0.45);
      background: linear-gradient(135deg, #0091A0 0%, #007885 100%);
    }

    /* CURSOS COMPLETADOS */
    .gestion-cursos-modern .curso-container {
      background: white;
      border-radius: 16px;
      border-left: 5px solid #00ADB5;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    }
    .gestion-cursos-modern .curso-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .gestion-cursos-modern .curso-title { font-size: 1.3rem; font-weight: 700; color: #0f3446; }
    .gestion-cursos-modern .curso-meta { font-size: 0.85rem; color: #666; margin: 0.3rem 0; }
    .gestion-cursos-modern .curso-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

    @media (max-width: 768px) {
      .gestion-cursos-modern .form-grid { grid-template-columns: 1fr; }
      .gestion-cursos-modern .form-leccion-inline { flex-direction: column; }
    }
  `;
  document.head.appendChild(style);

  // === ESTILOS GLOBALES DEL MODAL ===
  const styleModal = document.createElement('style');
  styleModal.textContent = `
    /* MODAL OVERLAY */
    .modal-overlay-crear {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      backdrop-filter: blur(8px);
      animation: fadeInOverlay 0.3s ease;
    }

    @keyframes fadeInOverlay {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* MODAL CONTENT */
    .modal-contenedor-crear {
      background: linear-gradient(135deg, #ffffff 0%, #f9fbfd 100%);
      border-radius: 28px;
      padding: 4rem;
      max-width: 600px;
      width: 95%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 
        0 0 0 2px rgba(0, 173, 181, 0.1),
        0 25px 100px rgba(0, 0, 0, 0.35),
        0 0 80px rgba(0, 173, 181, 0.2);
      animation: modalSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      border: 2px solid rgba(0, 173, 181, 0.12);
    }

    @keyframes modalSlideUp {
      from {
        opacity: 0;
        transform: translateY(60px) scale(0.85);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .modal-header {
      font-size: 2rem;
      font-weight: 800;
      color: #0f3446;
      margin-bottom: 0.7rem;
      letter-spacing: -0.7px;
      background: linear-gradient(135deg, #00ADB5 0%, #0091A0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .modal-subtitle {
      font-size: 0.95rem;
      color: #7a8fa6;
      margin-bottom: 2.5rem;
      font-weight: 500;
    }

    .modal-body {
      margin-bottom: 2.5rem;
    }

    .modal-body .form-group {
      margin-bottom: 2.2rem;
      display: flex;
      flex-direction: column;
    }

    .modal-body .form-group:last-child {
      margin-bottom: 0;
    }

    .modal-body label {
      display: block;
      font-weight: 700;
      color: #2d3e50;
      font-size: 1.08rem;
      margin-bottom: 1rem;
      letter-spacing: 0.2px;
    }

    .modal-body .required {
      color: #e74c3c;
      font-weight: 900;
      margin-right: 0.4rem;
    }

    .modal-body .form-control {
      width: 100%;
      padding: 1.4rem 1.8rem;
      border: 2.5px solid #e5f0f5;
      border-radius: 18px;
      font-size: 1.05rem;
      background: linear-gradient(135deg, #ffffff 0%, #f5fbfd 100%);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: 'Inter', 'Segoe UI', sans-serif;
      color: #1a3d47;
      font-weight: 500;
      box-sizing: border-box;
    }

    .modal-body .form-control::placeholder {
      color: #a8bcc9;
      font-weight: 500;
      opacity: 0.8;
    }

    .modal-body .form-control:focus {
      outline: none;
      border-color: #00ADB5;
      background: white;
      box-shadow: 
        0 0 0 5px rgba(0, 173, 181, 0.15),
        0 8px 24px rgba(0, 173, 181, 0.2);
      transform: translateY(-2px);
    }

    .modal-body textarea.form-control {
      min-height: 130px;
      resize: vertical;
      font-family: 'Inter', 'Segoe UI', monospace;
    }

    .modal-footer {
      display: flex;
      gap: 1.2rem;
      justify-content: flex-end;
      border-top: 2px solid #e8eef5;
      padding-top: 2.5rem;
    }

    .modal-footer .btn {
      padding: 1.1rem 2.5rem;
      border: none;
      border-radius: 14px;
      font-weight: 700;
      font-size: 1.05rem;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 0.3px;
    }

    .modal-footer .btn-secondary {
      background: linear-gradient(135deg, #ecf0f7 0%, #e0e8f0 100%);
      color: #4a5568;
      border: 2px solid #d8dff0;
    }

    .modal-footer .btn-secondary:hover {
      background: linear-gradient(135deg, #dae3ef 0%, #d0dce8 100%);
      border-color: #c0d0e0;
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }

    .modal-footer .btn-primary {
      background: linear-gradient(135deg, #00ADB5 0%, #0091A0 100%);
      color: white;
      box-shadow: 0 8px 25px rgba(0, 173, 181, 0.35);
      border: none;
    }

    .modal-footer .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(0, 173, 181, 0.45);
      background: linear-gradient(135deg, #0091A0 0%, #007885 100%);
    }

    .modal-footer .btn-primary:active {
      transform: translateY(-1px);
    }

    /* ESTILOS COMPACTOS PARA FORMULARIOS */
    .form-control-compact {
      padding: 0.65rem 0.95rem !important;
      font-size: 0.95rem !important;
      border-radius: 10px !important;
      border: 2px solid #e0e8f0 !important;
      transition: all 0.3s ease !important;
    }

    .form-control-compact:focus {
      border-color: #00ADB5 !important;
      box-shadow: 0 0 0 3px rgba(0, 173, 181, 0.12) !important;
    }

    .form-control-compact::placeholder {
      color: #99a8c4;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .form-helper {
      display: block;
      margin-top: 0.4rem;
      color: #7a8fa6;
      font-size: 0.82rem;
      font-weight: 500;
    }

    .btn-compact {
      padding: 0.7rem 1.5rem !important;
      font-size: 0.92rem !important;
      border-radius: 10px !important;
      font-weight: 600 !important;
      transition: all 0.3s ease !important;
    }

    .btn-compact:hover {
      transform: translateY(-2px) !important;
    }

    .modal-footer-compact {
      gap: 0.8rem !important;
      padding-top: 1.5rem !important;
      border-top: 1px solid #e8eef5 !important;
    }

    .modal-footer-compact .btn-compact {
      flex: 1;
      justify-content: center;
    }
  `;
  document.head.appendChild(styleModal);

  // === PLANTILLA HTML ===
  container.innerHTML = `
    <div class="dashboard-header">
      <h1>Gestionar Cursos</h1>
      <p>Crea cursos completos con módulos y lecciones</p>
    </div>

    <div class="search-container">
      <input type="text" class="search-input" id="curso-search" placeholder="Buscar por nombre o código de curso..." />
    </div>

    <div id="mensaje" class="mensaje"></div>

    <!-- NUEVA SECCIÓN: CREAR CURSO COMPLETO -->
    <div id="crear-curso-section"></div>

    <!-- CURSOS COMPLETADOS -->
    <div style="margin-top: 2rem;">
      <h2 style="color:#0f3446;">Cursos Completados</h2>
      <div id="cursos-lista"></div>
    </div>
  `;

  // === ELEMENTOS ===
  const mensaje = container.querySelector('#mensaje');
  const crearCursoSection = container.querySelector('#crear-curso-section');
  const cursosList = container.querySelector('#cursos-lista');
  const searchInput = container.querySelector('#curso-search');

  // === HELPERS ===
  // Validaciones simplificadas (usar validadores.js)
  const isValidCode = validadores.isValidCode;
  const isValidImageUrl = validadores.isValidImageUrl;

  function mostrarMensaje(texto, tipo = 'exito') {
    const MENSAJE_DURATION = 4000;
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
    setTimeout(() => mensaje.className = 'mensaje', MENSAJE_DURATION);
  }

  // Buscar cursos
  searchInput.addEventListener('input', (e) => {
    filtroSearch = e.target.value.toLowerCase();
    renderCursosList();
  });

  // === RENDERIZAR FORMULARIO DE CREAR CURSO ===
  function renderCrearCursoForm() {
    crearCursoSection.innerHTML = '';

    const div = document.createElement('div');
    div.className = 'content-card';

    div.innerHTML = `
      <h2 style="margin-top:0; color:#0f3446;">Nuevo Curso</h2>
      <form id="form-nuevo-curso">
        <div class="form-grid">
          <div class="form-group">
            <label><span class="required">*</span> Código</label>
            <input type="text" class="form-control" id="nvo-codigo" placeholder="MAT-101" required />
          </div>
          <div class="form-group">
            <label><span class="required">*</span> Nombre</label>
            <input type="text" class="form-control" id="nvo-nombre" placeholder="Matemáticas Básicas" required />
          </div>
        </div>
        <div class="form-group">
          <label><span class="required">*</span> Descripción</label>
          <textarea class="form-control" id="nvo-descripcion" placeholder="Descripción del curso..." required></textarea>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label><span class="required">*</span> Imagen (URL)</label>
            <input type="text" class="form-control" id="nvo-imagen" placeholder="https://..." required />
            <img id="nvo-preview" class="image-preview" />
          </div>
          <div class="form-group">
            <label><span class="required">*</span> Docente</label>
            <select class="form-control" id="nvo-docente" required></select>
          </div>
        </div>
      </form>

      <!-- AGREGAR MÓDULO SECTION -->
      <div class="modulos-section" id="modulos-container">
        <h3>Módulos</h3>
        <button class="btn btn-secondary" id="btn-agregar-modulo">Agregar Módulo</button>
        <div id="modulos-lista"></div>
      </div>

      <!-- BOTÓN CREAR CURSO -->
      <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
        <button class="btn btn-secondary" id="btn-cancelar-nuevo">Cancelar</button>
        <button class="btn btn-primary" id="btn-crear-curso" disabled>Crear Curso</button>
      </div>
    `;

    crearCursoSection.appendChild(div);

    // === ELEMENTOS FORM ===
    const form = div.querySelector('#form-nuevo-curso');
    const inputCodigo = div.querySelector('#nvo-codigo');
    const inputNombre = div.querySelector('#nvo-nombre');
    const inputDesc = div.querySelector('#nvo-descripcion');
    const inputImagen = div.querySelector('#nvo-imagen');
    const inputPreview = div.querySelector('#nvo-preview');
    const selectDocente = div.querySelector('#nvo-docente');
    const modulosContainer = div.querySelector('#modulos-container');
    const modulosList = div.querySelector('#modulos-lista');
    const btnAgregarModulo = div.querySelector('#btn-agregar-modulo');
    const btnCrearCurso = div.querySelector('#btn-crear-curso');
    const btnCancelar = div.querySelector('#btn-cancelar-nuevo');

    // Cargar docentes
    function cargarDocentes() {
      selectDocente.innerHTML = '<option value="">Seleccione docente...</option>';
      // Si estamos editando, permitir que el docente actual del curso aparezca como disponible
      const docentesOcupados = storage.cursos
        .filter(c => !(cursoEnEdicion && c.codigo === cursoEnEdicion.codigo))
        .map(c => c.docente);
      const disponibles = storage.profesores.filter(p => !docentesOcupados.includes(p.correo));

      if (disponibles.length === 0) {
        const opt = document.createElement('option');
        opt.disabled = true;
        opt.textContent = 'Todos los docentes tienen curso asignado';
        selectDocente.appendChild(opt);
      } else {
        disponibles.forEach(p => {
          const opt = document.createElement('option');
          opt.value = p.correo;
          opt.textContent = p.nombre;
          selectDocente.appendChild(opt);
        });
      }
    }

    cargarDocentes();

    // Preview de imagen
    inputImagen.addEventListener('input', () => {
      const val = inputImagen.value.trim();
      if (isValidImageUrl(val)) {
        inputPreview.src = val;
        inputPreview.classList.add('show');
      } else {
        inputPreview.classList.remove('show');
      }
    });

    // Estado temporal
    let cursoTemp = { codigo: '', nombre: '', descripcion: '', docente: '', imagen: '', modulos: [] };

    // Si venimos editando un curso, precargar datos
    if (cursoEnEdicion) {
      inputCodigo.value = cursoEnEdicion.codigo;
      inputNombre.value = cursoEnEdicion.nombre;
      inputDesc.value = cursoEnEdicion.descripcion;
      inputImagen.value = cursoEnEdicion.imagen || '';
      if (isValidImageUrl(inputImagen.value)) {
        inputPreview.src = inputImagen.value;
        inputPreview.classList.add('show');
      }
      // Seleccionar docente si existe en el select
      if (cursoEnEdicion.docente) {
        const opt = Array.from(selectDocente.options).find(o => o.value === cursoEnEdicion.docente);
        if (opt) opt.selected = true;
      }

      // cargar modulos/ lecciones en cursoTemp (clon)
      cursoTemp = {
        codigo: cursoEnEdicion.codigo,
        nombre: cursoEnEdicion.nombre,
        descripcion: cursoEnEdicion.descripcion,
        docente: cursoEnEdicion.docente,
        imagen: cursoEnEdicion.imagen || '',
        modulos: (cursoEnEdicion.modulos || []).map(m => ({ ...m, lecciones: (m.lecciones || []).map(l => ({ ...l })) }))
      };

      // No permitir cambiar código al editar
      inputCodigo.disabled = true;
      // Cambiar texto del botón principal
      btnCrearCurso.textContent = 'Guardar Cambios';
    } else {
      inputCodigo.disabled = false;
      btnCrearCurso.textContent = 'Crear Curso';
    }

    // Validar formulario principal
    function validarFormPrincipal() {
      cursoTemp.codigo = inputCodigo.value.trim();
      cursoTemp.nombre = inputNombre.value.trim();
      cursoTemp.descripcion = inputDesc.value.trim();
      cursoTemp.docente = selectDocente.value;
      cursoTemp.imagen = inputImagen.value.trim();

      const valido = cursoTemp.codigo && cursoTemp.nombre && cursoTemp.descripcion && cursoTemp.docente && cursoTemp.imagen &&
                     isValidCode(cursoTemp.codigo) && isValidImageUrl(cursoTemp.imagen);

      modulosContainer.style.display = valido ? 'block' : 'none';
      btnCrearCurso.disabled = !valido || cursoTemp.modulos.length === 0 || 
                              cursoTemp.modulos.some(m => m.lecciones.length === 0);

      return valido;
    }

    inputCodigo.addEventListener('input', validarFormPrincipal);
    inputNombre.addEventListener('input', validarFormPrincipal);
    inputDesc.addEventListener('input', validarFormPrincipal);
    selectDocente.addEventListener('change', validarFormPrincipal);
    inputImagen.addEventListener('input', validarFormPrincipal);

    // Agregar módulo
    btnAgregarModulo.addEventListener('click', () => {
      if (!validarFormPrincipal()) {
        mostrarMensaje('Completa datos principales del curso primero', 'error');
        return;
      }

      // Crear overlay del modal
      const modalOverlay = document.createElement('div');
      modalOverlay.className = 'modal-overlay-crear';
      
      const modalContainer = document.createElement('div');
      modalContainer.className = 'modal-contenedor-crear';
      modalContainer.innerHTML = `
        <div class="modal-header">Crear Nuevo Módulo</div>
        <div class="modal-subtitle">Completa los datos para agregar un módulo a tu curso</div>
        <form class="modal-body">
          <div class="form-group">
            <label><span class="required">*</span> Código del módulo</label>
            <input type="text" class="form-control" id="mod-codigo" placeholder="Ej: MOD-01, MOD-02..." autofocus />
          </div>
          <div class="form-group">
            <label><span class="required">*</span> Nombre del módulo</label>
            <input type="text" class="form-control" id="mod-nombre" placeholder="Ej: Introducción a JavaScript" />
          </div>
          <div class="form-group">
            <label>Descripción (opcional)</label>
            <textarea class="form-control" id="mod-descripcion" placeholder="Escribe una descripción breve del módulo..."></textarea>
          </div>
        </form>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="modal-cancelar">Cancelar</button>
          <button type="button" class="btn btn-primary" id="modal-guardar">Guardar Módulo</button>
        </div>
      `;

      modalOverlay.appendChild(modalContainer);
      document.body.appendChild(modalOverlay);

      const inputCodigo = modalContainer.querySelector('#mod-codigo');
      const inputNombre = modalContainer.querySelector('#mod-nombre');
      const inputDesc = modalContainer.querySelector('#mod-descripcion');
      const btnCancelar = modalContainer.querySelector('#modal-cancelar');
      const btnGuardar = modalContainer.querySelector('#modal-guardar');

      // Función cerrar modal
      function cerrarModal() {
        modalOverlay.remove();
      }

      // Eventos
      btnCancelar.addEventListener('click', cerrarModal);
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) cerrarModal();
      });

      // Guardar módulo
      btnGuardar.addEventListener('click', () => {
        const codigo = inputCodigo.value.trim();
        const nombre = inputNombre.value.trim();
        const descripcion = inputDesc.value.trim();

        if (!codigo || !nombre) {
          alert('Código y nombre son requeridos');
          inputCodigo.focus();
          return;
        }

        if (!isValidCode(codigo)) {
          alert('Código inválido. Usa letras, números, guiones o guiones bajos');
          inputCodigo.focus();
          return;
        }

        if (cursoTemp.modulos.some(m => m.codigo === codigo)) {
          alert('Este código de módulo ya existe');
          inputCodigo.focus();
          return;
        }

        cursoTemp.modulos.push({ 
          codigo, 
          nombre, 
          descripcion, 
          lecciones: [] 
        });
        
        renderModulos();
        validarFormPrincipal();
        cerrarModal();
        mostrarMensaje('Módulo agregado correctamente', 'exito');
      });

      // Focus automático
      inputCodigo.focus();
    });

    // Renderizar módulos
    function renderModulos() {
      modulosList.innerHTML = cursoTemp.modulos.length === 0 ?
        '<div class="empty-state">Sin módulos aún</div>' :
        '';

      cursoTemp.modulos.forEach((mod, idx) => {
        const modDiv = document.createElement('div');
        modDiv.className = 'modulo-card';
        modDiv.innerHTML = `
          <div class="modulo-header collapsed" data-toggle-mod="${idx}">
            <div class="modulo-toggle">▼</div>
            <div class="modulo-title-container">
              <div class="modulo-title">${mod.codigo}: ${mod.nombre}</div>
              ${mod.descripcion ? `<div class="modulo-info">${mod.descripcion}</div>` : ''}
            </div>
            <div class="modulo-actions">
              <button type="button" class="btn btn-secondary btn-sm" data-edit-mod="${idx}">Editar</button>
              <button type="button" class="btn btn-danger btn-sm" data-del-mod="${idx}">Eliminar</button>
            </div>
          </div>

          <div class="modulo-content hidden" data-content-mod="${idx}">
            <div class="lecciones-list">
              ${mod.lecciones.length === 0 ? '<div style="color:#999; font-size:0.85rem;">Sin lecciones</div>' : 
                mod.lecciones.map((l, lidx) => `
                  <div class="leccion-item">
                    <div class="leccion-info">
                      <div class="leccion-titulo">${l.titulo}</div>
                      <div class="leccion-horas">${l.horas}h</div>
                      ${l.contenido ? `<div class="leccion-contenido-preview" style="font-size:0.8rem; color:#666; margin-top:0.3rem;">Contenido disponible</div>` : ''}
                      ${(l.multimedia && l.multimedia.length > 0) ? `<div class="leccion-multimedia-preview" style="font-size:0.8rem; color:#00ADB5; margin-top:0.2rem;">${l.multimedia.length} recurso(s)</div>` : ''}
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                      <button type="button" class="btn btn-secondary btn-sm" data-edit-lec="${idx}-${lidx}">Editar</button>
                      <button type="button" class="btn btn-danger btn-sm" data-del-lec="${idx}-${lidx}">Eliminar</button>
                    </div>
                  </div>
                `).join('')
              }
            </div>

            <button type="button" class="btn btn-secondary" style="width: 100%; margin-top: 1rem;" data-add-lec="${idx}">Agregar Lección</button>
          </div>
        `;

        modulosList.appendChild(modDiv);
      });

      // Eventos toggle (expandir/contraer) módulos
      modulosList.querySelectorAll('[data-toggle-mod]').forEach(header => {
        header.addEventListener('click', () => {
          const idx = parseInt(header.dataset.toggleMod);
          const content = modulosList.querySelector(`[data-content-mod="${idx}"]`);
          
          header.classList.toggle('collapsed');
          content.classList.toggle('hidden');
        });
      });

      // Eventos eliminar módulo
      modulosList.querySelectorAll('[data-del-mod]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          cursoTemp.modulos.splice(parseInt(btn.dataset.delMod), 1);
          renderModulos();
          validarFormPrincipal();
        });
      });

      // Eventos editar módulo
      modulosList.querySelectorAll('[data-edit-mod]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = parseInt(btn.dataset.editMod);
          const mod = cursoTemp.modulos[idx];

          // Crear modal con datos precargados
          const modalOverlay = document.createElement('div');
          modalOverlay.className = 'modal-overlay-crear';
          const modalContainer = document.createElement('div');
          modalContainer.className = 'modal-contenedor-crear';
          modalContainer.innerHTML = `
            <div class="modal-header">Editar Módulo</div>
            <div class="modal-subtitle">Modifica los datos del módulo</div>
            <form class="modal-body">
              <div class="form-group">
                <label><span class="required">*</span> Código</label>
                <input type="text" class="form-control form-control-compact" id="mod-codigo-edit" value="${mod.codigo}" disabled />
                <small class="form-helper">No se puede editar el código</small>
              </div>
              <div class="form-group">
                <label><span class="required">*</span> Nombre</label>
                <input type="text" class="form-control form-control-compact" id="mod-nombre-edit" value="${mod.nombre}" placeholder="Ej: Fundamentos" />
              </div>
              <div class="form-group">
                <label>Descripción</label>
                <textarea class="form-control form-control-compact" id="mod-descripcion-edit" placeholder="Ej: Conceptos básicos e introducción..." style="min-height: 80px;">${mod.descripcion || ''}</textarea>
              </div>
            </form>
            <div class="modal-footer modal-footer-compact">
              <button type="button" class="btn btn-secondary btn-compact" id="modal-cancelar-edit">Cancelar</button>
              <button type="button" class="btn btn-primary btn-compact" id="modal-guardar-edit">Guardar</button>
            </div>
          `;

          modalOverlay.appendChild(modalContainer);
          document.body.appendChild(modalOverlay);

          const inputNombre = modalContainer.querySelector('#mod-nombre-edit');
          const inputDesc = modalContainer.querySelector('#mod-descripcion-edit');
          const btnCancelar = modalContainer.querySelector('#modal-cancelar-edit');
          const btnGuardar = modalContainer.querySelector('#modal-guardar-edit');

          function cerrarModal() { modalOverlay.remove(); }
          btnCancelar.addEventListener('click', cerrarModal);
          modalOverlay.addEventListener('click', (ev) => { if (ev.target === modalOverlay) cerrarModal(); });

          btnGuardar.addEventListener('click', () => {
            const nombre = inputNombre.value.trim();
            const descripcion = inputDesc.value.trim();
            if (!nombre) { alert('El nombre del módulo es requerido'); inputNombre.focus(); return; }
            cursoTemp.modulos[idx].nombre = nombre;
            cursoTemp.modulos[idx].descripcion = descripcion;
            renderModulos();
            validarFormPrincipal();
            cerrarModal();
            mostrarMensaje('Módulo actualizado', 'exito');
          });
        });
      });

      // Eventos agregar lección
      modulosList.querySelectorAll('[data-add-lec]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = parseInt(btn.dataset.addLec);

          // Crear overlay del modal
          const modalOverlay = document.createElement('div');
          modalOverlay.className = 'modal-overlay-crear';
          
          const modalContainer = document.createElement('div');
          modalContainer.className = 'modal-contenedor-crear';
          modalContainer.innerHTML = `
            <div class="modal-header">Crear Nueva Lección</div>
            <div class="modal-subtitle">Agrega una lección a este módulo</div>
            <form class="modal-body">
              <div class="form-group">
                <label><span class="required">*</span> Título</label>
                <input type="text" class="form-control form-control-compact" id="lec-titulo" placeholder="Ej: Variables y Tipos de Datos" autofocus />
              </div>
              <div class="form-group">
                <label><span class="required">*</span> Horas</label>
                <input type="number" class="form-control form-control-compact" id="lec-horas" placeholder="2" min="1" max="100" />
              </div>
              <div class="form-group">
                <label>Contenido</label>
                <textarea class="form-control form-control-compact" id="lec-contenido" placeholder="Describe conceptos, ejemplos y puntos clave..." style="min-height: 100px;"></textarea>
              </div>
              <div class="form-group">
                <label>Multimedia</label>
                <textarea class="form-control form-control-compact" id="lec-multimedia" placeholder="Ej: https://youtube.com/video, https://file.pdf" style="min-height: 70px;"></textarea>
                <small class="form-helper">Separa URLs con comas (videos, PDFs, imágenes, etc.)</small>
              </div>
            </form>
            <div class="modal-footer modal-footer-compact">
              <button type="button" class="btn btn-secondary btn-compact" id="modal-cancelar-lec">Cancelar</button>
              <button type="button" class="btn btn-primary btn-compact" id="modal-guardar-lec">Guardar</button>
            </div>
          `;

          modalOverlay.appendChild(modalContainer);
          document.body.appendChild(modalOverlay);

          const inputTitulo = modalContainer.querySelector('#lec-titulo');
          const inputHoras = modalContainer.querySelector('#lec-horas');
          const inputContenido = modalContainer.querySelector('#lec-contenido');
          const inputMultimedia = modalContainer.querySelector('#lec-multimedia');
          const btnCancelarLec = modalContainer.querySelector('#modal-cancelar-lec');
          const btnGuardarLec = modalContainer.querySelector('#modal-guardar-lec');

          // Función cerrar modal
          function cerrarModal() {
            modalOverlay.remove();
          }

          // Eventos
          btnCancelarLec.addEventListener('click', cerrarModal);
          modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) cerrarModal();
          });

          // Guardar lección
          btnGuardarLec.addEventListener('click', () => {
            const titulo = inputTitulo.value.trim();
            const horas = parseInt(inputHoras.value);
            const contenido = inputContenido.value.trim();
            const multimediaStr = inputMultimedia.value.trim();

            if (!titulo || !horas || horas <= 0) {
              alert('Completa título y horas válidas');
              inputTitulo.focus();
              return;
            }

            // Procesar multimedia - separar por comas y limpiar espacios
            const multimedia = multimediaStr
              ? multimediaStr.split(',').map(url => url.trim()).filter(url => url.length > 0)
              : [];

            cursoTemp.modulos[idx].lecciones.push({ 
              titulo, 
              horas, 
              contenido,
              multimedia
            });
            
            renderModulos();
            validarFormPrincipal();
            cerrarModal();
            mostrarMensaje('Lección agregada correctamente', 'exito');
          });

          // Focus automático
          inputTitulo.focus();
        });
      });

      // Eventos editar lección
      modulosList.querySelectorAll('[data-edit-lec]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const [idx, lidx] = btn.dataset.editLec.split('-').map(Number);
          const lec = cursoTemp.modulos[idx].lecciones[lidx];

          // Modal para editar lección
          const modalOverlay = document.createElement('div');
          modalOverlay.className = 'modal-overlay-crear';
          const modalContainer = document.createElement('div');
          modalContainer.className = 'modal-contenedor-crear';
          modalContainer.innerHTML = `
            <div class="modal-header">Editar Lección</div>
            <div class="modal-subtitle">Modifica los datos de la lección</div>
            <form class="modal-body">
              <div class="form-group">
                <label><span class="required">*</span> Título</label>
                <input type="text" class="form-control form-control-compact" id="lec-titulo-edit" value="${lec.titulo}" autofocus />
              </div>
              <div class="form-group">
                <label><span class="required">*</span> Horas</label>
                <input type="number" class="form-control form-control-compact" id="lec-horas-edit" value="${lec.horas}" min="1" max="100" />
              </div>
              <div class="form-group">
                <label>Contenido</label>
                <textarea class="form-control form-control-compact" id="lec-contenido-edit" style="min-height: 100px;">${lec.contenido || ''}</textarea>
              </div>
              <div class="form-group">
                <label>Multimedia</label>
                <textarea class="form-control form-control-compact" id="lec-multimedia-edit" style="min-height: 70px;">${(lec.multimedia || []).join(', ')}</textarea>
                <small class="form-helper">Separa URLs con comas (videos, PDFs, imágenes, etc.)</small>
              </div>
            </form>
            <div class="modal-footer modal-footer-compact">
              <button type="button" class="btn btn-secondary btn-compact" id="modal-cancelar-lec-edit">Cancelar</button>
              <button type="button" class="btn btn-primary btn-compact" id="modal-guardar-lec-edit">Guardar</button>
            </div>
          `;

          modalOverlay.appendChild(modalContainer);
          document.body.appendChild(modalOverlay);

          const inputTitulo = modalContainer.querySelector('#lec-titulo-edit');
          const inputHoras = modalContainer.querySelector('#lec-horas-edit');
          const inputContenido = modalContainer.querySelector('#lec-contenido-edit');
          const inputMultimedia = modalContainer.querySelector('#lec-multimedia-edit');
          const btnCancelar = modalContainer.querySelector('#modal-cancelar-lec-edit');
          const btnGuardar = modalContainer.querySelector('#modal-guardar-lec-edit');

          function cerrarModal() { modalOverlay.remove(); }
          btnCancelar.addEventListener('click', cerrarModal);
          modalOverlay.addEventListener('click', (ev) => { if (ev.target === modalOverlay) cerrarModal(); });

          btnGuardar.addEventListener('click', () => {
            const titulo = inputTitulo.value.trim();
            const horas = parseInt(inputHoras.value, 10);
            const contenido = inputContenido.value.trim();
            const multimediaStr = inputMultimedia.value.trim();

            if (!titulo || !horas || horas <= 0) { 
              alert('Completa título y horas válidas'); 
              inputTitulo.focus(); 
              return; 
            }

            const multimedia = multimediaStr
              ? multimediaStr.split(',').map(url => url.trim()).filter(url => url.length > 0)
              : [];

            cursoTemp.modulos[idx].lecciones[lidx].titulo = titulo;
            cursoTemp.modulos[idx].lecciones[lidx].horas = horas;
            cursoTemp.modulos[idx].lecciones[lidx].contenido = contenido;
            cursoTemp.modulos[idx].lecciones[lidx].multimedia = multimedia;
            renderModulos();
            validarFormPrincipal();
            cerrarModal();
            mostrarMensaje('Lección actualizada', 'exito');
          });
        });
      });

      // Eventos eliminar lección
      modulosList.querySelectorAll('[data-del-lec]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const [idx, lidx] = btn.dataset.delLec.split('-').map(Number);
          cursoTemp.modulos[idx].lecciones.splice(lidx, 1);
          renderModulos();
          validarFormPrincipal();
        });
      });

      validarFormPrincipal();
    }

    renderModulos();

    // Crear curso
    btnCrearCurso.addEventListener('click', () => {
      if (cursoTemp.modulos.length === 0) {
        mostrarMensaje('Agrega al menos 1 módulo', 'error');
        return;
      }
      if (cursoTemp.modulos.some(m => m.lecciones.length === 0)) {
        mostrarMensaje('Cada módulo debe tener al menos 1 lección', 'error');
        return;
      }
      if (storage.cursos.some(c => c.codigo === cursoTemp.codigo)) {
        mostrarMensaje('Este código de curso ya existe', 'error');
        return;
      }
      if (storage.cursos.some(c => c.docente === cursoTemp.docente && (!cursoEnEdicion || c.codigo !== cursoEnEdicion.codigo))) {
        mostrarMensaje('Este docente ya tiene un curso asignado', 'error');
        return;
      }

      // Guardar (crear o actualizar)
      const cursoObj = { ...cursoTemp };
      delete cursoObj.modulos;

      if (cursoEnEdicion) {
        // Actualizar curso existente
        const idx = storage.cursos.findIndex(c => c.codigo === cursoEnEdicion.codigo);
        if (idx !== -1) storage.cursos[idx] = cursoObj;

        // Eliminar módulos/lecciones antiguos del curso
        const prevMods = storage.modulos.filter(m => m.cursoCodigo === cursoEnEdicion.codigo);
        const prevModCodes = prevMods.map(m => m.codigo);
        storage.modulos = storage.modulos.filter(m => m.cursoCodigo !== cursoEnEdicion.codigo);
        storage.lecciones = storage.lecciones.filter(l => !prevModCodes.includes(l.moduloCodigo));

        // Agregar módulos y lecciones nuevos
        cursoTemp.modulos.forEach(mod => {
          storage.modulos.push({
            codigo: mod.codigo,
            nombre: mod.nombre,
            descripcion: mod.descripcion,
            cursoCodigo: cursoTemp.codigo
          });

          mod.lecciones.forEach(lec => {
            storage.lecciones.push({
              id: Date.now().toString() + Math.random(),
              titulo: lec.titulo,
              horas: lec.horas,
              contenido: lec.contenido || '',
              multimedia: lec.multimedia || [],
              moduloCodigo: mod.codigo
            });
          });
        });

        localStorage.setItem('cursos', JSON.stringify(storage.cursos));
        localStorage.setItem('modulos', JSON.stringify(storage.modulos));
        localStorage.setItem('lecciones', JSON.stringify(storage.lecciones));

        mostrarMensaje(`Curso "${cursoTemp.nombre}" actualizado`, 'exito');
        cursoEnEdicion = null;
        renderCrearCursoForm();
        renderCursosList();
      } else {
        // Crear nuevo
        storage.cursos.push(cursoObj);

        cursoTemp.modulos.forEach(mod => {
          storage.modulos.push({
            codigo: mod.codigo,
            nombre: mod.nombre,
            descripcion: mod.descripcion,
            cursoCodigo: cursoTemp.codigo
          });

          mod.lecciones.forEach(lec => {
            storage.lecciones.push({
              id: Date.now().toString() + Math.random(),
              titulo: lec.titulo,
              horas: lec.horas,
              contenido: lec.contenido || '',
              multimedia: lec.multimedia || [],
              moduloCodigo: mod.codigo
            });
          });
        });

        localStorage.setItem('cursos', JSON.stringify(storage.cursos));
        localStorage.setItem('modulos', JSON.stringify(storage.modulos));
        localStorage.setItem('lecciones', JSON.stringify(storage.lecciones));

        mostrarMensaje(`Curso "${cursoTemp.nombre}" creado exitosamente`, 'exito');
        renderCrearCursoForm();
        renderCursosList();
      }
    });

    btnCancelar.addEventListener('click', () => {
      // Si estaba en edición, cancelar la edición
      cursoEnEdicion = null;
      renderCrearCursoForm();
    });
  }

  // === MODAL FLOTANTE EDICIÓN RÁPIDA DE CURSO ===
  function abrirModalEditarCurso(curso) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay-crear';
    
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-contenedor-crear';
    
    const modsCurso = storage.modulos.filter(m => m.cursoCodigo === curso.codigo);
    const totalLecciones = modsCurso.reduce((sum, m) => sum + storage.lecciones.filter(l => l.moduloCodigo === m.codigo).length, 0);
    
    modalContainer.innerHTML = `
      <div class="modal-header">Editar Curso</div>
      <div class="modal-subtitle">${curso.codigo} • ${modsCurso.length} módulos • ${totalLecciones} lecciones</div>
      <form class="modal-body">
        <div class="form-group">
          <label><span class="required">*</span> Nombre</label>
          <input type="text" class="form-control form-control-compact" id="edit-nombre" value="${curso.nombre}" placeholder="Nombre del curso" />
        </div>
        <div class="form-group">
          <label>Descripción</label>
          <textarea class="form-control form-control-compact" id="edit-descripcion" placeholder="Descripción del curso..." style="min-height: 100px;">${curso.descripcion || ''}</textarea>
        </div>
        <div class="form-group">
          <label>Docente</label>
          <select class="form-control form-control-compact" id="edit-docente">
            <option value="">Seleccione docente...</option>
          </select>
        </div>
        <div class="form-group">
          <label>Imagen (URL)</label>
          <input type="text" class="form-control form-control-compact" id="edit-imagen" value="${curso.imagen || ''}" placeholder="https://..." />
          <img id="edit-preview" class="image-preview" ${curso.imagen ? `src="${curso.imagen}" style="display:block; width:100%; max-width:300px; margin-top:1rem; border-radius:10px;"` : 'style="display:none;"'} />
        </div>

        <div class="form-group">
          <label>Contenido del curso</label>
          <div id="edit-modulos-list" style="max-height:260px; overflow:auto; background:#fbfeff; border-radius:10px; padding:0.75rem; margin-top:0.5rem;"></div>
        </div>
      </form>
      <div class="modal-footer modal-footer-compact">
        <button type="button" class="btn btn-secondary btn-compact" id="modal-cancelar-edit">Cancelar</button>
        <button type="button" class="btn btn-primary btn-compact" id="modal-guardar-full-edit">Guardar Cambios</button>
      </div>
    `;

    modalOverlay.appendChild(modalContainer);
    document.body.appendChild(modalOverlay);

    // Renderizar módulos y lecciones dentro del modal (interactivo)
    const modulosListContainer = modalContainer.querySelector('#edit-modulos-list');

    function renderModulosInModal() {
      const mods = storage.modulos.filter(m => m.cursoCodigo === curso.codigo);
      if (!modulosListContainer) return;
      if (mods.length === 0) {
        modulosListContainer.innerHTML = '<div class="empty-state">Sin módulos</div>';
        return;
      }

      modulosListContainer.innerHTML = mods.map(mod => {
        const lecs = storage.lecciones.filter(l => l.moduloCodigo === mod.codigo);
        return `
          <div class="modal-modulo-card" data-mod="${mod.codigo}" style="border-bottom:1px solid #eef6f8; padding:0.6rem 0;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem;">
              <div>
                <div style="font-weight:800; color:#0f3446;">${mod.codigo}: ${mod.nombre}</div>
                ${mod.descripcion ? `<div style="color:#6b7280; font-size:0.92rem; margin-top:0.25rem;">${mod.descripcion}</div>` : ''}
              </div>
              <div style="display:flex; gap:0.4rem; align-items:center;">
                <div style="font-size:0.85rem; color:#6b7280;">${lecs.length} lección(es)</div>
                <button class="btn btn-secondary btn-sm" data-mod-edit="${mod.codigo}">Editar</button>
                <button class="btn btn-danger btn-sm" data-mod-del="${mod.codigo}">Eliminar</button>
              </div>
            </div>
            <div style="margin-top:0.55rem; padding-left:0.25rem;">
              ${lecs.length === 0 ? '<div style="color:#999;">Sin lecciones</div>' : lecs.map(l => `
                <div class="modal-lec-item" data-lec="${l.id}" style="display:flex; justify-content:space-between; gap:0.5rem; padding:0.35rem 0; border-radius:6px;">
                  <div style="font-size:0.95rem; color:#16324f;">${l.titulo}</div>
                  <div style="display:flex; gap:0.5rem; align-items:center;">
                    <div style="color:#00ADB5; font-size:0.85rem;">${l.horas}h</div>
                    <button class="btn btn-secondary btn-sm" data-lec-edit="${mod.codigo}|${l.id}">Editar</button>
                    <button class="btn btn-danger btn-sm" data-lec-del="${mod.codigo}|${l.id}">Eliminar</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('');

      // Attach handlers
      modulosListContainer.querySelectorAll('[data-mod-edit]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const modCode = btn.dataset.modEdit;
          openEditModuleForm(modCode);
        });
      });

      modulosListContainer.querySelectorAll('[data-mod-del]').forEach(btn => {
        btn.addEventListener('click', () => {
          const modCode = btn.dataset.modDel;
          if (!confirm('¿Eliminar módulo y todas sus lecciones?')) return;
          // remove module and its lessons
          storage.modulos = storage.modulos.filter(m => m.codigo !== modCode);
          storage.lecciones = storage.lecciones.filter(l => l.moduloCodigo !== modCode);
          localStorage.setItem('modulos', JSON.stringify(storage.modulos));
          localStorage.setItem('lecciones', JSON.stringify(storage.lecciones));
          renderModulosInModal();
          renderCursosList();
          mostrarMensaje('Módulo eliminado', 'exito');
        });
      });

      modulosListContainer.querySelectorAll('[data-lec-edit]').forEach(btn => {
        btn.addEventListener('click', () => {
          const [modCode, lecId] = btn.dataset.lecEdit.split('|');
          openEditLessonForm(modCode, lecId);
        });
      });

      modulosListContainer.querySelectorAll('[data-lec-del]').forEach(btn => {
        btn.addEventListener('click', () => {
          const [modCode, lecId] = btn.dataset.lecDel.split('|');
          if (!confirm('¿Eliminar esta lección?')) return;
          storage.lecciones = storage.lecciones.filter(l => l.id !== lecId);
          localStorage.setItem('lecciones', JSON.stringify(storage.lecciones));
          renderModulosInModal();
          renderCursosList();
          mostrarMensaje('Lección eliminada', 'exito');
        });
      });
    }

    // Open inline edit form for a module
    function openEditModuleForm(modCode) {
      const mod = storage.modulos.find(m => m.codigo === modCode);
      if (!mod) return;
      const card = modulosListContainer.querySelector(`[data-mod="${modCode}"]`);
      if (!card) return;
      card.dataset.editing = '1';
      const lecs = storage.lecciones.filter(l => l.moduloCodigo === mod.codigo);
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem;">
          <div style="flex:1;">
            <div style="font-weight:800; color:#0f3446; margin-bottom:0.5rem;">Editar módulo</div>
            <div style="display:flex; gap:0.5rem;">
              <input class="form-control form-control-compact" id="edit-mod-codigo" value="${mod.codigo}" style="width:110px;" />
              <input class="form-control form-control-compact" id="edit-mod-nombre" value="${mod.nombre}" placeholder="Nombre del módulo" />
            </div>
            <textarea class="form-control form-control-compact" id="edit-mod-desc" style="margin-top:0.5rem; min-height:70px;">${mod.descripcion || ''}</textarea>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.5rem; margin-left:0.5rem;">
            <button class="btn btn-primary btn-sm" id="save-mod">Guardar</button>
            <button class="btn btn-secondary btn-sm" id="cancel-mod">Cancelar</button>
          </div>
        </div>
        <div style="margin-top:0.6rem; font-size:0.9rem; color:#6b7280;">${lecs.length} lección(es) en este módulo</div>
      `;

      const inputCodigoMod = card.querySelector('#edit-mod-codigo');
      const inputNombreMod = card.querySelector('#edit-mod-nombre');
      const inputDescMod = card.querySelector('#edit-mod-desc');
      const btnSaveMod = card.querySelector('#save-mod');
      const btnCancelMod = card.querySelector('#cancel-mod');

      btnCancelMod.addEventListener('click', () => {
        renderModulosInModal();
      });

      btnSaveMod.addEventListener('click', () => {
        const newCode = inputCodigoMod.value.trim();
        const newName = inputNombreMod.value.trim();
        const newDesc = inputDescMod.value.trim();
        if (!newCode || !newName) { alert('Código y nombre son requeridos'); return; }
        // if code changed, ensure uniqueness
        if (newCode !== mod.codigo && storage.modulos.some(m => m.codigo === newCode)) { alert('Ya existe un módulo con ese código'); return; }

        // Update module
        const modIdx = storage.modulos.findIndex(m => m.codigo === mod.codigo);
        if (modIdx !== -1) {
          // If code changed, update lessons' moduloCodigo
          if (newCode !== mod.codigo) {
            storage.lecciones.forEach(l => { if (l.moduloCodigo === mod.codigo) l.moduloCodigo = newCode; });
          }
          storage.modulos[modIdx] = { codigo: newCode, nombre: newName, descripcion: newDesc, cursoCodigo: storage.modulos[modIdx].cursoCodigo };
          localStorage.setItem('modulos', JSON.stringify(storage.modulos));
          localStorage.setItem('lecciones', JSON.stringify(storage.lecciones));
          renderModulosInModal();
          renderCursosList();
          mostrarMensaje('Módulo actualizado', 'exito');
        }
      });
    }

    // Open inline edit form for a lesson
    function openEditLessonForm(modCode, lecId) {
      const card = modulosListContainer.querySelector(`[data-mod="${modCode}"]`);
      if (!card) return;
      const lec = storage.lecciones.find(l => l.id === lecId);
      if (!lec) return;

      // replace the lesson item with an inline form
      const lecItem = card.querySelector(`[data-lec="${lecId}"]`);
      if (!lecItem) return;
      lecItem.innerHTML = `
        <div style="flex:1;">
          <input class="form-control form-control-compact" id="edit-lec-titulo" value="${lec.titulo}" placeholder="Título" />
          <div style="display:flex; gap:0.5rem; margin-top:0.4rem; align-items:center;">
            <input type="number" class="form-control form-control-compact" id="edit-lec-horas" value="${lec.horas}" style="width:90px;" />
            <input class="form-control form-control-compact" id="edit-lec-multimedia" value="${(lec.multimedia || []).join(', ')}" placeholder="URLs separadas por comas" />
          </div>
          <textarea class="form-control form-control-compact" id="edit-lec-contenido" style="margin-top:0.4rem; min-height:70px;">${lec.contenido || ''}</textarea>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.4rem; margin-left:0.5rem;">
          <button class="btn btn-primary btn-sm" id="save-lec">Guardar</button>
          <button class="btn btn-secondary btn-sm" id="cancel-lec">Cancelar</button>
        </div>
      `;

      const inputTitulo = lecItem.querySelector('#edit-lec-titulo');
      const inputHoras = lecItem.querySelector('#edit-lec-horas');
      const inputMultimedia = lecItem.querySelector('#edit-lec-multimedia');
      const inputContenido = lecItem.querySelector('#edit-lec-contenido');
      const btnSave = lecItem.querySelector('#save-lec');
      const btnCancel = lecItem.querySelector('#cancel-lec');

      btnCancel.addEventListener('click', () => { renderModulosInModal(); });

      btnSave.addEventListener('click', () => {
        const titulo = inputTitulo.value.trim();
        const horas = parseInt(inputHoras.value);
        const multimedia = inputMultimedia.value.trim() ? inputMultimedia.value.split(',').map(u => u.trim()).filter(Boolean) : [];
        const contenido = inputContenido.value.trim();
        if (!titulo || !horas || horas <= 0) { alert('Título y horas válidas son requeridas'); return; }
        const lecIdx = storage.lecciones.findIndex(l => l.id === lecId);
        if (lecIdx !== -1) {
          storage.lecciones[lecIdx] = { ...storage.lecciones[lecIdx], titulo, horas, contenido, multimedia };
          localStorage.setItem('lecciones', JSON.stringify(storage.lecciones));
          renderModulosInModal();
          renderCursosList();
          mostrarMensaje('Lección actualizada', 'exito');
        }
      });
    }

    // initial render
    renderModulosInModal();

    // Cargar docentes
    const selectDocente = modalContainer.querySelector('#edit-docente');
    const docentesOcupados = storage.cursos
      .filter(c => c.codigo !== curso.codigo)
      .map(c => c.docente);
    const disponibles = storage.profesores.filter(p => !docentesOcupados.includes(p.correo));
    
    disponibles.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.correo;
      opt.textContent = p.nombre;
      if (p.correo === curso.docente) opt.selected = true;
      selectDocente.appendChild(opt);
    });

    const inputNombre = modalContainer.querySelector('#edit-nombre');
    const inputDesc = modalContainer.querySelector('#edit-descripcion');
    const inputImagen = modalContainer.querySelector('#edit-imagen');
    const previewImagen = modalContainer.querySelector('#edit-preview');
    const btnCancelar = modalContainer.querySelector('#modal-cancelar-edit');
    const btnGuardar = modalContainer.querySelector('#modal-guardar-full-edit');

    // Preview de imagen
    inputImagen.addEventListener('input', () => {
      const val = inputImagen.value.trim();
      if (isValidImageUrl(val)) {
        previewImagen.src = val;
        previewImagen.style.display = 'block';
      } else {
        previewImagen.style.display = 'none';
      }
    });

    function cerrarModal() {
      modalOverlay.remove();
    }

    btnCancelar.addEventListener('click', cerrarModal);
    modalOverlay.addEventListener('click', (ev) => {
      if (ev.target === modalOverlay) cerrarModal();
    });

    btnGuardar.addEventListener('click', () => {
      const nombre = inputNombre.value.trim();
      const descripcion = inputDesc.value.trim();
      const imagen = inputImagen.value.trim();
      const docente = selectDocente.value;

      if (!nombre) {
        alert('El nombre del curso es requerido');
        inputNombre.focus();
        return;
      }

      // Validar que la imagen sea URL válida
      if (imagen && !isValidImageUrl(imagen)) {
        alert('La URL de la imagen no es válida');
        inputImagen.focus();
        return;
      }

      // Validar que el docente no esté asignado a otro curso
      if (docente && docente !== curso.docente && storage.cursos.some(c => c.docente === docente && c.codigo !== curso.codigo)) {
        alert('Este docente ya tiene un curso asignado');
        selectDocente.focus();
        return;
      }

      // Actualizar curso
      const idx = storage.cursos.findIndex(c => c.codigo === curso.codigo);
      if (idx !== -1) {
        storage.cursos[idx] = {
          ...storage.cursos[idx],
          nombre,
          descripcion,
          imagen: imagen || storage.cursos[idx].imagen,
          docente: docente || storage.cursos[idx].docente
        };
        localStorage.setItem('cursos', JSON.stringify(storage.cursos));
        mostrarMensaje(`Curso "${nombre}" actualizado`, 'exito');
        renderCursosList();
        cerrarModal();
      }
    });
  }

  // === RENDERIZAR CURSOS COMPLETADOS ===
  function renderCursosList() {
    cursosList.innerHTML = '';

    let cursosFiltered = storage.cursos;
    if (filtroSearch) {
      cursosFiltered = cursosFiltered.filter(c => (
        (c.codigo && c.codigo.toLowerCase().includes(filtroSearch)) ||
        (c.nombre && c.nombre.toLowerCase().includes(filtroSearch))
      ));
    }

    if (cursosFiltered.length === 0) {
      cursosList.innerHTML = '<div class="empty-state">No hay cursos aún</div>';
      return;
    }

    cursosFiltered.forEach(curso => {
      const modsCurso = storage.modulos.filter(m => m.cursoCodigo === curso.codigo);
      const lecsCurso = [];
      modsCurso.forEach(mod => {
        lecsCurso.push(...storage.lecciones.filter(l => l.moduloCodigo === mod.codigo));
      });

      const div = document.createElement('div');
      div.className = 'curso-container';
      div.innerHTML = `
        <div class="curso-header">
          <div>
            <div class="curso-title">${curso.codigo}: ${curso.nombre}</div>
            <div class="curso-meta">${storage.profesores.find(p => p.correo === curso.docente)?.nombre || 'N/A'}</div>
            <div class="curso-meta">${modsCurso.length} módulo(s) - ${lecsCurso.length} lección(es)</div>
          </div>
          <div class="curso-actions">
            <button class="btn btn-secondary btn-sm" data-edit-curso="${curso.codigo}">Editar</button>
            <button class="btn btn-danger btn-sm" data-del-curso="${curso.codigo}">Eliminar</button>
          </div>
        </div>

        <img src="${curso.imagen}" style="width:100%; height:120px; border-radius:10px; object-fit:cover; margin-bottom:1rem;" />
        <p style="color:#555; margin: 0 0 1rem; font-size:0.9rem;">${curso.descripcion}</p>

        <div style="background:#f8fbfc; border-radius:12px; padding:1rem;">
          ${modsCurso.length === 0 ? '<div class="empty-state">Sin módulos</div>' : modsCurso.map(mod => {
            const lecs = storage.lecciones.filter(l => l.moduloCodigo === mod.codigo);
            return `
              <div class="modulo-card">
                <div class="modulo-header">
                  <div>
                    <div class="modulo-title">${mod.codigo}: ${mod.nombre}</div>
                    ${mod.descripcion ? `<div class="modulo-info">${mod.descripcion}</div>` : ''}
                  </div>
                </div>
                <div class="lecciones-list">
                  ${lecs.length === 0 ? '<div style="color:#999;">Sin lecciones</div>' : lecs.map(l => `
                    <div class="leccion-item">
                      <div class="leccion-info">
                        <div class="leccion-titulo">${l.titulo}</div>
                        <div class="leccion-horas">${l.horas}h</div>
                        ${l.contenido ? `<div class="leccion-contenido-preview" style="font-size:0.8rem; color:#666; margin-top:0.3rem;">Contenido disponible</div>` : ''}
                        ${(l.multimedia && l.multimedia.length > 0) ? `<div class="leccion-multimedia-preview" style="font-size:0.8rem; color:#00ADB5; margin-top:0.2rem;">${l.multimedia.length} recurso(s)</div>` : ''}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;

      cursosList.appendChild(div);

      // Eliminar curso
      div.querySelector(`[data-del-curso="${curso.codigo}"]`).addEventListener('click', () => {
        if (confirm(`¿Eliminar curso "${curso.nombre}"?`)) {
          storage.cursos = storage.cursos.filter(c => c.codigo !== curso.codigo);
          storage.modulos = storage.modulos.filter(m => m.cursoCodigo !== curso.codigo);
          storage.lecciones = storage.lecciones.filter(l => {
            const mod = storage.modulos.find(m => m.codigo === l.moduloCodigo);
            return !mod || mod.cursoCodigo !== curso.codigo;
          });

          localStorage.setItem('cursos', JSON.stringify(storage.cursos));
          localStorage.setItem('modulos', JSON.stringify(storage.modulos));
          localStorage.setItem('lecciones', JSON.stringify(storage.lecciones));

          renderCursosList();
          mostrarMensaje('Curso eliminado', 'exito');
        }
      });

      // Editar curso
      div.querySelector(`[data-edit-curso="${curso.codigo}"]`).addEventListener('click', () => {
        abrirModalEditarCurso(curso);
      });
    });
  }

  // === INICIALIZAR ===
  renderCrearCursoForm();
  renderCursosList();

  return container;
}