import React from "react";

import {BranchConfig} from "./BranchConfig.tsx";
import {CircleConfig} from "./CircleConfig.tsx";
import {DescriptionWindow} from "./DescriptionWindow.tsx";
import {DotConfig} from "./DotConfig.tsx";
import {Window} from "./Window.tsx";
import {Branch, Circle, Dot} from "../models/shapes.ts";
import {drawEye} from "../util/draw.ts";
import {createBranch, createCircle} from "../util/findroom.ts";
import {generateSVG} from "../util/export.ts";

export const GlobalContext = React.createContext({
    onWindowsQuitClick: () => {
        // Called when the "quit" button of a window is clicked
    },
});

// Shapes for the default logo
const XANA_EYE_DOT: Dot = {radius: 10};
const XANA_EYE_CIRCLES: Circle[] = [
    {radius: 30, width: 10},
    {radius: 50, width: 10},
];
const XANA_EYE_BRANCHES: Branch[] = [
    {length: 120, angle: 0, width: 10, mirror: false, start: 1, end: -1, rounded_caps: false},
    {length: 100, angle: 180, width: 10, mirror: false, start: 1, end: -1, rounded_caps: false},
    {length: 90, angle: 155, width: 10, mirror: true, start: 1, end: -1, rounded_caps: false},
];

// A component for the whole app
function App() {
    const [dot, setDot] = React.useState(XANA_EYE_DOT);
    const [circles, setCircles] = React.useState(XANA_EYE_CIRCLES);
    const [branches, setBranches] = React.useState(XANA_EYE_BRANCHES);

    // Persistent references to DOM
    const container_ref = React.useRef<HTMLElement | null>(null);
    const canvas_ref = React.useRef<HTMLCanvasElement | null>(null);
    const ctx_ref = React.useRef<CanvasRenderingContext2D | null>(null);

    const [windowsQuitClickCount, setWindowsQuitClickCount] = React.useState(0);

    function onWindowsQuitClick() {
        // Friendly and funny reminder
        setWindowsQuitClickCount(windowsQuitClickCount + 1);
        if (windowsQuitClickCount + 1 >= 3) {
            alert("Sorry to disappoint, but this is just an interface, not a full-fledged window manager.");
        }
    }

    const generate = React.useCallback(() => {
        //console.log("Generating...");
        if (container_ref.current === null) {
            container_ref.current = document.querySelector("#canvas-window .window-content");
            if (container_ref.current === null) throw Error("Missing canvas container");
        }
        if (canvas_ref.current === null) {
            canvas_ref.current = document.getElementById("eye-canvas") as HTMLCanvasElement | null;
            if (canvas_ref.current === null) throw Error("Missing canvas");
        }
        if (ctx_ref.current === null) {
            ctx_ref.current = canvas_ref.current.getContext("2d");
            if (ctx_ref.current === null) throw Error("Missing canvas 2D context");
        }
        // It may be a good idea to set the canvas size to its container size.
        // Use a constant size for now
        const width = 450; //container_ref.current.offsetWidth;
        const height = 450; //container_ref.current.offsetHeight;
        canvas_ref.current.width = width;
        canvas_ref.current.height = height;
        drawEye(ctx_ref.current, width, height, dot, circles, branches);
    }, [dot, circles, branches]);

    // Restore the default logo
    function onEyeReset(): void {
        setDot(XANA_EYE_DOT);
        setCircles(XANA_EYE_CIRCLES);
        setBranches(XANA_EYE_BRANCHES);
    }

    // Clear the shapes
    function onClear(): void {
        setDot({"radius": 0});
        setCircles([]);
        setBranches([]);
    }

    // Export the logo as SVG and download the file
    function onExport(): void {
        const blob = new Blob([generateSVG(dot, circles, branches)], {type: "image/svg+xml"});
        const blobURL = URL.createObjectURL(blob);
        const linkElement = document.createElement("a")
        linkElement.href = blobURL;
        linkElement.download = "logo.svg"; // Give a file name on the remote computer
        linkElement.style.display = "none"; // Make the link invisible
        document.body.append(linkElement);
        linkElement.click();
    }

    function onAddCircle(): void {
        const circle: Circle = createCircle(dot, circles);
        setCircles([...circles, circle]);
    }

    function onCircleRemove(idxToDelete: number): void {
        const newCircles: Circle[] = circles.filter((_, idx) => idx !== idxToDelete);
        setCircles(newCircles);
        // Update the indexes of the branch starts/stops
        // Remove the reference, or drop the index by 1, according to the situation
        const newBranches: Branch[] = branches.map(branch => {
            const newBranch = {...branch};
            if (newBranch.start == idxToDelete) {
                newBranch.start = -1;
            } else if (newBranch.start > idxToDelete) {
                newBranch.start -= 1;
            }
            if (newBranch.end == idxToDelete) {
                newBranch.end = -1;
            } else if (newBranch.end > idxToDelete) {
                newBranch.end -= 1;
            }
            return newBranch;
        });
        setBranches(newBranches);
    }

    function onAddBranch(): void {
        const branch: Branch = createBranch(branches);
        setBranches([...branches, branch]);
    }

    function onBranchRemove(idxToDelete: number): void {
        const newBranches: Branch[] = branches.filter((_, idx) => idx !== idxToDelete);
        setBranches(newBranches);
    }

    // Generate the logo if a change is observed in the shapes
    React.useEffect(() => {
        generate();
    }, [generate, dot, circles, branches]);

    return (
        <GlobalContext.Provider value={{onWindowsQuitClick}}>
            <div id={"app"}>
                <div id={"first-half"} className={"half"}>
                    <DescriptionWindow/>
                    <Window
                        title={"Canvas"}
                        id={"canvas-window"}
                        content={
                            <div id={"eye-canvas-container"}>
                                <canvas id={"eye-canvas"}></canvas>
                            </div>
                        }
                    />
                </div>
                <div id={"second-half"} className={"half"}>
                    <Window
                        title={"Configuration"}
                        id={"config-window"}
                        content={
                            <div>
                                {/* First, add an action bar */}
                                <div className={"config-actionbar"}>
                                    <input type={"button"} value={"Reset"} onClick={onEyeReset}/>
                                    <input type={"button"} value={"Clear"} onClick={onClear}/>
                                    <input type={"button"} value={"Export"} onClick={onExport}/>
                                </div>
                                {/* Then, for each shape type, a section constituted of a header and a config component */}
                                <div className={"config-section"}>
                                    <div className={"config-section-header"}>
                                        <h2>Dot</h2>
                                    </div>
                                    <DotConfig dot={dot} onDotChange={setDot}/>
                                </div>
                                <div className={"config-section"}>
                                    <div className={"config-section-header"}>
                                        <h2>Circles</h2>
                                        <input type={"button"} value={"+"} onClick={onAddCircle}/>
                                    </div>
                                    {circles.map((circle, idx) => (
                                        <CircleConfig
                                            key={idx}
                                            label={String(idx + 1)}
                                            circle={circle}
                                            onCircleChange={(circle: Circle) => {
                                                const newCircles = [...circles];
                                                newCircles[idx] = circle;
                                                setCircles(newCircles);
                                            }}
                                            onDelete={() => onCircleRemove(idx)}
                                        />
                                    ))}
                                </div>
                                <div className={"config-section"}>
                                    <div className={"config-section-header"}>
                                        <h2>Branches</h2>
                                        <input type={"button"} value={"+"} onClick={onAddBranch}/>
                                    </div>
                                    {branches.map((branch, idx) => (
                                        <BranchConfig
                                            key={idx}
                                            label={String(idx + 1)}
                                            branch={branch}
                                            onBranchChange={(branch: Branch) => {
                                                const newBranches = [...branches];
                                                newBranches[idx] = branch;
                                                setBranches(newBranches);
                                            }}
                                            onDelete={() => onBranchRemove(idx)}
                                            circles={circles}
                                        />
                                    ))}
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
        </GlobalContext.Provider>
    );
}

export default App;
