import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Models from "@models";
import RequestStatus from "@utils/RequestStatus";

const initialState: Models.GenericState<Models.Todo[]> = {
  data: [],
  status: RequestStatus.Waiting,
  error: "",
};

const tagsSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    hello: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
    },
  },
});

// export const { actions: tagsActions, reducer: tagsReducer } = tagsSlice;

export const { hello } = tagsSlice.actions;

export default tagsSlice.reducer;
