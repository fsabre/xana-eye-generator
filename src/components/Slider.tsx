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
            <label>{props.value}</label>
        </div>
    );
}
