import { createAppSlice } from "@/lib/createAppSlice";
import type { User, UserResponse } from "@/types/Login";
interface Login {
  user: UserResponse | null;
  status: "rejected" | "accepted" | "pending" | null;
}

function setLocalStorageItem(key: string, value: object) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

function getLocalStorageItem(key: string) {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
  }
  return null;
}
const initialState: Login = {
  user: getLocalStorageItem("user") || null,
  status: null,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const AuthSlide = createAppSlice({
  name: "AuthUser",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    login: create.asyncThunk(
      async (query: User, dispatch) => {
        const searchParams = new URLSearchParams();
        searchParams.append("username", query.userName);
        searchParams.append("password", query.password);

        const response = await fetch("/api/users?" + searchParams);
        if (!response.ok) {
          throw new Error("Login Error");
        }
        return await response.json();
      },
      {
        pending: (state) => {
          state.status = "pending";
        },
        fulfilled: (state, action) => {
          state.user = action.payload;
          state.status = "accepted";
          setLocalStorageItem("user", action.payload);
        },
        rejected: (state) => {
          state.user = null;
          state.status = "rejected";
        },
      }
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
});

// Action creators are generated for each case reducer function.
export const { login } = AuthSlide.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
