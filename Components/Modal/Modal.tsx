export default function Modal(props: any) {
  return (
    <div
      onMouseLeave={props.onMouseLeave}
      className={
        "bg-white drop-shadow-2xl rounded border p-5 absolute " +
        props.className
      }>
      {props.children}
    </div>
  );
}
