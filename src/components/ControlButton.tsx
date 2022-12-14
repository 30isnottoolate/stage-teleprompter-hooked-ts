import React from 'react';
import icons from '../utilities/icons';

interface ControlButtonProps {
    fontSize: number;
    stateColor: string;
    mouseDownHandler?: () => void; /////
    mouseUpHandler?: () => void; /////
    icon: string;
    disabled?: boolean;
}

const ControlButton: React.FC<ControlButtonProps> = ({ fontSize, stateColor, mouseDownHandler, mouseUpHandler, icon, disabled }: ControlButtonProps) => {
    let svgSize = 50 + fontSize * 0.25;
    return (
        <button
            style={{ opacity: (disabled ? (disabled ? 0.5 : 1) : 1), borderColor: stateColor }}
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
            disabled={disabled ? disabled : false}
        >
            <svg
                width={(icon === "selectHome") ? svgSize * 2.25 : svgSize}
                height={svgSize}
                fill={stateColor}
                viewBox={`0 0 ${(icon === "selectHome") ? 36 : 16} 16`}
            >
                {icons[icon]}
            </svg>
        </button>
    )
}

export default ControlButton;
