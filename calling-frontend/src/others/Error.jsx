export default function Error({ loadingError }) {
  return (
    <div className="h-screen p-16 flex justify-center items-center font-extrabold">
      {loadingError}{" "}
    </div>
  );
}
