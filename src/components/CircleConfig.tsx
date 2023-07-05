import React from "react";

import {Circle} from "../models/shapes.ts";
import {Slider} from "./Slider.tsx";

interface ICircleConfigProps {
    circle: Circle;
    onCircleChange: (circle: Circle) => void;
}

export const CircleConfig: React.FC<ICircleConfigProps> = (props) => {
    const circle = props.circle;
    return (
        <div className={"CircleConfig"}>
            <Slider label={"Circle radius"} value={circle.radius} onChange={val => {
                props.onCircleChange({...circle, radius: Number(val)});
            }}/>
        </div>
    );
}
