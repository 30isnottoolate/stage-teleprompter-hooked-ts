import React, { useState } from 'react';
import useEventListener from '../utilities/useEventListener';
import colors from '../utilities/colors';
import Marker from './Marker';
import ControlButton from './ControlButton';

interface InfoPageProps {
    settings: {
        fontSize: number,
        lineHeight: number,
        colorIndex: number,
        textSpeed: number,
        holdButtonTime: number,
        orientation: string
    },
    setMode: Function
}

const InfoPage: React.FC<InfoPageProps> = ({ settings, setMode }: InfoPageProps) => {
    const [infoIndex, setInfoIndex] = useState(1);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "a") {
            handleButtonAHome();
        } else if (event.key === "b") {
            handleButtonBUp();
        } else if (event.key === "c") {
            handleButtonCDown();
        }
    }

    const handleButtonAHome = () => setMode("home");

    const handleButtonBUp = () => {
        if (infoIndex > 1) {
            setInfoIndex((prevState) => prevState - 1);
        } else {
            setInfoIndex(5);
        }
    }

    const handleButtonCDown = () => {
        if (infoIndex < 5) {
            setInfoIndex((prevState) => prevState + 1);
        } else {
            setInfoIndex(1);
        }
    }

    useEventListener("keydown", (event: KeyboardEvent) => handleKeyDown(event));

    let listPos = (3 - infoIndex) * settings.fontSize * settings.lineHeight;
    let stateColor = colors[settings.colorIndex].code;
    let responsiveWidth = (settings.orientation === "vertical") ? "100vh" : "100vw";

    return (
        <div
            id="text-list"
            className={settings.orientation === "vertical" ? "rotate-cw" : ""}
            style={{
                fontSize: settings.fontSize,
                color: stateColor,
                lineHeight: settings.lineHeight
            }}>
            <p
                className={"title " + (infoIndex <= 2 ? "visible" : "hidden")}>
                How to use?
            </p>
            <br/>
            <Marker
                top={2 * settings.fontSize * settings.lineHeight}
                left={settings.fontSize * 0.19}
                fontSize={settings.fontSize}
                lineHeight={settings.lineHeight}
                stateColor={stateColor}
            />
            <ul
                style={{
                    top: listPos,
                    left: settings.fontSize * 0.69,
                    width: responsiveWidth
                }}>
                <li>&#9651;&#9661; - Previous / Next</li>
                <li>&#9665;&#9655; - Change setting</li>
                <li>&#9655;&#9634; - Start / Stop</li>
                <li>&#9636; - Text List</li>
                <li>&#8984; - Settings</li>
            </ul>
            <div id="control" style={{ width: responsiveWidth }}>
                <ControlButton
                    fontSize={settings.fontSize}
                    stateColor={stateColor}
                    mouseDownHandler={handleButtonAHome}
                    icon="home"
                />
                <ControlButton
                    fontSize={settings.fontSize}
                    stateColor={stateColor}
                    mouseDownHandler={handleButtonBUp}
                    icon="up"
                />
                <ControlButton
                    fontSize={settings.fontSize}
                    stateColor={stateColor}
                    mouseDownHandler={handleButtonCDown}
                    icon="down"
                />
            </div>
        </div>
    );
}

export default InfoPage;
