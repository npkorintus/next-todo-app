import type { NextApiRequest, NextApiResponse } from "next";
import { todos, Todo } from "../../../lib/todos";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(
      [...todos].sort((a, b) => a.order - b.order)
    );
  }

  if (req.method === "POST") {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const newTodo: Todo = {
      id: String(Date.now()),
      text,
      completed: false,
      order: todos.length,
    };

    todos.push(newTodo);

    return res.status(201).json(newTodo);
  }

  if (req.method === "DELETE") {
    const beforeCount = todos.length;

    const remainingTodos = todos.filter(todo => !todo.completed);

    todos.length = 0;
    todos.push(...remainingTodos);

    const deletedCount = beforeCount - todos.length;

    return res.status(200).json({
      message: "Completed todos deleted",
      deletedCount,
      remainingTodos: todos,
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
