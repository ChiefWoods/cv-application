import Button from "./Button";

export default function FormTab({ onDelete, onCancel, onSave }) {
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
      path: `<path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />`,
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
      onClick: onSave,
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
