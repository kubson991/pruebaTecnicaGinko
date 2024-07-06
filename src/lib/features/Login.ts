import { createAppSlice } from "@/lib/createAppSlice";
import type { User } from "@/types/Login";
 interface Login {
  user:String|null,
  status:'rejected'|'accepted'|'pending'|null
}

const initialState: Login = {
  user:null,
  status:null
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const AuthSlide = createAppSlice({
  name: "AuthUser",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    x: create.reducer((state) => {
    }),
    login: create.asyncThunk(
      async (query: User,dispatch) => {
        const searchParams=new URLSearchParams()
        searchParams.append('username', query.userName);
        searchParams.append('password', query.password);
        
        const response:any = await fetch('/api/users?'+searchParams)
        if (!response.ok) {
           throw new Error('Login Error')
        }
        return await response.json();
          
      },
      {
        pending: (state) => {
          state.status = 'pending';
        },
        fulfilled: (state, action) => {
          state.user = action.payload
          state.status = 'accepted';
        },
        rejected: (state) => {
          state.user = null;
          state.status = 'rejected';
        },
      }
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectUser: (auth) => auth.user,
  },
});

// Action creators are generated for each case reducer function.
export const { login } =
AuthSlide.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectUser } = AuthSlide.selectors;
