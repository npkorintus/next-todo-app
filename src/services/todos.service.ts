import type { Todo } from "../types/Todo";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(`api/todos`);

    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }

    const data: Todo[] = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching todos:", error);
    throw new Error("Failed to fetch todos");
  }
};

export const createTodo = async (text: string): Promise<Todo> => {
  try {
    const response = await fetch(`api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error("Failed to create todo")
    };

    const data: Todo = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error creating todo:", error);
    throw new Error("Failed to create todo");
  }
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const { id, completed } = todo;

  try {
    const response = await fetch(`api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });

    if (!response.ok) {
      throw new Error("Failed to update todo");
    }

    const data: Todo = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error updating todo:", error);
    throw new Error("Failed to update todo");
  }
};

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`api/todos/${id}`, { method: "DELETE" });

    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }
  } catch (error: any) {
    console.error("Error deleting todo:", error);
    throw new Error("Failed to delete todo");
  }
};

export const deleteCompletedTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(`api/todos`, { method: "DELETE" });

    if (!response.ok) {
      throw new Error("Failed to clear completed todos");
    }

    const data: Todo[] = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error clearing completed todos:", error);
    throw new Error("Failed to clear completed todos");
  }
};

export const reorderTodos = async (orderedIds: string[]): Promise<Todo[]> => {
  try {
    const response = await fetch(`api/todos/reorder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderedIds }),
    });

    if (!response.ok) {
      throw new Error("Failed to reorder todos");
    }

    const data: Todo[] = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error reordering todos:", error);
    throw new Error("Failed to reorder todos");
  }
};
