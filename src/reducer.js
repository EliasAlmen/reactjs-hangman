const reducer = (state, action) => {
    const { type, payload } = action;
    const newState = { ...state };
    switch (type) {
        case "START_GAME":
            newState.word = payload.word;
            newState.guessedLetters = new Array(payload.word.length).fill(null);
            newState.hints = Math.ceil(payload.word.length * 0.2);
            newState.mistakeCount = 0;
            newState.gamesState = null;
            return newState;
        case "MISTAKE":
            newState.mistakeCount += 1;
            if (newState.mistakeCount === 6) {
                newState.losses += 1;
                newState.gameState = "lost";
            }
            return newState;
        default:
            return state;
    }
};

export default reducer