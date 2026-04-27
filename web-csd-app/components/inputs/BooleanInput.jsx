export default function BooleanInput({ value, onChange }) {
    return (
        <div className="flex justify-center gap-3">

            <button
                type="button"
                onClick={() => onChange(true)}
                className={`px-4 py-2 border
                 ${value === true ? "bg-black text-white" : "bg-white"}`}>
                Yes
            </button>

            <button
                type="button"
                onClick={() => onChange(false)}
                className={`px-4 py-2 border
                ${value === false ? "bg-black text-white" : "bg-white"}`}>
                No
            </button>

        </div>
    )
}