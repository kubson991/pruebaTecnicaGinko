import { login } from "@/lib/features/Login";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import styles from "@/styles/login.module.scss";
import type { User } from "@/types/Login";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert, Avatar, Button, Container, Snackbar, Stack, TextField, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


export default function Home() {
  const router=useRouter()
  const dispatch=useAppDispatch()
  const statusLogin=useAppSelector((state)=>state.AuthUser.status)
  const [open, setOpen] = useState<boolean>(false);

useEffect(() => {
  if(statusLogin === "accepted"){
    router.push('/orders')
  }else if(statusLogin === "rejected"){
    setOpen(true)
  }
}, [statusLogin])


  const submitLogin=async (event:React.SyntheticEvent)=> {
    event.preventDefault()
    const formData=new FormData(event.currentTarget as HTMLFormElement) ;
    if (formData) {
      const userName = formData.get('UserName') as string;
      const password = formData.get('Password') as string;
      const bodyData:User = {
        userName,
        password
      };
      const response=await dispatch(login(bodyData))
      console.log(response)
    }
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <form onSubmit={submitLogin} className={styles.login}>
        <Stack spacing={2} useFlexGap alignItems="center">
          <Avatar sx={{ bgcolor: 'purple',width: 80, height: 80}} >
          <LockOutlinedIcon sx={{ width: '70%', height: '70%'}} />
          </Avatar>
        <Typography mt={2} variant="h4" component="h4" textAlign="center" gutterBottom>Sign in</Typography>
          <TextField sx={{ minWidth: "100% "}} name="UserName" label="UserName" variant="outlined" type="username" required />
          <TextField sx={{ minWidth:" 100%" }} name="Password" label="Password" variant="outlined" type="password" required/>
          <Button variant="contained" type="submit" sx={{marginTop:6, minWidth:" 100%"}}>Sign In</Button>
        </Stack>
      </form>
    </Container>
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
        <Alert
    onClose={handleClose}
    severity="error"
    variant="filled"
    sx={{ width: '100%' }}
  >
    Ha ocurrido un problema al intentar loggearte , trata otra vez
  </Alert>
    </Snackbar>
    </>
  );
}
