import { useAppSelector } from "@/lib/hooks";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
export default function Layout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<typeof userRedux>(null);
  const userRedux = useAppSelector((state) => state.AuthUser.user);
  useEffect(() => {
    setUser(userRedux);
  }, [userRedux]);
  if (!user) {
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }
  return (
    <>
      <Header user={user} />
      <Box component="main" sx={{ height: "90dvh" }}>
        {children}
      </Box>
    </>
  );
}
