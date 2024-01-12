import React from "react";

const TopicLabel = ({ topic }) => {
    return (
        <div className="bg-slate-100 border border-slate-400 p-3 py-2 rounded-md border-dashed text-center text-slate-900">
            <p className="text-sm">Topic</p>
            <p className="text-lg font-bold uppercase">{topic}</p>
        </div>
    );
};

export default TopicLabel;
