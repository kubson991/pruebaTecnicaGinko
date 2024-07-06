export interface User {
    userEmail: string;
    password: string;
}
export interface UserResponse{
    user: string,
    token:string
}
export interface Login {
    user: UserResponse | null;
    status: "rejected" | "accepted" | "pending" | null;
  }
  