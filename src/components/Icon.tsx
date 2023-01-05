import React from 'react';
import icons from '../utilities/icons';

interface IconProps {
    icon: string;
    text: string;
    fontSize: number;
    lineHeight: number;
    stateColor: string;
}

const Icon: React.FC<IconProps> = ({ icon, text, fontSize, lineHeight, stateColor }: IconProps) => {
    let padding = fontSize * (lineHeight - 1) / 2;

    return (
        <li className="item-icon" style={{ height: fontSize * lineHeight }}>
            <svg
                height={fontSize}
                fill={stateColor}
                style={{
                    boxSizing: "content-box",
                    padding: `${padding}px ${2 * padding}px`
                }}
                viewBox="0 0 16 16">
                {icons[icon]}
            </svg>
            <p> - {text}</p>
        </li>
    );
}

export default Icon;
