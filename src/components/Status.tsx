import type { StatusProp } from "../types/proptypes";

function Status({ isGameWon }: StatusProp) {
  return (
    <div
      className={`max-w-full p-4.5 rounded-sm ${
        isGameWon ? "bg-green-500" : "bg-red-500"
      } font-hanken`}
    >
      <p className="text-lg font-medium text-zinc-100">
        {isGameWon ? "You Won! 🎉" : "Game Over! 😭"}
      </p>
    </div>
  );
}

export default Status;
