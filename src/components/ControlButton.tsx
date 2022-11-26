import React from 'react';
import icons from '../utilities/icons';

interface ControlButtonProps {
    fontSize: number,
    stateColor: string,
    clickHandler?: () => void,
    mouseDownHandler: () => void,
    mouseUpHandler?: () => void,
    icon: string
}

const ControlButton: React.FC<ControlButtonProps> = ({fontSize, stateColor, clickHandler, mouseDownHandler, mouseUpHandler, icon}: ControlButtonProps) => {
    let svgSize = 50 + fontSize * 0.25;
    return (
        <button
            style={{ borderColor: stateColor }}
            onClick={clickHandler}
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
        >
            <svg
                width={(icon === "selectSettings" || icon === "selectList") ? svgSize * 2.25 : svgSize}
                height={svgSize}
                fill={stateColor}
                viewBox={`0 0 ${(icon === "selectSettings" || icon === "selectList") ? 36 : 16} 16`}
            >
                {icons[icon]}
            </svg>
        </button>
    )
}

export default ControlButton;
