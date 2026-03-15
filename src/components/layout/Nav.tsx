import { CircuitP } from '../effects/CircuitP';
import './Nav.css';

const links = [
  { label: 'Stack', href: '#stack' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Badges', href: '#badges' },
  { label: 'Pablo', href: '#sobre-mi' },
];

interface NavProps {
  onLogoClick: () => void;
}

export function Nav({ onLogoClick }: NavProps) {
  return (
    <nav className="nav">
      <a className="nav-logo" href="#home" onClick={onLogoClick}>
        <div className="nav-logo-icon">
          <CircuitP />
        </div>
      </a>
      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
      <a className="nav-cta" href="#contacto">
        Contacto
      </a>
    </nav>
  );
}
