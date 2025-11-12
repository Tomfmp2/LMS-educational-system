export function renderMisCursos() {
  const container = document.createElement('section');
  container.id = 'section-mis-cursos';

  container.innerHTML = `
    <style>
      main {
        padding: 5%;
        max-width: 1200px;
        margin: 0 auto;
      }
      h1 {
        font-size: 2.5rem;
        color: var(--primary-variant);
        text-align: center;
        margin-bottom: 1rem;
      }
      #contenedor-mis-cursos {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
      }
      .curso-card {
        background-color: var(--white);
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        position: relative;
        cursor: pointer;
      }
      .curso-card:hover {
        transform: scale(1.02);
        box-shadow: 0 6px 16px rgba(0,0,0,0.15);
      }
      .curso-card img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        border-bottom: 1px solid #eee;
      }
      .curso-info { 
        padding: 1.5rem; 
      }
      .curso-info h3 { 
        font-size: 1.4rem; 
        color: var(--primary); 
        margin-bottom: 0.5rem; 
      }
      .curso-info p { 
        color: var(--text-muted); 
        font-size: 1rem; 
        margin-bottom: 0.8rem; 
      }
      .curso-info .profesor { 
        font-weight: bold; 
        color: var(--green-persa); 
        font-size: 0.95rem; 
      }
      #mensaje-vacio {
        text-align: center;
        margin-top: 4rem;
        font-size: 1.3rem;
        color: var(--text-muted);
        font-style: italic;
      }
      .badge-favorito {
        position: absolute;
        top: 10px;
        left: 10px;
        background: var(--gold);
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: bold;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        z-index: 5;
      }
      .btn-eliminar {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #dc3545;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.9rem;
        font-weight: bold;
        cursor: pointer;
        transition: 0.3s;
        opacity: 0;
        z-index: 10;
      }
      .curso-card:hover .btn-eliminar {
        opacity: 1;
      }
      .btn-eliminar:hover {
        background: #c82333;
      }
    </style>

    <main>
      <h1>Mis Cursos</h1>
      <div id="contenedor-mis-cursos"></div>
      <p id="mensaje-vacio" style="display:none;">
        Aún no estás inscrito en ningún curso.<br>
        Ve a <strong>Cursos</strong> y ¡explora el catálogo!
      </p>
    </main>
  `;

  // Obtener sesión actual
  const sesion = JSON.parse(localStorage.getItem('sesionActual') || 'null');
  if (!sesion) {
    container.querySelector('#mensaje-vacio').textContent = 'Debes iniciar sesión para ver tus cursos.';
    container.querySelector('#mensaje-vacio').style.display = 'block';
    return container;
  }

  // Obtener cursos inscritos del usuario
  const key = `misCursos_${sesion.correo}`;
  const inscritos = JSON.parse(localStorage.getItem(key) || '[]');
  const profesores = JSON.parse(localStorage.getItem('profesores') || '[]');
  const contenedor = container.querySelector('#contenedor-mis-cursos');
  const mensajeVacio = container.querySelector('#mensaje-vacio');

  if (inscritos.length === 0) {
    mensajeVacio.style.display = 'block';
  } else {
    inscritos.forEach(curso => {
      // Obtener nombre del docente
      const docente = profesores.find(p => p.correo === curso.docente);
      const nombreDocente = docente ? docente.nombre : 'Profesor desconocido';
      
      const card = document.createElement('div');
      card.classList.add('curso-card');
      card.setAttribute('data-codigo', curso.codigo);
      card.innerHTML = `
        <div class="badge-favorito">Inscrito</div>
        <img src="${curso.imagen || 'https://via.placeholder.com/300x180'}" alt="${curso.nombre}">
        <div class="curso-info">
          <h3>${curso.nombre}</h3>
          <p>${curso.descripcion}</p>
          <span class="profesor">Docente: ${nombreDocente}</span>
        </div>
        <button class="btn-eliminar" data-codigo="${curso.codigo}">Eliminar</button>
      `;
      contenedor.appendChild(card);

      // Agregar event listener para abrir detalle del curso
      card.addEventListener('click', async (e) => {
        // No abrir si se hizo clic en el botón de eliminar
        if (e.target.classList.contains('btn-eliminar') || e.target.closest('.btn-eliminar')) {
          return;
        }
        
        const { renderDetalleCurso } = await import('./detalleCurso.js');
        const section = document.getElementById('section-home');
        if (section) {
          section.innerHTML = '';
          section.appendChild(renderDetalleCurso(curso.codigo));
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Agregar event listeners para eliminar
    contenedor.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation(); // Evitar que se abra el detalle del curso
        
        const codigoCurso = btn.dataset.codigo;
        const curso = inscritos.find(f => f.codigo === codigoCurso);
        
        if (curso) {
          // Eliminar directamente sin confirm blocking
          const nuevosInscritos = inscritos.filter(f => f.codigo !== codigoCurso);
          localStorage.setItem(key, JSON.stringify(nuevosInscritos));
          
          // Remover card del DOM con animación
          const card = btn.closest('.curso-card');
          card.style.opacity = '0';
          card.style.transform = 'translateX(-100%)';
          card.style.transition = 'all 0.3s ease';
          
          setTimeout(() => {
            card.remove();
            
            // Si no quedan inscritos, mostrar mensaje
            if (nuevosInscritos.length === 0) {
              mensajeVacio.style.display = 'block';
            }
          }, 300);
          
          // Mostrar notificación de éxito
          const { notificacionExito } = await import('../utils/notificaciones.js');
          notificacionExito(`Inscripción a "${curso.nombre}" cancelada`);
        }
      });
    });
  }

  return container;
}