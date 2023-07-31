import React from "react";

import {Slider} from "./Slider.tsx";
import {Dot} from "../models/shapes.ts";
import {MAX_DOT_RADIUS, MIN_DOT_RADIUS} from "../util/constants.ts";

interface IDotConfigProps {
    dot: Dot;
    onDotChange: (dot: Dot) => void;
}

// A component to edit the properties of the dot
export const DotConfig: React.FC<IDotConfigProps> = (props) => {
    const dot = props.dot;
    return (
        <div className={"DotConfig"}>
            <Slider
                label={"Radius"}
                min={MIN_DOT_RADIUS}
                max={MAX_DOT_RADIUS}
                value={dot.radius}
                onChange={val => {
                    props.onDotChange({...dot, radius: val});
                }}
            />
        </div>
    );
}
