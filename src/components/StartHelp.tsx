import React, { useState, useEffect } from 'react';
import '../Teleprompter.css';
import Marker from './Marker';
import ControlButton from './ControlButton';

interface StartHelpProps {
	colors: {},
	settings: {
		fontSize: number,
		lineHeight: number,
		colorIndex: number,
		textSpeed: number,
		holdButtonTime: number,
		orientation: string
	},
	mode: (mode: string) => void,
}

const StartHelp: React.FC<StartHelpProps> = ({ colors, settings, mode }: StartHelpProps) => {
	const [helpIndex, setHelpIndex] = useState(1);
	const [keyHold, setKeyHold] = useState(false);
	const [keyDownTime, setKeyDownTime] = useState(0);

	useEffect(() => {
		document.addEventListener("keydown", (event) => handleKeyDown(event));
		document.addEventListener("keyup", (event) => handleKeyUp(event));

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
		}
	}, [])

	const handleKeyDown = (event: KeyboardEvent) => {
		if (!keyHold) {
			if (event.key === "a" || event.key === "b") {
				setKeyHold(true);
				setKeyDownTime((new Date()).getTime());
			} else if (event.key === "c" && !event.repeat) {
				if (helpIndex < 5) {
					setHelpIndex((prevValue) => prevValue + 1);
				} else {
					setHelpIndex(1);
				}
			}
		}
	}

	const handleKeyUp = (event: KeyboardEvent) => {
		if (keyHold) {
			if (event.key === "a") {
				if (((new Date()).getTime() - keyDownTime) > settings.holdButtonTime) {
					handleButtonASet();
				} else {
					setKeyHold(false);
					setKeyDownTime(0);
				}
			} else if (event.key === "b") {
				if (((new Date()).getTime() - keyDownTime) > settings.holdButtonTime) {
					handleButtonBList();
				} else {
					setKeyHold(false);
					setKeyDownTime(0);
				}
			}
		}
	}

	const handleButtonASet = () => mode("set");

	const handleButtonBList = () => mode("select");

	const handleButtonCDown = () => {
		if (helpIndex < 5) {
			setHelpIndex((prevValue) => prevValue + 1);
		} else {
			setHelpIndex(1);
		}
	}

	let listPos = (3 - helpIndex) * settings.fontSize * settings.lineHeight;
	let stateColor = colors[settings.colorIndex].code;
	let respWidth: string;

	if (settings.orientation === "vertical") {
		respWidth = "100vh";
	} else respWidth = "100vw";

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
				className={helpIndex <= 2 ? "visible" : "hidden"}>
				KV Teleprompter
			</p>
			<p
				id="sub-line"
				className={helpIndex === 1 ? "visible" : "hidden"}
				style={{
					position: "absolute",
					left: (settings.fontSize * 0.69)
				}}>
				Control symbols:
			</p>
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
					width: respWidth
				}}>
				<li>&#9651;&#9661; - Previous / Next</li>
				<li>&#9665;&#9655; - Change setting</li>
				<li>&#9655;&#9634; - Start / Stop</li>
				<li>&#9636; - Text List</li>
				<li>&#8984; - Settings</li>
			</ul>
			<div id="control" style={{ width: respWidth }}>
				<ControlButton
					stateColor={stateColor}
					mouseDownHandler={handleButtonASet}
					icon="settings"
				/>
				<ControlButton
					stateColor={stateColor}
					mouseDownHandler={handleButtonBList}
					icon="list"
				/>
				<ControlButton
					stateColor={stateColor}
					mouseDownHandler={handleButtonCDown}
					icon="down"
				/>
			</div>
		</div>
	);
}

export default StartHelp;
