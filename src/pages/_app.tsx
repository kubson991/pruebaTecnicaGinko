import "@/styles/globals.scss";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import type { AppProps } from "next/app";
import { StoreProvider } from "@/StoreProvider";


export default function App({ Component, pageProps, ...props }: AppProps) {
  return (
      <AppCacheProvider {...props}>
        <StoreProvider>
            <Component {...pageProps}/>
          </StoreProvider>
      </AppCacheProvider>
  );
}
