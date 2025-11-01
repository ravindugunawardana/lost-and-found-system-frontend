import React from "react"
import {Routes, Route, Navigate} from "react-router-dom"
import SignInPage from "./features/auth/SignInPage";
import SignUpPage from "./features/auth/SignUpPage";
import Dashboard from "./pages/Dashboard";
import ItemList from "./features/items/ItemList";
import ItemDetails from "./features/items/ItemDetails";
// import ItemForm from "./features/items/ItemForm"
import NavBar from "./components/NavBar";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App(){
  return(
    <div className="min-h-screen">
      <NavBar />
          <main className="p-4 max-w-5xl mx-auto">
            <Routes>
                <Route path="/signin" element={<SignInPage/>} />
                <Route path="/signup" element={<SignUpPage/>} />
                <Route path="/items/:id" element={<ItemDetails/>} />
                {/* <Route path="/items" element={<ProtectedRoute><ItemList/></ProtectedRoute>} />
                <Route path="/create" element={<ProtectedRoute><ItemForm/></ProtectedRoute>} />
                <Route path="/edit/:id" element={<ProtectedRoute><ItemForm/></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
                //  */}

                <Route path="/items" element={<ItemList/>} />
                {/* <Route path="/create" element={<ItemForm/>} />
                <Route path="/edit/:id" element={<ItemForm/>} /> */}
                <Route path="/dashboard" element={<Dashboard/>} />

                <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes >
        </main>
    </div>
  )
}