interface StatusPillProps {
  label: string;
  value: string;
  active?: boolean;
}

export const StatusPill = ({ label, value, active = false }: StatusPillProps) => (
  <div className={`status-pill ${active ? 'active' : ''}`}>
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);
