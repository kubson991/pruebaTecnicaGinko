import { useAppSelector } from '@/lib/hooks'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import type { ComponentType } from 'react'
export function withAuth(Component: ComponentType<AppProps>) {
  return function AuthenticatedComponent(props: AppProps) {
    const router = useRouter()
    const user = useAppSelector((state) => state.AuthUser.user)
    const isAuthenticated = !!user?.token
    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/')
      }
    })

    return(<div><Component {...props} /></div>)
  }
}
