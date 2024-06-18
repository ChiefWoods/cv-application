export default function CVCore({ heading, children }) {
  if (!children.length) return null;

  return (
    <section className="*:cv-text-normal flex w-full flex-col py-4 *:font-serif">
      <h2 className="w-full border-b-2 border-solid border-black text-left font-bold">
        {heading}
      </h2>
      <div className="flex flex-col items-start gap-y-5 py-3">{children}</div>
    </section>
  );
}
