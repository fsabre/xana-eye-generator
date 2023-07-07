import React from "react";

import {Branch, Circle, Dot} from "../models/shapes.ts";
import {DotConfig} from "./DotConfig.tsx";
import {CircleConfig} from "./CircleConfig.tsx";
import {drawEye} from "../util/draw.ts";
import {BranchConfig} from "./BranchConfig.tsx";

const DEFAULT_DOT: Dot = {radius: 10};
const DEFAULT_CIRCLES: Circle[] = [
    {radius: 30, width: 10},
    {radius: 50, width: 10},
];
const DEFAULT_BRANCHES: Branch[] = [
    {length: 120, angle: 0, width: 10},
    {length: 100, angle: 180, width: 10},
    {length: 90, angle: 155, width: 10},
    {length: 90, angle: 205, width: 10},
];

function App() {
    const [neverGenerated, setNeverGenerated] = React.useState(true);
    const [autoGenerate, setAutoGenerate] = React.useState(false);
    const [dot, setDot] = React.useState(DEFAULT_DOT);
    const [circles, setCircles] = React.useState(DEFAULT_CIRCLES);
    const [branches, setBranches] = React.useState(DEFAULT_BRANCHES);

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

    function onAddCircle(): void {
        const circle: Circle = {radius: 50, width: 10};
        setCircles([...circles, circle]);
    }

    function onCircleRemove(idxToDelete: number): void {
        const newCircles: Circle[] = circles.filter((_, idx) => idx !== idxToDelete);
        setCircles(newCircles);
    }

    function onAddBranch(): void {
        const branch: Branch = {length: 50, width: 10, angle: 0};
        setBranches([...branches, branch]);
    }

    function onBranchRemove(idxToDelete: number): void {
        const newBranches: Branch[] = branches.filter((_, idx) => idx !== idxToDelete);
        setBranches(newBranches);
    }

    React.useEffect(() => {
        if (autoGenerate || neverGenerated) {
            setNeverGenerated(false);
            generate();
        }
    }, [generate, neverGenerated, autoGenerate, dot, circles, branches]);

    return (
        <div id={"app"}>
            <div id={"canvas-container"}>
                <canvas id={"eye-canvas"}></canvas>
            </div>
            <div id={"config-container"}>
                <h1>Configuration</h1>
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
