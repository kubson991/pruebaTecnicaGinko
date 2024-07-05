import { StoreProvider } from "./StoreProvider";

export default function Layout(props:any) {
    return (
      <StoreProvider>
        <main>{props.children}</main>
      </StoreProvider>
    )
  }