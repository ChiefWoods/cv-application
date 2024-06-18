export default function FormTextarea({ field, value, controlName, onChange }) {
  return (
    <div className="flex w-full flex-col gap-y-2">
      <label className="text-2xl font-medium" htmlFor={field}>
        {field}
      </label>
      <textarea
        className="form-control h-[100px] resize-none"
        id={field}
        name={controlName}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
