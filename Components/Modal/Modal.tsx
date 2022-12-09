export default function Modal(props: any) {
  return (
    <div
      onMouseLeave={props.onMouseLeave}
      style={{
        zIndex: 99999
      }}
      className="absolute right-0 p-5 bg-white rounded-lg w-56 drop-shadow-xl top-10">
      {props.children}
    </div>
  );
}
