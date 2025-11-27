function Button({ newGameButton }) {
    return (
        <button className="w-60 h-10 rounded-sm text-base font-hanken font-semibold text-zinc-300 bg-sky-900 shadow-md/25 hover:cursor-pointer active:scale-90 transform duration-100 ease-in-out" onClick={newGameButton}>
            New Game
        </button>
    )
}

export default Button;