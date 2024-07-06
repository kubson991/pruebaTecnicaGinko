import type { UserResponse } from "@/types/Login"
import { Box, Button, Typography ,Avatar,Stack} from "@mui/material"


export default function Header({user}:{user:UserResponse|null}) {
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
        <Button sx={{fontSize:"1.3rem"}}>Log Out</Button>
      </Box>
    </>
  )
}