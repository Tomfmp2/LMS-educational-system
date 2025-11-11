export function renderLoginView() {
  console.log('Renderizando vista del login...');
  
  const loginHTML = `
  <main id="fondo-login" style="display:none;">
    <section id="content-login">
      <span id="closeBtn" class="close">&times;</span>
      <h1>Bienvenido</h1>
      <input type="email" name="email" id="correo-user" placeholder="tuCorreo@example.com" />
      <input type="password" name="password" id="contraseña-user" placeholder="********" />
      <div id="content-inputs">
        <input type="button" value="Iniciar Sesión" class="btns-login btn-iniciar-sesion" />
        <input type="button" value="Registrarse" class="btns-login btn-registrar" />
      </div>
    </section>
  </main>
  `;

  document.body.insertAdjacentHTML('beforeend', loginHTML);
  console.log('Vista de login renderizada');
}