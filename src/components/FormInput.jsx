export default function FormInput({
  field,
  value,
  controlName,
  onChange,
  required = false,
}) {
  return (
    <div className="flex w-full flex-col gap-y-2 overflow-y-hidden">
      <label className="text-2xl font-medium" htmlFor={field}>
        {field}
      </label>
      <input
        className="form-control"
        id={field}
        type="text"
        name={controlName}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
