export default function CVSkill({ skill }) {
  const [field, values] = Object.entries(skill)[0];

  return (
    <>
      <p key={field}>
        <span className="font-bold">{field}: </span>
        {values.join(", ")}
      </p>
    </>
  );
}
