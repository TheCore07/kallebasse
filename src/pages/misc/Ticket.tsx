import { TicketIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import type {Ticket} from "../../types/Ticket.ts";

export default function Ticket() {
    const tickets: Ticket[] = [{
        _id: "awdawdsadwa",
        creator_name: "testnema",
        title: "testtitle",
        createdAt: "08-11-2025",
        creator_id: "creator_id",
        status: "Done",
        description: "Anmeldefehler"
    }];

    return (
        <>
            <div className="flex flex-col h-full bg-gray-900 text-gray-100 p-8 overflow-y-auto rounded-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <TicketIcon className="h-8 w-8 text-indigo-400"/>
                        <h1 className="text-2xl font-semibold">Tickets</h1>

                    </div>

                    <button className="
                        flex items-center gap-2
                        bg-green-600 hover:bg-green-700
                        text-white font-medium
                        px-4 py-2 rounded-md
                        shadow-sm hover:shadow-md
                        transition-all duration-200
                        cursor-pointer
                      ">
                        Neu
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    {tickets.map((entry, i) => (
                        <motion.div
                            key={entry._id}
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: i * 0.1}}
                            className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:bg-gray-700"
                            onClick={() => console.log(entry)}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-lg font-semibold text-white">
                                    {entry.title}
                                </h2>
                                <span className="text-sm text-gray-400">{entry.creator_name}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    )
}