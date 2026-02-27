import type { TodoFilter } from "../../types/Todo";
import classes from './Toolbar.module.css';
import { useIsMobile } from "../../hooks/useIsMobile";
import Filters from "../Filters/Filters";

interface ToolbarProps {
  filter: TodoFilter;
  activeCount: number;
  onChange: (filter: TodoFilter) => void;
  clearCompleted: () => void;
};

function Toolbar({ filter, onChange, activeCount, clearCompleted }: ToolbarProps) {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <>
          <div className={classes.toolbar}>
            <p className={classes.itemsLeft}>{activeCount} item{activeCount !== 1 ? "s" : ""} left</p>
            <a className={classes.clearCompleted} onClick={clearCompleted}>Clear Completed</a>
          </div>
          <Filters filter={filter} setFilter={onChange} />
        </>
      ) : (
        <div className={classes.toolbar}>
          <p className={classes.itemsLeft}>{activeCount} item{activeCount !== 1 ? "s" : ""} left</p>
          <Filters filter={filter} setFilter={onChange} />
          <a  className={classes.clearCompleted} onClick={clearCompleted}>Clear Completed</a>
        </div>
      )}
    </>
  );
}

export default Toolbar;
