import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import TextList from './TextList';
import Reader from './Reader';
import Settings from './Settings';

const FONT_SIZE_DEFAULT = 100;
const LINE_HEIGHT_DEFAULT = 1.2;
const COLOR_INDEX_DEFAULT = 3;
const TEXT_SPEED_DEFAULT = 100;
const HOLD_TIME_DEFAULT = 2000;
const ORIENTATION_DEFAULT = "horizontal"; // horizontal / vertical

const DEFAULT_STATES = {
    fontSize: FONT_SIZE_DEFAULT,
    lineHeight: LINE_HEIGHT_DEFAULT,
    colorIndex: COLOR_INDEX_DEFAULT,
    textSpeed: TEXT_SPEED_DEFAULT,
    holdButtonTime: HOLD_TIME_DEFAULT,
    orientation: ORIENTATION_DEFAULT
}

const localStorageStates = {
    fontSize: parseInt(localStorage.getItem("fontSize") || FONT_SIZE_DEFAULT.toString()),
    lineHeight: parseFloat(localStorage.getItem("lineHeight") || LINE_HEIGHT_DEFAULT.toString()),
    colorIndex: parseInt(localStorage.getItem("colorIndex") || COLOR_INDEX_DEFAULT.toString()),
    textSpeed: parseInt(localStorage.getItem("textSpeed") || TEXT_SPEED_DEFAULT.toString()),
    holdButtonTime: parseInt(localStorage.getItem("holdButtonTime") || HOLD_TIME_DEFAULT.toString()),
    orientation: localStorage.getItem("orientation") || ORIENTATION_DEFAULT
}

const App: React.FC = () => {
    const [library, setLibrary] = useState<{ texts: [{ title: string, content: string }] }>
        ({ texts: [{ title: "", content: "" }] });

    const [libraryStatus, setLibraryStatus] = useState("checking"); // checking, missing, invalid, valid
    const [textIndex, setTextIndex] = useState(0);
    const [settings, setSettings] = useState({ ...DEFAULT_STATES });
    const [mode, setMode] = useState("start"); // start, select, read, set

    useEffect(() => {
        if (validateLocalStorage()) {
            setSettings({ ...localStorageStates });
        } else {
            defaultSettings();
        }

        fetchLibrary();
    }, []);

    const validateLocalStorage = () => {
        let storageValidity = true;

        if (!localStorage["fontSize"] ||
            isNaN(parseInt(localStorage["fontSize"])) ||
            parseInt(localStorage["fontSize"]) < 80 ||
            parseInt(localStorage["fontSize"]) > 150) {
            storageValidity = false;
        }
        if (!localStorage["lineHeight"] ||
            isNaN(parseFloat(localStorage["lineHeight"])) ||
            parseFloat(localStorage["lineHeight"]) < 1 ||
            parseFloat(localStorage["lineHeight"]) > 1.5) {
            storageValidity = false;
        }
        if (!localStorage["colorIndex"] ||
            isNaN(parseInt(localStorage["colorIndex"])) ||
            parseInt(localStorage["colorIndex"]) < 1 ||
            parseInt(localStorage["colorIndex"]) > 5) {
            storageValidity = false;
        }
        if (!localStorage["textSpeed"] ||
            isNaN(parseInt(localStorage["textSpeed"])) ||
            parseInt(localStorage["textSpeed"]) < 20 ||
            parseInt(localStorage["textSpeed"]) > 200) {
            storageValidity = false;
        }
        if (!localStorage["holdButtonTime"] ||
            isNaN(parseInt(localStorage["holdButtonTime"])) ||
            parseInt(localStorage["holdButtonTime"]) < 1000 ||
            parseInt(localStorage["holdButtonTime"]) > 5000) {
            storageValidity = false;
        }
        if (!localStorage["orientation"] ||
            (localStorage["orientation"] !== "horizontal" &&
                localStorage["orientation"] !== "vertical")) {
            storageValidity = false;
        }

        return storageValidity;
    }

    const fetchLibrary = () => {
        fetch('library.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.librarian && data.librarian === validateLibrary(data.texts)) {
                    setLibrary(data);
                    setLibraryStatus("valid");
                } else {
                    setLibraryStatus("invalid");
                }
            })
            .catch(() => {
                setLibraryStatus("missing");
            });
    }

    const validateLibrary = (texts: typeof library.texts) => {
        let validationCode = "11";

        texts.forEach((item) => {
            validationCode += (item.title.length.toString(16) + item.content.length.toString(16));
        });

        return validationCode += "22";
    }

    const defaultLocalStorage = () => {
        localStorage.setItem("fontSize", FONT_SIZE_DEFAULT.toString());
        localStorage.setItem("lineHeight", LINE_HEIGHT_DEFAULT.toString());
        localStorage.setItem("colorIndex", COLOR_INDEX_DEFAULT.toString());
        localStorage.setItem("textSpeed", TEXT_SPEED_DEFAULT.toString());
        localStorage.setItem("holdButtonTime", HOLD_TIME_DEFAULT.toString());
        localStorage.setItem("orientation", ORIENTATION_DEFAULT);
    }

    const defaultSettings = () => {
        setSettings({ ...DEFAULT_STATES });
        defaultLocalStorage();
    }

    if (mode === "start") {
        return (
            <Home
                settings={settings}
                libraryStatus={libraryStatus}
                fetchLibrary={fetchLibrary}
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
            <Reader
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
