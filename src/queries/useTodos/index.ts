import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import todosApi from "../../api/todos";
import { Todo, TodoStatus } from "../../types";

const { addTodo, deleteTodo, getTodo, getTodos, updateTodo } = todosApi;

export const useTodos = (status: TodoStatus | "" = "") =>
  useQuery<Todo[], Error>(["todos"], () => getTodos(status), {
    select: (todos) =>
      todos.filter((todo) => (status == "" ? true : todo.status == status)),
  });

export const useTodo = (id: number) =>
  useQuery<Todo, Error>(["todo", id], () => getTodo(id));

export const useAddTodo = () => {
  const qc = useQueryClient();
  return useMutation(addTodo, {
    onSuccess() {
      qc.invalidateQueries(["todos"]);
    },
  });
};

export const useUpdateTodo = () => {
  const qc = useQueryClient();
  return useMutation(updateTodo, {
    onSuccess(uTodo) {
      qc.setQueryData(["todo", uTodo.id], uTodo);
      qc.invalidateQueries(["todos"]);
    },
  });
};

export const useDeleteTodo = () => {
  const qc = useQueryClient();
  return useMutation(deleteTodo, {
    onSuccess() {
      qc.invalidateQueries(["todos"]);
    },
  });
};

export default {
  useTodo,
  useTodos,
  useUpdateTodo,
  useAddTodo,
  useDeleteTodo,
};
