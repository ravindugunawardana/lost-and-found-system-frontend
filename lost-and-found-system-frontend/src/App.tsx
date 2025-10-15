import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignInPage from "./features/auth/SignInPage";
import SignUpPage from "./features/auth/SignUpPage";
import Dashboard from "./pages/Dashboard";
import ItemList from "./features/items/ItemList";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<SignInPage/>} />
      <Route path="/signup" element={<SignUpPage/>} />
      <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path="/items" element={<ProtectedRoute><ItemList/></ProtectedRoute>} />
      {/* role-protected route example */}
      <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminPanel/></ProtectedRoute>} />

    </Routes >
    </BrowserRouter>

  )
}