import React from 'react';

import icons from '../utilities/icons';
import remValue from '../utilities/remValue';

interface ControlButtonProps {
    fontSize: number;
    stateColor: string;
    mouseDownHandler?: React.MouseEventHandler;
    mouseUpHandler?: React.MouseEventHandler;
    icon: string;
    disabled?: boolean;
}

const ControlButton: React.FC<ControlButtonProps> = ({ fontSize, stateColor, mouseDownHandler, mouseUpHandler, icon, disabled }: ControlButtonProps) => {
    let svgSize = 50 / remValue + fontSize * 0.25;
    return (
        <button
            style={{ opacity: (disabled ? (disabled ? 0.5 : 1) : 1), borderColor: stateColor }}
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
            disabled={disabled ? disabled : false}
        >
            <svg
                width={`${(icon === "selectHome") ? svgSize * 2.25 : svgSize}rem`}
                height={svgSize + "rem"}
                fill={stateColor}
                viewBox={`0 0 ${(icon === "selectHome") ? 36 : 16} 16`}
            >
                {icons[icon]}
            </svg>
        </button>
    )
}

export default ControlButton;
