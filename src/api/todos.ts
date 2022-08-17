import axios, { AxiosResponse } from "axios";
import { Todo, TodoStatus } from "../types";

const todoApi = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

const getTodos = async (status: TodoStatus | ""): Promise<Todo[]> => {
  let queryString = "/todos";

  if (status.length != 0) {
    queryString = queryString.concat(`?status=${status}`);
  }

  const { data } = await todoApi.get(queryString);
  return data;
};

const getTodo = async (id: number): Promise<Todo> => {
  const { data } = await todoApi.get(`/todos/${id}`);
  return data;
};

const addTodo = async (todo: Todo): Promise<Todo> => {
  todo.status = "in-progress";

  const { data } = await todoApi.post("/todos", todo);
  return data;
};

const updateTodo = async (todo: Todo): Promise<Todo> => {
  const { data } = await todoApi.put(`/todos/${todo.id}`, todo);
  return data;
};

const deleteTodo = async (id: number): Promise<AxiosResponse> => {
  return await todoApi.delete(`/todos/${id}`);
};

export default {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
