import React, { useState } from 'react';
import useEventListener from '../utilities/useEventListener';
import Marker from './Marker';
import ControlButton from './ControlButton';

interface TextListProps {
	mode: (mode: string) => void,
	data: { texts: { text_: { title: string } } },
	textCount: number,
	textIndex: number,
	setTextIndex: Function,
	colors: {},
	settings: {
		fontSize: number,
		lineHeight: number,
		colorIndex: number,
		textSpeed: number,
		holdButtonTime: number,
		orientation: string
	}
}

const TextList: React.FC<TextListProps> = ({ mode, data, textCount, textIndex, setTextIndex, colors, settings }: TextListProps) => {
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
				mode("set");
			} else {
				mode("read");
			}
		}
	}

	const handleButtonBUp = () => {
		if (textIndex > 1) {
			setTextIndex((prevValue: number) => prevValue - 1);
		} else {
			setTextIndex(textCount);
		}
	}

	const handleButtonCDown = () => {
		if (textIndex < textCount) {
			setTextIndex((prevValue: number) => prevValue + 1);
		} else {
			setTextIndex(1);
		}
	}

	useEventListener("keydown", (event: KeyboardEvent) => handleKeyDown(event));
	useEventListener("keyup", (event: KeyboardEvent) => handleKeyUp(event));

	let titles = [""];
	let listPos = (2 - textIndex) * settings.fontSize * settings.lineHeight;
	let stateColor = colors[settings.colorIndex].code;
	let respWidth = (settings.orientation === "vertical") ? "100vh" : "100vw";

	if (textCount === 0) {
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
		for (const item in data.texts) {
			titles.push(data.texts[item as keyof typeof data.texts].title);
		}

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
						width: `calc(${respWidth} - ${(settings.fontSize * 0.69)}px)`
					}}
				>
					{titles.map((item, index) => <li key={index}>{item}</li>)}
				</ul>
				<Marker
					top={settings.fontSize * settings.lineHeight}
					left={settings.fontSize * 0.19}
					fontSize={settings.fontSize}
					lineHeight={settings.lineHeight}
					stateColor={stateColor}
				/>
				<div id="control" style={{ width: respWidth }}>
					<ControlButton
						stateColor={stateColor}
						mouseDownHandler={handleButtonAPushDown}
						mouseUpHandler={handleButtonAPushUp}
						icon="selectSettings"
					/>
					<ControlButton
						stateColor={stateColor}
						mouseDownHandler={handleButtonBUp}
						icon="up"
					/>
					<ControlButton
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
