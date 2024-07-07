import { StoreProvider } from "@/StoreProvider";
import "@/styles/globals.scss";
import { createTheme } from "@mui/material";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from "next/app";
const theme = createTheme({
  // Customize your theme here
  palette: {
    primary: {
      main: '#800080',
    },
    secondary: {
      main: '#fff',
    },
    error: {
      main: '#red',
    },
    background: {
      default: '#fff',
    },
  },
});
export default function App({ Component, pageProps, ...props }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AppCacheProvider {...props}>
        <CssBaseline/>
        <StoreProvider>
            <Component {...pageProps}/>
          </StoreProvider>
      </AppCacheProvider>
      </ThemeProvider>
  );
}
