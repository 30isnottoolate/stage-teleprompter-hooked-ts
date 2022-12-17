import React, { useState } from 'react';
import useEventListener from '../utilities/useEventListener';
import colors from '../utilities/colors';
import Marker from './Marker';
import ControlButton from './ControlButton';

interface TextListProps {
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
	},
	setMode: Function
}

const TextList: React.FC<TextListProps> = ({ settings, library, textIndex, setTextIndex, setMode }: TextListProps) => {
	const [keyHold, setKeyHold] = useState(false);
	const [keyDownTime, setKeyDownTime] = useState(0);

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key.toLowerCase() === "a") {
			handleButtonAKeyDown();
		} else if (event.key.toLowerCase() === "b" && !event.repeat) {
			handleButtonBUp();
		} else if (event.key.toLowerCase() === "c" && !event.repeat) {
			handleButtonCDown();
		}
	}

	const handleKeyUp = (event: KeyboardEvent) => {
		if (event.key.toLowerCase() === "a") {
			handleButtonAKeyUp();
		}
	}

	const handleButtonAKeyDown = () => {
		if (!keyHold) {
			setKeyHold(true);
			setKeyDownTime((new Date()).getTime());
		}
	}

	const handleButtonAKeyUp = () => {
		if (keyHold) {
			if (((new Date()).getTime() - keyDownTime) > settings.holdButtonTime) {
				setMode("home");
			} else {
				setMode("read");
			}
		}
	}

	const handleButtonBUp = () => {
		if (textIndex > 0) {
			setTextIndex((prevState: number) => prevState - 1);
		} else {
			setTextIndex(library.texts.length - 1);
		}
	}

	const handleButtonCDown = () => {
		if (textIndex < library.texts.length - 1) {
			setTextIndex((prevState: number) => prevState + 1);
		} else {
			setTextIndex(0);
		}
	}

	useEventListener("keydown", (event: KeyboardEvent) => handleKeyDown(event));
	useEventListener("keyup", (event: KeyboardEvent) => handleKeyUp(event));

	let listPos = (1.75 - textIndex) * settings.fontSize * settings.lineHeight;
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
				className={"title " + (textIndex === 0 ? "visible" : "hidden")}
				style={{ paddingTop: 0.25 * settings.fontSize * settings.lineHeight }} >
				LIBRARY:
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
				top={1.75 * settings.fontSize * settings.lineHeight}
				left={settings.fontSize * 0.19}
				fontSize={settings.fontSize}
				lineHeight={settings.lineHeight}
				stateColor={stateColor}
			/>
			<div id="control" style={{ width: responsiveWidth }}>
				<ControlButton
					fontSize={settings.fontSize}
					stateColor={stateColor}
					mouseDownHandler={handleButtonAKeyDown}
					mouseUpHandler={handleButtonAKeyUp}
					icon="selectHome"
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

export default TextList;
