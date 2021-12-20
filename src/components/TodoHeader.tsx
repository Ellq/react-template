import { addTodo, fetchTodos } from "@reducers/TodoSlice";
import { useAppDispatch } from "@hooks/AppDispatch";
import { Button, Stack, TextField } from "@mui/material";
import React, { FC, useState } from "react";

const TodoHeader: FC = () => {
  const [inputText, setInputText] = useState("");
  const dispatch = useAppDispatch();

  const onSubmitHandler: () => void = () => {
    if (inputText.length) {
      dispatch(
        addTodo({ id: +new Date().toISOString(), text: inputText, isCompleted: false })
      ).then(() => {
        setInputText("");
        dispatch(fetchTodos());
      });
    }
  };

  const onChangeHandler: (text: string) => void = (text) => {
    setInputText(text);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitHandler();
      }}
    >
      <Stack direction={"row"} spacing={2}>
        <TextField
          label="Todo Text"
          onChange={(e) => {
            onChangeHandler(e.target.value);
          }}
        />
        <Button variant="contained" type="submit">
          Add Todo
        </Button>
        {/* <button type="submit">Send</button> */}
      </Stack>
    </form>
  );
};

export default TodoHeader;
