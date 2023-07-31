import React from "react";

interface IWindowProps {
    title: string;
    id: string;
    content: React.ReactNode;
}

// A component to form pretty windows with bars and borders
export const Window: React.FC<IWindowProps> = (props) => {
    return (
        <div id={props.id} className={"window"}>
            <div className={"window-bar"}>
                <div className={"window-titlebar-start"}></div>
                <div className={"window-titlebar-title"}>{props.title}</div>
                <div className={"window-titlebar-end"}></div>
            </div>
            <div className={"window-content"}>
                {props.content}
            </div>
            <div className={"window-bar"}>
                <div className={"window-footerbar-start"}></div>
                <div className={"window-footerbar-title"}></div>
                <div className={"window-footerbar-end"}></div>
            </div>
        </div>
    );
}
