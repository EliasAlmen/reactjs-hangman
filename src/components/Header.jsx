import React from "react";

const items = ["djur", "länder", "frukter"];

const Header = () => {
    return (
        <header className="bg-slate-700 p-10 py-4 flex justify-between items-center text-white">
            <div>
                <h1 className="text-xl font-bold">Hänga gubbe</h1>
            </div>
            <nav>
                <ul className="flex gap-10">
                    {items.map((item) => {
                        return (
                            <li key={item}>
                                <button className="uppercase p-4 py-1 bg-white text-slate-700 rounded-md font-bold block hover:bg-slate-300 hover:scale-110 transition-all">
                                    {item}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
