export function renderAgregarProfesores() {
  const container = document.createElement('section');
  container.id = 'section-agregar-profesores';
  container.innerHTML = `
    <style>
      main {
        max-width: 650px;
        margin: 2.5rem auto;
        padding: 2rem;
        background: var(--white, #fff);
        border-radius: 14px;
        box-shadow: 0 6px 18px rgba(0,0,0,0.12);
        font-family: 'Segoe UI', sans-serif;
      }
      h1 {
        text-align: center;
        color: var(--primary-variant, #00ADB5);
        margin-bottom: 1.8rem;
        font-size: 2.3rem;
        font-weight: 700;
      }
      .form-group {
        margin-bottom: 1.2rem;
      }
      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #2c3e50;
        font-size: 1.05rem;
      }
      input, textarea {
        width: 100%;
        padding: 0.9rem;
        border: 1.5px solid #ddd;
        border-radius: 10px;
        font-size: 1rem;
        transition: all 0.3s ease;
      }
      input:focus, textarea:focus {
        outline: none;
        border-color: var(--primary-variant, #00ADB5);
        box-shadow: 0 0 0 3px rgba(0,173,181,0.15);
      }
      textarea {
        resize: vertical;
        min-height: 100px;
      }
      .btn-primary {
        background: var(--primary-variant, #00ADB5);
        color: white;
        padding: 0.9rem 1.5rem;
        border: none;
        border-radius: 10px;
        font-weight: bold;
        font-size: 1.05rem;
        cursor: pointer;
        width: 100%;
        transition: background 0.3s ease;
      }
      .btn-primary:hover {
        background: #009aa2;
      }
      .btn-secondary {
        margin-top: 1.2rem;
        background: #6c757d;
        color: white;
        padding: 0.7rem 1.4rem;
        border: none;
        border-radius: 8px;
        font-size: 0.95rem;
        cursor: pointer;
        display: inline-block;
      }
      .btn-secondary:hover {
        background: #5a6268;
      }
      .mensaje {
        margin-top: 1.2rem;
        padding: 0.8rem;
        border-radius: 8px;
        text-align: center;
        font-weight: 500;
        display: none;
      }
      .mensaje.exito {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
      }
      .mensaje.error {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
      }
      .acceso-denegado {
        text-align: center;
        padding: 3rem;
        color: #B31312;
        font-size: 1.2rem;
      }
      .acceso-denegado h1 {
        color: #B31312;
        margin-bottom: 1rem;
      }
    </style>

    <main>
      <h1>Agregar Nuevo Profesor</h1>
      <form id="form-agregar-profesor">
        <div class="form-group">
          <label for="nombre">Nombre Completo *</label>
          <input type="text" id="nombre" placeholder="Ej: María González" required />
        </div>
        <div class="form-group">
          <label for="correo">Correo Electrónico *</label>
          <input type="email" id="correo" placeholder="profesor@abc.edu.co" required />
        </div>
        <div class="form-group">
          <label for="especialidad">Especialidad</label>
          <input type="text" id="especialidad" placeholder="Ej: Desarrollo Frontend" />
        </div>
        <div class="form-group">
          <label for="bio">Biografía (opcional)</label>
          <textarea id="bio" placeholder="Breve descripción del profesor..."></textarea>
        </div>
        <button type="submit" class="btn-primary">Guardar Profesor</button>
      </form>
      <button class="btn-secondary" id="btn-volver">Volver a Cursos</button>
      <div class="mensaje" id="mensaje"></div>
    </main>
  `;

  // Elementos del DOM
  const form = container.querySelector('#form-agregar-profesor');
  const mensaje = container.querySelector('#mensaje');
  const btnVolver = container.querySelector('#btn-volver');

  // Verificación de administrador
  const sesion = JSON.parse(localStorage.getItem('sesionActual') || 'null');
  if (!sesion || !sesion.isAdmin) {
    container.innerHTML = `
      <main class="acceso-denegado">
        <h1>Acceso Restringido</h1>
        <p>Esta sección es exclusiva para administradores.</p>
        <button class="btn-secondary" onclick="location.reload()">Volver al Inicio</button>
      </main>
    `;
    return container;
  }
  // Lógica del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const correo = form.correo.value.trim().toLowerCase();
    const especialidad = form.especialidad.value.trim();
    const bio = form.bio.value.trim();

    // Validación básica
    if (!nombre || !correo) {
      mostrarMensaje('Nombre y correo son obligatorios.', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      mostrarMensaje('Ingresa un correo válido.', 'error');
      return;
    }

    // Cargar profesores existentes
    const profesores = JSON.parse(localStorage.getItem('profesores') || '[]');

    // Verificar duplicados
    if (profesores.some(p => p.correo === correo)) {
      mostrarMensaje('Ya existe un profesor con este correo.', 'error');
      return;
    }

    // Crear nuevo profesor
    const nuevoProfesor = {
      id: Date.now().toString(),
      nombre,
      correo,
      especialidad: especialidad || 'No especificada',
      bio: bio || 'Sin biografía.',
      fechaRegistro: new Date().toLocaleDateString('es-CO')
    };

    // Guardar
    profesores.push(nuevoProfesor);
    localStorage.setItem('profesores', JSON.stringify(profesores));

    mostrarMensaje(`Profesor "${nombre}" agregado exitosamente.`, 'exito');
    form.reset();
  });


  // Botón Volver → Regresa a Cursos
  btnVolver.addEventListener('click', async () => {
    const { renderCursos } = await import('./cursos.js');
    const sectionHome = document.getElementById('section-home');
    if (sectionHome) {
      sectionHome.innerHTML = '';
      sectionHome.appendChild(renderCursos());
    }
  });

  function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
    mensaje.style.display = 'block';
    setTimeout(() => {
      mensaje.style.display = 'none';
    }, 5000);
  }

  return container;
}