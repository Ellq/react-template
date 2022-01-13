import React, { FC } from "react";

import Style from "./HomePage.module.scss";
import TodoHeader from "@components/TodoHeader";
import TodoList from "@components/TodoList";

const HomePage: FC = () => (
  <>
    <div className={Style.App}>
      <div className={Style.Wrapper}>
        <TodoHeader />
        <TodoList />
      </div>
    </div>
  </>
);

export default HomePage;
