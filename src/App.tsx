import {Route, Routes} from "react-router-dom";
import LoginPage from "@/pages/auth/Login.tsx";
import ProfilePage from "@/pages/Profile.tsx";
import Layout from "@/app/layout.tsx";
import NotFound from "@/pages/NotFound.tsx";
import Tickets from "@/pages/misc/Tickets.tsx";
import Projects from "@/pages/projects/Projects.tsx";

function App() {

    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/" element={<Layout/>} > {/*Insert Pages into the "/" Route that work with the SideBar*/}
                <Route path="/profile" element={<ProfilePage/>} />
                <Route path="/tickets" element={<Tickets/>} />
                <Route path="/projects" element={<Projects/>} />
            </Route>

            <Route path="*" element={<NotFound/>} />
        </Routes>
    )
}

export default App
