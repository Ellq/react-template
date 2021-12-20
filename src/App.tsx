import React, { FC } from "react";

import Style from "./App.module.scss";
import "@assets/fonts/icons/icons.scss";

import TodoHeader from "@components/TodoHeader";
import TodoList from "@components/TodoList";

const App: FC = () => (
  <>
    <div className={Style.App}>
      <div className={Style.Wrapper}>
        <TodoHeader />
        <TodoList />
      </div>
    </div>
  </>
);

export default App;
