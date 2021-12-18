import axios from "axios";
import Models from "@models";

const instance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const fetchAll: () => Promise<any> = async () => await instance.get<Models.Todo[]>("/todos");

export const addTodo: (data: Models.Todo) => Promise<any> = async (data) =>
  await instance.post<Models.Todo>("/todos", { ...data });

export const removeTodo: (id: number) => Promise<any> = async (id) =>
  await instance.delete(`/todos/${id}`);

export const patchTodo: (data: Models.Todo) => Promise<any> = async (data) =>
  await instance.patch<number>(`/todos/${data.id}`, { ...data });
