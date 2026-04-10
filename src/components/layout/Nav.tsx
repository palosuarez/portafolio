import { CircuitP } from '../effects/CircuitP';
import './Nav.css';

const links = [
  { label: 'inicio', href: '#home' },
  { label: 'stack', href: '#stack', optionalMobile: true },
  { label: 'proyectos', href: '#proyectos', optionalMobile: true },
  { label: 'badges', href: '#badges', optionalMobile: true },
  { label: '// sobre mí', href: '#sobre-mi' },
  { label: 'contacto', href: '#contacto', glow: true },
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
          <li
            key={link.label}
            className={link.optionalMobile ? 'nav-item--optional' : ''}
          >
            <a
              href={link.href}
              aria-label={link.label}
              className={`nav-link ${link.glow ? 'nav-link--contact' : ''}`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
