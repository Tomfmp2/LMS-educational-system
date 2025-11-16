// js/app.js
import './components/header.js';
import './components/footer.js';
import './auth/registroCuenta.js';
import { renderLoginView } from './auth/viewLogin.js';
import { initializeLoginLogic } from './auth/logicLogin.js';
import { renderCursos } from './pages/cursos.js';
import { renderDetalleCurso } from './pages/detalleCurso.js';
import { renderCrearCurso } from './admin/crearCursos.js';
import { renderGestionProfesores } from './admin/gestionProfesores.js';
import { renderMisCursos } from './pages/misCursos.js';
import { renderFavoritos } from './pages/favoritos.js';

document.addEventListener('DOMContentLoaded', () => {
  // Crear admin por defecto
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}');
  if (!usuarios['admin12345@gmail.com']) {
    usuarios['admin12345@gmail.com'] = {
      nombreCompleto: 'Administrador',
      correoElectronico: 'admin12345@gmail.com',
      contrasena: 'admin123456789'
    };
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }

  // Renderizar login
  renderLoginView();
  initializeLoginLogic();

  // Sembrar datos por defecto si no existen
  seedDataIfEmpty();
  // Renderizar cursos destacados en el Home
  renderHomeFeatured();

  // Botón "Cursos" del home
  const btnCursosHome = document.querySelector('#section-home input[type="button"]');
  if (btnCursosHome) {
    btnCursosHome.addEventListener('click', () => {
      const appContainer = document.getElementById('section-home');
      appContainer.innerHTML = '';
      appContainer.appendChild(renderCursos());
    });
  }
});

document.addEventListener('open-registro', () => {
  const registro = document.createElement('registro-cuenta');
  document.body.appendChild(registro);
});

function seedDataIfEmpty() {
  let profesores = JSON.parse(localStorage.getItem('profesores') || '[]');
  
  // Limpiar profesores inválidos (undefined, null, sin correo o sin nombre válido)
  profesores = profesores.filter(p => 
    p && p.correo && p.nombre && 
    typeof p === 'object' && 
    p.correo !== 'undefined' && 
    p.nombre !== 'undefined' &&
    p.correo.includes('@')
  );
  
  if (profesores.length === 0) {
    const defaultProfes = [
      {
        id: '1',
        nombre: 'Juan Martínez',
        correo: 'juan.martinez@lms.edu',
        especialidad: 'JavaScript',
        bio: 'Experto en JavaScript moderno, ES6+ y desarrollo de aplicaciones interactivas. 12 años de experiencia en frontend.',
        fechaRegistro: new Date().toLocaleDateString('es-CO')
      },
      {
        id: '2',
        nombre: 'Sofia García',
        correo: 'sofia.garcia@lms.edu',
        especialidad: 'Python',
        bio: 'Especialista en Python, machine learning y análisis de datos. Desarrolladora full-stack con experiencia en startups.',
        fechaRegistro: new Date().toLocaleDateString('es-CO')
      },
      {
        id: '3',
        nombre: 'Roberto López',
        correo: 'roberto.lopez@lms.edu',
        especialidad: 'React y Frontend',
        bio: 'Arquitecto de soluciones frontend con React.js y frameworks modernos. Certificado en UX/UI design.',
        fechaRegistro: new Date().toLocaleDateString('es-CO')
      },
      {
        id: '4',
        nombre: 'María Rodríguez',
        correo: 'maria.rodriguez@lms.edu',
        especialidad: 'Bases de Datos y Backend',
        bio: 'Ingeniera de bases de datos y desarrolladora backend. Especialista en Node.js, Express y arquitecturas escalables.',
        fechaRegistro: new Date().toLocaleDateString('es-CO')
      },
      {
        id: '5',
        nombre: 'Carlos Fernández',
        correo: 'carlos.fernandez@lms.edu',
        especialidad: 'DevOps y Cloud',
        bio: 'DevOps engineer especializado en Docker, Kubernetes y AWS. Experto en CI/CD y automatización.',
        fechaRegistro: new Date().toLocaleDateString('es-CO')
      }
    ];
    profesores = defaultProfes;
  }
  
  localStorage.setItem('profesores', JSON.stringify(profesores));

  let cursos = JSON.parse(localStorage.getItem('cursos') || '[]');
  let modulos = JSON.parse(localStorage.getItem('modulos') || '[]');
  let lecciones = JSON.parse(localStorage.getItem('lecciones') || '[]');

  // Limpiar cursos con docentes inválidos
  cursos = cursos.filter(c => 
    c && c.codigo && c.nombre && c.docente &&
    c.docente !== 'undefined' && c.nombre !== 'undefined' &&
    profesores.some(p => p.correo === c.docente)
  );
  
  // Limpiar módulos de cursos eliminados
  modulos = modulos.filter(m => 
    m && m.codigo && m.cursoCodigo &&
    m.cursoCodigo !== 'undefined' && m.codigo !== 'undefined' &&
    cursos.some(c => c.codigo === m.cursoCodigo)
  );
  
  // Limpiar lecciones de módulos eliminados
  lecciones = lecciones.filter(l => 
    l && l.id && l.moduloCodigo &&
    l.moduloCodigo !== 'undefined' && l.id !== 'undefined' &&
    modulos.some(m => m.codigo === l.moduloCodigo)
  );
  
  // Actualizar imágenes de cursos con rutas relativas
  const imageUrlMap = {
    'JS101': 'https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    'PY101': 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    'REACT101': 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    'DB101': 'https://images.pexels.com/photos/5632400/pexels-photo-5632400.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    'DEVOPS101': 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
  };
  
  cursos = cursos.map(curso => {
    if (curso.imagen && curso.imagen.startsWith('/assets/img/')) {
      curso.imagen = imageUrlMap[curso.codigo] || curso.imagen;
    }
    return curso;
  });

  localStorage.setItem('cursos', JSON.stringify(cursos));
  localStorage.setItem('modulos', JSON.stringify(modulos));
  localStorage.setItem('lecciones', JSON.stringify(lecciones));

  // Los cursos, módulos y lecciones se crean manualmente desde la sección de "Crear Cursos"
  // No se crean por defecto para permitir que el admin asigne profesores libremente

  if (cursos.length === 0 && modulos.length === 0 && lecciones.length === 0) {
    const seededLecciones = [
      // JS101
      { id: 'L1', titulo: 'Variables y Tipos de Datos', horas: 2, contenido: 'Aprende sobre var, let, const y los tipos primitivos de JavaScript', multimedia: [], moduloCodigo: 'MJS1' },
      { id: 'L2', titulo: 'Operadores y Expresiones', horas: 2, contenido: 'Operadores aritméticos, lógicos y de comparación', multimedia: [], moduloCodigo: 'MJS1' },
      { id: 'L3', titulo: 'Conversión de Tipos', horas: 2, contenido: 'Coerción y conversión explícita de tipos', multimedia: [], moduloCodigo: 'MJS1' },
      { id: 'L4', titulo: 'Sentencias if/else', horas: 2, contenido: 'Condicionales simples y compuestos', multimedia: [], moduloCodigo: 'MJS2' },
      { id: 'L5', titulo: 'Switch y Ternario', horas: 2, contenido: 'Otras formas de control de flujo', multimedia: [], moduloCodigo: 'MJS2' },
      { id: 'L6', titulo: 'Bucles for y while', horas: 2, contenido: 'Iteración sobre colecciones', multimedia: [], moduloCodigo: 'MJS2' },
      { id: 'L7', titulo: 'Declaración de Funciones', horas: 2, contenido: 'Funciones regulares y expresiones de función', multimedia: [], moduloCodigo: 'MJS3' },
      { id: 'L8', titulo: 'Arrow Functions', horas: 2, contenido: 'Sintaxis moderna y diferencias con funciones regulares', multimedia: [], moduloCodigo: 'MJS3' },
      { id: 'L9', titulo: 'Scope y Closure', horas: 2, contenido: 'Ámbito léxico y closures en JavaScript', multimedia: [], moduloCodigo: 'MJS3' },
      { id: 'L10', titulo: 'Selección de Elementos', horas: 2, contenido: 'querySelector, getElementById y métodos de selección', multimedia: [], moduloCodigo: 'MJS4' },
      { id: 'L11', titulo: 'Manipulación del DOM', horas: 2, contenido: 'Crear, modificar y eliminar elementos', multimedia: [], moduloCodigo: 'MJS4' },
      { id: 'L12', titulo: 'Manejadores de Eventos', horas: 2, contenido: 'addEventListener y manejo de eventos', multimedia: [], moduloCodigo: 'MJS4' },
      // PY101
      { id: 'L13', titulo: 'Instalación y Configuración', horas: 2, contenido: 'Instalar Python y configurar el entorno', multimedia: [], moduloCodigo: 'MPY1' },
      { id: 'L14', titulo: 'Tu Primer Programa', horas: 2, contenido: 'print(), input() y primeros pasos', multimedia: [], moduloCodigo: 'MPY1' },
      { id: 'L15', titulo: 'Tipos y Variables', horas: 2, contenido: 'Enteros, flotantes, strings y booleanos', multimedia: [], moduloCodigo: 'MPY1' },
      { id: 'L16', titulo: 'Clases y Objetos', horas: 2, contenido: 'Definir clases, constructores e instancias', multimedia: [], moduloCodigo: 'MPY2' },
      { id: 'L17', titulo: 'Herencia', horas: 2, contenido: 'Herencia simple y múltiple', multimedia: [], moduloCodigo: 'MPY2' },
      { id: 'L18', titulo: 'Polimorfismo y Métodos', horas: 2, contenido: 'Métodos abstractos y override', multimedia: [], moduloCodigo: 'MPY2' },
      { id: 'L19', titulo: 'Lectura y Escritura de Archivos', horas: 2, contenido: 'Operaciones de I/O y manejo de excepciones', multimedia: [], moduloCodigo: 'MPY3' },
      { id: 'L20', titulo: 'Manejo de Excepciones', horas: 2, contenido: 'Try/except y errores en Python', multimedia: [], moduloCodigo: 'MPY3' },
      { id: 'L21', titulo: 'Debugging', horas: 2, contenido: 'Técnicas de debugging y logging', multimedia: [], moduloCodigo: 'MPY3' },
      { id: 'L22', titulo: 'NumPy Basics', horas: 2, contenido: 'Arrays y operaciones matemáticas', multimedia: [], moduloCodigo: 'MPY4' },
      { id: 'L23', titulo: 'Pandas para Datos', horas: 2, contenido: 'DataFrames y análisis de datos', multimedia: [], moduloCodigo: 'MPY4' },
      { id: 'L24', titulo: 'Visualización con Matplotlib', horas: 2, contenido: 'Crear gráficos y visualizaciones', multimedia: [], moduloCodigo: 'MPY4' },
      // REACT101
      { id: 'L25', titulo: 'Componentes Funcionales', horas: 2, contenido: 'Crear componentes con funciones', multimedia: [], moduloCodigo: 'MRE1' },
      { id: 'L26', titulo: 'JSX y Props', horas: 2, contenido: 'Sintaxis JSX y pasar datos a componentes', multimedia: [], moduloCodigo: 'MRE1' },
      { id: 'L27', titulo: 'Renderizado Condicional', horas: 2, contenido: 'Mostrar u ocultar contenido según condiciones', multimedia: [], moduloCodigo: 'MRE1' },
      { id: 'L28', titulo: 'useState Hook', horas: 2, contenido: 'Gestionar estado en componentes funcionales', multimedia: [], moduloCodigo: 'MRE2' },
      { id: 'L29', titulo: 'useEffect Hook', horas: 2, contenido: 'Efectos secundarios y ciclo de vida', multimedia: [], moduloCodigo: 'MRE2' },
      { id: 'L30', titulo: 'Custom Hooks', horas: 2, contenido: 'Crear tus propios hooks reutilizables', multimedia: [], moduloCodigo: 'MRE2' },
      { id: 'L31', titulo: 'React Router Setup', horas: 2, contenido: 'Instalar y configurar React Router', multimedia: [], moduloCodigo: 'MRE3' },
      { id: 'L32', titulo: 'Rutas y Links', horas: 2, contenido: 'Crear rutas y navegación entre páginas', multimedia: [], moduloCodigo: 'MRE3' },
      { id: 'L33', titulo: 'Parámetros de Ruta', horas: 2, contenido: 'Parámetros dinámicos en rutas', multimedia: [], moduloCodigo: 'MRE3' },
      { id: 'L34', titulo: 'Context API', horas: 2, contenido: 'Gestionar estado global con Context', multimedia: [], moduloCodigo: 'MRE4' },
      { id: 'L35', titulo: 'Introducción a Redux', horas: 2, contenido: 'Acciones, reducers y store', multimedia: [], moduloCodigo: 'MRE4' },
      { id: 'L36', titulo: 'Redux en Práctica', horas: 2, contenido: 'Conectar Redux a componentes', multimedia: [], moduloCodigo: 'MRE4' },
      // DB101
      { id: 'L37', titulo: 'SELECT y WHERE', horas: 2, contenido: 'Consultas básicas y filtrado de datos', multimedia: [], moduloCodigo: 'MDB1' },
      { id: 'L38', titulo: 'INSERT, UPDATE, DELETE', horas: 2, contenido: 'Modificación de datos en bases de datos', multimedia: [], moduloCodigo: 'MDB1' },
      { id: 'L39', titulo: 'JOINs y Relaciones', horas: 2, contenido: 'Combinar datos de múltiples tablas', multimedia: [], moduloCodigo: 'MDB1' },
      { id: 'L40', titulo: 'Normalización', horas: 2, contenido: 'Primera, segunda y tercera forma normal', multimedia: [], moduloCodigo: 'MDB2' },
      { id: 'L41', titulo: 'Diagrama Entidad-Relación', horas: 2, contenido: 'Modelar relaciones entre entidades', multimedia: [], moduloCodigo: 'MDB2' },
      { id: 'L42', titulo: 'Índices y Claves', horas: 2, contenido: 'Claves primarias y foráneas', multimedia: [], moduloCodigo: 'MDB2' },
      { id: 'L43', titulo: 'Crear APIs REST', horas: 2, contenido: 'Endpoints básicos con Node.js', multimedia: [], moduloCodigo: 'MDB3' },
      { id: 'L44', titulo: 'HTTP Métodos', horas: 2, contenido: 'GET, POST, PUT, DELETE en APIs', multimedia: [], moduloCodigo: 'MDB3' },
      { id: 'L45', titulo: 'Middleware y Validación', horas: 2, contenido: 'Validar datos en endpoints', multimedia: [], moduloCodigo: 'MDB3' },
      { id: 'L46', titulo: 'SQL Injection Prevention', horas: 2, contenido: 'Proteger contra inyecciones SQL', multimedia: [], moduloCodigo: 'MDB4' },
      { id: 'L47', titulo: 'Optimización de Consultas', horas: 2, contenido: 'Índices y query optimization', multimedia: [], moduloCodigo: 'MDB4' },
      { id: 'L48', titulo: 'Backup y Recovery', horas: 2, contenido: 'Estrategias de backup de datos', multimedia: [], moduloCodigo: 'MDB4' },
      // DEVOPS101
      { id: 'L49', titulo: 'Conceptos Docker', horas: 2, contenido: 'Imágenes, contenedores y registros', multimedia: [], moduloCodigo: 'MDV1' },
      { id: 'L50', titulo: 'Dockerfile', horas: 2, contenido: 'Crear imágenes personalizadas', multimedia: [], moduloCodigo: 'MDV1' },
      { id: 'L51', titulo: 'Docker Compose', horas: 2, contenido: 'Orquestar múltiples contenedores', multimedia: [], moduloCodigo: 'MDV1' },
      { id: 'L52', titulo: 'Arquitectura Kubernetes', horas: 2, contenido: 'Master, nodos y componentes', multimedia: [], moduloCodigo: 'MDV2' },
      { id: 'L53', titulo: 'Pods y Servicios', horas: 2, contenido: 'Desplegar y exponer aplicaciones', multimedia: [], moduloCodigo: 'MDV2' },
      { id: 'L54', titulo: 'Deployments', horas: 2, contenido: 'Gestionar réplicas y actualizaciones', multimedia: [], moduloCodigo: 'MDV2' },
      { id: 'L55', titulo: 'GitHub Actions', horas: 2, contenido: 'Workflows y automatización', multimedia: [], moduloCodigo: 'MDV3' },
      { id: 'L56', titulo: 'Testing Automático', horas: 2, contenido: 'Ejecutar tests en CI/CD', multimedia: [], moduloCodigo: 'MDV3' },
      { id: 'L57', titulo: 'Build y Deploy', horas: 2, contenido: 'Pipeline de construcción y despliegue', multimedia: [], moduloCodigo: 'MDV3' },
      { id: 'L58', titulo: 'Introducción a AWS', horas: 2, contenido: 'EC2, S3 y servicios básicos', multimedia: [], moduloCodigo: 'MDV4' },
      { id: 'L59', titulo: 'Configuración de Aplicaciones', horas: 2, contenido: 'Variables de entorno y configuración', multimedia: [], moduloCodigo: 'MDV4' },
      { id: 'L60', titulo: 'Monitoreo y Escalado', horas: 2, contenido: 'CloudWatch y auto-scaling', multimedia: [], moduloCodigo: 'MDV4' }
    ];

    // Los datos seeded no se guardan automáticamente
    // El admin debe crear cursos, módulos y lecciones manualmente desde la sección de "Crear Cursos"
  }
}

function renderHomeFeatured() {
  const container = document.querySelector('#content-cursos-destacados');
  if (!container) return;
  // Limpiar y construir tres secciones básicas con cursos
  const cursos = JSON.parse(localStorage.getItem('cursos') || '[]');
  const modulos = JSON.parse(localStorage.getItem('modulos') || '[]');
  const lecciones = JSON.parse(localStorage.getItem('lecciones') || '[]');
  const profesores = JSON.parse(localStorage.getItem('profesores') || '[]');

  // Filtrar cursos con al menos un módulo y una lección
  const completos = cursos.filter(curso => {
    const mods = modulos.filter(m => m.cursoCodigo === curso.codigo);
    if (mods.length === 0) return false;
    return mods.some(m => lecciones.some(l => l.moduloCodigo === m.codigo));
  });

  // Tomar los últimos 9 cursos agregados (orden de inserción), en 3 secciones de 3
  const ultimos9 = completos.slice(-9);
  const grupos = [
    { titulo: 'Más Populares', items: ultimos9.slice(0, 3) },
    { titulo: 'Destacados de la Semana', items: ultimos9.slice(3, 6) },
    { titulo: 'Nuevos Lanzamientos', items: ultimos9.slice(6, 9) }
  ];

  container.innerHTML = '';
  grupos.forEach(grupo => {
    const section = document.createElement('section');
    section.className = 'seccion-destacada';
    const title = document.createElement('a');
    title.className = 'link-apartado-cursos';
    title.href = '#';
    title.textContent = grupo.titulo;
    section.appendChild(title);

    grupo.items.forEach(curso => {
      const card = document.createElement('a');
      card.href = '#';
      card.className = 'card-curso';
      card.setAttribute('data-codigo', curso.codigo);
      card.innerHTML = `
        <img class="portada-curso" src="${curso.imagen || 'https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'}" alt="portada curso" onerror="this.src='https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'">
        <div class="text-card-curso">
          <h2>${curso.nombre}</h2>
          <strong class="text-destacable-cards">Módulos: ${modulos.filter(m => m.cursoCodigo === curso.codigo).length}</strong>
          <strong class="text-destacable-cards">Lecciones: ${lecciones.filter(l => modulos.some(m => m.codigo === l.moduloCodigo && m.cursoCodigo === curso.codigo)).length}</strong>
        </div>
      `;
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionHome = document.getElementById('section-home');
        if (sectionHome) {
          sectionHome.innerHTML = '';
          sectionHome.appendChild(renderDetalleCurso(curso.codigo));
          sectionHome.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      section.appendChild(card);
    });

    container.appendChild(section);
  });
}