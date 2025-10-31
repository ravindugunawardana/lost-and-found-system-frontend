import React, { type JSX } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function ProtectedRoute({ children, roles }: {children: JSX.Element, roles?: string[] }){
    const { token, user } = useAuth()
    if (!token) return <Navigate to="/signin" replace />
    if(roles && (!user || !user.roles.some(r => roles.includes(r)))) return <div className='p-4'>Unauthorized</div>
    return children
}