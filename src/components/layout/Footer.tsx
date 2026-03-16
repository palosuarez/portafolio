import './Footer.css';

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
