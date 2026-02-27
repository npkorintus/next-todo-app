import ThemeToggle from '../ThemeToggle/ThemeToggle';
import classes from './Header.module.css';

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <h1 className={classes.title}>TODO</h1>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
