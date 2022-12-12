import React, { useState, useRef, useEffect } from 'react';
import DOMPurify from 'dompurify';
import useEventListener from '../utilities/useEventListener';
import colors from '../utilities/colors';
import Marker from './Marker';
import ControlButton from './ControlButton';

const READ_SPEED_COEF = 0.0151; // char/ms

interface ReaderProps {
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

const Reader: React.FC<ReaderProps> = ({ settings, library, textIndex, setTextIndex, setMode }: ReaderProps) => {
	const [active, setActive] = useState(false);
	const [position, setPosition] = useState(0);
	const [endReached, setEndReached] = useState(false);
	const [keyHold, setKeyHold] = useState(false);
	const [keyDownTime, setKeyDownTime] = useState(0);

	const slideRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setPosition(settings.fontSize * settings.lineHeight);
	}, []);

	useEffect(() => {
		let intervalID: ReturnType<typeof setInterval>;
		let noEmptyLinesTextHeight: number;
		let intervalValue: number;

		if (slideRef.current && active) {
			noEmptyLinesTextHeight = slideRef.current.offsetHeight - settings.fontSize * settings.lineHeight * countEmptyLines(library.texts[textIndex].content);
			intervalValue = (library.texts[textIndex].content.length / (noEmptyLinesTextHeight * READ_SPEED_COEF)) * (100 / settings.textSpeed);
			intervalID = setInterval(() => setPosition((prevState) => prevState - 1), intervalValue);
		}

		return () => clearInterval(intervalID);
	}, [active]);

	useEffect(() => {
		if (slideRef.current) {
			if (!(slideRef.current.offsetHeight > ((-1) * position +
				(settings.fontSize * settings.lineHeight * 2)) &&
				(position) <= (settings.fontSize * settings.lineHeight))) {
				setActive(false);
				setEndReached(true);
			}
		}
	}, [position]);

	const countEmptyLines = (input: string) => {
		return (input.match(/^[ ]*$/gm) || []).length;
	}

	const nextText = () => {
		if (textIndex < library.texts.length - 1) {
			setTextIndex((prevState: number) => prevState + 1);
		} else setTextIndex(0);

		setPosition(settings.fontSize * settings.lineHeight);
		setEndReached(false);
		setKeyHold(false);
		setKeyDownTime(0);
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
					handleButtonAHome();
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

	const handleButtonAHome = () => setMode("start");

	const handleButtonBList = () => setMode("list");

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
			id="reader"
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
				<p id="text" dangerouslySetInnerHTML={{
					__html:
						DOMPurify.sanitize(library.texts[textIndex].content ? library.texts[textIndex].content : "Loading...")
				}} />
			</div>
			<div
				id="control"
				className={active ? "transparent" : "visible"}
				style={{ width: responsiveWidth }}>
				<ControlButton
					fontSize={settings.fontSize}
					stateColor={stateColor}
					mouseDownHandler={handleButtonAHome}
					icon="home"
				/>
				<ControlButton
					fontSize={settings.fontSize}
					stateColor={stateColor}
					mouseDownHandler={handleButtonBList}
					icon="list"
				/>
				<ControlButton
					fontSize={settings.fontSize}
					stateColor={stateColor}
					mouseDownHandler={handleButtonCStartStop}
					icon={endReached ? "next" : active ? "pause" : "play"}
				/>
			</div>
		</div>
	)
}

export default Reader;
