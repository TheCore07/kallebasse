import { RotateCw } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col items-center justify-center text-center space-y-6">
            <RotateCw className="w-16 h-16 text-muted-foreground animate-spin " />

            <Label className="text-2xl font-bold">Seite nicht gefunden</Label>

            <p className="text-muted-foreground max-w-xs">
                Die Seite, die du aufrufen möchtest, existiert nicht oder wurde verschoben.
            </p>

            <Button onClick={() => navigate("/")} className="mt-4 cursor-pointer">
                Zurück zum Dashboard
            </Button>
        </div>
    );
}