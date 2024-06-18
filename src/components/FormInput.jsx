export default function FormInput({ field, value, handleChange }) {
  return (
    <div className={`flex w-full flex-col gap-y-2 overflow-y-hidden`}>
      <label className="text-2xl font-medium" htmlFor={field}>
        {field}
      </label>
      <input
        className="form-control"
        id={field}
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
