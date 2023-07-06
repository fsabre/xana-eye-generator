import React from "react";

import {Circle} from "../models/shapes.ts";
import {Slider} from "./Slider.tsx";

interface ICircleConfigProps {
    label: string;
    circle: Circle;
    onCircleChange: (circle: Circle) => void;
}

export const CircleConfig: React.FC<ICircleConfigProps> = (props) => {
    const circle = props.circle;
    return (
        <div className={"CircleConfig"}>
            <h3>Circle n°{props.label}</h3>
            <Slider
                label={"Radius"}
                min={1}
                max={200}
                value={circle.radius}
                onChange={val => {
                    props.onCircleChange({...circle, radius: Number(val)});
                }}/>
            <Slider
                label={"Width"}
                min={1}
                max={100}
                value={circle.width}
                onChange={val => {
                    props.onCircleChange({...circle, width: Number(val)});
                }}
            />
        </div>
    );
}
