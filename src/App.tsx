import React, { FC, useEffect, useState } from "react";
import { useAppSelector } from "@hooks/AppSelector";
import Style from "./App.module.scss";
import { useAppDispatch } from "@hooks/AppDispatch";
import { fetchTodos, addTodo, removeTodo, patchTodo } from "@reducers/TodoSlice";
import "@assets/fonts/icons/icons.scss";
import Models from "@models";
import {
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

const App: FC = () => {
  const { data: todos } = useAppSelector((state) => state.Todos);
  const dispatch = useAppDispatch();

  const [inputText, setInputText] = useState("");
  const [editTodo, setEditTodo] = useState<Models.Todo | null>();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const onChangeHandler: (text: string) => void = (text) => {
    setInputText(text);
  };

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
    <>
      <div className={Style.App}>
        <div className={Style.Wrapper}>
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
          <List sx={{ maxWidth: "600px" }}>
            {todos.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={(e) => {
                        e.preventDefault();
                        setEditTodo(item);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => {
                        e.preventDefault();
                        onRemoveHandler(item.id);
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
                    onPatchHandler({ ...item, isCompleted: !item.isCompleted });
                  }}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox checked={item.isCompleted} />
                  </ListItemIcon>
                  {editTodo?.id === item.id ? (
                    <>
                      <ListItemText>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            onPatchHandler(editTodo);
                            setEditTodo(null);
                          }}
                        >
                          <Stack direction={"row"} spacing={2}>
                            <TextField
                              // label="Todo Text"
                              value={editTodo.text}
                              variant={"standard"}
                              onChange={(e) => {
                                e.preventDefault();
                                setEditTodo({ ...item, text: e.target.value });
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
                      <ListItemText>{item.text}</ListItemText>
                    </>
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </>
  );
};

export default App;
