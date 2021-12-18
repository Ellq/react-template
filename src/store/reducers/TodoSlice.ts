import store from "@store/index";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Models from "@models";
import RequestStatus from "@utils/RequestStatus";
import API from "@api";

const initialState: Models.GenericState<Models.Todo[]> = {
  data: [],
  status: RequestStatus.Waiting,
  error: "",
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async (_, { rejectWithValue }) => {
  try {
    const response = await API.Todo.fetchAll();
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
  }
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo: Models.Todo) => {
  try {
    const response = await API.Todo.addTodo(todo);
    return response.data;
  } catch (error) {}
});

export const removeTodo = createAsyncThunk("todos/removeTodo", async (id: number) => {
  try {
    const response = await API.Todo.removeTodo(id);
    return response.data;
  } catch (error) {}
});

export const patchTodo = createAsyncThunk("todos/patchTodo", async (todo: Models.Todo) => {
  try {
    const response = await API.Todo.patchTodo(todo);
    return response.data;
  } catch (error) {}
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    hello: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
    },
  },
  extraReducers: {
    [fetchTodos.pending.type]: (state) => {
      state.status = RequestStatus.Pending;
    },
    [fetchTodos.fulfilled.type]: (state, action: PayloadAction<Models.Todo[]>) => {
      state.status = RequestStatus.Success;
      state.data = action.payload;
    },
    [fetchTodos.rejected.type]: (state, action: PayloadAction<string>) => {
      state.status = RequestStatus.Error;
      state.error = action.payload;
    },
  },
});

// export const { actions: todoActions, reducer: todoReducer } = todoSlice;

export const { hello } = todoSlice.actions;

export default todoSlice.reducer;
