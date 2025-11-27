import clsx from "clsx";

function WordField({ isGameLost, guessedArray, revealWord }) {
    return (
        <span className={clsx("w-10 h-10 flex justify-center items-center text-2xl font-bold bg-gray-900 border-b-2 border-b-zinc-200 rounded-sm", isGameLost && guessedArray ? "text-red-500" : "text-zinc-300")}>
            {revealWord}
        </span>
    )
}

export default WordField;