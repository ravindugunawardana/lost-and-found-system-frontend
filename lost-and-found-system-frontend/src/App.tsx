import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
// import SignInPage from "./features/auth/SignInPage";
// import SignUpPage from "./features/auth/SignUpPage";
// import Dashboard from "./pages/Dashboard";
// import ItemList from "./features/items/ItemList";
// import Navbar from './components/Navbar'
// import ProtectedRoute from "./routes/ProtectedRoute";

export default function App(){
  return(
    <div className="min-h-screen">
      {/* <Navbar /> */}
      <main className="p-4 max-w-5xl mx-auto">
    {/* <BrowserRouter> */}
    <Routes>
      {/* <Route path="/signin" element={<SignInPage/>} /> */}
      {/* <Route path="/signup" element={<SignUpPage/>} />
      <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path="/items" element={<ProtectedRoute><ItemList/></ProtectedRoute>} /> */}
      {/* role-protected route example */}
      {/* <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminPanel/></ProtectedRoute>} /> */}

    </Routes >
    </main>
    </div>
    // </BrowserRouter>

  )
}