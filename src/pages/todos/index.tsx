import TodoLayout from "../../layouts/TodoLayout";

import Header from '../../components/Header/Header';
import TodoForm from '../../components/TodoForm/TodoForm';
import TodoList from '../../components/TodoList/TodoList';
import Toolbar from '../../components/Toolbar/Toolbar';

import useTodos from '../../hooks/useTodos';

function Todos() {
  const {
    todos,
    error,
    filter,
    activeCount,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    reorderTodos
  } = useTodos();

  return (
    <TodoLayout>
      <Header />
      <TodoForm onAdd={addTodo} />
      <TodoList
        todos={todos}
        error={error}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onReorder={reorderTodos}
      />
      <Toolbar
        filter={filter}
        onChange={setFilter}
        activeCount={activeCount}
        clearCompleted={clearCompleted}
      />
      <p style={{ marginTop: '3rem' }}>Drag and drop to reorder list</p>
    </TodoLayout>
  );
}

export default Todos;
