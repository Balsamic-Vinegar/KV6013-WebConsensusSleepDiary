export default function DateInput({ value, onChange }) {
    return (
        <input
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className=""
        />
    );
}