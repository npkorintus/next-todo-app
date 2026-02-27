import {
  DndContext,
  closestCenter,
  type DragEndEvent,
} from '@dnd-kit/core';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

import type { Todo } from '../../types/Todo';
import RoundCheckbox from '../RoundCheckbox/RoundCheckbox';
import Toolbar from '../Toolbar/Toolbar';
import classes from './TodoList.module.css';
import iconCross from '/images/icon-cross.svg';
import SortableTodoItem from '../SortableTodoItem/SortableTodoItem';

interface TodoListProps {
  todos: Todo[];
  error: string | null;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onReorder: (todos: Todo[]) => void;
};

function TodoList({ todos, error, onToggle, onDelete, onReorder }: TodoListProps) {
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex(t => t.id === active.id);
    const newIndex = todos.findIndex(t => t.id === over.id);

    onReorder(arrayMove(todos, oldIndex, newIndex));
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // must move 5px before drag starts
      },
    })
  );

  if (error) {
    return <div className={classes.error}>Error: {error}</div>;
  }

  return (
    <div className={classes.todoListContainer}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={todos.map(todo => todo.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className={classes.todoList}>
            {todos.map((todo) => (
              <SortableTodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TodoList;
