// js/views/header.js
import { notificacionExito, notificacionError, notificacionAdvertencia } from '../utils/notificaciones.js';

export class header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.cargarSesion();
  }

  cargarSesion() {
    const sesionActual = localStorage.getItem('sesionActual');
    if (sesionActual) {
      this.sesion = JSON.parse(sesionActual);
    }
  }

  connectedCallback() {
    this.render();
    this.mostrarMensaje();
    if (this.sesion) {
      this.setupMenuUsuario();
    } else {
      this.setupLoginButton();
      this.setupCrearCuentaButton();
    }
    this.setupLinkCursos();
    this.setupLinkHome();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
        :host { display: block; }
        #header-inner {
            background-color: var(--primary-variant, #00ADB5);
            color: var(--white, #FFFFFF);
            width: 100%;
            height: 5vh;
            padding: 2.5%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(0,0,0,0.8);
        }
        #logo { width: 4vw; height: 8vh; object-fit: contain; cursor: pointer; }
        #header-left {
            display: flex;
            align-items: center;
            gap: 2rem;
        }
        #welcome-message {
            font-size: 1.2rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.95);
            min-height: 2rem;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.1);
            transition: all 0.4s ease;
            display: flex;
            align-items: center;
            min-width: 200px;
        }
        #welcome-message.show {
            animation: slideInWelcome 0.6s ease;
        }
        @keyframes slideInWelcome {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        #welcome-message.hide {
            animation: slideOutWelcome 0.4s ease;
        }
        @keyframes slideOutWelcome {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(-20px);
            }
        }
        #header-inner div { display: flex; gap: 2rem; align-items: center; }
        #header-inner a {
            text-decoration: none; color: inherit; font-weight: bold;
            font-size: 1.6rem; transition: all 0.3s ease;
        }
        .btn-cuentas {
            padding: 0.5rem 1rem; font-size: 1rem; border-radius: 8px;
            cursor: pointer; background-color: var(--white, #FFFFFF);
            color: var(--primary-variant, #00ADB5); border: 2px solid var(--white, #FFFFFF);
            font-weight: bold; transition: all 0.3s ease;
        }
        .btn-cuentas:hover {
            background-color: transparent; color: var(--white, #FFFFFF); transform: scale(1.05);
        }
        #header-inner a:hover { text-decoration: underline; transform: scale(1.02); }
        .btn-usuario {
            width: 40px; height: 40px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-size: 1.2rem; font-weight: bold;
            background-color: var(--white, #FFFFFF); color: var(--primary-variant, #00ADB5);
            border: 2px solid var(--white, #FFFFFF); cursor: pointer;
            transition: all 0.3s ease;
        }
        .btn-usuario:hover {
            background-color: transparent; color: var(--white, #FFFFFF); transform: scale(1.05);
        }
        #auth-buttons { display: flex; gap: 1rem; position: relative; }
        .menu-lateral {
            position: fixed; top: 80px; right: 20px;
            background-color: white; border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            min-width: 250px; padding: 0.5rem 0;
            opacity: 0; visibility: hidden;
            transform: translateY(-10px) scale(0.95);
            transition: all 0.2s ease; z-index: 999999;
            pointer-events: none;
        }
        .menu-lateral.visible {
            opacity: 1; visibility: visible;
            transform: translateY(0) scale(1); pointer-events: all;
        }
        .menu-header {
            margin-right: 1rem; padding: 1.2rem;
            border-bottom: 1px solid #eee; background-color: #f8f9fa;
            border-radius: 8px 8px 0 0;
        }
        .menu-header-name { font-weight: bold; color: #2c3e50; margin-bottom: 0.4rem; font-size: 1.1rem; }
        .menu-header-email { font-size: 0.9rem; color: #444; word-break: break-all; }
        .menu-item {
            padding: 1rem 1.2rem; color: #333;
            display: flex; align-items: center; gap: 0.8rem;
            cursor: pointer; transition: all 0.2s ease; font-weight: 500;
        }
        .menu-item:hover { color: var(--primary-variant, #00ADB5); background-color: #f8f9fa; }
        .menu-separator { height: 1px; background-color: #eee; margin: 0.5rem 0; }
        #btn-cerrar-sesion {
            color: #ffffff; background-color: #B31312;
            border-radius: 8px; padding: 0.8rem 1rem;
            cursor: pointer; transition: all 0.3s ease;
            margin: 0.5rem;
        }
        #btn-cerrar-sesion:hover {
            background-color: #8B0000; transform: scale(1.02);
        }
        @media (max-width: 1024px) {
            #welcome-message {
                font-size: 1rem;
                min-width: 150px;
            }
        }
        @media (max-width: 768px) {
            #welcome-message {
                display: none;
            }
        }
    </style>

    <header id="header-inner">
      <div id="header-left">
        <img id="logo" src="../../assets/icons/bloquear3.svg" alt="Educate ABC Logo" />
        <div id="welcome-message"></div>
      </div>
      <div>
        <a class="direcciones" href="#" id="link-home">Home</a>
        <a class="direcciones" href="#" id="link-cursos">Cursos</a>
        <a class="direcciones" href="https://github.com/Tomfmp2/LMS-educational-system">Contactanos</a>
        <div id="auth-buttons">
          ${this.sesion ? `
            <button class="btn-usuario" id="btn-usuario">${this.getInitial(this.sesion.correo)}</button>
            <div class="menu-lateral" id="menu-usuario">
              <div class="menu-header">
                <div class="menu-header-name">${this.sesion.nombreCompleto}</div>
                <div class="menu-header-email">${this.sesion.correo}</div>
              </div>
              <div class="menu-separator"></div>
              ${this.sesion.isAdmin ? `
                <div class="menu-item" id="btn-crear-curso">Crear Cursos</div>
                <div class="menu-item" id="btn-gestion-profesores">Gestionar Profesores</div>
                <div class="menu-item" id="btn-gestion-administrativos">Gestionar Administrativos</div>
                <div class="menu-item" id="btn-nuevo-apartado">Gestor Estudiantes</div>
              ` : `
                <div class="menu-item" id="btn-mis-cursos">Mis Cursos</div>
                <div class="menu-item" id="btn-favoritos">Favoritos</div>
              `}
              <div class="menu-separator"></div>
              <div class="menu-item" id="btn-cerrar-sesion">
                <span>Cerrar sesión</span>
              </div>
            </div>
          ` : `
            <input id="btnLogin" class="btn-cuentas" type="button" value="Iniciar Sesion"/>
            <input id="btn-crear-cuenta" class="btn-cuentas" type="button" value="Crear Cuenta"/>
          `}
        </div>
      </div>
    </header>
    `;
  }
  administrativos
  setupLinkHome() {
    const link = this.shadowRoot.querySelector('#link-home');
    const logo = this.shadowRoot.querySelector('#logo');
    
    const recargarHome = (e) => {
      e.preventDefault();
      location.reload();
    };administrativos
    
    if (link) link.addEventListener('click', recargarHome);
    if (logo) logo.addEventListener('click', recargarHome);
  }

  setupLinkCursos() {
    const link = this.shadowRoot.querySelector('#link-cursos');
    if (link) {
      link.addEventListener('click', async (e) => {
        e.preventDefault();
        const { renderCursos } = await import('../pages/cursos.js');
        const section = document.getElementById('section-home');
        if (section) {
          section.innerHTML = '';
          section.appendChild(renderCursos());
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }

  setupLoginButton() {
    const btn = this.shadowRoot.querySelector('#btnLogin');
    if (btn) {
      btn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('open-login', { bubbles: true, composed: true }));
      });
    }
  }

  setupCrearCuentaButton() {
    const btn = this.shadowRoot.querySelector('#btn-crear-cuenta');
    if (btn) {
      btn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('open-registro', { bubbles: true, composed: true }));
      });
    }
  }

  async setupMenuUsuario() {
    const { notificacionAdvertencia } = await import('../utils/notificaciones.js');
    
    const btnUsuario = this.shadowRoot.querySelector('#btn-usuario');
    const menuUsuario = this.shadowRoot.querySelector('#menu-usuario');
    const btnCerrarSesion = this.shadowRoot.querySelector('#btn-cerrar-sesion');
    const btnCrearCurso = this.shadowRoot.querySelector('#btn-crear-curso');
    const btnMisCursos = this.shadowRoot.querySelector('#btn-mis-cursos');
    const btnFavoritos = this.shadowRoot.querySelector('#btn-favoritos');

    if (btnUsuario && menuUsuario) {
      btnUsuario.addEventListener('click', (e) => {
        e.stopPropagation();
        menuUsuario.classList.toggle('visible');
      });

      document.addEventListener('click', (e) => {
        const path = e.composedPath();
        if (!path.includes(menuUsuario) && !path.includes(btnUsuario)) {
          menuUsuario.classList.remove('visible');
        }
      });
    }

    if (btnCerrarSesion) {
      btnCerrarSesion.addEventListener('click', async () => {
        // Logout sin confirm blocking
        localStorage.removeItem('sesionActual');
        
        // Mostrar mensaje de despedida
        const welcomeEl = this.shadowRoot.querySelector('#welcome-message');
        if (welcomeEl) {
          welcomeEl.textContent = '¡Vuelve pronto!';
          welcomeEl.classList.remove('show');
          welcomeEl.classList.add('hide');
        }
        
        // Notificar al usuario
        notificacionAdvertencia('Sesión cerrada');
        
        // Recargar después de un tiempo
        setTimeout(() => {
          location.reload();
        }, 1200);
      });
    }

    if (btnCrearCurso) {
      btnCrearCurso.addEventListener('click', async () => {
        try {
          const { renderCrearCurso } = await import('../admin/crearCursos.js');
          const section = document.getElementById('section-home');
          if (section) {
            section.innerHTML = '';
            section.appendChild(renderCrearCurso());
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            notificacionError('Error al cargar el contenedor. Recarga la página.');
          }
        } catch (error) {
          notificacionError(`Error al cargar: ${error.message}`);
        } finally {
          menuUsuario.classList.remove('visible');
        }
      });
    }

    const btnGestionProfesores = this.shadowRoot.querySelector('#btn-gestion-profesores');
    if (btnGestionProfesores) {
      btnGestionProfesores.addEventListener('click', async () => {
        try {
          const { renderGestionProfesores } = await import('../admin/gestionProfesores.js');
          const section = document.getElementById('section-home');
          if (section) {
            section.innerHTML = '';
            section.appendChild(renderGestionProfesores());
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } catch (error) {
          notificacionError('Error al cargar gestión de profesores. Recarga la página.');
        } finally {
          menuUsuario.classList.remove('visible');
        }
      });
    }

    const btnnuevoApartad = this.shadowRoot.querySelector('#btn-nuevo-apartado');
    if (btnnuevoApartad) {
      btnnuevoApartad.addEventListener('click', async () => {
        try {
          const { renderGestionProfesores } = await import('../admin/gestorEstudiantes.js');
          const section = document.getElementById('section-home');
          if (section) {
            section.innerHTML = '';
            section.appendChild(renderGestionProfesores());
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } catch (error) {
          notificacionError('Error al cargar el nuevo apartado. Recarga la página.');
        } finally {
          menuUsuario.classList.remove('visible');
        }
      });
    }


    const btnGestionAdministrativos = this.shadowRoot.querySelector('#btn-gestion-administrativos');
    if (btnGestionAdministrativos) {
      btnGestionAdministrativos.addEventListener('click', async () => {
        try {
          const { renderGestionAdministrativos } = await import('../admin/gestionAdministrativos.js');
          const section = document.getElementById('section-home');
          if (section) {
            section.innerHTML = '';
            section.appendChild(renderGestionAdministrativos());
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } catch (error) {
          notificacionError('Error al cargar gestión de administradores. Recarga la página.');
        } finally {
          menuUsuario.classList.remove('visible');
        }
      });
    }

    if (btnMisCursos) {
      btnMisCursos.addEventListener('click', async () => {
        try {
          const { renderMisCursos } = await import('../pages/misCursos.js');
          const section = document.getElementById('section-home');
          if (section) {
            section.innerHTML = '';
            section.appendChild(renderMisCursos());
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } catch (error) {
          notificacionError('Error al cargar tus cursos. Recarga la página.');
        } finally {
          menuUsuario.classList.remove('visible');
        }
      });
    }

    if (btnFavoritos) {
      btnFavoritos.addEventListener('click', async () => {
        try {
          const { renderFavoritos } = await import('../pages/favoritos.js');
          const section = document.getElementById('section-home');
          if (section) {
            section.innerHTML = '';
            section.appendChild(renderFavoritos());
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } catch (error) {
          notificacionError('Error al cargar favoritos. Recarga la página.');
        } finally {
          menuUsuario.classList.remove('visible');
        }
      });
    }
  }

  getInitial(email) {
    return email.charAt(0).toUpperCase();
  }

  mostrarMensaje() {
    const welcomeEl = this.shadowRoot.querySelector('#welcome-message');
    if (!welcomeEl) return;

    if (this.sesion) {
      // Mostrar mensaje de bienvenida
      const nombre = this.sesion.isAdmin ? 'Admin' : this.sesion.nombreCompleto.split(' ')[0];
      welcomeEl.textContent = `Bienvenido, ${nombre}`;
      welcomeEl.classList.remove('hide');
      welcomeEl.classList.add('show');
    } else {
      // Mostrar mensaje de despedida
      welcomeEl.classList.remove('show');
      welcomeEl.classList.add('hide');
      setTimeout(() => {
        if (!this.sesion) {
          welcomeEl.textContent = '';
        }
      }, 400);
    }
  }

  actualizarEstado(sesion) {
    this.sesion = sesion;
    this.render();
    setTimeout(() => {
      this.mostrarMensaje();
      if (sesion) this.setupMenuUsuario();
      else {
        this.setupLoginButton();
        this.setupCrearCuentaButton();
      }
      this.setupLinkCursos();
      this.setupLinkHome();
    }, 0);
  }
}

customElements.define('header-global', header);