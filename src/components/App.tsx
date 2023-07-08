import React from "react";

import {Branch, Circle, Dot} from "../models/shapes.ts";
import {DotConfig} from "./DotConfig.tsx";
import {CircleConfig} from "./CircleConfig.tsx";
import {drawEye} from "../util/draw.ts";
import {BranchConfig} from "./BranchConfig.tsx";

const XANA_EYE_DOT: Dot = {radius: 10};
const WANE_EYE_CIRCLES: Circle[] = [
    {radius: 30, width: 10},
    {radius: 50, width: 10},
];
const XANA_EYE_BRANCHES: Branch[] = [
    {length: 120, angle: 0, width: 10, mirror: false, start: 1, end: -1, rounded_caps: false},
    {length: 100, angle: 180, width: 10, mirror: false, start: 1, end: -1, rounded_caps: false},
    {length: 90, angle: 155, width: 10, mirror: true, start: 1, end: -1, rounded_caps: false},
];

function App() {
    const [willGenerate, setWillGenerate] = React.useState(true);
    const [autoGenerate, setAutoGenerate] = React.useState(false);
    const [dot, setDot] = React.useState(XANA_EYE_DOT);
    const [circles, setCircles] = React.useState(WANE_EYE_CIRCLES);
    const [branches, setBranches] = React.useState(XANA_EYE_BRANCHES);

    const generate = React.useCallback(() => {
        console.log("Generating...");
        const container = document.getElementById("canvas-container");
        if (container === null) return;
        const canvas = document.getElementById("eye-canvas") as HTMLCanvasElement | null;
        if (canvas === null) return;
        const ctx = canvas.getContext("2d");
        if (ctx === null) return;
        // Set the canvas size to its container size
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        drawEye(ctx, width, height, dot, circles, branches);
    }, [dot, circles, branches]);

    function onEyeReset(): void {
        setDot(XANA_EYE_DOT);
        setCircles(WANE_EYE_CIRCLES);
        setBranches(XANA_EYE_BRANCHES);
        setWillGenerate(true);
    }

    function onClear(): void {
        setDot({"radius": 0});
        setCircles([]);
        setBranches([]);
        setWillGenerate(true);
    }

    function onAddCircle(): void {
        const circle: Circle = {radius: 50, width: 10};
        setCircles([...circles, circle]);
    }

    function onCircleRemove(idxToDelete: number): void {
        const newCircles: Circle[] = circles.filter((_, idx) => idx !== idxToDelete);
        setCircles(newCircles);
        // Update the indexes of the branch starts/stops.
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
        const branch: Branch = {
            length: 50,
            width: 10,
            angle: 0,
            mirror: false,
            start: -1,
            end: -1,
            rounded_caps: false,
        };
        setBranches([...branches, branch]);
    }

    function onBranchRemove(idxToDelete: number): void {
        const newBranches: Branch[] = branches.filter((_, idx) => idx !== idxToDelete);
        setBranches(newBranches);
    }

    React.useEffect(() => {
        if (autoGenerate || willGenerate) {
            setWillGenerate(false);
            generate();
        }
    }, [generate, willGenerate, autoGenerate, dot, circles, branches]);

    return (
        <div id={"app"}>
            <div id={"canvas-container"}>
                <canvas id={"eye-canvas"}></canvas>
            </div>
            <div id={"config-container"}>
                <h1>Configuration</h1>
                <input type={"button"} value={"Reset"} onClick={onEyeReset}/>
                <input type={"button"} value={"Clear"} onClick={onClear}/>
                <div className={"config-section"}>
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
                <div style={{height: "100%"}}/>
                <div className={"config-section config-generate"}>
                    <input type={"button"} disabled={autoGenerate} value={"Generate"} onClick={generate}/>
                    <div>
                        <input
                            type={"checkbox"}
                            checked={autoGenerate}
                            onChange={() => setAutoGenerate(!autoGenerate)}/>
                        <label>Auto-generate</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
