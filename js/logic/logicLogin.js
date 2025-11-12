// logic/login.js - Lógica del modal de login
import { notificacionExito, notificacionError, notificacionAdvertencia } from '../utils/notificaciones.js';

export function initializeLoginLogic() {
  console.log('Inicializando lógica de login...');
  
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
  
  console.log('Elementos del modal encontrados:', {
    fondoLogin: !!fondoLogin,
    btnCerrar: !!btnCerrar,
    btnIniciarSesion: !!btnIniciarSesion,
    btnRegistrar: !!btnRegistrar
  });

  // Función para mostrar el login
  function mostrarLogin() {
    console.log('Mostrando modal de login');
    fondoLogin.style.display = 'flex';
  }

  // Función para ocultar el login
  function ocultarLogin() {
    console.log('Ocultando modal de login');
    fondoLogin.style.display = 'none';
  }

  // IMPORTANTE: Escuchar el evento custom 'open-login' desde el header
  document.addEventListener('open-login', (e) => {
    console.log('Evento open-login recibido:', e);
    mostrarLogin();
  });

  // Escuchar clicks en el documento para capturar btnLogin
  // (esto cubre clicks desde shadow DOM gracias a composed path)
  document.addEventListener('click', (e) => {
    const path = e.composedPath ? e.composedPath() : (e.path || []);
    const clickedBtn = path.some(el => el && el.id === 'btnLogin');
    
    if (clickedBtn) {
      console.log('Click detectado en btnLogin via composed path');
      mostrarLogin();
    }
  });

  // Cerrar modal con botón cerrar
  if (btnCerrar) {
    btnCerrar.addEventListener('click', () => {
      console.log('Cerrando modal con botón X');
      ocultarLogin();
    });
  }

  // Cerrar modal si se hace click fuera del section
  fondoLogin.addEventListener('click', function(e) {
    if (e.target === fondoLogin) {
      console.log('Cerrando modal con click fuera');
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
      console.error('Error durante el login:', error);
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
      console.log('Botón registrar clickeado');
      // Ocultar login y mostrar registro
      ocultarLogin();
      
      // Crear y mostrar el componente de registro
      const registroComponent = document.createElement('registro-cuenta');
      document.body.appendChild(registroComponent);
    });
  }

  // Exportar funciones al window para debugging
  window.__appLogin = {
    mostrarLogin,
    ocultarLogin
  };

  console.log('Logica de login inicializada correctamente');

  // Retornar handle para cleanup si es necesario
  return {
    mostrarLogin,
    ocultarLogin
  };
}