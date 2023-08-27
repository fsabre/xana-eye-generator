import {Branch, Circle, Dot} from "../models/shapes.ts";
import {computeBranchLines} from "./draw.ts";

const SVGNS = "http://www.w3.org/2000/svg";
const CANVAS_SIZE = 450;
const CENTER = CANVAS_SIZE / 2;

export function generateSVG(dot: Dot, circles: Circle[], branches: Branch[]): string {
    const svg = document.createElementNS(SVGNS, "svg");
    svg.setAttribute("width", CANVAS_SIZE.toFixed());
    svg.setAttribute("height", CANVAS_SIZE.toFixed());
    svg.setAttribute("fill", "#FF0000");
    svg.setAttribute("stroke", "#FF0000");
    const dotElement = document.createElementNS(SVGNS, "circle");
    // Create the dot element
    dotElement.setAttribute("cx", CENTER.toFixed());
    dotElement.setAttribute("cy", CENTER.toFixed());
    dotElement.setAttribute("r", dot.radius.toFixed());
    svg.append(dotElement);
    // Create the circles elements
    for (const circle of circles) {
        const circleElement = document.createElementNS(SVGNS, "circle");
        circleElement.setAttribute("cx", CENTER.toFixed());
        circleElement.setAttribute("cy", CENTER.toFixed());
        circleElement.setAttribute("r", circle.radius.toFixed());
        circleElement.setAttribute("fill", "none");
        circleElement.setAttribute("stroke-width", circle.width.toFixed());
        svg.append(circleElement);
    }
    // Create the branches elements
    for (const branch of branches) {
        for (const line of computeBranchLines(branch, CENTER, CENTER, circles)) {
            const lineElement = document.createElementNS(SVGNS, "path");
            const [[startX, startY], [destX, destY]] = line;
            const pathCoordinates = `M${startX.toFixed()} ${startY.toFixed()} L${destX.toFixed()} ${destY.toFixed()} Z`;
            lineElement.setAttribute("d", pathCoordinates);
            lineElement.setAttribute("fill", "none");
            lineElement.setAttribute("stroke-width", branch.width.toFixed());
            if (branch.rounded_caps) {
                // I have to use line-join instead of linecap, not sure why.
                lineElement.setAttribute("stroke-linejoin", "round");
            }
            svg.append(lineElement);
        }
    }
    return new XMLSerializer().serializeToString(svg);
}
