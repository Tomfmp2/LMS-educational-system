// views/footer.js
export class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
        :host {
            display: block;
        }
        
        #footer-main {
            background-color: var(--primary-variant, #00ADB5);
            color: var(--white, #FFFFFF);
            width: 100%;
            padding: 3rem 5%;
            margin-top: 4rem;
            border-top: 3px solid var(--primary, #0056D2);
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .footer-section h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--white, #FFFFFF);
        }
        
        .footer-section p,
        .footer-section a {
            font-size: 1rem;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.9);
            text-decoration: none;
            display: block;
            transition: all 0.3s ease;
        }
        
        .footer-section a:hover {
            color: var(--white, #FFFFFF);
            transform: translateX(5px);
        }
        
        .footer-section ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .footer-section ul li {
            margin-bottom: 0.5rem;
        }
        
        .social-links {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .social-links a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .social-links a:hover {
            background-color: var(--white, #FFFFFF);
            color: var(--primary-variant, #00ADB5);
            transform: scale(1.1) translateX(0);
        }
        
        .footer-bottom {
            text-align: center;
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.8);
        }
        
        .footer-logo {
            width: 50px;
            height: 50px;
            object-fit: contain;
            margin-bottom: 1rem;
        }
        .logos-redSocial {
            width: 24px;
            height: 24px;
            object-fit: contain;
        }
    </style>
    
    <footer id="footer-main">
        <div class="footer-content">
            <!-- Sección Acerca de -->
            <div class="footer-section">
                <img class="footer-logo" src="../../assets/icons/bloquear3.png" alt="ABC Logo" />
                <h3>Educate ABC</h3>
                <p>Transformando vidas a través de la educación en línea de calidad. Aprende a tu ritmo, alcanza tus metas.</p>
                <div class="social-links">
                    <a href="#" title="Facebook"><img class="logos-redSocial" src="../../assets/icons/facebook.png" alt="logo facebook"></a>
                    <a href="#" title="Twitter"><img class="logos-redSocial" src="../../assets/icons/logotipos.png" alt="logo facebook"></a>
                    <a href="#" title="LinkedIn"><img class="logos-redSocial" src="../../assets/icons/linkedin.png" alt="logo facebook"></a>
                    <a href="#" title="Instagram"><img class="logos-redSocial" src="../../assets/icons/instagram.png" alt="logo facebook"></a>
                </div>
            </div>
            
            <!-- Sección Enlaces Rápidos -->
            <div class="footer-section">
                <h3>Enlaces Rápidos</h3>
                <ul>
                    <li><a href="#cursos">Cursos</a></li>
                    <li><a href="#instructores">Instructores</a></li>
                    <li><a href="#sobre-nosotros">Sobre Nosotros</a></li>
                    <li><a href="#blog">Blog</a></li>
                    <li><a href="https://github.com/Tomfmp2/LMS-educational-system">Contacto</a></li>
                </ul>
            </div>
            
            <!-- Sección Categorías -->
            <div class="footer-section">
                <h3>Categorías</h3>
                <ul>
                    <li><a href="#desarrollo-web">Desarrollo Web</a></li>
                    <li><a href="#programacion">Programación</a></li>
                    <li><a href="#diseno">Diseño</a></li>
                    <li><a href="#marketing">Marketing Digital</a></li>
                    <li><a href="#negocios">Negocios</a></li>
                </ul>
            </div>
            
            <!-- Sección Soporte -->
            <div class="footer-section">
                <h3>Soporte</h3>
                <ul>
                    <li><a href="#ayuda">Centro de Ayuda</a></li>
                    <li><a href="#terminos">Términos y Condiciones</a></li>
                    <li><a href="#privacidad">Política de Privacidad</a></li>
                    <li><a href="#faq">Preguntas Frecuentes</a></li>
                </ul>
                <p style="margin-top: 1rem;">
                    <img class="logos-redSocial" src="../../assets/icons/gmail.png" alt="logo gmail"> soporte@educateabc.com<br>
                    <img class="logos-redSocial" src="../../assets/icons/llamada-telefonica.png" alt="icono telefono"> +57 123 456 7890
                </p>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Educate ABC. Todos los derechos reservados.</p>
        </div>
    </footer>
    `;
    
    console.log('Footer component renderizado');
  }
}

customElements.define('footer-global', Footer);
console.log('Web Component "footer-global" registrado');