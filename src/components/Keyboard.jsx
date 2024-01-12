import React, { useState } from "react";

const Key = ({ letter: key, onClick: onKeyClick }) => {
    const [disabled, setDisabled] = useState(false);

    const onClicked = () => {
        onKeyClick(key);
        setDisabled(true);
    };
    return (
        <button disabled={disabled} onClick={onClicked} className="key">
            {key}
        </button>
    );
};

const Keyboard = ({ onClick }) => {
    const keys = ["QWERTYUIOPÅ", "ASDFGHJKLÖÄ", "ZXCVBNM"];

    return (
        <div className="keyboard">
            {keys.map((row) => {
                return (
                    <div className="keys-row" key={row}>
                        {row.split("").map((key) => (
                            <Key key={key} letter={key} onClick={onClick} />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default Keyboard;
