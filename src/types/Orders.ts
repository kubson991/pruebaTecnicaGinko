import type { UserResponse } from "./Login";

export interface Order {
    id: number;
    date: string;
    name: string;
    shipTo: string;
    paymentMethod: string;
    saleAmount: string;
  }

  export interface OrderSlide {
    orders:Order[],
    status:'rejected'|'accepted'|'pending'|null
  }
  export  interface deleteOrderPayload {
    user:UserResponse,
    orderId:string
  }