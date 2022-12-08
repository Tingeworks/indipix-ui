export default function Modal(props: any) {
  return (
    <div
      onMouseLeave={props.onMouseLeave}
      style={{
        zIndex: 99999
      }}
      className={
        "bg-white drop-shadow-2xl rounded border p-5 absolute top-0" +
        props.className
      }>
      {props.children}
    </div>
  );
}
