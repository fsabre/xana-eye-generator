import React from "react";

interface ISliderProps {
    label: string;
    disabled?: boolean;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}

const DEFAULT_PROPS: Partial<ISliderProps> = {
    disabled: false,
    min: 0,
    max: 100,
};

// A component to have a custom slider for the whole app
export const Slider: React.FC<ISliderProps> = (props) => {
    props = {...DEFAULT_PROPS, ...props};

    return (
        <div className={"Slider config-shape-control"}>
            <label>{props.label}</label>
            <input
                type={"range"}
                disabled={props.disabled}
                min={props.min}
                max={props.max}
                value={props.value}
                onChange={(ev) => {
                    const value = ev.target.value;
                    props.onChange(Number(value));
                }}
            />
            <input
                type={"text"}
                disabled={props.disabled}
                value={props.value.toFixed()}
                onChange={(ev) => {
                    const value = Number(ev.target.value); // Will be 0 if "" or undefined, NaN if random chars
                    if (!isNaN(value)) {
                        // I'm using defaults on min and max for typing, but they'll never be undefined.
                        props.onChange(Math.min(Math.max(props.min || 0, value), props.max || 0));
                    }
                }}
            />
        </div>
    );
}
