export interface Todo {
  id: string,
  text: string,
  completed: boolean
  order: number,
};

export type TodoFilter = "All" | "Active" | "Completed";
