import React, { useState } from 'react';
import useEventListener from '../utilities/useEventListener';
import colors from '../utilities/colors';
import Marker from './Marker';
import ControlButton from './ControlButton';

interface TextListProps {
	setMode: Function,
	library: { texts: [{ title: string, content: string }] },
	textIndex: number,
	setTextIndex: Function,
	settings: {
		fontSize: number,
		lineHeight: number,
		colorIndex: number,
		textSpeed: number,
		holdButtonTime: number,
		orientation: string
	}
}

const TextList: React.FC<TextListProps> = ({ settings, library, textIndex, setTextIndex, setMode }: TextListProps) => {
	const [keyHold, setKeyHold] = useState(false);
	const [keyDownTime, setKeyDownTime] = useState(0);

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === "a") {
			handleButtonAPushDown();
		} else if (event.key === "b" && !event.repeat) {
			handleButtonBUp();
		} else if (event.key === "c" && !event.repeat) {
			handleButtonCDown();
		}
	}

	const handleKeyUp = (event: KeyboardEvent) => {
		if (event.key === "a") {
			handleButtonAPushUp();
		}
	}

	const handleButtonAPushDown = () => {
		if (!keyHold) {
			setKeyHold(true);
			setKeyDownTime((new Date()).getTime());
		}
	}

	const handleButtonAPushUp = () => {
		if (keyHold) {
			if (((new Date()).getTime() - keyDownTime) > settings.holdButtonTime) {
				setMode("set");
			} else {
				setMode("read");
			}
		}
	}

	const handleButtonBUp = () => {
		if (textIndex > 1) {
			setTextIndex((prevState: number) => prevState - 1);
		} else {
			setTextIndex(library.texts.length);
		}
	}

	const handleButtonCDown = () => {
		if (textIndex < library.texts.length) {
			setTextIndex((prevState: number) => prevState + 1);
		} else {
			setTextIndex(1);
		}
	}

	useEventListener("keydown", (event: KeyboardEvent) => handleKeyDown(event));
	useEventListener("keyup", (event: KeyboardEvent) => handleKeyUp(event));

	let listPos = (2 - textIndex) * settings.fontSize * settings.lineHeight;
	let stateColor = colors[settings.colorIndex].code;
	let responsiveWidth = (settings.orientation === "vertical") ? "100vh" : "100vw";

	if (library.texts.length < 1) {
		return (
			<div
				id="text-list"
				style={{
					fontSize: settings.fontSize,
					color: stateColor
				}}>
				<p id="head-line">Loading text list...</p>
			</div>
		)
	} else {
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
					id="head-line"
					className={textIndex === 1 ? "visible" : "hidden"}>
					SELECT:
				</p>
				<ul
					style={{
						top: listPos,
						left: (settings.fontSize * 0.69),
						width: `calc(${responsiveWidth} - ${(settings.fontSize * 0.69)}px)`
					}}
				>
					{library.texts.map((item, index) => <li key={index}>{item.title}</li>)}
				</ul>
				<Marker
					top={settings.fontSize * settings.lineHeight}
					left={settings.fontSize * 0.19}
					fontSize={settings.fontSize}
					lineHeight={settings.lineHeight}
					stateColor={stateColor}
				/>
				<div id="control" style={{ width: responsiveWidth }}>
					<ControlButton
						fontSize={settings.fontSize}
						stateColor={stateColor}
						mouseDownHandler={handleButtonAPushDown}
						mouseUpHandler={handleButtonAPushUp}
						icon="selectSettings"
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
		)
	}
}

export default TextList;
