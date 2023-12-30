import React, { useState } from 'react';

const ToggleButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div>
            <button onClick={() => setIsVisible(!isVisible)}>
                Toggle Text
            </button>
            {isVisible && <p id="toggle-text">You can see me now!</p>}
        </div>
    );
};

export default ToggleButton;
