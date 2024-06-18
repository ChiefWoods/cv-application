export default function Button({
  text,
  path = null,
  onClick,
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
          dangerouslySetInnerHTML={{ __html: path }}
        ></svg>
      )}
      <p className={textStyle}>{text}</p>
    </button>
  );
}
