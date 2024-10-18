// Snippets.js
import React from 'react';

const Snippets = ({ snippets }) => {
    return (
        <div className="snippets">
            {snippets.map((snippet, index) => (
                <pre key={index} className="snippet">
                    {snippet.code}
                </pre>
            ))}
        </div>
    );
};

export default Snippets;
