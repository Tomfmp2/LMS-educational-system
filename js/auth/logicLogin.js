// logic/login.js - Lógica del modal de login
import { notificacionExito, notificacionError, notificacionAdvertencia } from '../utils/notificaciones.js';

export function initializeLoginLogic() {
  // Elementos DOM
  const fondoLogin = document.getElementById('fondo-login');
  const btnCerrar = document.getElementById('closeBtn');
  const btnIniciarSesion = document.querySelector('.btn-iniciar-sesion');
  const btnRegistrar = document.querySelector('.btn-registrar');
  const inputCorreo = document.getElementById('correo-user');
  const inputContraseña = document.getElementById('contraseña-user');

  // Verificar que los elementos existan
  if (!fondoLogin) {
    console.error('No se encontró #fondo-login');
    return;
  }

  // Función para mostrar el login
  function mostrarLogin() {
    fondoLogin.style.display = 'flex';
  }

  // Función para ocultar el login
  function ocultarLogin() {
    fondoLogin.style.display = 'none';
  }

  // Escuchar el evento custom 'open-login' desde el header
  document.addEventListener('open-login', () => {
    mostrarLogin();
  });

  // Escuchar clicks en el documento para capturar btnLogin
  document.addEventListener('click', (e) => {
    const path = e.composedPath ? e.composedPath() : (e.path || []);
    const clickedBtn = path.some(el => el && el.id === 'btnLogin');
    
    if (clickedBtn) {
      mostrarLogin();
    }
  });

  // Cerrar modal con botón cerrar
  if (btnCerrar) {
    btnCerrar.addEventListener('click', () => {
      ocultarLogin();
    });
  }

  // Cerrar modal si se hace click fuera del section
  fondoLogin.addEventListener('click', function(e) {
    if (e.target === fondoLogin) {
      ocultarLogin();
    }
  });

  // Función para verificar credenciales y manejar el login
  function handleLogin(email, password) {
    // Normalizar el correo (trim y lowercase)
    email = email.trim().toLowerCase();

    try {
      // Obtener datos de usuarios del localStorage
      const usuariosJSON = localStorage.getItem('usuarios');
      
      if (!usuariosJSON) {
        notificacionAdvertencia('No hay cuentas registradas en el sistema');
        return false;
      }

      const usuarios = JSON.parse(usuariosJSON);
      
      // Verificar si existe el usuario con ese correo
      const usuario = usuarios[email];
      if (!usuario) {
        notificacionError(`La cuenta ${email} no está registrada. Verifica el correo o crea una nueva cuenta.`);
        return false;
      }

      // Verificar la contraseña
      if (usuario.contrasena !== password) {
        notificacionError('La contraseña es incorrecta');
        return false;
      }
      
      // Verificar si es cuenta de administrador
      const isAdmin = email === 'admin12345@gmail.com';
      
      // Guardar la sesión actual
      const sesionData = {
        correo: email,
        nombreCompleto: usuario.nombreCompleto,
        isAdmin: isAdmin // Añadir flag de admin a la sesión
      };
      
      localStorage.setItem('sesionActual', JSON.stringify(sesionData));
      
      // Actualizar el header
      const header = document.querySelector('header-global');
      if (header) {
        header.actualizarEstado(sesionData);
      }
      
      ocultarLogin();
      return true;

    } catch (error) {
      notificacionError('Ocurrió un error al intentar iniciar sesión');
      return false;
    }
  }

  // Verificar credenciales contra localStorage con el botón Iniciar Sesión
  if (btnIniciarSesion) {
    btnIniciarSesion.addEventListener('click', () => {
      const email = inputCorreo ? inputCorreo.value.trim() : '';
      const password = inputContraseña ? inputContraseña.value.trim() : '';

      if (!email || !password) {
        notificacionAdvertencia('Por favor ingresa email y contraseña');
        return;
      }

      handleLogin(email, password);
    });
  }

  // Funcionalidad del botón Registrar
  if (btnRegistrar) {
    btnRegistrar.addEventListener('click', () => {
      ocultarLogin();
      const registroComponent = document.createElement('registro-cuenta');
      document.body.appendChild(registroComponent);
    });
  }

  return {
    mostrarLogin,
    ocultarLogin
  };
}