import { ReactNode } from 'react'
import Header from './Header'
import { useAppSelector } from '@/lib/hooks'
import { Box } from '@mui/material'
export default function Layout({ children }:{children:ReactNode}) {
    const user=useAppSelector((state)=>state.AuthUser.user)
  return (
    <>
      <Header user={user}/>
      <Box component="main" sx={{height:'90dvh'}}>{children}</Box>
    </>
  )
}