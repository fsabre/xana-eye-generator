import React from "react";

import {Dot} from "../models/shapes.ts";
import {Slider} from "./Slider.tsx";

interface IDotConfigProps {
    dot: Dot;
    onDotChange: (dot: Dot) => void;
}

export const DotConfig: React.FC<IDotConfigProps> = (props) => {
    const dot = props.dot;
    return (
        <div className={"DotConfig"}>
            <div className={"config-section-header"}>
                <h2>Dot</h2>
            </div>
            <Slider
                label={"Radius"}
                value={dot.radius}
                onChange={val => {
                    props.onDotChange({...dot, radius: val});
                }}
            />
        </div>
    );
}
