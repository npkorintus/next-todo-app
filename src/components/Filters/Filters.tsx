import React from 'react';
import classes from './Filters.module.css';
import type { TodoFilter } from '../../types/Todo';

const filters = ["All", "Active", "Completed"] as const;

type FilterProps = {
  filter: TodoFilter;
  setFilter: (filter: TodoFilter) => void;
};

const Filters: React.FC<FilterProps> = ({ filter, setFilter }) => {

  return (
    <div className={classes.filters}>
      {filters.map((f) => (
        <a
          key={f}
          className={classes.filter}
          onClick={() => setFilter(f)}
          data-active={filter === f}
        >
          {f}
        </a>
      ))}
    </div>
  );
};

export default Filters;
