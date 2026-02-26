import type { NextApiRequest, NextApiResponse } from "next";
import { todos } from "../../../lib/todos";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (req.method === "PATCH") {
    const { completed } = req.body;

    const todo = todos.find(t => t.id === id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.completed = completed;

    return res.status(200).json(todo);
  }

  if (req.method === "DELETE") {
    const index = todos.findIndex(todo => todo.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todos.splice(index, 1);

    return res.status(204).end();
  }

  return res.status(405).json({ error: "Method not allowed" });
}
