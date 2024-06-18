import Button from "./Button";

export default function FormTab({ onDelete, onCancel }) {
  const colorVariants = {
    red: {
      bg: "bg-red-500",
      "bg-hover": "hover:bg-red-600",
    },
    green: {
      bg: "bg-green-500",
      "bg-hover": "hover:bg-green-600",
    },
    grey: {
      bg: "bg-gray-300",
      "bg-hover": "hover:bg-gray-400",
    },
  };

  const tabBtns = [
    {
      text: "Delete",
      onClick: onDelete,
      btnStyle: `btn ${colorVariants["red"]["bg"]} ${colorVariants["red"]["bg-hover"]}`,
      svgStyle: "size-6 fill-white",
      textStyle: "whitespace-nowrap text-xl font-bold text-white",
    },
    {
      text: "Cancel",
      onClick: onCancel,
      btnStyle: `btn ${colorVariants["grey"]["bg"]} ${colorVariants["grey"]["bg-hover"]} ml-auto`,
      svgStyle: "size-6 fill-white",
      textStyle: "whitespace-nowrap text-xl font-bold text-white",
    },
    {
      text: "Save",
      btnStyle: `btn ${colorVariants["green"]["bg"]} ${colorVariants["green"]["bg-hover"]}`,
      svgStyle: "size-6 fill-white",
      textStyle: "whitespace-nowrap text-xl font-bold text-white",
      type: "submit",
    },
  ];

  return (
    <div className="flex w-full gap-x-4">
      {tabBtns.map((btn) => (
        <Button key={btn.text} {...btn} />
      ))}
    </div>
  );
}
