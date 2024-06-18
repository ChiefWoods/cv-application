import Button from "./Button";

export default function ActionTab({ clearFields, downloadCV }) {
  const colorVariants = {
    red: {
      bg: "bg-red-500",
      "bg-hover": "hover:bg-red-600",
    },
    yellow: {
      bg: "bg-yellow-500",
      "bg-hover": "hover:bg-yellow-600",
    },
  };

  const actionBtns = [
    {
      text: "Clear Fields",
      Path: () => (
        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
      ),
      onClick: clearFields,
      btnStyle: `btn ${colorVariants["red"]["bg"]} ${colorVariants["red"]["bg-hover"]}`,
      svgStyle: "size-8 fill-white",
      textStyle: "whitespace-nowrap text-xl font-bold text-white",
    },
    {
      text: "Download",
      Path: () => (
        <path d="M14,2L20,8V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2H14M18,20V9H13V4H6V20H18M12,19L8,15H10.5V12H13.5V15H16L12,19Z" />
      ),
      onClick: downloadCV,
      btnStyle: `btn ${colorVariants["yellow"]["bg"]} ${colorVariants["yellow"]["bg-hover"]}`,
      svgStyle: "size-8 fill-white",
      textStyle: "whitespace-nowrap text-xl font-bold text-white",
    },
  ];

  return (
    <div className="flex w-full justify-between">
      {actionBtns.map((btn) => (
        <Button key={btn.text} path={<btn.Path />} {...btn} />
      ))}
    </div>
  );
}
