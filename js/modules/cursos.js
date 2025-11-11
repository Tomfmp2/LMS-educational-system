export function renderCursos() {
  const container = document.createElement('section');
  container.id = 'section-cursos';

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
      #contenedor-cursos {
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
      }
      .curso-card {
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
      }
      .btn-favorito {
        position: absolute;
        top: 10px;
        right: 10px;
        background: var(--primary-variant);
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
      .curso-card:hover .btn-favorito {
        opacity: 1;
      }
      .btn-favorito:hover {
        background: #009aa2;
      }
      .btn-favorito.en-favoritos {
        background: #ff6b6b;
        opacity: 1;
      }
      .btn-favorito.en-favoritos:hover {
        background: #ee5a5a;
      }
      .badge-favorito {
        position: absolute;
        top: 10px;
        left: 10px;
        background: #ff6b6b;
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: bold;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        z-index: 5;
      }
      .btn-inscribir {
        position: absolute;
        bottom: 10px;
        right: 10px;
        background: var(--primary-variant);
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
      .curso-card:hover .btn-inscribir {
        opacity: 1;
      }
      .btn-inscribir:hover {
        background: #009aa2;
      }
    </style>

    <main>
      <h1>Todos los Cursos Disponibles</h1>
      <div id="contenedor-cursos"></div>
      <p id="mensaje-vacio" style="display:none;">Aún no hay cursos disponibles con contenido completo. ¡Vuelve Pronto!.</p>
    </main>
  `;

  // Obtener datos
  const cursos = JSON.parse(localStorage.getItem('cursos') || '[]');
  const modulos = JSON.parse(localStorage.getItem('modulos') || '[]');
  const lecciones = JSON.parse(localStorage.getItem('lecciones') || '[]');
  const profesores = JSON.parse(localStorage.getItem('profesores') || '[]');
  const sesion = JSON.parse(localStorage.getItem('sesionActual') || 'null');

  // Filtrar cursos que tengan al menos un módulo y una lección
  const cursosCompletos = cursos.filter(curso => {
    // Buscar módulos del curso
    const modulosDelCurso = modulos.filter(m => m.cursoCodigo === curso.codigo);
    
    // Verificar que haya al menos un módulo
    if (modulosDelCurso.length === 0) return false;
    
    // Verificar que al menos un módulo tenga lecciones
    const tieneLecciones = modulosDelCurso.some(modulo => {
      return lecciones.some(leccion => leccion.moduloCodigo === modulo.codigo);
    });
    
    return tieneLecciones;
  });

  const contenedor = container.querySelector('#contenedor-cursos');
  const mensajeVacio = container.querySelector('#mensaje-vacio');

  if (cursosCompletos.length === 0) {
    mensajeVacio.style.display = 'block';
  } else {
    // Obtener favoritos del usuario si está logueado
    let favoritos = [];
    if (sesion && !sesion.isAdmin) {
      favoritos = JSON.parse(localStorage.getItem(`favoritos_${sesion.correo}`) || '[]');
    }

    cursosCompletos.forEach((curso) => {
      // Obtener nombre del docente
      const docente = profesores.find(p => p.correo === curso.docente);
      const nombreDocente = docente ? docente.nombre : 'Profesor desconocido';
      
      // Verificar si está en favoritos
      const estaEnFavoritos = favoritos.some(f => f.codigo === curso.codigo);
      
      const card = document.createElement('div');
      card.classList.add('curso-card');
      card.setAttribute('data-codigo', curso.codigo);
      card.innerHTML = `
        ${estaEnFavoritos ? '<div class="badge-favorito">En Favoritos</div>' : ''}
        <img src="${curso.imagen || 'https://via.placeholder.com/300x180'}" alt="${curso.nombre}">
        <div class="curso-info">
          <h3>${curso.nombre}</h3>
          <p>${curso.descripcion}</p>
          <span class="profesor">Docente: ${nombreDocente}</span>
        </div>
        ${sesion && !sesion.isAdmin ? `
          <button class="btn-favorito ${estaEnFavoritos ? 'en-favoritos' : ''}" data-codigo="${curso.codigo}">
            ${estaEnFavoritos ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
          </button>
          <button class="btn-inscribir" data-codigo="${curso.codigo}">
            Inscribirse
          </button>
        ` : ''}
      `;
      contenedor.appendChild(card);

      // Agregar event listener para abrir detalle del curso
      card.addEventListener('click', async (e) => {
        // No abrir si se hizo clic en el botón de favoritos
        if (e.target.classList.contains('btn-favorito') || e.target.closest('.btn-favorito')) {
          return;
        }
        // No abrir si se hizo clic en el botón de inscribir
        if (e.target.classList.contains('btn-inscribir') || e.target.closest('.btn-inscribir')) {
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

    // === BOTÓN "AGREGAR A FAVORITOS" (solo usuarios no admin) ===
    if (sesion && !sesion.isAdmin) {
      contenedor.querySelectorAll('.btn-favorito').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation(); // Evitar que se abra el detalle del curso
          
          const codigoCurso = btn.dataset.codigo;
          const curso = cursosCompletos.find(c => c.codigo === codigoCurso);
          
          if (!curso) return;

          const key = `favoritos_${sesion.correo}`;
          let favoritos = JSON.parse(localStorage.getItem(key) || '[]');
          
          const index = favoritos.findIndex(f => f.codigo === codigoCurso);
          
          if (index === -1) {
            // Agregar a favoritos
            favoritos.push({
              codigo: curso.codigo,
              nombre: curso.nombre,
              descripcion: curso.descripcion,
              docente: curso.docente,
              imagen: curso.imagen
            });
            localStorage.setItem(key, JSON.stringify(favoritos));
            btn.textContent = 'Quitar de Favoritos';
            btn.classList.add('en-favoritos');
            
            // Agregar badge si no existe
            const card = btn.closest('.curso-card');
            if (!card.querySelector('.badge-favorito')) {
              const badge = document.createElement('div');
              badge.className = 'badge-favorito';
              badge.textContent = 'En Favoritos';
              card.insertBefore(badge, card.firstChild);
            }
            
            alert(`"${curso.nombre}" agregado a favoritos`);
          } else {
            // Quitar de favoritos
            favoritos.splice(index, 1);
            localStorage.setItem(key, JSON.stringify(favoritos));
            btn.textContent = 'Agregar a Favoritos';
            btn.classList.remove('en-favoritos');
            
            // Remover badge
            const card = btn.closest('.curso-card');
            const badge = card.querySelector('.badge-favorito');
            if (badge) badge.remove();
            
            alert(`"${curso.nombre}" eliminado de favoritos`);
          }
        });
      });
      // === BOTÓN "INSCRIBIRSE" (solo usuarios no admin) ===
      contenedor.querySelectorAll('.btn-inscribir').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const codigoCurso = btn.dataset.codigo;
          const curso = cursosCompletos.find(c => c.codigo === codigoCurso);
          if (!curso) return;

          const key = `misCursos_${sesion.correo}`;
          const inscritos = JSON.parse(localStorage.getItem(key) || '[]');
          if (!inscritos.some(c => c.codigo === curso.codigo)) {
            inscritos.push({
              codigo: curso.codigo,
              nombre: curso.nombre,
              descripcion: curso.descripcion,
              docente: curso.docente,
              imagen: curso.imagen
            });
            localStorage.setItem(key, JSON.stringify(inscritos));
            alert(`¡Te inscribiste en "${curso.nombre}"!`);
          } else {
            alert(`Ya estás inscrito en "${curso.nombre}"`);
          }
        });
      });
    }
  }

  return container;
}