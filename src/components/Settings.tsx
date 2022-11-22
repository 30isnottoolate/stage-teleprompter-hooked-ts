import React, {useState} from 'react';
import Marker from './Marker';
import ControlButton from './ControlButton';

interface SettingsProps {
	mode: (mode: string) => void,
	defaultSettings: () => void,
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

const Settings: React.FC<SettingsProps> = ({mode, defaultSettings, colors, settings}: SettingsProps) => {
	const [settingsIndex, setSettingsIndex] = useState(1);
	const [inChangeMode, setInChangeMode] = useState(false);
	const [keyHold, setKeyHold] = useState(false);
	const [keyDownTime, setKeyDownTime] = useState(0);

	let listPosTop = (2 - settingsIndex) * settings.fontSize * settings.lineHeight;
	let listPosLeftA;
	let listPosLeftB;
	let stateColor = colors[settings.colorIndex].code;
	let respWidth;

	if (settings.orientation === "vertical") {
		respWidth = "100vh";
	} else respWidth = "100vw";

	if (inChangeMode) {
		listPosLeftA = settings.fontSize * 0.69 - settings.fontSize * 8.02;
		listPosLeftB = settings.fontSize * 0.69;
	} else {
		listPosLeftA = settings.fontSize * 0.69;
		listPosLeftB = settings.fontSize * 8.02;
	}

	return (
		<div
			id="settings"
			className={settings.orientation === "vertical" ? "rotate-cw" : ""}
			style={{
				fontSize: settings.fontSize,
				color: stateColor,
				lineHeight: settings.lineHeight
			}}>
			<p
				id="head-line"
				className={settingsIndex === 1 ? "visible" : "hidden"}>
				SETTINGS:
			</p>
			<Marker
				top={settings.fontSize * settings.lineHeight}
				left={settings.fontSize * 0.19}
				fontSize={settings.fontSize}
				lineHeight={settings.lineHeight}
				stateColor={stateColor}
			/>
			<ul style={{ top: listPosTop, left: listPosLeftA }}>
				<li>Font size:</li>
				<li>Line height:</li>
				<li>UI color:</li>
				<li>Text speed:</li>
				<li>Alt key time:</li>
				<li>Orientation:</li>
				<li>Default settings</li>
				<li>Got to start screen</li>
			</ul>
			<ul style={{ top: listPosTop, left: listPosLeftB }}>
				<li>{settings.fontSize}</li>
				<li>{settings.lineHeight.toFixed(2)}</li>
				<li>{colors[settings.colorIndex].name}</li>
				<li>{settings.textSpeed}%</li>
				<li>{settings.holdButtonTime} ms</li>
				<li>{settings.orientation}</li>
				<li></li>
			</ul>
			<div id="control" style={{ width: respWidth }}>
				<ControlButton
					stateColor={stateColor}
					mouseDownHandler={() => {}}
					mouseUpHandler={() => {}}
					icon="selectList"
				/>
				<ControlButton
					stateColor={stateColor}
					mouseDownHandler={() => {}}
					icon={inChangeMode ? "left" : "up"}
				/>
				<ControlButton
					stateColor={stateColor}
					mouseDownHandler={() => {}}
					icon={inChangeMode ? "right" : "down"}
				/>
			</div>
		</div>
	);
}

export default Settings;
