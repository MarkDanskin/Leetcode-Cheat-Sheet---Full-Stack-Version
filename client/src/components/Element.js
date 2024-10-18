import React, { useState } from 'react';
import Snippet from './Snippet';

const Element = ({ name, description, snippets }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

    const handleMouseEnter = (e) => {
        setIsHovered(true);
        const rect = e.currentTarget.getBoundingClientRect();
        setPopupPosition({ top: rect.bottom + window.scrollY, left: rect.left });
    };

    const handleMouseLeave = () => setIsHovered(false);

    const togglePopup = (e) => {
        e.stopPropagation();
        setIsPopupVisible((prev) => !prev);
    };

    return (
        <div className="element">
            <button className="element-button" onClick={togglePopup} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {name}
            </button>

            {(isHovered || isPopupVisible) && (
                <div className="element-popup" style={{ top: popupPosition.top, left: popupPosition.left }}>
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <Snippet snippets={snippets || []} /> {}
                </div>
            )}
        </div>
    );
};

export default Element;
