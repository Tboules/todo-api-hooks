export type TodoStatus = "in-progress" | "complete";

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
}
