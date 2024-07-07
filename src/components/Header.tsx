import { logOut } from "@/lib/features/Login";
import { useAppDispatch } from "@/lib/hooks";
import type { UserResponse } from "@/types/Login";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Header({user}:{user:UserResponse|null}) {
  const dispatch=useAppDispatch()
  const router = useRouter();
  function handleLogOut() {
    if (typeof window !== "undefined") {
      dispatch(logOut())
      router.push('/')
    }
  }
  return (
    <>
    <Box component="header" sx={
      {
        display:'flex',
        backgroundColor:'purple',
        minHeight:'5dvh',
        justifyContent:'space-between',
        alignItems:'center',
        flexWrap:'wrap',
        flexDirection:'row',
        p:'1.2rem'
      }
    }>
      <Box component="nav" sx={{maxWidth:'50%',height:'fit-content',marginRight:'1.5rem'}}>
        <Stack direction="row" sx={{alignItems:'center'}} spacing={1}>
        <Avatar></Avatar>
        {user && <Typography variant="h4" sx={{color:'white'}}>{`${user?.user}`}</Typography> }
        </Stack>
        </Box>
        <Button sx={{fontSize:"1.3rem",color:"white",fontWeight:"bolder"}} onClick={handleLogOut}>Log Out</Button>
      </Box>
    </>
  )
}