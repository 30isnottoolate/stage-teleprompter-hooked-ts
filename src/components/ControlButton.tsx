import React from 'react';
import icons from '../utilities/icons';

interface ControlButtonProps {
    stateColor: string,
    clickHandler?: () => void,
    mouseDownHandler: () => void,
    mouseUpHandler?: () => void,
    icon: string
}

const ControlButton: React.FC<ControlButtonProps> = ({stateColor, clickHandler, mouseDownHandler, mouseUpHandler, icon}: ControlButtonProps) => {
    return (
        <button
            style={{ borderColor: stateColor }}
            onClick={clickHandler}
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
        >
            <svg
                width={(icon === "selectSettings" || icon === "selectList") ? 70 * 2.25 : 70}
                height={80}
                fill={stateColor}
                viewBox={`0 0 ${(icon === "selectSettings" || icon === "selectList") ? 36 : 16} 16`}
            >
                {icons[icon]}
            </svg>
        </button>
    )
}

export default ControlButton;
