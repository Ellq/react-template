import React, { FC, useState } from "react";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import Models from "@models";
import {
  Button,
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { useAppDispatch } from "@hooks/AppDispatch";
import { removeTodo, fetchTodos, patchTodo } from "@reducers/TodoSlice";

interface IProps {
  todo: Models.Todo;
}

const TodoItem: FC<IProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editedTodo, setEditedTodo] = useState<Models.Todo>(todo);

  const onRemoveHandler: (id: number) => void = (id) => {
    dispatch(removeTodo(id)).then(() => {
      dispatch(fetchTodos());
    });
  };

  const onPatchHandler: (todo: Models.Todo) => void = (todo) => {
    if (todo.text) {
      dispatch(patchTodo({ ...todo })).then(() => {
        dispatch(fetchTodos());
      });
    }
  };

  return (
    <ListItem
      key={todo.id}
      secondaryAction={
        <>
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={(e) => {
              e.preventDefault();
              setIsEdit(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={(e) => {
              e.preventDefault();
              onRemoveHandler(todo.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      }
      disablePadding
    >
      <ListItemButton
        onClick={() => {
          onPatchHandler({ ...todo, isCompleted: !todo.isCompleted });
        }}
        dense
      >
        <ListItemIcon>
          <Checkbox checked={todo.isCompleted} />
        </ListItemIcon>
        {isEdit ? (
          <>
            <ListItemText>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onPatchHandler(editedTodo);
                  setIsEdit(false);
                }}
              >
                <Stack direction={"row"} spacing={2}>
                  <TextField
                    // label="Todo Text"
                    value={editedTodo.text}
                    variant={"standard"}
                    onChange={(e) => {
                      e.preventDefault();
                      setEditedTodo({ ...todo, text: e.target.value });
                    }}
                  />
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Stack>
              </form>
            </ListItemText>
          </>
        ) : (
          <>
            <ListItemText>{todo.text}</ListItemText>
          </>
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default TodoItem;
