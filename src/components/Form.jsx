import FormTab from "./FormTab";

export default function Form({ onSubmit, onDelete, onCancel, children }) {
  return (
    <form className="flex w-full flex-col gap-y-4" onSubmit={onSubmit}>
      {children}
      <FormTab onDelete={onDelete} onCancel={onCancel} />
    </form>
  );
}
