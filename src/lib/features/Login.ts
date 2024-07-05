import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Login {
  user:String|null
}

const initialState: Login = {
  user:null
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const authSlide = createAppSlice({
  name: "AuthUser",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    increment: create.reducer((state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    }),
    decrement: create.reducer((state) => {
    }),
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    incrementByAmount: create.reducer(
      (state, action: PayloadAction<number>) => {
      },
    ),
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectUser: (auth) => auth.user,
  },
});

// Action creators are generated for each case reducer function.
export const { decrement, increment, incrementByAmount } =
authSlide.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectUser } = authSlide.selectors;
