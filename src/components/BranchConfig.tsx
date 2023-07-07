import React from "react";

import {Branch} from "../models/shapes.ts";
import {Slider} from "./Slider.tsx";

interface IBranchConfigProps {
    label: string;
    branch: Branch;
    onBranchChange: (branch: Branch) => void;
    onDelete: () => void;
}

export const BranchConfig: React.FC<IBranchConfigProps> = (props) => {
    const branch = props.branch;
    return (
        <div className={"BranchConfig"}>
            <div className={"config-shape-header"}>
                <h3>Branch n°{props.label}</h3>
                <input type={"button"} value={"-"} onClick={props.onDelete}/>
            </div>
            <Slider
                label={"Length"}
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
            <label>Mirror</label>
            <input type={"checkbox"} checked={branch.mirror} onChange={() => {
                props.onBranchChange({...branch, mirror: !branch.mirror});
            }}/>
        </div>
    );
}
