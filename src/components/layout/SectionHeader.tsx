import './SectionHeader.css';

interface Props {
  num: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ num, title, subtitle }: Props) {
  return (
    <header className="shdr">
      <div className="shdr-row">
        <span className="shdr-num">{num}</span>
        <div className="shdr-rule" />
        <span className="shdr-dot" aria-hidden="true" />
      </div>
      <h2 className="shdr-title">{title}</h2>
      {subtitle && <p className="shdr-sub">{subtitle}</p>}
    </header>
  );
}
