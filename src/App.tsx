import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/auth/Login.tsx";
import { ToastProvider } from "./context/ToastProvider.tsx";

function App() {
    return (
        <ToastProvider>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </ToastProvider>
    )
}

export default App;
