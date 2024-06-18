export default function Button({
  text,
  path = null,
  onClick = null,
  btnStyle,
  svgStyle,
  textStyle,
  type = "text",
}) {
  return (
    <button key={text} type={type} className={btnStyle} onClick={onClick}>
      {path && (
        <svg
          className={svgStyle}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          {path}
        </svg>
      )}
      <p className={textStyle}>{text}</p>
    </button>
  );
}
