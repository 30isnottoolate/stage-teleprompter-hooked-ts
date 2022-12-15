import React from 'react';
import useEventListener from '../utilities/useEventListener';
import colors from '../utilities/colors';
import Image from './Image';
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
				className="title" 
				style={{ paddingTop: 0.25 * settings.fontSize * settings.lineHeight }} >
				KV Stage Teleprompter
			</p>
			<div className="content">
				{libraryStatus === "checking" &&
					<Image
						icon="checking"
						fontSize={settings.fontSize}
						lineHeight={settings.lineHeight}
						stateColor={stateColor}
					/>}
				{libraryStatus === "valid" &&
					<Image
						icon="valid"
						fontSize={settings.fontSize}
						lineHeight={settings.lineHeight}
						stateColor={stateColor}
					/>}
				{libraryStatus === "invalid" &&
					<Image
						icon="invalid"
						fontSize={settings.fontSize}
						lineHeight={settings.lineHeight}
						stateColor={stateColor}
					/>}
				{libraryStatus === "missing" &&
					<Image
						icon="missing"
						fontSize={settings.fontSize}
						lineHeight={settings.lineHeight}
						stateColor={stateColor}
					/>}
				<p style={{ fontSize: settings.fontSize * 0.75 }}>{libraryStatus === "checking" ? "CHECKING LIBRARY..." :
					libraryStatus === "missing" ? "LIBRARY MISSING" :
						libraryStatus === "invalid" ? "LIBRARY INVALID" :
							"LIBRARY READY"
				}</p>
			</div>
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
