// Validadores reutilizables
export const validadores = {
  // Validar código (no vacío, sin espacios)
  isValidCode(codigo) {
    return codigo && codigo.trim().length > 0 && !/\s/.test(codigo.trim());
  },

  // Validar URL de imagen
  isValidImageUrl(url) {
    try {
      const urlObj = new URL(url);
      return ['http', 'https'].includes(urlObj.protocol.replace(':', ''));
    } catch {
      return false;
    }
  },

  // Validar correo electrónico
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim().toLowerCase());
  },

  // Validar que no esté vacío
  isNotEmpty(value) {
    return value && value.trim().length > 0;
  },

  // Validar contraseña (mínimo 8 caracteres)
  isValidPassword(password) {
    return password && password.length >= 8;
  },

  // Validar que dos valores sean iguales
  isEqual(val1, val2) {
    return val1 === val2;
  }
};
