const reducer = (state, action) => {
    const { type, payload } = action;
    const newState = { ...state };
    switch (type) {
        case "START_GAME":
            newState.word = payload.word;
            newState.guessedLetters = new Array(payload.word.length).fill(null);
            newState.hints = Math.ceil(payload.word.length * 0.3);
            newState.mistakeCount = 0;
            newState.gameState = null;
            return newState;
        case "MISTAKE":
            newState.mistakeCount += 1;
            if (newState.mistakeCount === 6) {
                newState.losses += 1;
                newState.gameState = "lost";
                newState.guessedLetters = newState.word.split("")
            }
            return newState;
        case "UPDATE_LETTERS":
            newState.guessedLetters = payload.letters;
            if (payload.hintUsed) {
                newState.hints -= 1;
            }
            const fullLenght = newState.guessedLetters.length;
            const revealedLenght = newState.guessedLetters.filter((x) => x).length;
            if (fullLenght === revealedLenght) {
                newState.wins += 1;
                newState.gameState = "won";
            }
            return newState;
        case "GIVE_UP":
            newState.losses += 1;
            newState.gameState = "gaveup";
            newState.guessedLetters = newState.word.split("")
            return newState;
        default:
            return state;
    }
};

export default reducer