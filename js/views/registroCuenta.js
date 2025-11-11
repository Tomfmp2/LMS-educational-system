class RegistroCuenta extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    console.log('Renderizando vista del crear cuenta...');
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Cerrar con el botón X
    const closeBtn = this.shadowRoot.querySelector('#closeBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.remove());
    }

    // Cerrar al hacer click fuera del modal
    const fondoRegistro = this.shadowRoot.querySelector('#fondo-registro');
    if (fondoRegistro) {
      fondoRegistro.addEventListener('click', (e) => {
        if (e.target === fondoRegistro) {
          this.remove();
        }
      });
    }

    // Manejar el envío del formulario
    const form = this.shadowRoot.querySelector('#registroForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleRegistro();
      });
    }
  }

  handleRegistro() {
    // Obtener los valores del formulario
    const correo = this.shadowRoot.querySelector('#email').value.trim().toLowerCase();
    const userData = {
      nombreCompleto: this.shadowRoot.querySelector('#fullName').value.trim(),
      contrasena: this.shadowRoot.querySelector('#password').value,
      confirmPassword: this.shadowRoot.querySelector('#confirmPassword').value
    };

    // Validar datos
    if (this.validarDatos(correo, userData)) {
      // Crear objeto de usuario
      const usuario = {
        nombreCompleto: userData.nombreCompleto,
        correoElectronico: correo,
        contrasena: userData.contrasena
      };
      
      // Obtener la base de datos de usuarios
      const usuariosJSON = localStorage.getItem('usuarios');
      let usuarios = {};
      try {
        usuarios = JSON.parse(usuariosJSON || '{}');
      } catch (e) {
        console.error('Error al parsear datos existentes:', e);
      }
      
      // Verificar si el correo ya está registrado
      if (usuarios[correo]) {
        const errorMensaje = `
          La cuenta ${correo} ya está registrada en el sistema.
          Por favor:
          - Usa otra cuenta de correo electrónico, o
          - Si es tu cuenta, inicia sesión en lugar de registrarte
        `;
        alert(errorMensaje);
        return;
      }
      
      // Guardar el usuario usando el correo como key
      usuarios[correo] = usuario;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      this.remove();
    }
  }

  validarDatos(correo, data) {
    // Validar que todos los campos estén completos
    if (!correo || !data.nombreCompleto || !data.contrasena) {
      alert('Por favor complete todos los campos');
      return false;
    }

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      alert('Por favor ingresa un correo electrónico válido (ejemplo: usuario@dominio.com)');
      return false;
    }
    
    // Verificar si ya existe el correo en localStorage antes de continuar
    try {
      const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios') || '{}');
      if (usuariosExistentes[correo]) {
        const errorMensaje = `
          La cuenta ${correo} ya está registrada en el sistema.
          Por favor:
          - Usa otra cuenta de correo electrónico, o
          - Si es tu cuenta, inicia sesión en lugar de registrarte
        `;
        alert(errorMensaje);
        return false;
      }
    } catch (e) {
      console.error('Error al verificar correo existente:', e);
    }
    
    if (data.contrasena !== data.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return false;
    }

    if (data.contrasena.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return false;
    }

    return true;
  }

  render() {
    this.shadowRoot.innerHTML = `
  <style>
        :host {
            display: block;
            font-family: Arial, sans-serif;
        }
        #fondo-registro {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .container {
            max-width: 40%;
            width: 30%;
            background-color: white;
            border-radius: 8px;
            padding: 3%;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            position: relative;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        input.error {
            border-color: #ff0000;
            background-color: #fff0f0;
        }
        .error-message {
            color: #ff0000;
            font-size: 0.8em;
            margin-top: 5px;
            display: none;
        }
        .specialization-container {
            border: 1px solid #ddd;
            padding: 10px;
            border-radius: 4px;
        }
        .specialization-item {
            margin-bottom: 10px;
        }
        button {
            background-color: var(--primary-variant, #00ADB5);
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }
    </style>
    <div id="fondo-registro">
      <div class="container">
        <button id="closeBtn" style="position: absolute; right: 10px; top: 10px; background: none; border: none; font-size: 20px; cursor: pointer;">×</button>
        <h2>¡Empezamos juntos!</h2>
        <form id="registroForm">
            <div class="form-group">
                <label for="fullName">Nombre Completo</label>
                <input type="text" id="fullName" required>
                <span class="error-message" id="fullNameError">Por favor ingrese su nombre completo</span>
            </div>
            <div class="form-group">
                <label for="email">Correo Electrónico</label>
                <input type="email" id="email" required>
                <span class="error-message" id="emailError">Correo electrónico no válido</span>
            </div>

            <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" id="password" required>
                <span class="error-message" id="passwordError">La contraseña debe tener al menos 8 caracteres</span>
            </div>

            <div class="form-group">
                <label for="confirmPassword">Confirmar Contraseña</label>
                <input type="password" id="confirmPassword" required>
                <span class="error-message" id="confirmPasswordError">Las contraseñas no coinciden</span>
            </div>

            <button type="submit" id="btn-registrar-cuenta" style="width: 100%; margin-top: 20px;">Registrar Cuenta</button>
        </form>
      </div>
    </div>
  `;

  }
}

// Register the web component
customElements.define('registro-cuenta', RegistroCuenta);