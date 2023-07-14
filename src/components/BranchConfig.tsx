import React from "react";

import {Branch, Circle} from "../models/shapes.ts";
import {Slider} from "./Slider.tsx";
import {Dropdown, IOption} from "./Dropdown.tsx";

interface IBranchConfigProps {
    label: string;
    branch: Branch;
    onBranchChange: (branch: Branch) => void;
    onDelete: () => void;
    circles: Circle[];
}

export const BranchConfig: React.FC<IBranchConfigProps> = (props) => {
    const branch = props.branch;
    const start_options: IOption[] = [
        {"label": "Center", "value": -1},
        ...props.circles.map((_, idx) => ({"label": `Circle n°${idx + 1}`, "value": idx})),
    ];
    const end_options: IOption[] = [
        {"label": "None", "value": -1},
        ...props.circles.map((_, idx) => ({"label": `Circle n°${idx + 1}`, "value": idx})),
    ];

    return (
        <div className={"BranchConfig"}>
            <div className={"config-shape-header"}>
                <h3>Branch n°{props.label}</h3>
                <input type={"button"} value={"-"} onClick={props.onDelete}/>
            </div>
            <Slider
                label={"Length"}
                disabled={branch.end !== -1}
                min={1}
                max={200}
                value={branch.length}
                onChange={val => {
                    props.onBranchChange({...branch, length: Number(val)});
                }}/>
            <Slider
                label={"Width"}
                min={1}
                max={100}
                value={branch.width}
                onChange={val => {
                    props.onBranchChange({...branch, width: Number(val)});
                }}
            />
            <Slider
                label={"Angle"}
                min={0}
                max={360}
                value={branch.angle}
                onChange={val => {
                    props.onBranchChange({...branch, angle: Number(val)});
                }}
            />
            <div className={"config-shape-control"}>
                <label>Mirror</label>
                <input type={"checkbox"} checked={branch.mirror} onChange={() => {
                    props.onBranchChange({...branch, mirror: !branch.mirror});
                }}/>
            </div>
            <Dropdown
                label={"Start"}
                value={branch.start}
                options={start_options}
                onChange={val => {
                    props.onBranchChange({...branch, start: val});
                }}
            />
            <Dropdown
                label={"End"}
                value={branch.end}
                options={end_options}
                onChange={val => {
                    props.onBranchChange({...branch, end: val});
                }}
            />
            <div className={"config-shape-control"}>
                <label>Rounded caps</label>
                <input type={"checkbox"} checked={branch.rounded_caps} onChange={() => {
                    props.onBranchChange({...branch, rounded_caps: !branch.rounded_caps});
                }}/>
            </div>
        </div>
    );
}
