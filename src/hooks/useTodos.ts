import {  useEffect, useState } from "react";
import  { type Todo, type TodoFilter } from "../types/Todo";
import * as api from "../services/todos.service";

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>("All");
  const [error, setError] = useState<string | null>(null);

  // Load todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await api.getTodos();
      setTodos(data);
    } catch (error) {
      setError("Could not load todos");
    }
  };

  const addTodo = async (text: string) => {
    // Snapshot current state for rollback
    const previousTodos = todos;

    // temporary optimistic todo
    const optimisticTodo: Todo = {
      id: String(Date.now()),
      text,
      completed: false,
      order: todos.length
    };

    // 1. optimistic UI update
    setTodos((prev) => [...prev, optimisticTodo]);

    try {
      // 2. real API call
      const savedTodo = await api.createTodo(text);

      // 3. replace optimistic todo with real one
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === optimisticTodo.id ? savedTodo : todo
        )
      );
    } catch {
      // 4. rollback on error
      setTodos(previousTodos);
      setError("Could not add todo");
    }
  };

  const toggleTodo = async (todo: Todo) => {
    // Snapshot current state for rollback
    const previousTodos = todos;

    const updatedTodo = { ...todo, completed: !todo.completed };

    // 1. Optimistic UI update
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? updatedTodo : t))
    );

    try {
      // 2. Real API call
      await api.updateTodo(updatedTodo);
    } catch {
      // 3. Rollback on error
      setTodos(previousTodos);
      setError("Could not update todo");
    }
  };

  const deleteTodo = async (id: string) => {
    // Snapshot current state for rollback
    const tempTodos = todos.filter(todo => todo.id !== id);

    // Optimistic UI update: Immediately remove the todo from UI
    setTodos(tempTodos);

    try {
      // Real API call to delete the todo
      await api.deleteTodo(id);
    } catch (error) {
      // Rollback the delete if the API request fails
      setTodos(todos);
      console.error("Failed to delete todo:", error);
      setError("Could not delete todo");
    }
  };

  const clearCompleted = async () => {
    // Snapshot current state for rollback
    const previousTodos = todos;

    // 1. Optimistic UI update
    setTodos((prev) => prev.filter(todo => !todo.completed));

    try {
      // 2. Real API call
      await api.deleteCompletedTodos();
    } catch (error) {
      // 3. Rollback on error
      setTodos(previousTodos);
      console.error("Failed to clear completed todos:", error);
      setError("Could not clear completed todos");
    }
  };

  const reorderTodos = async (orderedTodos: Todo[]) => {
    // Snapshot current state for rollback
    const previousTodos = todos;
    
    // 1. Optimistic UI update
    setTodos(orderedTodos);

    try {
      // 2. Real API call
      const orderedIds = orderedTodos.map(todo => todo.id);
      await api.reorderTodos(orderedIds);
    } catch (error) {
      // 3. Rollback on error
      setTodos(previousTodos);
      console.error("Failed to reorder todos:", error);
      setError("Could not reorder todos");
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  return {
    todos: filteredTodos,
    error,
    filter,
    activeCount,
    setTodos,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    reorderTodos,
  };
};

export default useTodos;
