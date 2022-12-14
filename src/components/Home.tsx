import React, { useState } from 'react';
import useEventListener from '../utilities/useEventListener';
import colors from '../utilities/colors';
import ControlButton from './ControlButton';

interface HomeProps {
	settings: {
		fontSize: number,
		lineHeight: number,
		colorIndex: number,
		textSpeed: number,
		holdButtonTime: number,
		orientation: string
	},
	libraryStatus: string,
	fetchLibrary: Function,
	setMode: Function
}

const Home: React.FC<HomeProps> = ({ settings, libraryStatus, fetchLibrary, setMode }: HomeProps) => {

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === "a") {
			handleButtonASet();
		} else if (event.key === "b") {
			handleButtonBList();
		} else if (event.key === "c") {
			handleButtonCInfo();
		}
	}

	const handleButtonASet = () => setMode("set");

	const handleButtonBList = () => {
		if (libraryStatus === "valid") {
			setMode("list");
		} else fetchLibrary();
	}

	const handleButtonCInfo = () => setMode("info");

	useEventListener("keydown", (event: KeyboardEvent) => handleKeyDown(event));

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
				className="title">
				KV Stage Teleprompter
			</p>
			<div id="control" style={{ width: responsiveWidth }}>
				<ControlButton
					fontSize={settings.fontSize}
					stateColor={stateColor}
					mouseDownHandler={handleButtonASet}
					icon="settings"
				/>
				<ControlButton
					fontSize={settings.fontSize}
					stateColor={stateColor}
					mouseDownHandler={handleButtonBList}
					icon={libraryStatus === "valid" ? "list" : "refresh"}
				/>
				<ControlButton
					fontSize={settings.fontSize}
					stateColor={stateColor}
					mouseDownHandler={handleButtonCInfo}
					icon="info"
				/>
			</div>
		</div>
	);
}

export default Home;
