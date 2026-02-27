import classes from "./RoundCheckbox.module.css"

type Props = {
  label: string;
  completed: boolean;
  onToggle: () => void;
};

export default function RoundCheckbox({ label, completed, onToggle }: Props) {
  return (
    <label className={`${classes.checkboxContainer} ${completed ? classes.checked : ""}`}>
      <input
        name="round-checkbox"
        type="checkbox"
        checked={completed}
        onChange={onToggle}
      />
      <span className={classes.customCheckbox} />
      <span className={classes.checkboxLabel}>{label}</span>
    </label>
  );
}
