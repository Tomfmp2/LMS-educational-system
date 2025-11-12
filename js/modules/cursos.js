export function renderCursos() {
  const container = document.createElement('section');
  container.id = 'section-cursos';

  container.innerHTML = `
    <style>
      main {
        padding: 2rem 5%;
        max-width: 1400px;
        margin: 0 auto;
      }

      .cursos-header {
        text-align: center;
        margin-bottom: 3rem;
        animation: slideDown 0.6s ease;
      }
      #btn-primary {
        margin-top: 1rem;
      }
      h1 {
        font-size: 2.8rem;
        font-weight: 700;
        background: linear-gradient(135deg, #00ADB5 0%, #009aa2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 0.5rem;
        letter-spacing: -0.5px;
      }

      .cursos-subtitle {
        font-size: 1.1rem;
        color: #666;
        margin-top: 0.5rem;
        font-weight: 400;
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      #contenedor-cursos {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 2rem;
        margin-top: 2.5rem;
        animation: fadeIn 0.6s ease 0.2s both;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .curso-card {
        background-color: var(--white);
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0,173,181,0.08);
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        cursor: pointer;
        border: 1px solid #f0f0f0;
      }

      .curso-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 32px rgba(0,173,181,0.16);
        border-color: #00ADB5;
      }

      .curso-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #00ADB5 0%, #17a2b8 100%);
        z-index: 5;
      }

      .curso-imagen-wrapper {
        position: relative;
        height: 200px;
        overflow: hidden;
        background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .curso-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: transform 0.4s ease;
        display: block;
        background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
      }

      .curso-card img[src=""] {
        visibility: hidden;
      }

      .curso-card:hover img {
        transform: scale(1.08);
      }

      .overlay-gradient {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100px;
        background: linear-gradient(to top, rgba(0,0,0,0.35), rgba(0,0,0,0.1) 50%, transparent);
        z-index: 2;
        pointer-events: none;
      }

      /* Fallback para imágenes por defecto */
      .curso-imagen-wrapper::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(0,173,181,0.08) 0%, rgba(23,162,184,0.05) 100%);
        z-index: 1;
        pointer-events: none;
      }

      /* Icono de imagen para placeholders */
      .curso-imagen-wrapper::after {
        content: '';
        position: absolute;
        font-size: 3rem;
        opacity: 0.2;
        z-index: 1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      /* Estilos de imagen que falla */
      .curso-card img:not([src]) {
        background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
      }

      .curso-info {
        padding: 1.8rem;
        background: var(--white);
      }

      .curso-info h3 {
        font-size: 1.35rem;
        font-weight: 700;
        color: #222;
        margin-bottom: 0.6rem;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .curso-info p {
        color: #666;
        font-size: 0.95rem;
        margin-bottom: 1rem;
        line-height: 1.6;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        height: 48px;
      }

      .curso-meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 1.2rem;
        padding-top: 1.2rem;
        border-top: 1px solid #f0f0f0;
      }

      .curso-docente {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .profesor-icon {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00ADB5 0%, #009aa2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 0.75rem;
      }

      .profesor-info {
        display: flex;
        flex-direction: column;
      }

      .profesor-label {
        font-size: 0.75rem;
        color: #999;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 0.5px;
      }

      .profesor-nombre {
        font-weight: 700;
        color: #00ADB5;
        font-size: 0.95rem;
      }

      #mensaje-vacio {
        text-align: center;
        margin-top: 6rem;
        font-size: 1.2rem;
        color: #999;
        padding: 2rem;
      }

      .badge-favorito {
        position: absolute;
        top: 12px;
        left: 12px;
        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
        color: white;
        padding: 0.4rem 0.9rem;
        border-radius: 24px;
        font-size: 0.8rem;
        font-weight: 700;
        box-shadow: 0 4px 12px rgba(255,107,107,0.3);
        z-index: 5;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .btn-favorito {
        position: absolute;
        top: 12px;
        right: 12px;
        background: linear-gradient(135deg, #00ADB5 0%, #009aa2 100%);
        color: white;
        border: none;
        padding: 0.6rem 1.2rem;
        border-radius: 24px;
        font-size: 0.85rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        opacity: 0;
        z-index: 10;
        box-shadow: 0 4px 12px rgba(0,173,181,0.3);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .curso-card:hover .btn-favorito {
        opacity: 1;
        transform: translateY(2px);
      }

      .btn-favorito:hover {
        background: linear-gradient(135deg, #009aa2 0%, #00838f 100%);
        box-shadow: 0 6px 16px rgba(0,173,181,0.4);
        transform: translateY(0);
      }

      .btn-favorito:active {
        transform: translateY(4px);
      }

      .btn-favorito.en-favoritos {
        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
        opacity: 1;
        box-shadow: 0 4px 12px rgba(255,107,107,0.3);
      }

      .btn-favorito.en-favoritos:hover {
        background: linear-gradient(135deg, #ee5a5a 0%, #dd4444 100%);
        box-shadow: 0 6px 16px rgba(255,107,107,0.4);
      }

      .btn-inscribir {
        position: absolute;
        bottom: 12px;
        right: 12px;
        background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
        color: white;
        border: none;
        padding: 0.6rem 1.2rem;
        border-radius: 24px;
        font-size: 0.85rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        opacity: 0;
        z-index: 10;
        box-shadow: 0 4px 12px rgba(23,162,184,0.3);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .curso-card:hover .btn-inscribir {
        opacity: 1;
        transform: translateY(-2px);
      }

      .btn-inscribir:hover {
        background: linear-gradient(135deg, #138496 0%, #0d5e71 100%);
        box-shadow: 0 6px 16px rgba(23,162,184,0.4);
        transform: translateY(-4px);
      }

      .btn-inscribir:active {
        transform: translateY(0);
      }

      @media (max-width: 768px) {
        main {
          padding: 1.5rem 5%;
        }

        h1 {
          font-size: 2rem;
        }

        .cursos-subtitle {
          font-size: 1rem;
        }

        #contenedor-cursos {
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .btn-favorito {
          opacity: 1;
          font-size: 0.8rem;
          padding: 0.5rem 1rem;
        }

        .btn-inscribir {
          opacity: 1;
          font-size: 0.8rem;
          padding: 0.5rem 1rem;
        }
      }
    </style>

    <main>
      <div class="cursos-header">
        <h1>Todos los Cursos Disponibles</h1>
        <p class="cursos-subtitle">Explora nuestro catálogo de cursos y amplía tus conocimientos</p>
      </div>
      <div id="contenedor-cursos"></div>
      <p id="mensaje-vacio" style="display:none;">Aún no hay cursos disponibles con contenido completo. ¡Vuelve pronto!</p>
    </main>
  `;

  // Obtener datos
  let cursos = JSON.parse(localStorage.getItem('cursos') || '[]');
  let modulos = JSON.parse(localStorage.getItem('modulos') || '[]');
  let lecciones = JSON.parse(localStorage.getItem('lecciones') || '[]');
  let profesores = JSON.parse(localStorage.getItem('profesores') || '[]');
  const sesion = JSON.parse(localStorage.getItem('sesionActual') || 'null');

  // --- INICIALIZACIÓN DE DATOS POR DEFECTO ---
  // Si hay profesores incompletos o faltantes, inicializar algunos por defecto
  const safeArray = (v) => Array.isArray(v) ? v : [];
  const cursosArr = safeArray(cursos);
  const modulosArr = safeArray(modulos);
  const leccionesArr = safeArray(lecciones);
  const profesoresArr = safeArray(profesores);

  const profesoresDefault = [
    { nombre: 'Juan Martínez', correo: 'juan.martinez@lms.edu', especialidad: 'JavaScript' },
    { nombre: 'Sofia García', correo: 'sofia.garcia@lms.edu', especialidad: 'Python' },
    { nombre: 'Roberto López', correo: 'roberto.lopez@lms.edu', especialidad: 'React y Frontend' },
    { nombre: 'María Rodríguez', correo: 'maria.rodriguez@lms.edu', especialidad: 'Bases de Datos y Backend' },
    { nombre: 'Carlos Fernández', correo: 'carlos.fernandez@lms.edu', especialidad: 'DevOps y Cloud' }
  ];

  // Añadir profesores por defecto si faltan
  profesoresDefault.forEach(def => {
    if (!profesoresArr.some(p => p && p.correo === def.correo)) {
      profesoresArr.push(def);
    }
  });

  // Asegurar que exista al menos un curso por docente (si falta)
  profesoresArr.forEach(prof => {
    if (!cursosArr.some(c => c && c.docente === prof.correo)) {
      const codigoBase = (prof.correo || 'prof').split('@')[0].replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      const codigo = `CUR-${codigoBase}`;
      
      // Descripciones específicas para cada especialidad
      const descripciones = {
        'JavaScript': 'Aprende JavaScript desde cero. Domina la programación web moderna, ES6+, y desarrollo de aplicaciones interactivas con la tecnología más utilizada en el frontend.',
        'Python': 'Curso completo de Python para principiantes y avanzados. Desde conceptos básicos hasta programación orientada a objetos, web scraping y ciencia de datos.',
        'React y Frontend': 'Domina React.js, el framework más popular para desarrollo frontend. Aprende componentes, hooks, state management y construcción de aplicaciones modernas.',
        'Bases de Datos y Backend': 'Diseña y gestiona bases de datos relacionales. Desarrolla APIs REST robustas con Node.js, manejo de transacciones y arquitectura de aplicaciones.',
        'DevOps y Cloud': 'Aprende a desplegar, monitorear y mantener aplicaciones en producción. Docker, Kubernetes, AWS y CI/CD para desarrollo profesional.'
      };
      
      cursosArr.push({
        codigo,
        nombre: `Curso de ${prof.especialidad}`,
        descripcion: descripciones[prof.especialidad] || `Introducción a ${prof.especialidad}, impartido por ${prof.nombre}.`,
        docente: prof.correo,
        imagen: './assets/img/students-1807505_1920.jpg'
      });
    }
  });

  // Para cada curso, asegurar que tenga al menos un módulo y una lección
  cursosArr.forEach(curso => {
    if (!modulosArr.some(m => m && m.cursoCodigo === curso.codigo)) {
      // Crear múltiples módulos según el tipo de curso
      const modulos = [];
      
      if (curso.nombre.includes('JavaScript')) {
        modulos.push(
          { nombre: 'Fundamentos de JavaScript', descripcion: 'Variables, tipos de datos y operadores básicos' },
          { nombre: 'Control de Flujo', descripcion: 'Condicionales y bucles' },
          { nombre: 'Funciones y Scope', descripcion: 'Funciones, arrow functions y contexto this' },
          { nombre: 'DOM y Eventos', descripcion: 'Manipulación del DOM y manejo de eventos' }
        );
      } else if (curso.nombre.includes('Python')) {
        modulos.push(
          { nombre: 'Introducción a Python', descripcion: 'Configuración, sintaxis básica y estructuras de datos' },
          { nombre: 'Programación Orientada a Objetos', descripcion: 'Clases, herencia y polimorfismo' },
          { nombre: 'Manejo de Archivos y Excepciones', descripcion: 'I/O de archivos y manejo de errores' },
          { nombre: 'Librerías Populares', descripcion: 'NumPy, Pandas y Matplotlib' }
        );
      } else if (curso.nombre.includes('React')) {
        modulos.push(
          { nombre: 'Conceptos Básicos de React', descripcion: 'Componentes, JSX y props' },
          { nombre: 'Hooks y Estado', descripcion: 'useState, useEffect y custom hooks' },
          { nombre: 'Routing y Navegación', descripcion: 'React Router y navegación entre páginas' },
          { nombre: 'Estado Global', descripcion: 'Context API y Redux' }
        );
      } else if (curso.nombre.includes('Bases de Datos')) {
        modulos.push(
          { nombre: 'SQL Básico', descripcion: 'SELECT, INSERT, UPDATE, DELETE y JOINs' },
          { nombre: 'Diseño de Bases de Datos', descripcion: 'Normalización y diagrama entidad-relación' },
          { nombre: 'APIs REST', descripcion: 'Crear endpoints y manejar solicitudes HTTP' },
          { nombre: 'Seguridad y Optimización', descripcion: 'Consultas optimizadas y protección de datos' }
        );
      } else if (curso.nombre.includes('DevOps')) {
        modulos.push(
          { nombre: 'Introducción a Docker', descripcion: 'Contenedores, imágenes y docker-compose' },
          { nombre: 'Orquestación con Kubernetes', descripcion: 'Pods, servicios y deployments' },
          { nombre: 'Integración Continua', descripcion: 'GitHub Actions, GitLab CI y Jenkins' },
          { nombre: 'Despliegue en Cloud', descripcion: 'AWS, Google Cloud y Azure' }
        );
      } else {
        modulos.push(
          { nombre: 'Introducción', descripcion: 'Módulo introductorio' }
        );
      }
      
      modulos.forEach((mod, index) => {
        const modCodigo = `MOD-${curso.codigo}-${index + 1}`;
        modulosArr.push({
          codigo: modCodigo,
          nombre: mod.nombre,
          descripcion: mod.descripcion,
          cursoCodigo: curso.codigo
        });
      });
    }
  });

  // Ahora crear lecciones por módulo
  modulosArr.forEach(mod => {
    if (!leccionesArr.some(l => l && l.moduloCodigo === mod.codigo)) {
      // Crear 2-3 lecciones por módulo
      const numLecciones = mod.nombre.includes('Introducción') ? 2 : 3;
      
      for (let i = 1; i <= numLecciones; i++) {
        const lecciones_contenido = {
          'Fundamentos de JavaScript': [
            { titulo: 'Variables y Tipos de Datos', contenido: 'Aprende sobre var, let, const y los tipos primitivos de JavaScript' },
            { titulo: 'Operadores y Expresiones', contenido: 'Operadores aritméticos, lógicos y de comparación' },
            { titulo: 'Conversión de Tipos', contenido: 'Coerción y conversión explícita de tipos' }
          ],
          'Control de Flujo': [
            { titulo: 'Sentencias if/else', contenido: 'Condicionales simples y compuestos' },
            { titulo: 'Switch y Ternario', contenido: 'Otras formas de control de flujo' },
            { titulo: 'Bucles for y while', contenido: 'Iteración sobre colecciones' }
          ],
          'Funciones y Scope': [
            { titulo: 'Declaración de Funciones', contenido: 'Funciones regulares y expresiones de función' },
            { titulo: 'Arrow Functions', contenido: 'Sintaxis moderna y diferencias con funciones regulares' },
            { titulo: 'Scope y Closure', contenido: 'Ámbito léxico y closures en JavaScript' }
          ],
          'DOM y Eventos': [
            { titulo: 'Selección de Elementos', contenido: 'querySelector, getElementById y métodos de selección' },
            { titulo: 'Manipulación del DOM', contenido: 'Crear, modificar y eliminar elementos' },
            { titulo: 'Manejadores de Eventos', contenido: 'addEventListener y manejo de eventos' }
          ],
          'Introducción a Python': [
            { titulo: 'Instalación y Configuración', contenido: 'Instalar Python y configurar el entorno' },
            { titulo: 'Tu Primer Programa', contenido: 'print(), input() y primeros pasos' },
            { titulo: 'Tipos y Variables', contenido: 'Enteros, flotantes, strings y booleanos' }
          ],
          'Programación Orientada a Objetos': [
            { titulo: 'Clases y Objetos', contenido: 'Definir clases, constructores e instancias' },
            { titulo: 'Herencia', contenido: 'Herencia simple y múltiple' },
            { titulo: 'Polimorfismo y Métodos', contenido: 'Métodos abstractos y override' }
          ],
          'Conceptos Básicos de React': [
            { titulo: 'Componentes Funcionales', contenido: 'Crear componentes con funciones' },
            { titulo: 'JSX y Props', contenido: 'Sintaxis JSX y pasar datos a componentes' },
            { titulo: 'Renderizado Condicional', contenido: 'Mostrar u ocultar contenido según condiciones' }
          ],
          'Hooks y Estado': [
            { titulo: 'useState Hook', contenido: 'Gestionar estado en componentes funcionales' },
            { titulo: 'useEffect Hook', contenido: 'Efectos secundarios y ciclo de vida' },
            { titulo: 'Custom Hooks', contenido: 'Crear tus propios hooks reutilizables' }
          ],
          'SQL Básico': [
            { titulo: 'SELECT y WHERE', contenido: 'Consultas básicas y filtrado de datos' },
            { titulo: 'INSERT, UPDATE, DELETE', contenido: 'Modificación de datos' },
            { titulo: 'JOINs y Relaciones', contenido: 'Combinar datos de múltiples tablas' }
          ],
          'Diseño de Bases de Datos': [
            { titulo: 'Normalización', contenido: 'Primera, segunda y tercera forma normal' },
            { titulo: 'Diagrama Entidad-Relación', contenido: 'Modelar relaciones entre entidades' },
            { titulo: 'Índices y Claves', contenido: 'Claves primarias y foráneas' }
          ],
          'Introducción a Docker': [
            { titulo: 'Conceptos de Docker', contenido: 'Imágenes, contenedores y registros' },
            { titulo: 'Dockerfile', contenido: 'Crear imágenes personalizadas' },
            { titulo: 'Docker Compose', contenido: 'Orquestar múltiples contenedores' }
          ],
          'Orquestación con Kubernetes': [
            { titulo: 'Arquitectura de Kubernetes', contenido: 'Master, nodos y componentes' },
            { titulo: 'Pods y Servicios', contenido: 'Desplegar y exponer aplicaciones' },
            { titulo: 'Deployments', contenido: 'Gestionar réplicas y actualizaciones' }
          ],
          'Integración Continua': [
            { titulo: 'GitHub Actions', contenido: 'Workflows y automatización' },
            { titulo: 'Testing Automático', contenido: 'Ejecutar tests en CI/CD' },
            { titulo: 'Build y Deploy', contenido: 'Pipeline de construcción' }
          ],
          'Despliegue en Cloud': [
            { titulo: 'Introducción a AWS', contenido: 'EC2, S3 y servicios básicos' },
            { titulo: 'Configuración de Aplicaciones', contenido: 'Variables de entorno y configuración' },
            { titulo: 'Monitoreo y Escalado', contenido: 'CloudWatch y auto-scaling' }
          ]
        };
        
        const contenidoMod = lecciones_contenido[mod.nombre];
        const contenido = contenidoMod && contenidoMod[i - 1] 
          ? contenidoMod[i - 1] 
          : { titulo: `Lección ${i}`, contenido: 'Contenido de la lección' };
        
        leccionesArr.push({
          id: `${mod.codigo}-L${i}`,
          titulo: contenido.titulo,
          horas: 2,
          contenido: contenido.contenido,
          multimedia: [],
          moduloCodigo: mod.codigo
        });
      }
    }
  });

  // Limpiar profesores inválidos (undefined, null o sin correo)
  profesores = profesores.filter(p => 
    p && p.correo && p.nombre && 
    typeof p === 'object' && 
    p.correo !== 'undefined' && 
    p.nombre !== 'undefined'
  );
  localStorage.setItem('profesores', JSON.stringify(profesores));

  // Limpiar cursos que tienen docentes inválidos
  cursos = cursos.filter(c => 
    c && c.codigo && c.nombre && c.docente &&
    profesores.some(p => p.correo === c.docente)
  );
  
  // Limpiar módulos de cursos eliminados
  modulos = modulos.filter(m => 
    m && m.codigo && m.cursoCodigo &&
    cursos.some(c => c.codigo === m.cursoCodigo)
  );
  
  // Limpiar lecciones de módulos eliminados
  lecciones = lecciones.filter(l => 
    l && l.id && l.moduloCodigo &&
    modulos.some(m => m.codigo === l.moduloCodigo)
  );
  
  localStorage.setItem('cursos', JSON.stringify(cursos));
  localStorage.setItem('modulos', JSON.stringify(modulos));
  localStorage.setItem('lecciones', JSON.stringify(lecciones));

  // Re-assign local variables used posteriormente
  // (note: these are the original consts parsed from localStorage; we update local copies)
  // Replace local references used below
  // Reassign updated arrays to local vars used below
  cursos = cursos;
  modulos = modulos;
  lecciones = lecciones;
  profesores = profesores;

  // Limpiar cursos que no tengan módulos o lecciones válidas
  const cursosValidos = cursos.filter(curso => {
    if (!curso || !curso.codigo) return false;
    
    // Buscar módulos válidos para este curso
    const modulosDelCurso = modulos.filter(m => m && m.cursoCodigo === curso.codigo);
    
    // Si no tiene módulos, no es válido
    if (modulosDelCurso.length === 0) return false;
    
    // Verificar que al menos un módulo tenga lecciones válidas
    const tieneLecciones = modulosDelCurso.some(modulo => {
      return modulo && modulo.codigo && 
             lecciones.some(leccion => leccion && leccion.moduloCodigo === modulo.codigo);
    });
    
    return tieneLecciones;
  });

  // Actualizar arrays solo con los cursos válidos
  cursos = cursosValidos;
  
  // Limpiar módulos huérfanos (módulos de cursos eliminados o inválidos)
  modulos = modulos.filter(m => m && m.cursoCodigo && cursos.some(c => c.codigo === m.cursoCodigo));
  
  // Limpiar lecciones huérfanas (lecciones de módulos eliminados)
  lecciones = lecciones.filter(l => l && l.moduloCodigo && modulos.some(m => m.codigo === l.moduloCodigo));
  
  // Guardar nuevamente sin datos inválidos
  localStorage.setItem('cursos', JSON.stringify(cursos));
  localStorage.setItem('modulos', JSON.stringify(modulos));
  localStorage.setItem('lecciones', JSON.stringify(lecciones));

  // Filtrar cursos que tengan al menos un módulo y una lección
  const cursosCompletos = cursos.filter(curso => {
    // Buscar módulos del curso
    const modulosDelCurso = modulos.filter(m => m && m.cursoCodigo === curso.codigo);
    
    // Verificar que haya al menos un módulo
    if (modulosDelCurso.length === 0) return false;
    
    // Verificar que al menos un módulo tenga lecciones
    const tieneLecciones = modulosDelCurso.some(modulo => {
      return modulo && modulo.codigo && 
             lecciones.some(leccion => leccion && leccion.moduloCodigo === modulo.codigo);
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
      const docente = profesores.find(p => p && p.correo === curso.docente);
      const nombreDocente = (docente && docente.nombre) ? docente.nombre : 'Profesor desconocido';
      const letraDocente = nombreDocente ? nombreDocente.charAt(0).toUpperCase() : 'P';
      
      // Verificar si está en favoritos
      const estaEnFavoritos = favoritos.some(f => f.codigo === curso.codigo);
      
      const card = document.createElement('div');
      card.classList.add('curso-card');
      card.setAttribute('data-codigo', curso.codigo);
      card.innerHTML = `
        ${estaEnFavoritos ? '<div class="badge-favorito">En Favoritos</div>' : ''}
        <div class="curso-imagen-wrapper">
          <img 
            src="${curso.imagen || 'https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'}" 
            alt="${curso.nombre}"
            loading="lazy"
            onerror="this.src='https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'"
          >
          <div class="overlay-gradient"></div>
        </div>
        <div class="curso-info">
          <h3>${curso.nombre}</h3>
          <p>${curso.descripcion}</p>
          <div class="curso-meta">
            <div class="curso-docente">
              <div class="profesor-icon">${letraDocente}</div>
              <div class="profesor-info">
                <span class="profesor-label">Docente</span>
                <span class="profesor-nombre">${nombreDocente}</span>
              </div>
            </div>
          </div>
        </div>
        ${sesion && !sesion.isAdmin ? `
          <button class="btn-favorito ${estaEnFavoritos ? 'en-favoritos' : ''}" data-codigo="${curso.codigo}">
            ${estaEnFavoritos ? '★ Favorito' : '☆ Favorito'}
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
            
            // Cambiar texto e icono del botón
            btn.textContent = '★ Favorito';
            btn.classList.add('en-favoritos');
          } else {
            // Quitar de favoritos
            favoritos.splice(index, 1);
            localStorage.setItem(key, JSON.stringify(favoritos));
            
            // Remover badge
            const card = btn.closest('.curso-card');
            const badge = card.querySelector('.badge-favorito');
            if (badge) badge.remove();
            
            // Cambiar texto e icono del botón
            btn.textContent = '☆ Favorito';
            btn.classList.remove('en-favoritos');
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
            
            // Cambiar estilo visual del botón
            btn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
            btn.textContent = ' Inscrito';
            btn.disabled = true;
            
            // Revertir después de 2 segundos
            setTimeout(() => {
              btn.style.background = '';
              btn.textContent = 'Inscribirse';
              btn.disabled = false;
            }, 2000);
          } else {
            btn.style.background = 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)';
            btn.textContent = '✓ Ya inscrito';
            btn.disabled = true;
            
            setTimeout(() => {
              btn.style.background = '';
              btn.textContent = 'Inscribirse';
              btn.disabled = false;
            }, 2000);
          }
        });
      });
    }
  }

  return container;
}