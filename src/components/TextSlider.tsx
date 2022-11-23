import React, { useState, useRef } from 'react';
import Marker from './Marker';
import ControlButton from './ControlButton';

const READ_SPEED_COEF = 0.0151; // char/ms

interface TextSliderProps {
	mode: Function,
	data: { texts: { text_: { title: string } } },
	textIndex: number
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

const TextSlider: React.FC<TextSliderProps> = ({ mode, textIndex, setTextIndex, colors, settings }: TextSliderProps) => {
	const [active, setActive] = useState(false);
	const [timer, setTimer] = useState(() => { });
	const [position, setPosition] = useState(0);
	const [currentText, setCurrentText] = useState("Loading...");
	const [endReached, setEndReached] = useState(false);
	const [keyHold, setKeyDold] = useState(false);
	const [keyDownTime, setKeyDownTime] = useState(0);

	const slideRef = useRef<HTMLDivElement>(null);

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
