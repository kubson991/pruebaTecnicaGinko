import { login } from "@/lib/features/Login";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import styles from "@/styles/login.module.scss";
import type { User } from "@/types/Login";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Avatar,
  Button,
  Container,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const statusLogin = useAppSelector((state) => state.AuthUser.status);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (statusLogin === "accepted") {
      router.push("/orders");
    } else if (statusLogin === "rejected") {
      setOpen(true);
    }
  }, [statusLogin]);

  const submitLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    if (formData) {
      const userName = formData.get("UserName") as string;
      const password = formData.get("Password") as string;
      const bodyData: User = {
        userName,
        password,
      };
      await dispatch(login(bodyData));
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login User" />
      </Head>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <form onSubmit={submitLogin} className={styles.login}>
          <Stack spacing={2} useFlexGap alignItems="center">
            <Avatar sx={{ bgcolor: "purple", width: 80, height: 80 }}>
              <LockOutlinedIcon sx={{ width: "70%", height: "70%" }} />
            </Avatar>
            <Typography
              mt={2}
              variant="h3"
              component="h3"
              textAlign="center"
              gutterBottom
            >
              Sign in
            </Typography>
            <TextField
              sx={{ minWidth: "100% " }}
              name="UserName"
              label="UserName"
              variant="filled"
              type="username"
              size="medium"
              required
              inputProps={{ style: { fontSize: "1.3rem" } }}
              InputLabelProps={{ style: { fontSize: "1.3rem" } }}
            />
            <TextField
              sx={{ minWidth: " 100%" }}
              name="Password"
              label="Password"
              variant="filled"
              type="password"
              size="medium"
              required
              inputProps={{ style: { fontSize: "1.3rem" } }}
              InputLabelProps={{ style: { fontSize: "1.3rem" } }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ marginTop: 6, minWidth: " 100%",fontSize:'1.3rem' }}
            >
              Sign In
            </Button>
            <Typography
            sx={{color:'grey'}}
              mt={4}
              variant="caption"
              component="h3"
              textAlign="center"
              gutterBottom
            >
              CopyRight © Your Website 2024
            </Typography>
          </Stack>
        </form>
      </Container>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: "100%",fontSize:'1.5rem' }}
        >
          Ha ocurrido un problema al intentar loggearte , trata otra vez
        </Alert>
      </Snackbar>
    </>
  );
}
