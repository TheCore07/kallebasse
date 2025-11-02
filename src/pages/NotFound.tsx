import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <ExclamationTriangleIcon className="h-24 w-24 text-amber-400 mb-6 animate-bounce" />
                <h1 className="text-6xl font-extrabold mb-4">404</h1>
                <p className="text-xl text-gray-300 mb-6 text-center">
                    Die Seite, die du suchst, wurde nicht gefunden.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
                >
                    Zurück zum Dashboard
                </Link>
            </main>
        </div>
    )
}