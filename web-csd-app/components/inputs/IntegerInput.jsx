export default function IntegerInput({ value, onChange, min, max, suffix }) {
    return (
        <div className="flex-col justify-center items-center gap-1">
            <input
                type="number"
                step="1"
                value={value}
                min={min}
                max={max}
                onChange={(e) => onChange(e.target.value)}
                className="border px-3 py-2"
            />
            {suffix ? <span className="text-sm">{suffix}</span> : null}
        </div>
    )
}