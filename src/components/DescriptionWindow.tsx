import React from "react";

import {Window} from "./Window.tsx";
import {getVersion} from "../util/version.ts";

// A component for the long window explaining the app
export const DescriptionWindow: React.FC = () => {
    return (
        <Window
            title={"Description"}
            id={"description-window"}
            content={<>
                <h1>XANA Eye Generator</h1>
                <p>A web interface to quickly create XANA-like logos</p>
                <p>
                    Author&nbsp;:&#32;
                    <a target={"_blank"} href={"https://www.youtube.com/@lialslasher"}>
                        Lial_Slasher
                    </a><br/>
                    Source&nbsp;:&#32;
                    <a target={"_blank"} href={"https://github.com/fsabre/xana-eye-generator"}>
                        https://github.com<wbr/>/fsabre<wbr/>/xana-eye-generator
                    </a><br/>
                    Version&nbsp;:&#32;
                    <a target={"_blank"} href={"https://github.com/fsabre/xana-eye-generator/blob/master/CHANGELOG.md"}>
                        {getVersion()}
                    </a>
                </p>
                <p>
                    The aim of this interface is to prototype, to find inspiration by moving some sliders.<br/>
                    It's voluntarily short on functions so that the user is not overwhelmed and for the logos to stay
                    in line with the model&nbsp;: concentric circles and branches.
                </p>
                <p>You can edit the properties of several shapes&nbsp;:</p>
                <ul>
                    <li>
                        One unique central dot
                        <ul>
                            <li>Radius&nbsp;: <em>the radius of the dot</em></li>
                        </ul>
                    </li>
                    <br/>

                    <li>Multiple concentric circles
                        <ul>
                            <li>Radius&nbsp;: <em>the radius of the circle</em></li>
                            <li>Width&nbsp;: <em>the width of the line</em></li>
                        </ul>
                    </li>
                    <br/>

                    <li>Multiple branches aligned with the center
                        <ul>
                            <li>Length&nbsp;: <em>the distance between the center and the end of the branch</em>
                            </li>
                            <li>Width&nbsp;: <em>the width of the line</em></li>
                            <li>
                                Angle&nbsp;: <em>the angle of the branch. In degrees, clockwise, 0° is upwards.</em>
                            </li>
                            <li>Mirror&nbsp;: <em>whether to mirror the branch along the X axis</em></li>
                            <li>Start&nbsp;: <em>whether to snap the start of the branch to a circle</em></li>
                            <li>End&nbsp;: <em>whether to snap the end of the branch to a circle</em></li>
                            <li>Rounded caps&nbsp;: <em>whether to use rounded or flat ends</em></li>
                        </ul>
                    </li>
                </ul>

                <p>Click the <em>RESET</em> button to restore the default logo.</p>
                <p>Click the <em>CLEAR</em> button to clear the canvas.</p>
                <p>Click the <em>EXPORT</em> button to export your logo as SVG.</p>
            </>}
        />
    );
}
