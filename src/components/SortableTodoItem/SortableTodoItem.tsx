import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Todo } from '../../types/Todo';
import RoundCheckbox from '../RoundCheckbox/RoundCheckbox';
import classes from './SortableTodoItem.module.css';
import iconCross from '/images/icon-cross.svg';
import Image from 'next/image';

interface Props {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

function SortableTodoItem({ todo, onToggle, onDelete }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: todo.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={classes.todoListItem}
      {...attributes}
      {...listeners}
    >
      <RoundCheckbox
        label={todo.text}
        completed={todo.completed}
        onToggle={() => onToggle(todo)}
      />
      <button
        className={classes.deleteTodo}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(todo.id);
        }}
      >
        {/* <img src={iconCross} alt="Delete" /> */}
        <Image src="/images/icon-cross.svg" alt="Delete" width={18} height={18} />
      </button>
      {/* <span
        {...listeners}
        className={classes.dragHandle}
        aria-label="Drag todo"
      >
        ☰
      </span> */}

    </li>
  );
}

export default SortableTodoItem;
