import type { NextApiRequest, NextApiResponse } from "next";
import { todos, Todo } from "../../../lib/todos";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { orderedIds } = req.body as { orderedIds: string[] };

  if (!Array.isArray(orderedIds)) {
    return res.status(400).json({ error: "orderedIds must be an array" });
  }

  const idSet = new Set(orderedIds);

  if (
    idSet.size !== todos.length ||
    !todos.every(todo => idSet.has(todo.id))
  ) {
    return res.status(400).json({
      error: "orderedIds must contain all todo IDs exactly once",
    });
  }

  const reorderedTodos: Todo[] = [];

  orderedIds.forEach((id, index) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      todo.order = index;
      reorderedTodos.push(todo);
    }
  });

  todos.length = 0;
  todos.push(...reorderedTodos);

  return res.status(200).json(reorderedTodos);
}
