import React from "react";

import {Window} from "./Window.tsx";
import {getVersion} from "../util/version.ts";

export const DescriptionWindow: React.FC = () => {
    return (
        <Window
            title={"Description"}
            id={"description-window"}
            content={<>
                <h1>XANA Eye Generator</h1>
                <p>
                    A web interface to quickly create XANA-like logos<br/>
                </p>
                <p>
                    Author : <a target={"_blank"} href={"https://www.youtube.com/@lialslasher"}>Lial_Slasher</a><br/>
                    Source :&#32;
                    <a target={"_blank"} href={"https://github.com/fsabre/xana-eye-generator"}>
                        https://github.com/fsabre/xana-eye-generator
                    </a><br/>
                    Version : <em>{getVersion()}</em>
                </p>
                <p>
                    You can edit the properties of several shapes :
                    <ul>
                        <li>
                            One unique central dot
                            <ul>
                                <li>Radius : <em>the radius of the dot</em></li>
                            </ul>
                        </li>
                        <br/>

                        <li>Multiple concentric circles
                            <ul>
                                <li>Radius : <em>the radius of the circle</em></li>
                                <li>Width : <em>the width of the line</em></li>
                            </ul>
                        </li>
                        <br/>

                        <li>Multiple branches aligned with the center
                            <ul>
                                <li>Length : <em>the distance between the center and the end of the branch</em></li>
                                <li>Width : <em>the width of the line</em></li>
                                <li>Angle : <em>the angle of the branch. In degrees, clockwise, 0° is upwards.</em></li>
                                <li>Mirror : <em>whether to mirror the branch along the X axis</em></li>
                                <li>Start : <em>whether to snap the start of the branch to a circle</em></li>
                                <li>End : <em>whether to snap the end of the branch to a circle</em></li>
                                <li>Rounded caps : <em>whether to use rounded or flat ends</em></li>
                            </ul>
                        </li>
                    </ul>

                    There's no export function yet, just take a screenshot.
                </p>
            </>}
        />
    );
}
