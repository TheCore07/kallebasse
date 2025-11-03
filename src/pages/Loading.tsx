import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Loading() {
    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <ArrowPathIcon className="h-24 w-24 text-amber-400 mb-6 animate-spin" />
                <p className="text-xl text-gray-300 mb-6 text-center">
                    Loading ...
                </p>
            </main>
        </div>
    )
}