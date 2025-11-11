// js/app.js
import './views/header.js';
import './views/footer.js';
import './views/registroCuenta.js';
import { renderLoginView } from './views/viewLogin.js';
import { initializeLoginLogic } from './logic/logicLogin.js';
import { renderCursos } from './modules/cursos.js';
import { renderDetalleCurso } from './modules/detalleCurso.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('App iniciada');

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

  // Escuchar registro
  document.addEventListener('open-registro', () => {
    const registro = document.createElement('registro-cuenta');
    document.body.appendChild(registro);
  });

  // Botón "Cursos" del home
  const btnCursosHome = document.querySelector('#section-home input[type="button"]');
  if (btnCursosHome) {
    btnCursosHome.addEventListener('click', () => {
      const appContainer = document.getElementById('section-home');
      appContainer.innerHTML = '';
      appContainer.appendChild(renderCursos());
    });
  }

  console.log('App lista');
});

function seedDataIfEmpty() {
  const profesores = JSON.parse(localStorage.getItem('profesores') || '[]');
  if (profesores.length === 0) {
    const defaultProfes = [
      { correo: 'maria.garcia@abc.edu', nombre: 'María García' },
      { correo: 'juan.perez@abc.edu', nombre: 'Juan Pérez' },
      { correo: 'ana.lopez@abc.edu', nombre: 'Ana López' }
    ];
    localStorage.setItem('profesores', JSON.stringify(defaultProfes));
  }

  const cursos = JSON.parse(localStorage.getItem('cursos') || '[]');
  const modulos = JSON.parse(localStorage.getItem('modulos') || '[]');
  const lecciones = JSON.parse(localStorage.getItem('lecciones') || '[]');

  if (cursos.length === 0 && modulos.length === 0 && lecciones.length === 0) {
    const seededCursos = [
      { codigo: 'JS101', nombre: 'JavaScript desde Cero', descripcion: 'Aprende los fundamentos de JavaScript con proyectos prácticos.', docente: 'juan.perez@abc.edu', imagen: '/assets/img/fotis-fotopoulos-6sAl6aQ4OWI-unsplash.jpg' },
      { codigo: 'HTMLCSS', nombre: 'HTML y CSS Moderno', descripcion: 'Maqueta sitios modernos, responsive y accesibles.', docente: 'maria.garcia@abc.edu', imagen: '/assets/img/concepto-de-collage-html-y-css.jpg' },
      { codigo: 'SEC101', nombre: 'Introducción a la Ciberseguridad', descripcion: 'Conceptos clave y buenas prácticas para asegurar sistemas.', docente: 'ana.lopez@abc.edu', imagen: '/assets/img/ingeniero-informatico-escribiendo-en-el-teclado-codigo-para-construir-cortafuegos.jpg' },
      { codigo: 'PY101', nombre: 'Python Básico', descripcion: 'Sintaxis, estructuras de datos y scripts esenciales.', docente: 'maria.garcia@abc.edu', imagen: '/assets/img/imagenFondoprograming.jpg' },
      { codigo: 'DBSQL', nombre: 'Bases de Datos SQL', descripcion: 'Modelado, consultas y prácticas con SQL.', docente: 'juan.perez@abc.edu', imagen: '/assets/img/programador-profesional-trabajando-hasta-tarde-en-la-oscura-oficina.jpg' },
      { codigo: 'UXUI', nombre: 'UX/UI para Web', descripcion: 'Principios de diseño centrado en el usuario.', docente: 'ana.lopez@abc.edu', imagen: '/assets/img/christina-wocintechchat-com-SJvDxw0azqw-unsplash.jpg' },
      { codigo: 'REACT', nombre: 'React desde Cero', descripcion: 'Componentes, estado y efectos con React.', docente: 'juan.perez@abc.edu', imagen: '/assets/img/people-2557399_1280.jpg' },
      { codigo: 'NODEJS', nombre: 'Node.js y APIs', descripcion: 'Construcción de APIs REST con Node y Express.', docente: 'maria.garcia@abc.edu', imagen: '/assets/img/wonderlane-b9-odQi5oDo-unsplash.jpg' },
      { codigo: 'GIT101', nombre: 'Control de Versiones con Git', descripcion: 'Flujos de trabajo y colaboración efectiva.', docente: 'ana.lopez@abc.edu', imagen: '/assets/img/juan-encalada-WC7KIHo13Fc-unsplash.jpg' }
    ];

    const seededModulos = [
      // JS101
      { codigo: 'MJS1', nombre: 'Fundamentos', descripcion: 'Variables, tipos y operadores', cursoCodigo: 'JS101' },
      { codigo: 'MJS2', nombre: 'DOM y Eventos', descripcion: 'Interacción con la UI', cursoCodigo: 'JS101' },
      // HTMLCSS
      { codigo: 'MHC1', nombre: 'HTML5', descripcion: 'Estructura semántica', cursoCodigo: 'HTMLCSS' },
      { codigo: 'MHC2', nombre: 'CSS3', descripcion: 'Estilos modernos y responsive', cursoCodigo: 'HTMLCSS' },
      // SEC101
      { codigo: 'MSC1', nombre: 'Conceptos Básicos', descripcion: 'Amenazas y vulnerabilidades', cursoCodigo: 'SEC101' },
      // PY101
      { codigo: 'MPY1', nombre: 'Sintaxis y Tipos', descripcion: 'Introducción a Python', cursoCodigo: 'PY101' },
      // DBSQL
      { codigo: 'MDB1', nombre: 'Modelado Relacional', descripcion: 'Entidades y relaciones', cursoCodigo: 'DBSQL' },
      // UXUI
      { codigo: 'MUX1', nombre: 'Fundamentos UX', descripcion: 'Heurísticas y research', cursoCodigo: 'UXUI' },
      // REACT
      { codigo: 'MRE1', nombre: 'Fundamentos de React', descripcion: 'JSX, props y estado', cursoCodigo: 'REACT' },
      // NODEJS
      { codigo: 'MNO1', nombre: 'APIs con Express', descripcion: 'Rutas, middlewares', cursoCodigo: 'NODEJS' },
      // GIT101
      { codigo: 'MGT1', nombre: 'Flujos con Git', descripcion: 'Branching y merges', cursoCodigo: 'GIT101' }
    ];

    const seededLecciones = [
      // JS101
      { id: 'L1', titulo: 'Variables y Tipos', horas: 2, contenido: 'Tipos primitivos y conversión de tipos.', multimedia: [], moduloCodigo: 'MJS1' },
      { id: 'L2', titulo: 'Funciones', horas: 2, contenido: 'Declaración, expresión y arrow functions.', multimedia: [], moduloCodigo: 'MJS1' },
      { id: 'L3', titulo: 'Manipulando el DOM', horas: 3, contenido: 'Selectores, creación y eventos.', multimedia: [], moduloCodigo: 'MJS2' },
      // HTMLCSS
      { id: 'L4', titulo: 'Etiquetas Semánticas', horas: 2, contenido: 'header, main, footer, article, section.', multimedia: [], moduloCodigo: 'MHC1' },
      { id: 'L5', titulo: 'Flexbox y Grid', horas: 3, contenido: 'Layouts modernos en CSS.', multimedia: [], moduloCodigo: 'MHC2' },
      // SEC101
      { id: 'L6', titulo: 'Ataques Comunes', horas: 2, contenido: 'Phishing, XSS, SQLi y mitigación.', multimedia: [], moduloCodigo: 'MSC1' },
      // PY101
      { id: 'L7', titulo: 'Tipos y Colecciones', horas: 2, contenido: 'Listas, tuplas y diccionarios.', multimedia: [], moduloCodigo: 'MPY1' },
      // DBSQL
      { id: 'L8', titulo: 'Normalización', horas: 2, contenido: '1FN, 2FN, 3FN y BCNF.', multimedia: [], moduloCodigo: 'MDB1' },
      // UXUI
      { id: 'L9', titulo: 'Heurísticas de Nielsen', horas: 2, contenido: 'Aplicación práctica de heurísticas.', multimedia: [], moduloCodigo: 'MUX1' },
      // REACT
      { id: 'L10', titulo: 'JSX y Props', horas: 2, contenido: 'Componentes y composición.', multimedia: [], moduloCodigo: 'MRE1' },
      // NODEJS
      { id: 'L11', titulo: 'Rutas y Controladores', horas: 2, contenido: 'Endpoints REST básicos.', multimedia: [], moduloCodigo: 'MNO1' },
      // GIT101
      { id: 'L12', titulo: 'Branching Strategy', horas: 2, contenido: 'Git Flow y trunk-based.', multimedia: [], moduloCodigo: 'MGT1' }
    ];

    localStorage.setItem('cursos', JSON.stringify(seededCursos));
    localStorage.setItem('modulos', JSON.stringify(seededModulos));
    localStorage.setItem('lecciones', JSON.stringify(seededLecciones));
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
        <img class="portada-curso" src="${curso.imagen || 'https://via.placeholder.com/300x180'}" alt="portada curso">
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