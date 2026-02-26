export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  order: number;
};

// mock data from DB
export const todos: Todo[] = [
  { id: "001", text: "Complete online JavaScript course", completed: true, order: 0 },
  { id: "002", text: "Jog around the park 3x", completed: false, order: 1 },
  { id: "003", text: "10 minutes meditation", completed: false, order: 2 },
  { id: "004", text: "Read for 1 hour", completed: false, order: 3 },
  { id: "005", text: "Pick up groceries", completed: false, order: 4 },
  { id: "006", text: "Complete Todo App on Frontend Mentor", completed: false, order: 5 },
];
