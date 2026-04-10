import { CircuitP } from '../effects/CircuitP';
import './Nav.css';

const links = [
  { label: 'Inicio', href: '#home', highlight: true },
  { label: 'Stack', href: '#stack' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Badges', href: '#badges' },
  { label: 'Pablo', href: '#sobre-mi' },
  { label: 'Contacto', href: '#contacto', highlight: true },
];

interface NavProps {
  onLogoClick: () => void;
}

export function Nav({ onLogoClick }: NavProps) {
  return (
    <nav className="nav">
      <a
        className="nav-logo"
        href="#home"
        onClick={onLogoClick}
        aria-label="pan_dev — ir al inicio"
      >
        <div className="nav-logo-icon">
          <CircuitP />
        </div>
      </a>
      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              aria-label={link.label}
              className={link.highlight ? 'nav-link--highlight' : ''}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
