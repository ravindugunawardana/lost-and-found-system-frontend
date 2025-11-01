import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function NavBar(){
const { user, logout } = useAuth()
const nav = useNavigate()

return(
    <nav className="bg-white shadow">
        <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">

            <div className="flex items-center gap-4">
                <Link to="/dashboard" className="font-bold">Lost & Found</Link>
                <Link to="/items" className="text-sm">Items</Link>
                {user && <Link to="create" className="text-sm">Report</Link>}
            </div>

            <div>
                {user ? (
                    <div className="flex item-center gap-4">
                        <span className="text-sm">{user.username}</span>
                        <button onClick={() => { logout(); nav('/signin') }} className="px-3 py-1 border rounded">Sign Out</button>
                    </div>
                ) : (
                    <div className="flex item-center gap-2">
                        <Link to="/signin" className="px-3 py-1 border rounded">Sign in</Link>
                        <Link to="/signup" className="px-3 py-1 bg-blue-600 text-white rounded">Sign up</Link>
                    </div>
                )
            }
            </div>
        </div>
    </nav>
    )
}