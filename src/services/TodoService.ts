import { fetchTodos } from "@reducers/TodoSlice";
import { serviceDispatch } from "@hooks/ServiceDispatch";

export const fetchAll: () => void = () => {
  serviceDispatch(fetchTodos());
  // serviceDispatch(hello("hello world"));
};
