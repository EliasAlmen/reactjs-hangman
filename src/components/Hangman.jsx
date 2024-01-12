export const Part = ({ part, show }) => {
    return (
        <img
            style={{ opacity: show ? 1 : 0 }}
            className="object-contain"
            src={`/delar/${part}.png`}
        />
    );
};

export const Hangman = ({ mistakeCount }) => {
    return (
        <div className="w-full max-w-[500] h-full">
            <Part part="ansikte-01" show={mistakeCount >= 1} />
            <Part part="kropp" show={mistakeCount >= 2} />
            <Part part="armar" show={mistakeCount >= 3} />
            <Part part="ben" show={mistakeCount >= 4} />
            <Part part="rep" show={mistakeCount >= 5} />
            <Part part="ansikte-02" show={mistakeCount >= 6} />
            <Part part="plattform" show={mistakeCount >= 7} />
        </div>
    );
};
