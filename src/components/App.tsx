import React from "react";

import {BranchConfig} from "./BranchConfig.tsx";
import {CircleConfig} from "./CircleConfig.tsx";
import {DescriptionWindow} from "./DescriptionWindow.tsx";
import {DotConfig} from "./DotConfig.tsx";
import {Window} from "./Window.tsx";
import {Branch, Circle, Dot} from "../models/shapes.ts";
import {drawEye} from "../util/draw.ts";
import {createBranch, createCircle} from "../util/findroom.ts";

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
    const [dot, setDot] = React.useState(XANA_EYE_DOT);
    const [circles, setCircles] = React.useState(WANE_EYE_CIRCLES);
    const [branches, setBranches] = React.useState(XANA_EYE_BRANCHES);

    const container_ref = React.useRef<HTMLElement | null>(null);
    const canvas_ref = React.useRef<HTMLCanvasElement | null>(null);
    const ctx_ref = React.useRef<CanvasRenderingContext2D | null>(null);

    const generate = React.useCallback(() => {
        console.log("Generating...");
        if (container_ref.current === null) {
            container_ref.current = document.getElementById("canvas-window");
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
        // Set the canvas size to its container size
        const width = 450; //container_ref.current.offsetWidth;
        const height = 450; //container_ref.current.offsetHeight;
        canvas_ref.current.width = width;
        canvas_ref.current.height = height;
        drawEye(ctx_ref.current, width, height, dot, circles, branches);
    }, [dot, circles, branches]);

    function onEyeReset(): void {
        setDot(XANA_EYE_DOT);
        setCircles(WANE_EYE_CIRCLES);
        setBranches(XANA_EYE_BRANCHES);
    }

    function onClear(): void {
        setDot({"radius": 0});
        setCircles([]);
        setBranches([]);
    }

    function onAddCircle(): void {
        const circle: Circle = createCircle(dot, circles);
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
        const branch: Branch = createBranch(branches);
        setBranches([...branches, branch]);
    }

    function onBranchRemove(idxToDelete: number): void {
        const newBranches: Branch[] = branches.filter((_, idx) => idx !== idxToDelete);
        setBranches(newBranches);
    }

    React.useEffect(() => {
        generate();
    }, [generate, dot, circles, branches]);

    return (
        <div id={"app"}>
            <div id={"first-half"} className={"half"}>
                <DescriptionWindow/>
                <Window
                    title={"Canvas"}
                    id={"canvas-window"}
                    content={
                        <canvas id={"eye-canvas"}></canvas>
                    }
                />
            </div>
            <div id={"second-half"} className={"half"}>
                <Window
                    title={"Configuration"}
                    id={"config-window"}
                    content={
                        <div>
                            <div className={"config-actionbar"}>
                                <input type={"button"} value={"Reset"} onClick={onEyeReset}/>
                                <input type={"button"} value={"Clear"} onClick={onClear}/>
                            </div>
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
    );
}

export default App;
