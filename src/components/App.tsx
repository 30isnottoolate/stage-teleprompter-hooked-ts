import React, { useState, useEffect } from 'react';
import './App.css';
import StartHelp from './StartHelp';
import TextList from './TextList';
import TextSlider from './TextSlider';
import Settings from './Settings';

const FONT_SIZE_DEFAULT = 100;
const LINE_HEIGHT_DEFAULT = 1.2;
const COLOR_INDEX_DEFAULT = 3;
const TEXT_SPEED_DEFAULT = 100;
const HOLD_TIME_DEFAULT = 2000;
const ORIENTATION_DEFAULT = "horizontal"; // horizontal / vertical

const App: React.FC = () => {
    const [mode, setMode] = useState("start");
    const [library, setLibrary] = useState({ texts: [{ title: "", url: "" }] });
    const [textIndex, setTextIndex] = useState(1);
    const [settings, setSettings] = useState({
        fontSize: FONT_SIZE_DEFAULT,
        lineHeight: LINE_HEIGHT_DEFAULT,
        colorIndex: COLOR_INDEX_DEFAULT,
        textSpeed: TEXT_SPEED_DEFAULT,
        holdButtonTime: HOLD_TIME_DEFAULT,
        orientation: ORIENTATION_DEFAULT
    });

    useEffect(() => {
        fetch('librarian.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (localStorage["fontSize"] && localStorage["lineHeight"] && localStorage["colorIndex"] &&
                    localStorage["textSpeed"] && localStorage["holdButtonTime"] && localStorage["orientation"]) {
                    setLibrary(data);
                    setSettings({
                        fontSize: parseInt(localStorage.getItem("fontSize") || FONT_SIZE_DEFAULT.toString()),
                        lineHeight: parseFloat(localStorage.getItem("lineHeight") || LINE_HEIGHT_DEFAULT.toString()),
                        colorIndex: parseInt(localStorage.getItem("colorIndex") || COLOR_INDEX_DEFAULT.toString()),
                        textSpeed: parseInt(localStorage.getItem("textSpeed") || TEXT_SPEED_DEFAULT.toString()),
                        holdButtonTime: parseInt(localStorage.getItem("holdButtonTime") || HOLD_TIME_DEFAULT.toString()),
                        orientation: localStorage.getItem("orientation") || ORIENTATION_DEFAULT
                    });
                } else {
                    setLibrary(data);
                    defaultSettings();
                }
            })
            .catch(() => console.log("Database missing."));
    }, []);

    const defaultLocalStorage = () => {
        localStorage.setItem("fontSize", FONT_SIZE_DEFAULT.toString());
        localStorage.setItem("lineHeight", LINE_HEIGHT_DEFAULT.toString());
        localStorage.setItem("colorIndex", COLOR_INDEX_DEFAULT.toString());
        localStorage.setItem("textSpeed", TEXT_SPEED_DEFAULT.toString());
        localStorage.setItem("holdButtonTime", HOLD_TIME_DEFAULT.toString());
        localStorage.setItem("orientation", ORIENTATION_DEFAULT);
    }

    const defaultSettings = () => {
        setSettings({
            fontSize: FONT_SIZE_DEFAULT,
            lineHeight: LINE_HEIGHT_DEFAULT,
            colorIndex: COLOR_INDEX_DEFAULT,
            textSpeed: TEXT_SPEED_DEFAULT,
            holdButtonTime: HOLD_TIME_DEFAULT,
            orientation: ORIENTATION_DEFAULT
        });
        defaultLocalStorage();
    }

    if (mode === "start") {
        return (
            <StartHelp
                settings={settings}
                setMode={setMode}
            />
        )
    } else if (mode === "select") {
        return (
            <TextList
                settings={settings}
                library={library}
                textIndex={textIndex} setTextIndex={setTextIndex}
                setMode={setMode}
            />
        )
    } else if (mode === "read") {
        return (
            <TextSlider
                settings={settings}
                library={library}
                textIndex={textIndex} setTextIndex={setTextIndex}
                setMode={setMode}
            />
        )
    } else {
        return (
            <Settings
                settings={settings} setSettings={setSettings} defaultSettings={defaultSettings}
                setMode={setMode}
            />
        )
    }
}

export default App;
