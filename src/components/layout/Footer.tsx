import './Footer.css';

const ticker = [
  { prompt: true, text: 'pan_dev@portfolio:~$ contacto' },
  { prompt: false, text: 'palosuarez@gmail.com' },
  { prompt: false, text: 'github.com/palosuarez' },
  { prompt: false, text: 'linkedin.com/in/pablo-andres-suarez-sandoval' },
  { prompt: false, text: '' },
  { prompt: true, text: 'pan_dev@portfolio:~$ disponibilidad' },
  { prompt: false, text: 'Freelance · Tiempo completo · Remoto' },
  { prompt: false, text: 'Bogota, Colombia — disponible ahora' },
  { prompt: false, text: '' },
  { prompt: true, text: 'pan_dev@portfolio:~$ stack' },
  { prompt: false, text: 'React · Node.js · TypeScript · Docker · Claude API' },
  { prompt: false, text: '' },
  { prompt: true, text: 'pan_dev@portfolio:~$ credenciales' },
  { prompt: false, text: 'IBM Full Stack Professional Certificate' },
  { prompt: false, text: 'credly.com/users/pablo-andres-suarez-sandoval' },
  { prompt: false, text: 'behance.net/andresuarez81' },
  { prompt: false, text: '' },
  { prompt: true, text: 'pan_dev@portfolio:~$ 2026 Pablo Suarez _' },
  { prompt: false, text: '' },
];

const repeated = [...ticker, ...ticker];

const links = [
  { label: 'GitHub', href: 'https://github.com/palosuarez' },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/pablo-andres-suarez-sandoval',
  },
  {
    label: 'Credly',
    href: 'https://credly.com/users/pablo-andres-suarez-sandoval',
  },
  { label: 'Behance', href: 'https://behance.net/andresuarez81' },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="terminal">
          <div className="terminal-bar">
            <span className="t-dot t-red" />
            <span className="t-dot t-yellow" />
            <span className="t-dot t-green" />
            <span className="t-title">pan_dev — terminal</span>
          </div>
          <div className="terminal-body">
            <div className="t-ticker">
              <div className="t-ticker-track">
                {repeated.map((line, i) => (
                  <div
                    key={i}
                    className={`t-line ${line.prompt ? 't-line--prompt' : ''}`}
                  >
                    {line.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-links">
          {links.map((l, i) => (
            <a
              key={i}
              href={l.href}
              target="_blank"
              rel="noopener"
              className="footer-link"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
