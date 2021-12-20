import { List } from "@mui/material";
import React, { FC, useEffect } from "react";
import TodoItem from "@components/TodoItem";
import { useAppDispatch } from "@hooks/AppDispatch";
import { useAppSelector } from "@hooks/AppSelector";
import { fetchTodos } from "@reducers/TodoSlice";

const TodoList: FC = () => {
  const dispatch = useAppDispatch();
  const { data: todos } = useAppSelector((state) => state.Todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <List sx={{ maxWidth: "600px" }}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </List>
  );
};

export default TodoList;
