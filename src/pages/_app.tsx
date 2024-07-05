import "@/styles/globals.scss";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import type { AppProps } from "next/app";
import Layout from "../layout";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: 'green',
          color: 'white',
        },
      },
    },
  },
});


export default function App({ Component, pageProps, ...props }: AppProps) {
  return (
    
      <AppCacheProvider {...props}>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>/
          <Component {...pageProps} />
        </Layout>
        </ThemeProvider>
      </AppCacheProvider>
  );
}
