export default function CVSectionEntry({ entry }) {
  const { name, location, role, startEndDate, desc } = entry;

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between">
          <p className="font-bold">{name}</p>
          <p>{location}</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="font-bold italic">{role}</p>
          <p>{startEndDate}</p>
        </div>
        <p>{desc.replace(/(\r\n|\n|\r)/gm, "<br />")}</p>
      </div>
    </>
  );
}
