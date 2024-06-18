export default function ViewSectionItem({ heading, onClick }) {
  return (
    <button
      className="min-h-[4rem] w-full rounded-md bg-gray-300 p-4 text-left text-2xl font-medium text-white transition-colors hover:bg-gray-400"
      onClick={onClick}
    >
      <h3>{heading}</h3>
    </button>
  );
}
