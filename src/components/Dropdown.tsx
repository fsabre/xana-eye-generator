import React from "react";

export interface IOption {
    label: string;
    value: number;
}

interface IDropdownProps {
    label: string;
    value: number;
    options: IOption[];
    onChange: (val: number) => void;
}

// A component to have a custom dropdown for the whole app
export const Dropdown: React.FC<IDropdownProps> = (props) => {
    return (
        <div className={"config-shape-control"}>
            <label>{props.label}</label>
            <select
                value={props.value}
                onChange={ev => {
                    const value = ev.target.value;
                    if (value !== null) {
                        props.onChange(Number(value));
                    }
                }}
            >
                {props.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
}
