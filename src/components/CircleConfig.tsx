import React from "react";

import {Slider} from "./Slider.tsx";
import {Circle} from "../models/shapes.ts";
import {MAX_CIRCLE_RADIUS, MAX_CIRCLE_WIDTH, MIN_CIRCLE_RADIUS, MIN_CIRCLE_WIDTH} from "../util/constants.ts";

interface ICircleConfigProps {
    label: string;
    circle: Circle;
    onCircleChange: (circle: Circle) => void;
    onDelete: () => void;
}

// A component to edit the properties of a circle
export const CircleConfig: React.FC<ICircleConfigProps> = (props) => {
    const circle = props.circle;
    return (
        <div className={"CircleConfig"}>
            <div className={"config-shape-header"}>
                <h3>Circle n°{props.label}</h3>
                <input type={"button"} value={"-"} onClick={props.onDelete}/>
            </div>
            <Slider
                label={"Radius"}
                min={MIN_CIRCLE_RADIUS}
                max={MAX_CIRCLE_RADIUS}
                value={circle.radius}
                onChange={val => {
                    props.onCircleChange({...circle, radius: Number(val)});
                }}/>
            <Slider
                label={"Width"}
                min={MIN_CIRCLE_WIDTH}
                max={MAX_CIRCLE_WIDTH}
                value={circle.width}
                onChange={val => {
                    props.onCircleChange({...circle, width: Number(val)});
                }}
            />
        </div>
    );
}
