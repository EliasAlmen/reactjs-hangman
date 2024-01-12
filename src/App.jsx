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
        topic: "animals",
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

    const checkGuess = (letter) => {
        if (state.word.includes(letter)) {
            //correct
        } else {
            dispatch({
                type: "MISTAKE",
            });
        }
    };

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
                                <button className="btn btn-error">
                                    Ge upp!
                                </button>
                                <button className="btn">
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
