import React, { useState } from 'react';

import useEventListener from '../utilities/useEventListener';
import colors from '../utilities/colors';
import remValue from '../utilities/remValue';

import Marker from './Marker';
import ControlButton from './ControlButton';

interface SettingsProps {
	setMode: Function;
	setSettings: Function;
	defaultSettings: Function;
	settings: {
		fontSize: number,
		lineHeight: number,
		colorIndex: number,
		textSpeed: number,
		holdButtonTime: number,
		orientation: string
	};
}

const Settings: React.FC<SettingsProps> = ({ settings, setSettings, defaultSettings, setMode }: SettingsProps) => {
	const [settingsIndex, setSettingsIndex] = useState(1);
	const [inChangeMode, setInChangeMode] = useState(false);
	const [keyHold, setKeyHold] = useState(false);
	const [keyDownTime, setKeyDownTime] = useState(0);

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key.toLowerCase() === "a") {
			handleButtonAKeyDown();
		} else if (event.key.toLowerCase() === "b") {
			if (!inChangeMode && !event.repeat) {
				handleButtonBUp();
			} else if (inChangeMode) {
				handleButtonBDecrease();
			}
		} else if (event.key.toLowerCase() === "c") {
			if (!inChangeMode && !event.repeat) {
				handleButtonCDown();
			} else if (inChangeMode) {
				handleButtonCIncrease();
			}
		}
	}

	const handleKeyUp = (event: KeyboardEvent) => {
		if (event.key.toLowerCase() === "a" && keyHold) {
			if (!inChangeMode) {
				handleButtonASelectHome();
			} else handleButtonAUnselect();
		}
	}

	const handleButtonAKeyDown = () => {
		if (!keyHold) {
			setKeyHold(true);
			setKeyDownTime((new Date()).getTime());
		}
	}

	const handleButtonASelectHome = () => {
		if (((new Date()).getTime() - keyDownTime) > settings.holdButtonTime) {
			setMode("home");
		} else {
			if (settingsIndex === 7) {
				defaultSettings();
				setKeyHold(false);
				setKeyDownTime(0);
			} else {
				setInChangeMode(true);
				setKeyHold(false);
				setKeyDownTime(0);
			}
		}
	}

	const handleButtonAUnselect = () => {
		setInChangeMode(false);
		setKeyHold(false);
		setKeyDownTime(0);
	}

	const changeSettings = (setting: string, value: number) => {
		setSettings((prevState: typeof settings) => {
			localStorage.setItem(setting, (prevState[setting] + value).toString());
			return { ...prevState, [setting]: prevState[setting] + value };
		});
	}

	const handleButtonBUp = () => {
		if (settingsIndex > 1) {
			setSettingsIndex((prevStates) => prevStates - 1);
		} else {
			setSettingsIndex(7);
		}
	}

	const handleButtonBDecrease = () => {
		switch (settingsIndex) {
			case 1:
				if (settings.fontSize > 80 / remValue) {
					changeSettings("fontSize", - (1 / remValue));
				}
				break;
			case 2:
				if (settings.lineHeight > 1.1) {
					changeSettings("lineHeight", -0.01);
				}
				break;
			case 3:
				if (settings.colorIndex > 1) {
					changeSettings("colorIndex", -1);
				} else changeSettings("colorIndex", 4);
				break;
			case 4:
				if (settings.textSpeed > 20) {
					changeSettings("textSpeed", -1);
				}
				break;
			case 5:
				if (settings.holdButtonTime > 1000) {
					changeSettings("holdButtonTime", -100);
				}
				break;
			case 6:
				changeOrientation();
				break;
			default:
				console.log("The impossible just happened.");
		}
	}

	const handleButtonCDown = () => {
		if (settingsIndex < 7) {
			setSettingsIndex((prevStates) => prevStates + 1);
		} else {
			setSettingsIndex(1);
		}
	}

	const handleButtonCIncrease = () => {
		switch (settingsIndex) {
			case 1:
				if (settings.fontSize < 150 / remValue) {
					changeSettings("fontSize", (1 / remValue));
				}
				break;
			case 2:
				if (settings.lineHeight < 1.75) {
					changeSettings("lineHeight", +0.01);
				}
				break;
			case 3:
				if (settings.colorIndex < 5) {
					changeSettings("colorIndex", +1);
				} else changeSettings("colorIndex", -4);
				break;
			case 4:
				if (settings.textSpeed < 200) {
					changeSettings("textSpeed", +1);
				}
				break;
			case 5:
				if (settings.holdButtonTime < 5000) {
					changeSettings("holdButtonTime", +100);
				}
				break;
			case 6:
				changeOrientation();
				break;
			default:
				console.log("The impossible just happened.");
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

	let listPosTop = (2.75 - settingsIndex) * settings.fontSize * settings.lineHeight;
	let listPosLeftA = (inChangeMode) ? settings.fontSize * 0.69 - settings.fontSize * 8.02 : settings.fontSize * 0.69;
	let listPosLeftB = (inChangeMode) ? settings.fontSize * 0.69 : settings.fontSize * 8.02;
	let stateColor = colors[settings.colorIndex].code;
	let responsiveWidth = (settings.orientation === "vertical") ? "100vh" : "100vw";

	return (
		<div
			id="settings"
			className={settings.orientation === "vertical" ? "rotate-cw" : ""}
			style={{
				fontSize: settings.fontSize + "rem",
				color: stateColor,
				lineHeight: settings.lineHeight
			}}>
			<p
				className={"title " + (settingsIndex === 1 ? "visible" : "hidden")}
				style={{ paddingTop: 0.25 * settings.fontSize * settings.lineHeight + "rem" }} >
				SETTINGS:
			</p>
			<Marker
				top={1.75 * settings.fontSize * settings.lineHeight}
				left={settings.fontSize * 0.19}
				fontSize={settings.fontSize}
				lineHeight={settings.lineHeight}
				stateColor={stateColor}
			/>
			<ul style={{ top: listPosTop + "rem", left: listPosLeftA + "rem" }}>
				<li>Font size:</li>
				<li>Line height:</li>
				<li>UI color:</li>
				<li>Text speed:</li>
				<li>Alt key time:</li>
				<li>Orientation:</li>
				<li>Default settings</li>
			</ul>
			<ul style={{ top: listPosTop + "rem", left: listPosLeftB + "rem" }}>
				<li>{Math.floor(settings.fontSize * remValue)}</li>
				<li>{settings.lineHeight.toFixed(2)}</li>
				<li>{colors[settings.colorIndex].name}</li>
				<li>{settings.textSpeed}%</li>
				<li>{(settings.holdButtonTime / 1000).toFixed(1)} s</li>
				<li>{settings.orientation}</li>
				<li></li>
			</ul>
			<div id="control" style={{ width: responsiveWidth }}>
				<ControlButton
					fontSize={settings.fontSize}
					stateColor={stateColor}
					mouseDownHandler={handleButtonAKeyDown}
					mouseUpHandler={inChangeMode ? handleButtonAUnselect : handleButtonASelectHome}
					icon="selectHome"
				/>
				<ControlButton
					fontSize={settings.fontSize}
					stateColor={stateColor}
					mouseDownHandler={inChangeMode ? handleButtonBDecrease : handleButtonBUp}
					icon={inChangeMode ? "left" : "up"}
				/>
				<ControlButton
					fontSize={settings.fontSize}
					stateColor={stateColor}
					mouseDownHandler={inChangeMode ? handleButtonCIncrease : handleButtonCDown}
					icon={inChangeMode ? "right" : "down"}
				/>
			</div>
		</div>
	);
}

export default Settings;
