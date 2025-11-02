import { useState } from "react";
import { EyeSlashIcon, EyeIcon} from "@heroicons/react/24/outline";
import Toggle from "../../components/Toggle.tsx";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { useToast } from "../../context/useToast.ts";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [stayLoggedIn, setStayLoggedIn] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password, stayLoggedIn})
            })

            if (!res.ok) {
                const errData = await res.json();
                toast("error", errData.message || "Login fehlgeschlagen")
                return;
            }

            navigate("/dashboard");
        } catch (err) {
            console.log(err);
            toast("error", "Fehler beim Einloggen")
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900">
            <div className="w-full max-w-sm rounded-lg bg-gray-800 p-8 shadow-lg">
                <h1 className="mb-6 text-center text-2xl font-semibold text-white">
                    Login
                </h1>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm text-gray-300">
                            Passwort
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-md border border-gray-600 bg-gray-700 p-2 pr-10 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                                placeholder="••••••••"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div
                        className="flex items-center justify-between"
                    >
                        <span className="text-gray-300 font-medium">Eingeloggt bleiben?</span>
                        <Toggle enabled={stayLoggedIn} onChange={() => setStayLoggedIn(!stayLoggedIn)} />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700 cursor-pointer"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
