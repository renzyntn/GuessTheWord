import type { AttemptsProp } from "../types/proptypes";

function Attempts({ color, backgroundColor, lostAttempts, name }: AttemptsProp) {
  return (
    <span
      className={`p-[4.5px] rounded-sm font-hanken font-medium ${color} ${backgroundColor} ${
        lostAttempts ? "opacity-20" : ""
      }`}
    >
      {name}
    </span>
  );
}
export default Attempts;
