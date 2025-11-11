// js/views/header.js
export class header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.cargarSesion();
  }

  cargarSesion() {
    const sesionActual = localStorage.getItem('sesionActual');
    console.log('Sesión actual en localStorage:', sesionActual);
    if (sesionActual) {
      this.sesion = JSON.parse(sesionActual);
      console.log('Sesión cargada:', this.sesion);
    }
  }

  connectedCallback() {
    this.render();
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
        #logo { width: 4vw; height: 8vh; object-fit: contain; }
        #header-inner div { display: flex; gap: 2rem; align-items: center; }
        #header-inner a {
            text-decoration: none; color: inherit; font-weight: bold;
            font-size: 1.6rem; transition: all 0.5s ease-in-out;
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
        .menu-item:hover { color: var(--primary-variant, #00ADB5); }
        .menu-separator { height: 1px; background-color: #eee; margin: 0.5rem 0; }
        #btn-cerrar-sesion {
            color: #ffffff; background-color: #B31312;
            border-radius: 16px; padding: 0.8rem 1rem;
            cursor: pointer; transition: all 0.3s ease;
        }
        #btn-cerrar-sesion:hover {
            background-color: #ffffff; color: #B31312; border: 2px solid #B31312;
        }
    </style>

    <header id="header-inner">
      <img id="logo" src="../../assets/icons/bloquear3.png" alt="Educate ABC Logo" />
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
                <div class="menu-item" id="btn-agregar-profesor">Agregar Profesores</div>
              ` : `
                <div class="menu-item" id="btn-mis-cursos">Mis Cursos</div>
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

  setupLinkHome() {
    const link = this.shadowRoot.querySelector('#link-home');
    if (link) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        location.reload();
      });
    }
  }

  setupLinkCursos() {
    const link = this.shadowRoot.querySelector('#link-cursos');
    if (link) {
      link.addEventListener('click', async (e) => {
        e.preventDefault();
        const { renderCursos } = await import('../modules/cursos.js');
        const section = document.getElementById('section-home');
        if (section) {
          section.innerHTML = '';
          section.appendChild(renderCursos());
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
    const btnUsuario = this.shadowRoot.querySelector('#btn-usuario');
    const menuUsuario = this.shadowRoot.querySelector('#menu-usuario');
    const btnCerrarSesion = this.shadowRoot.querySelector('#btn-cerrar-sesion');
    const btnCrearCurso = this.shadowRoot.querySelector('#btn-crear-curso');
    const btnAgregarProfesor = this.shadowRoot.querySelector('#btn-agregar-profesor');
    const btnMisCursos = this.shadowRoot.querySelector('#btn-mis-cursos');

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
      btnCerrarSesion.addEventListener('click', () => {
        localStorage.removeItem('sesionActual');
        this.actualizarEstado(null);
        alert('Sesión cerrada exitosamente');
      });
    }

    // Acciones dinámicas de menú
    if (btnCrearCurso) {
      btnCrearCurso.addEventListener('click', async () => {
        try {
          console.log('Cargando módulo de crear cursos...');
          const { renderCrearCurso } = await import('../modules/crearCursos.js');
          const section = document.getElementById('section-home');
          if (section) {
            section.innerHTML = '';
            const moduloCrearCurso = renderCrearCurso();
            section.appendChild(moduloCrearCurso);
            console.log('Módulo de crear cursos cargado correctamente');
            // Scroll suave hacia el módulo
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            console.error('No se encontró el elemento #section-home');
            alert('Error: No se pudo encontrar el contenedor principal');
          }
        } catch (error) {
          console.error('Error al cargar el módulo de crear cursos:', error);
          alert('Error al cargar el módulo de crear cursos. Por favor, recarga la página.');
        }
        menuUsuario.classList.remove('visible');
      });
    }

    if (btnAgregarProfesor) {
      btnAgregarProfesor.addEventListener('click', async () => {
        const { renderAgregarProfesores } = await import('../modules/agregarProfesores.js');
        const section = document.getElementById('section-home');
        if (section) {
          section.innerHTML = '';
          section.appendChild(renderAgregarProfesores());
        }
        menuUsuario.classList.remove('visible');
      });
    }

    if (btnMisCursos) {
      btnMisCursos.addEventListener('click', async () => {
        const { renderMisCursos } = await import('../modules/misCursos.js');
        const section = document.getElementById('section-home');
        if (section) {
          section.innerHTML = '';
          section.appendChild(renderMisCursos());
        }
        menuUsuario.classList.remove('visible');
      });
    }
  }

  getInitial(email) {
    return email.charAt(0).toUpperCase();
  }

  actualizarEstado(sesion) {
    this.sesion = sesion;
    this.render();
    setTimeout(() => {
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
console.log('header-global: "Agregar Profesores" ahora abre agregarProfesores.js (solo admin)');