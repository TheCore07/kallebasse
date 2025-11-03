import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Login from "./pages/auth/Login.tsx";
import { ToastProvider } from "./context/ToastProvider.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import NotFound from "./pages/NotFound.tsx";
import Changelog from "./pages/misc/Changelog.tsx";

function App() {
    return (
        <ToastProvider>
            <Routes>
                <Route
                    path="/login"
                    element={
                    // other Layout for Login Route
                        <AuthLayout>
                            <Login/>
                        </AuthLayout>
                        }
                />

                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/changelog" element={<Changelog />} />
                </Route>

                <Route path="*" element={<NotFound/>} />
            </Routes>
        </ToastProvider>
    )
}

export default App;
