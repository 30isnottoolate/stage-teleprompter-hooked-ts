import React, { useState, useRef } from 'react';
import useEventListener from '../utilities/useEventListener';
import Marker from './Marker';
import ControlButton from './ControlButton';

const READ_SPEED_COEF = 0.0151; // char/ms

interface TextSliderProps {
	mode: Function,
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

const TextSlider: React.FC<TextSliderProps> = ({ mode, data, textCount, textIndex, setTextIndex, colors, settings }: TextSliderProps) => {
	const [active, setActive] = useState(false);
	const [timer, setTimer] = useState(() => { });
	const [position, setPosition] = useState(0);
	const [currentText, setCurrentText] = useState("Loading...");
	const [endReached, setEndReached] = useState(false);
	const [keyHold, setKeyHold] = useState(false);
	const [keyDownTime, setKeyDownTime] = useState(0);

	const slideRef = useRef<HTMLDivElement>(null);

	const countEmptyLines = (input: string) => {
		return (input.match(/^[ ]*$/gm) || []).length;
	}

	const fetchText = (index: number) => {
		fetch(data.texts["text_" + index].url, {
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
			.then(response => response.text())
			.then(text => {
				setPosition(settings.fontSize * settings.lineHeight);
				setCurrentText(text);
				setEndReached(false);
				setKeyHold(false);
				setKeyDownTime(0);
			})
			.catch(() => console.log("Text missing."));
	}

	const nextText = () => {
		if (textIndex < textCount) {
			setTextIndex((prevState: number) => {
				fetchText(prevState + 1);
				return prevState + 1;
			});
		} else {
			fetchText(1);
			setTextIndex(1);
		}
	}

	const moveSlide = () => {
		if (active && slideRef.current) {
			if (slideRef.current.offsetHeight > (position * (-1) +
				(settings.fontSize * settings.lineHeight * 2)) &&
				(position) <= (settings.fontSize * settings.lineHeight)) {
				setPosition((prevState) => prevState - 1);
			} else {
				setActive(false);
				setPosition((prevState) => prevState + 1);
				setEndReached(true);
			}
		}
	}

	const handleKeyDown = (event: KeyboardEvent) => {
		if (!keyHold) {
			if (event.key === "a" || event.key === "b" || event.key === "c") {
				setKeyHold(true);
				setKeyDownTime((new Date()).getTime());
			}
		}
	}

	const handleKeyUp = (event: KeyboardEvent) => {
		let holdButtonCondition = ((new Date()).getTime() - keyDownTime) > settings.holdButtonTime;

		if (keyHold) {
			if (event.key === "a") {
				if (holdButtonCondition) {
					handleButtonASet();
				} else {
					setKeyHold(false);
					setKeyDownTime(0);
				}
			} else if (event.key === "b") {
				if (holdButtonCondition) {
					handleButtonBList();
				}
				else {
					setKeyHold(false);
					setKeyDownTime(0);
				}
			} else if (event.key === "c") {
				if (endReached) {
					if (holdButtonCondition) {
						nextText();
					} else {
						setKeyHold(false);
						setKeyDownTime(0);
					}
				} else {
					setActive((prevState) => !prevState);
					setKeyHold(false);
					setKeyDownTime(0);
				}
			}
		}
	}

	const handleButtonASet = () => mode("set");

	const handleButtonBList = () => mode("select");

	const handleButtonCStartStop = () => {
		if (endReached) {
			nextText();
		} else {
			setActive((prevState) => !prevState);
		}
	}

	useEventListener("keydown", (event: KeyboardEvent) => handleKeyDown(event));
	useEventListener("keyup", (event: KeyboardEvent) => handleKeyUp(event));

	let stateColor = colors[settings.colorIndex].code;
	let responsiveWidth = settings.orientation === "vertical" ? "100vh" : "100vw";

	return (
		<div
			id="text-slide"
			className={settings.orientation === "vertical" ? "rotate-cw" : ""}
			style={{
				fontSize: settings.fontSize,
				color: stateColor,
				lineHeight: settings.lineHeight
			}}>
			<Marker
				top={settings.fontSize * settings.lineHeight}
				left={settings.fontSize * 0.19}
				fontSize={settings.fontSize}
				lineHeight={settings.lineHeight}
				stateColor={stateColor}
			/>
			<div
				id="slide"
				ref={slideRef}
				style={{
					top: position,
					width: `calc(${responsiveWidth} - ${(1.5 * settings.fontSize * 0.69)}px)`,
					fontSize: settings.fontSize,
					left: (settings.fontSize * 0.69),
					transitionProperty: settings.textSpeed < 50 ? "top" : "none"
				}} >
				<p id="text">
					{currentText}
				</p>
			</div>
			<div
				id="control"
				className={active ? "transparent" : "visible"}
				style={{ width: responsiveWidth }}>
				<ControlButton
					stateColor={stateColor}
					mouseDownHandler={() => { }}
					icon="settings"
				/>
				<ControlButton
					stateColor={stateColor}
					mouseDownHandler={() => { }}
					icon="list"
				/>
				<ControlButton
					stateColor={stateColor}
					mouseDownHandler={() => { }}
					icon={endReached ? "next" : active ? "pause" : "play"}
				/>
			</div>
		</div>
	)
}

export default TextSlider;
