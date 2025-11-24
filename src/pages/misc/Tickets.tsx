import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Ticket, Plus, Trash2 } from "lucide-react";
import type { Ticket as TicketType } from "@/types/Ticket.ts";
import type { FormEvent } from "react";
import {createTicket, deleteTicket, getTickets, updateTicket} from "@/api/tickets.ts";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

export default function Tickets() {
    const { user } = useAuth();
    const [tickets, setTickets] = useState<TicketType[]>([]);
    const [selected, setSelected] = useState<TicketType | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const [newTicket, setNewTicket] = useState({
        title: "",
        description: "",
    });

    // Tickets laden
    const loadTickets = async () => {
        const res = await getTickets();
        const data = res.data;
        setTickets(data);
    };


    useEffect(() => {
        loadTickets();
    }, []);

    const handleCreate = async (e: FormEvent) => {
        e.preventDefault();
        const res = await createTicket(newTicket.title, newTicket.description);
        debugger;

        if (res.status === 201 || res.status === 200) {
            const createdTicket = await res.data;
            setTickets((prev) => [...prev, createdTicket]);
            setIsCreateOpen(false);
            setNewTicket({ title: "", description: "" });
        }
    };

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        if (!selected) return;

        const res = await updateTicket(selected);

        if (res.status === 200 || res.status === 201) {
            const updated = await res.data;
            setTickets((prev) =>
                prev.map((t) => (t._id === updated._id ? updated : t))
            );
            setSelected(null);
        }
    };

    const handleDelete = async (_id: string) => {
        const res = await deleteTicket(_id);

        if (res.status === 200 || res.status === 201) {
            const deleted = await res.data;
            console.log(deleted);
            setTickets(prev => prev.filter(t => t._id !== _id));
        }
    }

    return (
        <>
            {/* Create Dialog */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="sm:max-w-[450px] bg-gray-800 text-gray-100 border border-gray-700 rounded-xl shadow-lg">
                    <form className="grid gap-4" onSubmit={handleCreate}>
                        <DialogHeader>
                            <DialogTitle>Neues Ticket</DialogTitle>
                            <DialogDescription>
                                Erstelle ein neues Ticket mit Titel und Beschreibung.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-3">
                            <Label htmlFor="title">Titel</Label>
                            <Input
                                id="title"
                                value={newTicket.title}
                                onChange={(e) =>
                                    setNewTicket({ ...newTicket, title: e.target.value })
                                }
                                placeholder="Kurzer Titel"
                                required
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="description">Beschreibung</Label>
                            <Input
                                id="description"
                                value={newTicket.description}
                                onChange={(e) =>
                                    setNewTicket({ ...newTicket, description: e.target.value })
                                }
                                placeholder="Beschreibe dein Problem..."
                                required
                            />
                        </div>

                        <DialogFooter className="mt-2">
                            <DialogClose asChild>
                                <Button variant="default" className="bg-red-500 hover:bg-red-600 hover:text-white cursor-pointer">Abbrechen</Button>
                            </DialogClose>
                            <Button type="submit" className="bg-green-500 hover:bg-green-600 cursor-pointer">Erstellen</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
                <DialogContent className="sm:max-w-[450px] bg-gray-800 text-gray-100 border border-gray-700 rounded-xl shadow-lg">
                    {selected && (
                        <form className="grid gap-4" onSubmit={handleUpdate}>
                            <DialogHeader>
                                <DialogTitle>Ticket bearbeiten</DialogTitle>
                                <DialogDescription>
                                    Aktualisiere die Ticketinformationen und speichere sie.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-3">
                                <Label htmlFor="title">Titel</Label>
                                <Input
                                    id="title"
                                    value={selected.title}
                                    onChange={(e) =>
                                        setSelected({ ...selected, title: e.target.value })
                                    }
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="description">Beschreibung</Label>
                                <Input
                                    id="description"
                                    value={selected.description}
                                    onChange={(e) =>
                                        setSelected({ ...selected, description: e.target.value })
                                    }
                                />
                            </div>

                            <DialogFooter className="mt-2">
                                <DialogClose asChild>
                                    <Button variant="default" className="bg-red-500 hover:bg-red-600 hover:text-white cursor-pointer">Abbrechen</Button>
                                </DialogClose>
                                <Button type="submit" className="bg-green-500 hover:bg-green-600 cursor-pointer">Speichern</Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            {/* Page Layout */}
            <div className="flex flex-col h-full bg-gray-900 text-gray-100 p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Ticket className="h-8 w-8 text-indigo-400" />
                        <h1 className="text-2xl font-semibold">Tickets</h1>
                    </div>

                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 cursor-pointer"
                    >
                        <Plus className="h-5 w-5" />
                        Neu
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                    {tickets.map((entry, i) => (
                        <motion.div
                            key={entry._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => setSelected(entry)}
                            className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:bg-gray-700 transition cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-1">
                                <h2 className="text-lg font-semibold text-white">{entry.title}</h2>

                                <div className="flex flex-col items-end">
                                    <span className="text-sm text-gray-400">{entry.creator_name}</span>
                                    <span className="text-xs text-gray-500">
                                        {new Date(entry.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-400 mt-2">{entry.description}</p>

                            {user?.role === "Admin" && (
                                <div className="flex justify-end mt-4">
                                    <Button
                                        onClick={async (e) => {
                                            e.stopPropagation();
                                            await handleDelete(entry._id);
                                        }}
                                        className="bg-red-600 hover:bg-red-700 p-2 rounded-md cursor-pointer"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
}
