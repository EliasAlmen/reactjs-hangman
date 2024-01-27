import { useEffect, useReducer, useState } from "react";
import AlertBox from "./components/AlertBox";
import { Footer } from "./components/Footer";
import { Hangman } from "./components/Hangman";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import Letter from "./components/Letter";
import TopicLabel from "./components/TopicLabel";
import data from "./data.json";
import reducer from "./reducer";

const wordGenerator = (topic) => {
    const words = data[topic];
    const index = Math.floor(Math.random() * words.length);
    return words[index].toUpperCase();
};

function App() {
    const [state, dispatch] = useReducer(reducer, {
        wins: 0,
        losses: 0,
        word: null,
        guessedLetters: [],
        topic: "djur",
        hints: 0,
        mistakeCount: 0,
        gameState: null,
    });

    const startGame = () => {
        dispatch({
            type: "START_GAME",
            payload: { word: wordGenerator(state.topic) },
        });
    };

    useEffect(() => {
        startGame();
    }, []);

    const checkGuess = (letter, hintUsed) => {
        if (state.word.includes(letter)) {
            const positions = [...state.word.matchAll(letter)];
            const letters = [...state.guessedLetters];
            positions.forEach((position) => {
                letters[position.index] = letter;
            });
            dispatch({
                type: "UPDATE_LETTERS",
                payload: {
                    letters,
                    hintUsed,
                },
            });
        } else {
            dispatch({
                type: "MISTAKE",
            });
        }
    };

    const giveUp = () => {
        dispatch({
            type: "GIVE_UP",
        });
    };

    const useHint = () => {
        const allLetters = [...new Set(state.word)];
        const revealedLetters = state.guessedLetters.filter((x) => x);
        const hintLetters = allLetters.filter(
            (letter) => !revealedLetters.includes(letter)
        );
        const hintLetter =
            hintLetters[Math.floor(Math.random() * hintLetters.length)];

        checkGuess(hintLetter, true);
    };

    console.log(state.word);
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-1 flex">
                <div className="flex-[2] bg-slate-200 flex items-center flex-col gap-8 p-10">
                    <TopicLabel topic={state.topic} />
                    <Letter letters={state.guessedLetters} />
                    {state.gameState === null ? (
                        <>
                            <Keyboard onClick={checkGuess} />
                            <div className="btn-group">
                                <button
                                    onClick={giveUp}
                                    className="btn btn-error"
                                >
                                    Ge upp!
                                </button>
                                <button
                                    disabled={state.hints === 0}
                                    onClick={useHint}
                                    className="btn disabled:opacity-30"
                                >
                                    Ledtråd
                                    <span className="btn-label">
                                        {state.hints}
                                    </span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <AlertBox
                            gameState={state.gameState}
                            wins={state.wins}
                            losses={state.losses}
                            onRestart={startGame}
                        />
                    )}
                </div>
                <div className="flex-[1] flex justify-center items-center">
                    <Hangman mistakeCount={state.mistakeCount} />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default App;
