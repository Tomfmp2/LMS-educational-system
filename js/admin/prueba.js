export function renderGestionProfesores() {
    const container = document.createElement('section');
    container.id = 'section-gestion-profesores';
    
    container.innerHTML = `
      <style>
        .gestion-examenes {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
          min-height: 100vh;
        }

        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .header-section h1 {
          color: var(--primary-variant, #00ADB5);
          font-size: 2.8rem;
          margin: 0;
        }

        .header-subtitle {
          color: #666;
          font-size: 0.95rem;
          margin-top: 0.5rem;
        }

        .content-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.2rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #2c3e50;
          font-size: 0.95rem;
        }

        .form-control {
          width: 100%;
          padding: 0.85rem 1rem;
          border: 1.5px solid #ddd;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-control:focus {
          outline: none;
          border-color: var(--primary-variant, #00ADB5);
          box-shadow: 0 0 0 3px rgba(0,173,181,0.15);
        }

        select.form-control {
          cursor: pointer;
        }

        .btn {
          padding: 0.9rem 1.8rem;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
        }

        .btn-primary {
          background: var(--primary-variant, #00ADB5);
          color: white;
        }

        .btn-primary:hover {
          background: #009aa2;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,173,181,0.3);
        }

        .btn-secondary {
          background: #6c757d;
          color: white;
        }

        .btn-secondary:hover {
          background: #5a6268;
        }

        #resultado {
          padding: 1.5rem;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          margin-top: 1rem;
          background: #f8f9fa;
          min-height: 60px;
          font-size: 1.1rem;
          color: #2c3e50;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .resultado-exito {
          background: #d4edda;
          border-color: #28a745;
          color: #155724;
          font-weight: 600;
        }

        /* Sección de información de cursos y profesores */
        .info-section {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          margin-bottom: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-box {
          background: linear-gradient(135deg, #00ADB5 0%, #0091A0 100%);
          padding: 1.5rem;
          border-radius: 10px;
          color: white;
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.95rem;
          opacity: 0.9;
        }

        /* Desplegables de cursos y profesores */
        .accordion-item {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          margin-bottom: 1rem;
          overflow: hidden;
        }

        .accordion-header {
          padding: 1.2rem 1.5rem;
          background: #f8f9fa;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }

        .accordion-header:hover {
          background: #e9ecef;
        }

        .accordion-header.active {
          background: var(--primary-variant, #00ADB5);
          color: white;
        }

        .accordion-title {
          font-weight: 600;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .accordion-icon {
          font-size: 1.2rem;
          transition: transform 0.3s ease;
        }

        .accordion-header.active .accordion-icon {
          transform: rotate(180deg);
        }

        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .accordion-content.active {
          max-height: 2000px;
        }

        .accordion-body {
          padding: 1.5rem;
        }

        .curso-item, .profesor-item {
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .curso-item:last-child, .profesor-item:last-child {
          margin-bottom: 0;
        }

        .item-header {
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.5rem;
          font-size: 1.05rem;
        }

        .item-detail {
          color: #666;
          font-size: 0.9rem;
          margin: 0.3rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .item-detail::before {
          content: '•';
          color: var(--primary-variant, #00ADB5);
          font-weight: bold;
          font-size: 1.2rem;
        }

        .badge {
          display: inline-block;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          white-space: nowrap;
          margin-left: 0.5rem;
        }

        .badge-success {
          background: #d4edda;
          color: #155724;
        }

        .badge-info {
          background: #e7f3ff;
          color: #0066cc;
        }

        .empty-state {
          text-align: center;
          padding: 2rem;
          color: #999;
        }

        @media (max-width: 768px) {
          .gestion-examenes {
            padding: 1rem;
          }

          .header-section h1 {
            font-size: 2rem;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <div class="gestion-examenes">
        <!-- Header -->
        <div class="header-section">
          <div>
            <h1>Gestión de Calificaciones</h1>
            <div class="header-subtitle">Calcula notas finales y consulta información de cursos y profesores</div>
          </div>
        </div>

        <!-- Estadísticas Generales -->
        <div class="info-section">
          <div class="section-title">Estadísticas Generales</div>
          <div class="stats-grid">
            <div class="stat-box">
              <div class="stat-number" id="total-cursos">0</div>
              <div class="stat-label">Total Cursos</div>
            </div>
            <div class="stat-box" style="background: linear-gradient(135deg, #0056D2 0%, #003d96 100%);">
              <div class="stat-number" id="total-profesores">0</div>
              <div class="stat-label">Total Profesores</div>
            </div>
            <div class="stat-box" style="background: linear-gradient(135deg, #20c997 0%, #198754 100%);">
              <div class="stat-number" id="total-horas">0</div>
              <div class="stat-label">Total Horas</div>
            </div>
            <div class="stat-box" style="background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);">
              <div class="stat-number" id="total-modulos">0</div>
              <div class="stat-label">Total Módulos</div>
            </div>
          </div>
        </div>

        <!-- Acordeones de Cursos y Profesores -->
        <div class="info-section">
          <div class="section-title">Información Detallada</div>
          
          <!-- Acordeón de Cursos -->
          <div class="accordion-item">
            <div class="accordion-header" id="accordion-cursos">
              <div class="accordion-title">
                <span></span>
                <span>Cursos Disponibles</span>
              </div>
              <span class="accordion-icon">▼</span>
            </div>
            <div class="accordion-content" id="content-cursos">
              <div class="accordion-body" id="lista-cursos"></div>
            </div>
          </div>

          <!-- Acordeón de Profesores -->
          <div class="accordion-item">
            <div class="accordion-header" id="accordion-profesores">
              <div class="accordion-title">
                <span></span>
                <span>Profesores Registrados</span>
              </div>
              <span class="accordion-icon">▼</span>
            </div>
            <div class="accordion-content" id="content-profesores">
              <div class="accordion-body" id="lista-profesores"></div>
            </div>
          </div>
        </div>

        <!-- Formulario de Cálculo de Notas -->
        <div class="content-card">
          <div class="section-title">🎓 Calcular Nota Final</div>
          
          <div class="form-grid">
            <div class="form-group">
              <label>Nombre del Estudiante <span style="color: #e74c3c;">*</span></label>
              <input type="text" class="form-control" id="nombre-estudiante" placeholder="Ej: Juan Pérez" />
            </div>
            
            <div class="form-group">
              <label>Curso <span style="color: #e74c3c;">*</span></label>
              <select class="form-control" id="curso-estudiante">
                <option value="">Seleccione un curso...</option>
              </select>
            </div>

            <div class="form-group">
              <label>Nota Parcial 1 <span style="color: #e74c3c;">*</span></label>
              <input type="number" class="form-control" id="dato1" placeholder="0.0 - 5.0" min="0" max="5" step="0.1" />
            </div>

            <div class="form-group">
              <label>Nota Parcial 2 <span style="color: #e74c3c;">*</span></label>
              <input type="number" class="form-control" id="dato2" placeholder="0.0 - 5.0" min="0" max="5" step="0.1" />
            </div>
          </div>

          <button class="btn btn-primary" id="calcular">
            <span>🧮</span>
            <span>Calcular Nota Final</span>
          </button>

          <div id="resultado">Ingrese los datos para calcular la nota final</div>
        </div>
      </div>
    `;
  
    // Verificación de admin
    const sesion = JSON.parse(localStorage.getItem('sesionActual') || 'null');
    if (!sesion || !sesion.isAdmin) {
      container.innerHTML = `
        <main style="text-align: center; padding: 3rem; color: #B31312;">
          <h1>Acceso Restringido</h1>
          <p>Esta sección es exclusiva para administradores.</p>
          <button class="btn btn-secondary" onclick="location.reload()" style="margin-top: 1rem;">Volver al Inicio</button>
        </main>
      `;
      return container;
    }

    // Elementos del DOM
    const totalCursos = container.querySelector('#total-cursos');
    const totalProfesores = container.querySelector('#total-profesores');
    const totalHoras = container.querySelector('#total-horas');
    const totalModulos = container.querySelector('#total-modulos');
    const listaCursos = container.querySelector('#lista-cursos');
    const listaProfesores = container.querySelector('#lista-profesores');
    const accordionCursos = container.querySelector('#accordion-cursos');
    const accordionProfesores = container.querySelector('#accordion-profesores');
    const contentCursos = container.querySelector('#content-cursos');
    const contentProfesores = container.querySelector('#content-profesores');
    const selectCurso = container.querySelector('#curso-estudiante');
    const inputNombre = container.querySelector('#nombre-estudiante');
    const inputDato1 = container.querySelector('#dato1');
    const inputDato2 = container.querySelector('#dato2');
    const btnCalcular = container.querySelector('#calcular');
    const resultado = container.querySelector('#resultado');

    // Cargar datos del localStorage
    const cursos = JSON.parse(localStorage.getItem('cursos') || '[]');
    const profesores = JSON.parse(localStorage.getItem('profesores') || '[]');
    const modulos = JSON.parse(localStorage.getItem('modulos') || '[]');
    const lecciones = JSON.parse(localStorage.getItem('lecciones') || '[]');

    // Función para calcular horas totales de un curso
    function calcularHorasCurso(cursoCodigo) {
      const modulosCurso = modulos.filter(m => m.cursoCodigo === cursoCodigo);
      let totalHoras = 0;
      
      modulosCurso.forEach(modulo => {
        const leccionesModulo = lecciones.filter(l => l.moduloCodigo === modulo.codigo);
        totalHoras += leccionesModulo.reduce((sum, leccion) => sum + (leccion.horas || 0), 0);
      });
      
      return totalHoras;
    }

    // Actualizar estadísticas
    function actualizarEstadisticas() {
      totalCursos.textContent = cursos.length;
      totalProfesores.textContent = profesores.length;
      totalModulos.textContent = modulos.length;
      
      // Calcular total de horas de todos los cursos
      let horasTotales = 0;
      cursos.forEach(curso => {
        horasTotales += calcularHorasCurso(curso.codigo);
      });
      totalHoras.textContent = horasTotales;
    }

    // Renderizar lista de cursos
    function renderizarCursos() {
      if (cursos.length === 0) {
        listaCursos.innerHTML = '<div class="empty-state">No hay cursos registrados</div>';
        return;
      }

      listaCursos.innerHTML = '';
      cursos.forEach(curso => {
        const modulosCurso = modulos.filter(m => m.cursoCodigo === curso.codigo);
        const horasCurso = calcularHorasCurso(curso.codigo);
        const profesor = profesores.find(p => p.correo === curso.docente);
        
        let totalLecciones = 0;
        modulosCurso.forEach(modulo => {
          totalLecciones += lecciones.filter(l => l.moduloCodigo === modulo.codigo).length;
        });

        const cursoDiv = document.createElement('div');
        cursoDiv.className = 'curso-item';
        cursoDiv.innerHTML = `
          <div class="item-header">
            ${curso.codigo}: ${curso.nombre}
            <span class="badge badge-success">${horasCurso}h</span>
          </div>
          <div class="item-detail">Profesor: ${profesor ? profesor.nombre : 'No asignado'}</div>
          <div class="item-detail">Módulos: ${modulosCurso.length}</div>
          <div class="item-detail">Lecciones: ${totalLecciones}</div>
          <div class="item-detail">Descripción: ${curso.descripcion || 'Sin descripción'}</div>
        `;
        listaCursos.appendChild(cursoDiv);
      });

      // Llenar select de cursos
      selectCurso.innerHTML = '<option value="">Seleccione un curso...</option>';
      cursos.forEach(curso => {
        const option = document.createElement('option');
        option.value = curso.codigo;
        option.textContent = `${curso.codigo} - ${curso.nombre}`;
        selectCurso.appendChild(option);
      });
    }

    // Renderizar lista de profesores
    function renderizarProfesores() {
      if (profesores.length === 0) {
        listaProfesores.innerHTML = '<div class="empty-state">No hay profesores registrados</div>';
        return;
      }

      listaProfesores.innerHTML = '';
      profesores.forEach(profesor => {
        const cursosProfesor = cursos.filter(c => c.docente === profesor.correo);
        
        const profesorDiv = document.createElement('div');
        profesorDiv.className = 'profesor-item';
        profesorDiv.innerHTML = `
          <div class="item-header">
            ${profesor.nombre}
            ${cursosProfesor.length > 0 ? `<span class="badge badge-info">${cursosProfesor.length} curso(s)</span>` : ''}
          </div>
          <div class="item-detail">Email: ${profesor.correo}</div>
          <div class="item-detail">Especialidad: ${profesor.especialidad || 'No especificada'}</div>
          ${cursosProfesor.length > 0 ? `
            <div class="item-detail">Cursos: ${cursosProfesor.map(c => c.nombre).join(', ')}</div>
          ` : '<div class="item-detail">Sin cursos asignados</div>'}
          ${profesor.bio ? `<div class="item-detail">Bio: ${profesor.bio}</div>` : ''}
        `;
        listaProfesores.appendChild(profesorDiv);
      });
    }

    // Acordeones
    accordionCursos.addEventListener('click', () => {
      accordionCursos.classList.toggle('active');
      contentCursos.classList.toggle('active');
    });

    accordionProfesores.addEventListener('click', () => {
      accordionProfesores.classList.toggle('active');
      contentProfesores.classList.toggle('active');
    });

    // Calcular nota final
    btnCalcular.addEventListener('click', () => {
      const nombre = inputNombre.value.trim();
      const curso = selectCurso.value;
      const nota1 = parseFloat(inputDato1.value);
      const nota2 = parseFloat(inputDato2.value);

      // Validaciones
      if (!nombre) {
        resultado.textContent = 'Por favor, ingrese el nombre del estudiante';
        resultado.className = '';
        return;
      }

      if (!curso) {
        resultado.textContent = 'Por favor, seleccione un curso';
        resultado.className = '';
        return;
      }

      if (isNaN(nota1) || isNaN(nota2)) {
        resultado.textContent = 'Por favor, ingrese ambas notas';
        resultado.className = '';
        return;
      }

      if (nota1 < 0 || nota1 > 5 || nota2 < 0 || nota2 > 5) {
        resultado.textContent = 'Las notas deben estar entre 0.0 y 5.0';
        resultado.className = '';
        return;
      }

      // Calcular promedio
      const notaFinal = ((nota1 + nota2) / 2).toFixed(2);
      const cursoSeleccionado = cursos.find(c => c.codigo === curso);
      const estado = notaFinal >= 3.0 ? 'APROBADO' : 'REPROBADO';

      resultado.innerHTML = `
        <div style="line-height: 1.8;">
          <strong>Estudiante:</strong> ${nombre}<br>
          <strong>Curso:</strong> ${cursoSeleccionado.nombre} (${cursoSeleccionado.codigo})<br>
          <strong>Nota Final:</strong> ${notaFinal} / 5.0<br>
          <strong>Estado:</strong> ${estado}
        </div>
      `;
      resultado.className = 'resultado-exito';
    });

    // Inicializar
    actualizarEstadisticas();
    renderizarCursos();
    renderizarProfesores();

    return container;
}