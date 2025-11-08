import { useEffect, useState } from "react";
import type { User } from "../types/User.ts";
import { useToast } from "../context/useToast.ts";
import { useAuth } from "../context/AuthContext.tsx";

function Dashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const { user } = useAuth();
    const toast = useToast();

    console.log(user);


    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <>

            <h1 className="">Users</h1>
            <ul>
                {users.map(u => (
                    <li key={u._id}>{u.name} – {u.email}</li>
                ))}
            </ul>

            <div className="flex flex-col gap-2">
                <button onClick={() => toast("error", "Fehler passiert!")}>Error</button>
                <button onClick={() => toast("success", "Alles gut!")}>Success</button>
                <button onClick={() => toast("warning", "Vorsicht!")}>Warning</button>
                <button onClick={() => toast("info", "Nur Info")}>Info</button>
            </div>

        </>
    );
}

export default Dashboard;