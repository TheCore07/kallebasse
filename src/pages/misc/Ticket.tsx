import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TicketIcon } from "@heroicons/react/24/outline";
import type { Ticket } from "@/types/Ticket";
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

export default function TicketsPage() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [selected, setSelected] = useState<Ticket | null>(null);

    useEffect(() => {
        fetch("/api/tickets", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setTickets(data));
    }, []);

    return (
        <>
            {/* Edit Dialog */}
            <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
                <DialogContent className="sm:max-w-[450px] bg-gray-800 text-gray-100 border border-gray-700 rounded-xl shadow-lg">
                    {selected && (
                        <form className="grid gap-4">
                            <DialogHeader>
                                <DialogTitle>Edit Ticket</DialogTitle>
                                <DialogDescription>
                                    Update ticket information and save changes.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-3">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" defaultValue={selected.title} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="creator">Creator</Label>
                                <Input id="creator" defaultValue={selected.creator_name} />
                            </div>

                            <DialogFooter className="mt-2">
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            {/* Page Layout */}
            <div className="flex flex-col h-full bg-gray-900 text-gray-100 p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <TicketIcon className="h-8 w-8 text-indigo-400" />
                        <h1 className="text-2xl font-semibold">Tickets</h1>
                    </div>
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
                            <div className="flex items-center justify-between mb-1">
                                <h2 className="text-lg font-semibold text-white">{entry.title}</h2>
                                <span className="text-sm text-gray-400">{entry.creator_name}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
}
