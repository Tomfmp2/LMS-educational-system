// Sistema de Notificaciones Moderno
export function crearNotificacion(mensaje, tipo = 'info', duracion = 4000) {
  // Crear contenedor si no existe
  let contenedor = document.getElementById('notificaciones-container');
  if (!contenedor) {
    contenedor = document.createElement('div');
    contenedor.id = 'notificaciones-container';
    contenedor.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 400px;
      pointer-events: none;
    `;
    document.body.appendChild(contenedor);
  }

  // Crear elemento de notificación
  const notificacion = document.createElement('div');
  const notificacionId = `notif-${Date.now()}`;
  notificacion.id = notificacionId;

  // Definir estilos según tipo
  let estilos = {};
  let icono = '';

  switch (tipo) {
    case 'exito':
      estilos.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
      icono = '✓';
      break;
    case 'error':
      estilos.background = 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
      icono = '✕';
      break;
    case 'advertencia':
      estilos.background = 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)';
      icono = '⚠';
      break;
    case 'info':
    default:
      estilos.background = 'linear-gradient(135deg, #00ADB5 0%, #009aa2 100%)';
      icono = 'ℹ';
  }

  notificacion.style.cssText = `
    background: ${estilos.background};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    font-weight: 500;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    animation: slideInNotif 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: all;
    cursor: pointer;
    transition: all 0.3s ease;
    min-height: 50px;
    backdrop-filter: blur(10px);
  `;

  notificacion.innerHTML = `
    <span style="font-size: 1.3rem; font-weight: bold; min-width: 24px; display: flex; align-items: center; justify-content: center;">
      ${icono}
    </span>
    <span style="flex: 1; line-height: 1.4;">${mensaje}</span>
    <button style="
      background: rgba(255, 255, 255, 0.3);
      border: none;
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      transition: all 0.2s ease;
      padding: 0;
    " data-close="true">×</button>
  `;

  // Evento para cerrar manualmente
  notificacion.querySelector('[data-close="true"]').addEventListener('click', () => {
    cerrarNotificacion(notificacionId);
  });

  // Evento para cerrar al hacer click en la notificación
  notificacion.addEventListener('click', () => {
    cerrarNotificacion(notificacionId);
  });

  // Evento hover
  notificacion.addEventListener('mouseenter', () => {
    notificacion.style.opacity = '0.9';
    notificacion.style.transform = 'translateX(-5px)';
  });

  notificacion.addEventListener('mouseleave', () => {
    notificacion.style.opacity = '1';
    notificacion.style.transform = 'translateX(0)';
  });

  contenedor.appendChild(notificacion);

  // Cerrar automáticamente después de la duración especificada
  if (duracion > 0) {
    setTimeout(() => {
      cerrarNotificacion(notificacionId);
    }, duracion);
  }

  return notificacionId;
}

function cerrarNotificacion(notificacionId) {
  const notificacion = document.getElementById(notificacionId);
  if (notificacion) {
    notificacion.style.animation = 'slideOutNotif 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards';
    setTimeout(() => {
      notificacion.remove();
    }, 300);
  }
}

// Inyectar estilos de animación una sola vez
if (!document.getElementById('notif-styles')) {
  const style = document.createElement('style');
  style.id = 'notif-styles';
  style.textContent = `
    @keyframes slideInNotif {
      from {
        opacity: 0;
        transform: translateX(400px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideOutNotif {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(400px);
      }
    }

    @media (max-width: 768px) {
      #notificaciones-container {
        left: 10px !important;
        right: 10px !important;
        max-width: calc(100vw - 20px) !important;
      }
    }
  `;
  document.head.appendChild(style);
}

// Funciones de acceso directo
export function notificacionExito(mensaje, duracion = 4000) {
  return crearNotificacion(mensaje, 'exito', duracion);
}

export function notificacionError(mensaje, duracion = 5000) {
  return crearNotificacion(mensaje, 'error', duracion);
}

export function notificacionAdvertencia(mensaje, duracion = 4000) {
  return crearNotificacion(mensaje, 'advertencia', duracion);
}

export function notificacionInfo(mensaje, duracion = 3000) {
  return crearNotificacion(mensaje, 'info', duracion);
}
