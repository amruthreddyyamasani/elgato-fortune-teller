interface DoorCardProps {
  doorNumber: number;
  title: string;
  subtitle: string;
  onClick: () => void;
}

export const DoorCard = ({ doorNumber, title, subtitle, onClick }: DoorCardProps) => (
  <button
    className="door-card"
    data-door={doorNumber}
    type="button"
    aria-label={`Choose door ${doorNumber}: ${title}. ${subtitle}.`}
    onClick={onClick}
  >
    <span className="door-number">Door {doorNumber}</span>
    <span className="door-illustration" aria-hidden="true">
      <span className="door-panel" />
      <span className="door-keyhole" />
      <span className="door-knob" />
    </span>
    <span className="door-copy">
      <span className="door-title">{title}</span>
      <span className="door-subtitle">{subtitle}</span>
    </span>
  </button>
);

export default DoorCard;
