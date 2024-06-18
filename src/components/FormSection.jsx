export default function FormSection({
  heading,
  path,
  open,
  setOpen,
  children,
}) {
  return (
    <section className="flex flex-col rounded-lg bg-white">
      <button
        className="z-[1] flex items-center gap-3 rounded-lg bg-white p-6"
        onClick={setOpen}
      >
        <svg
          className="size-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          {path}
        </svg>
        <h2 className="text-3xl font-semibold">{heading}</h2>
        <svg
          className={`ml-auto size-10 ${open ? "rotate-180" : ""} transition-all`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
        </svg>
      </button>
      <fieldset
        className={`flex flex-col items-center gap-y-4 overflow-y-hidden px-6 pb-6 transition-all ${open ? "" : "hidden"}`}
      >
        {children}
      </fieldset>
    </section>
  );
}
