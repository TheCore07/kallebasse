import { useState, useEffect } from "react";
import { login } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { user, refreshUser } = useAuth();
    const navigate = useNavigate();

    // 🔄 Wenn bereits eingeloggt (Refresh-Token vorhanden)
    useEffect(() => {
        if (user) {
            navigate("/profile", { replace: true });
        }
    }, [user]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await login(email, password);
            await refreshUser(); // 👈 Context-User nach Login aktualisieren
            setMessage("✅ Erfolgreich eingeloggt!");
            navigate("/profile", { replace: true });
        } catch (err: any) {
            setMessage(err.response?.data?.message ?? "❌ Login fehlgeschlagen");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <Card className="w-[400px] shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="password">Passwort</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Wird eingeloggt..." : "Login"}
                        </Button>

                        {message && (
                            <p className="text-center text-sm text-gray-600 mt-2">{message}</p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
