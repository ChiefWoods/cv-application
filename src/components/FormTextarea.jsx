export default function FormTextarea({ field, value, handleChange }) {
  return (
    <div className="flex w-full flex-col gap-y-2">
      <label className="text-2xl font-medium" htmlFor={field}>
        {field}
      </label>
      <FormTextarea
        className="form-control h-[100px] resize-none"
        id={field}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
