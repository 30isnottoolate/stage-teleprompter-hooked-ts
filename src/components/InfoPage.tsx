import React, { useState } from 'react';
import useEventListener from '../utilities/useEventListener';
import colors from '../utilities/colors';
import Marker from './Marker';
import ControlButton from './ControlButton';
import Icon from './Icon';

interface InfoPageProps {
    settings: {
        fontSize: number,
        lineHeight: number,
        colorIndex: number,
        textSpeed: number,
        holdButtonTime: number,
        orientation: string
    };
    setMode: Function;
}

const InfoPage: React.FC<InfoPageProps> = ({ settings, setMode }: InfoPageProps) => {
    const [infoIndex, setInfoIndex] = useState(1);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key.toLowerCase() === "b" && !event.repeat) {
            handleButtonBUp();
        } else if (event.key.toLowerCase() === "c" && !event.repeat) {
            handleButtonCDown();
        }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
        if (event.key.toLowerCase() === "a") {
            handleButtonAHome();
        }
    }

    const handleButtonAHome = () => setMode("home");

    const handleButtonBUp = () => {
        if (infoIndex > 1) {
            setInfoIndex((prevState) => prevState - 1);
        } else {
            setInfoIndex(13);
        }
    }

    const handleButtonCDown = () => {
        if (infoIndex < 13) {
            setInfoIndex((prevState) => prevState + 1);
        } else {
            setInfoIndex(1);
        }
    }

    useEventListener("keydown", (event: KeyboardEvent) => handleKeyDown(event));
    useEventListener("keyup", (event: KeyboardEvent) => handleKeyUp(event));

    let listPos = (2.75 - infoIndex) * settings.fontSize * settings.lineHeight;
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
                className={"title " + (infoIndex <= 1 ? "visible" : "hidden")}
                style={{ paddingTop: 0.25 * settings.fontSize * settings.lineHeight }} >
                How to use?
            </p>
            <Marker
                top={1.75 * settings.fontSize * settings.lineHeight}
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
                <Icon
                    icon="up"
                    fontSize={settings.fontSize}
                    lineHeight={settings.lineHeight}
                    stateColor={stateColor}
                    text="up"
                />
                <Icon
                    icon="down"
                    fontSize={settings.fontSize}
                    lineHeight={settings.lineHeight}
                    stateColor={stateColor}
                    text="down"
                />
                <Icon
                    icon="right"
                    fontSize={settings.fontSize}
                    lineHeight={settings.lineHeight}
                    stateColor={stateColor}
                    text="increase"
                />
                <Icon
                    icon="left"
                    fontSize={settings.fontSize}
                    lineHeight={settings.lineHeight}
                    stateColor={stateColor}
                    text="decrease"
                />
                <Icon
                    icon="play"
                    fontSize={settings.fontSize}
                    lineHeight={settings.lineHeight}
                    stateColor={stateColor}
                    text="play"
                />
                <Icon
                    icon="pause"
                    fontSize={settings.fontSize}
                    lineHeight={settings.lineHeight}
                    stateColor={stateColor}
                    text="pause"
                />
                <Icon
                    icon="next"
                    fontSize={settings.fontSize}
                    lineHeight={settings.lineHeight}
                    stateColor={stateColor}
                    text="next"
                />
                <Icon
                    icon="home"
                    fontSize={settings.fontSize}
                    lineHeight={settings.lineHeight}
                    stateColor={stateColor}
                    text="home"
                />
                <Icon
                    icon="list"
                    fontSize={settings.fontSize}
                    lineHeight={settings.lineHeight}
                    stateColor={stateColor}
                    text="library"
                />
                <Icon
                    icon="settings"
                    fontSize={settings.fontSize}
                    lineHeight={settings.lineHeight}
                    stateColor={stateColor}
                    text="settings"
                />
                <Icon
                    icon="select"
                    fontSize={settings.fontSize}
                    lineHeight={settings.lineHeight}
                    stateColor={stateColor}
                    text="select"
                />
                <Icon
                    icon="refresh"
                    fontSize={settings.fontSize}
                    lineHeight={settings.lineHeight}
                    stateColor={stateColor}
                    text="refresh"
                />
                <Icon
                    icon="info"
                    fontSize={settings.fontSize}
                    lineHeight={settings.lineHeight}
                    stateColor={stateColor}
                    text="info"
                />
            </ul>
            <div id="control" style={{ width: responsiveWidth }}>
                <ControlButton
                    fontSize={settings.fontSize}
                    stateColor={stateColor}
                    mouseUpHandler={handleButtonAHome}
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
