import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
    const { user, loading, logout } = useAuth();

    if (loading) return <p className="text-center mt-10">Lade...</p>;

    if (!user) return <p className="text-center mt-10">Nicht eingeloggt.</p>;

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <Card className="w-[400px] shadow-lg">
                <CardHeader>
                    <CardTitle>Profil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>ID:</strong> {user._id}
                    </p>
                    <Button onClick={logout} className="mt-4 w-full">
                        Logout
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
