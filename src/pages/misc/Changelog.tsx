import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { AppConf } from "../../AppConf.ts";

export default function Changelog() {
    const changelog = AppConf.Changelog;

    return (
        <>
            <div className="flex flex-col h-full bg-gray-900 text-gray-100 p-8 overflow-y-auto rounded-2xl">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <DocumentTextIcon className="h-8 w-8 text-indigo-400"/>
                    <h1 className="text-2xl font-semibold">Changelog</h1>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    {changelog.map((entry, i) => (
                        <motion.div
                            key={entry.version}
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: i * 0.1}}
                            className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-lg font-semibold text-white">
                                    Version {entry.version}
                                </h2>
                                <span className="text-sm text-gray-400">{entry.date}</span>
                            </div>
                            <ul className="list-disc list-inside space-y-1 text-gray-300">
                                {entry.changes.map((change, index) => (
                                    <li key={index}>{change}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    )
}