import React, { FC, useEffect, useState } from "react";
import { useAppSelector } from "@hooks/AppSelector";
import Style from "./App.module.scss";
import { useAppDispatch } from "@hooks/AppDispatch";
import { fetchTodos, addTodo, removeTodo, patchTodo } from "@reducers/TodoSlice";
import "@assets/fonts/icons/icons.scss";
import Models from "@models";

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
    dispatch(addTodo({ id: +new Date().toISOString(), text: inputText, isCompleted: false })).then(
      () => {
        setInputText("");
        dispatch(fetchTodos());
      }
    );
  };

  const onRemoveHandler: (id: number) => void = (id) => {
    dispatch(removeTodo(id)).then(() => {
      dispatch(fetchTodos());
    });
  };

  const onPatchHandler: (todo: Models.Todo) => void = (todo) => {
    dispatch(patchTodo({ ...todo })).then(() => {
      dispatch(fetchTodos());
    });
  };

  return (
    <>
      <div className={Style.Wrapper}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmitHandler();
          }}
        >
          <input
            type="text"
            name="addTodo"
            id=""
            value={inputText}
            onChange={(e) => {
              onChangeHandler(e.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>
        <ol>
          <div className={Style.App}>
            {todos.map((item) => (
              <li key={item.id}>
                <input
                  type="checkbox"
                  name={`check`}
                  checked={item.isCompleted}
                  onChange={() => {
                    onPatchHandler({ ...item, isCompleted: !item.isCompleted });
                  }}
                />
                {editTodo?.id === item.id ? (
                  <>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        onPatchHandler(editTodo);
                        setEditTodo(null);
                      }}
                    >
                      <input
                        type="text"
                        value={editTodo.text}
                        onChange={(e) => {
                          e.preventDefault();
                          setEditTodo({ ...item, text: e.target.value });
                        }}
                      />
                      <button type="submit">Send</button>
                    </form>
                  </>
                ) : (
                  <>
                    {item.text}
                    <button
                      className={Style.RemoveBtn}
                      onClick={(e) => {
                        e.preventDefault();
                        setEditTodo(item);
                        // onPatchHandler(item);
                      }}
                    >
                      <i className="icon-edit" />
                    </button>
                  </>
                )}

                <button
                  className={Style.RemoveBtn}
                  onClick={(e) => {
                    e.preventDefault();
                    onRemoveHandler(item.id);
                  }}
                >
                  <i className="icon-cancel" />
                </button>
              </li>
            ))}
          </div>
        </ol>
      </div>
    </>
  );
};

export default App;
