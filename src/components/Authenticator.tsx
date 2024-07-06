import { useAppSelector } from '@/lib/hooks'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
export function withAuth(Component: any) {
  return function AuthenticatedComponent(props: AppProps) {
    const router = useRouter()
    const user = useAppSelector((state) => state.AuthUser.user)
    const isAuthenticated = !!user?.token
    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login')
      }
    })

    return(<div><Component {...props} /></div>)
  }
}
