import React from 'react';
import icons from '../utilities/icons';

interface ImageProps {
    icon: string,
    fontSize: number,
    lineHeight: number,
    stateColor: string
}

const Image: React.FC<ImageProps> = ({ icon, fontSize, lineHeight, stateColor }: ImageProps) => {
    let padding = fontSize * (lineHeight - 1) / 2;

    return (
        <svg
            className="status-image"
            height={2 * fontSize}
            fill={stateColor}
            style={{
                padding: `${4 * padding}px 0`
            }}
            viewBox="0 0 16 16">
            {icons[icon]}
        </svg>
    );
}

export default Image;
