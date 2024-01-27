import React from "react";

const AlertBox = ({ gameState, wins, losses, onRestart }) => {
    const gameStates = {
        won: "Du vann!",
        lost: "Du förlorade!",
        gaveup: "Du gav up...",
    };

    return (
        <div
            className={
                "alert-box " +
                (gameState === "won" ? "alert-success" : "alert-error")
            }
        >
            <h6>{gameStates[gameState]}</h6>
            <p>
                Du har spelat {wins + losses} ggr.
                <br />
                Du har vunnit {wins} ggr.
                <br />
                Du har förlorat {losses} ggr.
                <br />
            </p>
            <button onClick={onRestart} className="btn btn-white">
                Nytt spel
            </button>
        </div>
    );
};

export default AlertBox;
