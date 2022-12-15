import React from 'react';
import icons from '../utilities/icons';

interface IconProps {
    icon: string,
    text: string,
    fontSize: number,
    lineHeight: number,
    stateColor: string
}

const Icon: React.FC<IconProps> = ({ icon, text, fontSize, lineHeight, stateColor }: IconProps) => {
    let padding = fontSize * (lineHeight - 1) / 2;

    return (
        <li>
            <svg
                height={fontSize}
                fill={stateColor}
                style={{
                    boxSizing: "content-box",
                    padding: `${padding}px 0`
                }}
                viewBox="0 0 16 16">
                {icons[icon]}
            </svg><span style={{ color: stateColor, margin: `${padding}px 0` }}> - {text}</span>
        </li>
    );
}

export default Icon;
