import React, { useState } from 'react';
import useEventListener from '../utilities/useEventListener';
import Marker from './Marker';
import ControlButton from './ControlButton';

interface SettingsProps {
	setMode: Function,
	colors: {},
	setSettings: Function,
	defaultSettings: Function,
	settings: {
		fontSize: number,
		lineHeight: number,
		colorIndex: number,
		textSpeed: number,
		holdButtonTime: number,
		orientation: string
	}
}

const Settings: React.FC<SettingsProps> = ({ setMode, defaultSettings, colors, settings, setSettings }: SettingsProps) => {
	const [settingsIndex, setSettingsIndex] = useState(1);
	const [inChangeMode, setInChangeMode] = useState(false);
	const [keyHold, setKeyHold] = useState(false);
	const [keyDownTime, setKeyDownTime] = useState(0);

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === "a") {
			handleButtonAPushDown();
		} else {
			if ((!inChangeMode && !event.repeat) || inChangeMode) {
				if (event.key === "b") {
					handleButtonBUpDecrease();
				} else if (event.key === "c") {
					handleButtonCDownIncrease();
				}
			}
		}
	}

	const handleKeyUp = (event: KeyboardEvent) => {
		if (event.key === "a") {
			handleButtonAPushUp();
		}
	}

	const handleButtonAPushDown = () => {
		if (!keyHold) {
			if (!inChangeMode) {
				setKeyHold(true);
				setKeyDownTime((new Date()).getTime());
			} else {
				setInChangeMode(false);
			}
		}
	}

	const handleButtonAPushUp = () => {
		if (keyHold) {
			if (((new Date()).getTime() - keyDownTime) > settings.holdButtonTime) {
				setMode("select");
			} else {
				if (settingsIndex === 7) {
					defaultSettings();
					setKeyHold(false);
					setKeyDownTime(0);
				} else if (settingsIndex === 8) {
					setMode("start");
				} else {
					setKeyHold(false);
					setKeyDownTime(0);
					setInChangeMode((prevState) => !prevState);
				}
			}
		}
	}

	const changeSettings = (setting: string, value: number) => {
		setSettings((prevState: typeof settings) => {
			localStorage.setItem(setting, (prevState[setting] + value).toString());
			return { ...prevState, [setting]: prevState[setting] + value };
		});
	}

	const handleButtonBUpDecrease = () => {
		if (inChangeMode) {
			switch (settingsIndex) {
				case 1:
					if (settings.fontSize > 80) {
						changeSettings("fontSize", -1);
					}
					break;
				case 2:
					if (settings.lineHeight > 1) {
						changeSettings("lineHeight", -0.01);
					}
					break;
				case 3:
					if (settings.colorIndex > 1) {
						changeSettings("colorIndex", -1);
					}
					break;
				case 4:
					if (settings.textSpeed > 20) {
						changeSettings("textSpeed", -1);
					}
					break;
				case 5:
					if (settings.holdButtonTime > 1000) {
						changeSettings("holdButtonTime", -10);
					}
					break;
				case 6:
					changeOrientation();
					break;
				default:
					console.log("The impossible just happened.");
			}
		} else {
			if (settingsIndex > 1) {
				setSettingsIndex((prevStates) => prevStates - 1);
			} else {
				setSettingsIndex(8);
			}
		}
	}

	const handleButtonCDownIncrease = () => {
		if (inChangeMode) {
			switch (settingsIndex) {
				case 1:
					if (settings.fontSize < 150) {
						changeSettings("fontSize", +1);
					}
					break;
				case 2:
					if (settings.lineHeight < 1.5) {
						changeSettings("lineHeight", +0.01);
					}
					break;
				case 3:
					if (settings.colorIndex < 5) {
						changeSettings("colorIndex", +1);
					}
					break;
				case 4:
					if (settings.textSpeed < 200) {
						changeSettings("textSpeed", +1);
					}
					break;
				case 5:
					if (settings.holdButtonTime < 5000) {
						changeSettings("holdButtonTime", +10);
					}
					break;
				case 6:
					changeOrientation();
					break;
				default:
					console.log("The impossible just happened.");
			}
		} else {
			if (settingsIndex < 8) {
				setSettingsIndex((prevStates) => prevStates + 1);
			} else {
				setSettingsIndex(1);
			}
		}
	}

	const changeOrientation = () => {
			setSettings((prevState: typeof settings) => {
				if (prevState.orientation === "horizontal") {
					localStorage.setItem("orientation", "vertical");
					return { ...prevState, orientation: "vertical" };
				} else {
					localStorage.setItem("orientation", "horizontal");
					return { ...prevState, orientation: "horizontal" };
				}
			});
	}

	useEventListener("keydown", (event: KeyboardEvent) => handleKeyDown(event));
	useEventListener("keyup", (event: KeyboardEvent) => handleKeyUp(event));

	let listPosTop = (2 - settingsIndex) * settings.fontSize * settings.lineHeight;
	let listPosLeftA = (inChangeMode) ? settings.fontSize * 0.69 - settings.fontSize * 8.02 : settings.fontSize * 0.69;
	let listPosLeftB = (inChangeMode) ? settings.fontSize * 0.69 : settings.fontSize * 8.02;
	let stateColor = colors[settings.colorIndex].code;
	let respWidth = (settings.orientation === "vertical") ? "100vh" : "100vw";

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
					mouseDownHandler={handleButtonAPushDown}
					mouseUpHandler={handleButtonAPushUp}
					icon="selectList"
				/>
				<ControlButton
					stateColor={stateColor}
					mouseDownHandler={handleButtonBUpDecrease}
					icon={inChangeMode ? "left" : "up"}
				/>
				<ControlButton
					stateColor={stateColor}
					mouseDownHandler={handleButtonCDownIncrease}
					icon={inChangeMode ? "right" : "down"}
				/>
			</div>
		</div>
	);
}

export default Settings;
