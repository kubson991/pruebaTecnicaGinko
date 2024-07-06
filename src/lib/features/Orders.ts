import { createAppSlice } from "@/lib/createAppSlice";
import { UserResponse } from "@/types/Login";
import type { Order } from "@/types/Orders";
import Layout from "@/components/Layout";

 interface OrderSlide {
  orders:Order[],
  status:'rejected'|'accepted'|'pending'|null
}
 interface deleteOrderPayload {
  user:UserResponse,
  orderId:string
}

const initialState: OrderSlide = {
  orders:[],
  status:null
};



// If you are not using async thunks you can use the standalone `createSlice`.
export const OrdersSlide = createAppSlice({
  name: "Orders",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    getOrders: create.asyncThunk(
      async (user:UserResponse,dispatch) => {
        if (!user) {
          throw new Error('Orders Error')
        }
        const searchParams=new URLSearchParams()
        searchParams.append('token', String(user.token));
        
        const response = await fetch('/api/orders?'+searchParams)
        if (!response.ok) {
           throw new Error('Orders Error')
        }
        const parsedResponse=await response.json()
        return parsedResponse;
          
      },
      {
        pending: (state) => {
          state.status = 'pending';
        },
        fulfilled: (state, action) => {
          state.orders = action.payload.orders
          state.status = 'accepted';
        },
        rejected: (state) => {
          state.orders = [];
          state.status = 'rejected';
        },
      }
    ),
    deleteOrder: create.asyncThunk(
      async (payload:deleteOrderPayload,dispatch) => {
        if (!payload.user) {
          throw new Error('Orders Error')
        }
        const searchParams=new URLSearchParams()
        searchParams.append('token', String(payload.user.token));
        searchParams.append('order_id', String(payload.orderId));
        
        const response = await fetch('/api/orders?'+searchParams,{method:'DELETE'})
        if (!response.ok) {
           throw new Error('Orders Error')
        }
        const parsedResponse=await response.json()
        return parsedResponse;
          
      },
      {
        pending: (state) => {
          state.status = 'pending';
        },
        fulfilled: (state, action) => {
          state.orders = action.payload.orders
          state.status = 'accepted';
        },
        rejected: (state) => {
          state.orders = [];
          state.status = 'rejected';
        },
      }
    ),
  }),
});

// Action creators are generated for each case reducer function.
export const { getOrders,deleteOrder } =
OrdersSlide.actions;
