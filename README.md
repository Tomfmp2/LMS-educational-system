# LMS Educational System

Un sistema de gestión de aprendizaje (Learning Management System) especializado en cursos de programación. Plataforma web completa que permite a administradores gestionar cursos, módulos, lecciones y profesores, mientras que los estudiantes pueden explorar cursos, inscribirse y acceder a su contenido.

**Autor:** Tomas Felipe Medina Prada  
**Correo:** tom.pradamd@gmail.com  
**Versión:** 1.0.0

---

## 🌐 Acceso Online

La plataforma está disponible en línea en:

**[https://lms-educational-system-g2uxoteu7.vercel.app/](https://lms-educational-system-g2uxoteu7.vercel.app/)**

---

## ✨ Características Principales

### Para Administradores
- ✅ Crear y gestionar cursos de programación
- ✅ Gestionar profesores (crear, editar, eliminar)
- ✅ Crear módulos dentro de cursos
- ✅ Gestionar lecciones por módulo
- ✅ Asignar profesores a cursos
- ✅ Sistema de búsqueda por email de profesores

### Para Estudiantes
- ✅ Explorar catálogo de cursos disponibles
- ✅ Inscribirse en cursos
- ✅ Acceder a detalles de cursos
- ✅ Ver módulos y lecciones
- ✅ Agregar/eliminar favoritos
- ✅ Gestionar mis cursos
- ✅ Sistema de autenticación seguro

### Cursos Disponibles
1. **Curso de JavaScript** - Fundamentos a aplicaciones interactivas
2. **Curso de Python** - Desde lo básico hasta ciencia de datos
3. **Curso de React y Frontend** - Desarrollo con React.js moderno
4. **Curso de Bases de Datos y Backend** - SQL, APIs REST y Node.js
5. **Curso de DevOps y Cloud** - Docker, Kubernetes y AWS

Cada curso incluye múltiples módulos con lecciones detalladas y contenido específico.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Almacenamiento:** LocalStorage (navegador)
- **Web Components:** Componentes personalizados reutilizables
- **Arquitectura:** Modular y escalable

---

## 📋 Requisitos Previos

Antes de instalar, asegúrate de tener:

- **Node.js** (versión 14 o superior) - [Descargar Node.js](https://nodejs.org/)
- **Git** - [Descargar Git](https://git-scm.com/)
- Un navegador web moderno (Chrome, Firefox, Safari, Edge)

---

## 🚀 Instalación Local

### Windows

1. **Clona el repositorio:**
   ```powershell
   git clone https://github.com/Tomfmp2/LMS-educational-system.git
   cd LMS-educational-system
   ```

2. **Instala las dependencias (opcional para desarrollo):**
   ```powershell
   npm install
   ```

3. **Inicia un servidor local:**
   ```powershell
   # Opción 1: Usar Live Server (si tienes la extensión en VS Code)
   # Click derecho en index.html > Open with Live Server
   
   # Opción 2: Usar Python (si está instalado)
   python -m http.server 8000
   
   # Opción 3: Usar Node.js http-server
   npx http-server
   ```

4. **Abre tu navegador:**
   ```
   http://localhost:8000 (Python)
   http://localhost:3000 (http-server)
   http://127.0.0.1:5500 (Live Server)
   ```

### macOS

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Tomfmp2/LMS-educational-system.git
   cd LMS-educational-system
   ```

2. **Instala las dependencias (opcional para desarrollo):**
   ```bash
   npm install
   ```

3. **Inicia un servidor local:**
   ```bash
   # Opción 1: Usar Python (instalado por defecto en macOS)
   python3 -m http.server 8000
   
   # Opción 2: Usar Node.js http-server
   npx http-server
   
   # Opción 3: Usar Live Server en VS Code
   # Click derecho en index.html > Open with Live Server
   ```

4. **Abre tu navegador:**
   ```
   http://localhost:8000 (Python)
   http://localhost:3000 (http-server)
   http://127.0.0.1:5500 (Live Server)
   ```

### Linux

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Tomfmp2/LMS-educational-system.git
   cd LMS-educational-system
   ```

2. **Instala las dependencias (opcional para desarrollo):**
   ```bash
   npm install
   ```

3. **Inicia un servidor local:**
   ```bash
   # Opción 1: Usar Python
   python3 -m http.server 8000
   
   # Opción 2: Usar Node.js http-server
   npx http-server
   
   # Opción 3: Usar SimpleHTTPServer (Python 2)
   python -m SimpleHTTPServer 8000
   ```

4. **Abre tu navegador:**
   ```
   http://localhost:8000 (Python)
   http://localhost:3000 (http-server)
   ```

---

## 📂 Estructura del Proyecto

```
LMS-educational-system/
├── index.html                 # Página principal
├── README.md                  # Este archivo
├── assets/
│   ├── fonts/                # Tipografías personalizadas
│   ├── icons/                # Iconografía del proyecto
│   └── img/                  # Imágenes y recursos gráficos
├── css/
│   └── style.css            # Estilos globales
└── js/
    ├── app.js               # Inicialización de la aplicación
    ├── config.js            # Configuración general
    ├── logic/
    │   └── logicLogin.js    # Lógica de autenticación
    ├── modules/             # Módulos funcionales
    │   ├── crearCursos.js
    │   ├── cursos.js
    │   ├── detalleCurso.js
    │   ├── favoritos.js
    │   ├── gestionProfesores.js
    │   └── misCursos.js
    ├── utils/
    │   └── notificaciones.js # Sistema de notificaciones
    └── views/               # Componentes visuales
        ├── footer.js
        ├── header.js
        ├── registroCuenta.js
        └── viewLogin.js
```

---

## 🔐 Credenciales de Prueba

Para acceder como administrador:

- **Correo:** `admin12345@gmail.com`
- **Contraseña:** `admin123456789`

**Nota:** Las credenciales de estudiante se crean registrándose en la plataforma.

---

## 📊 Datos Iniciales

Al acceder por primera vez, el sistema carga automáticamente datos de ejemplo incluyendo profesores y cursos de muestra que puedes ver, editar o eliminar según tus necesidades.

## 🎯 Uso Principal

### Como Estudiante

1. **Registrarse:**
   - Haz clic en "Crear Cuenta"
   - Completa el formulario con tus datos
   - Confirma tu contraseña

2. **Explorar Cursos:**
   - Accede a "Cursos" desde el menú
   - Visualiza el catálogo disponible
   - Lee descripciones y detalles

3. **Inscribirse en Cursos:**
   - Haz clic en "Inscribirse" en una tarjeta de curso
   - Accede desde "Mis Cursos" en tu perfil

4. **Agregar a Favoritos:**
   - Haz clic en el icono de estrella en una tarjeta
   - Accede desde "Favoritos" en tu perfil

### Como Administrador

#### 1. Crear Nuevos Cursos

1. **Accede como administrador:**
   - Inicia sesión con las credenciales admin
   - Verás el menú especial de administración

2. **Accede al formulario de creación:**
   - Click en "Crear Cursos" en el menú desplegable
   - Se abrirá el formulario de creación

3. **Completa la información del curso:**
   - **Nombre del Curso:** Título descriptivo (ej: "Introducción a JavaScript")
   - **Descripción:** Detalles sobre el contenido y objetivos
   - **Profesor Responsable:** Selecciona de la lista de profesores disponibles
   - **Imagen:** URL de portada del curso (opcional)

4. **Agrega módulos al curso:**
   - Haz clic en "+ Agregar Módulo"
   - Completa: nombre y descripción del módulo
   - Puedes agregar tantos módulos como necesites

5. **Agrega lecciones a cada módulo:**
   - Para cada módulo, haz clic en "+ Agregar Lección"
   - Completa:
     - **Título:** Nombre de la lección
     - **Horas:** Duración estimada
     - **Contenido:** Descripción y materiales
     - **Multimedia:** Enlaces a videos o recursos (opcional)

6. **Guarda el curso:**
   - Haz clic en "Guardar Curso"
   - El curso aparecerá inmediatamente en el catálogo
   - Los estudiantes pueden inscribirse

#### 2. Gestionar Profesores

1. **Accede a la gestión:**
   - Click en "Gestionar Profesores" en el menú
   - Verás la lista completa de profesores

2. **Crear nuevo profesor:**
   - Haz clic en "+ Nuevo Profesor"
   - Completa el formulario:
     - **Nombre Completo:** Nombre del profesor
     - **Email:** Correo institucional único
     - **Especialidad:** Área de enseñanza
     - **Biografía:** Breve descripción (opcional)
   - Guarda el profesor

3. **Buscar profesores:**
   - Usa la barra de búsqueda
   - Busca por nombre, email o especialidad
   - Los resultados se filtran en tiempo real

4. **Editar profesor:**
   - Click en el botón "Editar" junto al profesor
   - Todos los profesores son editables
   - Actualiza cualquier campo
   - Guarda los cambios

5. **Eliminar profesor:**
   - Haz clic en "Eliminar"
   - **Solo puedes eliminar profesores SIN cursos asignados**
   - Si el profesor tiene cursos: el botón estará desactivado (ver tooltip)
   - Para eliminar un profesor con cursos:
     1. Primero asigna sus cursos a otro profesor
     2. O elimina sus cursos
     3. Luego podrás eliminar el profesor

#### 3. Estadísticas

En la gestión de profesores verás estadísticas en tiempo real:
- **Total Profesores:** Cantidad total registrada
- **Con Cursos:** Profesores asignados a cursos activos
- **Sin Cursos:** Profesores disponibles sin asignación

---

## 💾 Almacenamiento de Datos

El sistema utiliza **LocalStorage** del navegador para persistencia de datos:

- `usuarios` - Credenciales de usuarios registrados
- `profesores` - Información de profesores
- `cursos` - Catálogo de cursos
- `modulos` - Módulos por curso
- `lecciones` - Lecciones por módulo
- `sesionActual` - Sesión activa del usuario
- `favoritos_[email]` - Cursos favoritos por usuario
- `misCursos_[email]` - Cursos inscritos por usuario

**Nota:** Los datos se guardan localmente en el navegador y se limpian al borrar el historial.

---

## 🔍 Búsqueda de Profesores

La función de búsqueda en "Gestionar Profesores" permite:

- Buscar por **nombre completo**
- Buscar por **email**
- Buscar por **especialidad**
- Búsqueda insensible a mayúsculas/minúsculas
- Resultados en tiempo real

Ejemplo:
- `juan` → Encuentra "Juan Martínez"
- `juan.martinez@` → Encuentra por email
- `javascript` → Encuentra profesores que enseñan JavaScript

---

## 🧹 Limpieza Automática de Datos

El sistema realiza validaciones automáticas:

- Elimina profesores con datos inválidos (undefined, null)
- Limpia cursos sin profesores válidos
- Elimina módulos de cursos eliminados
- Limpia lecciones de módulos eliminados
- Garantiza integridad referencial de datos

---

## 📱 Compatibilidad

La plataforma es compatible con:

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

Se recomienda usar la versión más reciente de su navegador para mejor experiencia.

---

## 🐛 Reporte de Errores

Si encuentras algún problema:

1. Verifica que tengas una conexión a internet estable
2. Limpia el caché del navegador (Ctrl+Shift+Delete)
3. Abre las herramientas de desarrollador (F12) para ver errores en consola
4. Contacta al desarrollador con los detalles del error

---

## 📧 Contacto

**Desarrollador:** Tomas Felipe Medina Prada  
**Email:** tom.pradamd@gmail.com  
**GitHub:** [Tomfmp2](https://github.com/Tomfmp2)

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo licencia MIT.

---

## 🔄 Historial de Cambios

### Versión 1.0.0 (Noviembre 2025)

#### Características Agregadas
- ✅ Sistema completo de autenticación
- ✅ Panel de administración para gestión de cursos
- ✅ Gestión centralizada de profesores
- ✅ Catálogo de 5 cursos de programación
- ✅ Sistema de inscripciones para estudiantes
- ✅ Funcionalidad de favoritos
- ✅ Búsqueda avanzada de profesores
- ✅ Sistema de notificaciones

#### Mejoras Técnicas
- ✅ Arquitectura modular de componentes
- ✅ Validación y limpieza automática de datos
- ✅ LocalStorage persistente
- ✅ Interfaz responsiva y profesional
- ✅ Sistema de alertas interactivas

---

## 💡 Funcionalidades Futuras

- [ ] Base de datos persistente (MongoDB/Firebase)
- [ ] Sistema de calificaciones
- [ ] Foros de discusión por curso
- [ ] Certificados digitales
- [ ] Integración de videoconferencia
- [ ] Analytics y reportes
- [ ] Soporte para múltiples idiomas
- [ ] Aplicación móvil

---

**Última actualización:** Noviembre 11, 2025
