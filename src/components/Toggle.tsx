function Toggle({ enabled, onChange}: { enabled: boolean; onChange:() => void }) {
    return (
        <button
            type="button"
            onClick={onChange}
            className={`relative h-6 w-11 rounded-full transition cursor-pointer ${
                enabled ? "bg-blue-600" : "bg-gray-400"
            }`}
        >
            <span
                className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition ${
                    enabled ? "translate-x-5": "translate-x-0"
                }`}
            />
        </button>
    )
}

export default Toggle;