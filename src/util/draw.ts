import {Branch, Circle, Dot} from "../models/shapes.ts";

const MAIN_COLOR = "#FF0000";

// Draw the logo on the context `ctx`, of size (`width`; `height`)
export function drawEye(ctx: CanvasRenderingContext2D, width: number, height: number, dot: Dot, circles: Circle[], branches: Branch[]): void {
    ctx.clearRect(0, 0, width, height);
    const centerX = width / 2;
    const centerY = height / 2;
    drawDot(ctx, dot, centerX, centerY);
    circles.forEach(circle => drawCircle(ctx, circle, centerX, centerY));
    branches.forEach(branch => drawBranch(ctx, branch, centerX, centerY, circles));
}

// Draw the central `dot`, centered on (`x`, `y`)
function drawDot(ctx: CanvasRenderingContext2D, dot: Dot, x: number, y: number): void {
    ctx.beginPath();
    ctx.arc(x, y, dot.radius, 0, 2 * Math.PI);
    ctx.fillStyle = MAIN_COLOR;
    ctx.fill();
}

// Draw one `circle`, centered on (`x`, `y`)
function drawCircle(ctx: CanvasRenderingContext2D, circle: Circle, x: number, y: number): void {
    ctx.beginPath();
    ctx.arc(x, y, circle.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = MAIN_COLOR;
    ctx.lineWidth = circle.width;
    ctx.stroke();
}

type Line = [[number, number], [number, number]];

// Calculate the lines to draw for one branch, centered on (x, y)
export function computeBranchLines(branch: Branch, x: number, y: number, circles: Circle[]): Line[] {
    const lines: Line[] = [];
    const angles = [branch.angle];
    if (branch.mirror) {
        // Push the reflected angle in case of mirroring
        angles.push(360 - branch.angle);
    }
    for (const angle of angles) {
        // Convert the angle from degrees to radians. Angle is calculated clockwise, 0° is midnight.
        const radians_angle = (angle - 90) * Math.PI / 180;
        let startX = x, startY = y;
        if (branch.start !== -1) {
            // Bind the start of the branch to a circle
            const circle = circles[branch.start];
            startX = x + circle.radius * Math.cos(radians_angle);
            startY = y + circle.radius * Math.sin(radians_angle);
        }
        let destX = 0, destY = 0;
        if (branch.end === -1) {
            destX = x + branch.length * Math.cos(radians_angle);
            destY = y + branch.length * Math.sin(radians_angle);
        } else {
            const circle = circles[branch.end];
            destX = x + circle.radius * Math.cos(radians_angle);
            destY = y + circle.radius * Math.sin(radians_angle);
        }
        lines.push([[startX, startY], [destX, destY]]);
    }
    return lines;
}

// Draw one `branch`, centered on (`x`, `y`). `circles` are provided so that branches can snap on them.
function drawBranch(ctx: CanvasRenderingContext2D, branch: Branch, x: number, y: number, circles: Circle[]): void {
    const lines = computeBranchLines(branch, x, y, circles);
    for (const line of lines) {
        const [[startX, startY], [destX, destY]] = line;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(destX, destY);
        ctx.strokeStyle = MAIN_COLOR;
        ctx.lineWidth = branch.width;
        ctx.lineCap = branch.rounded_caps ? "round" : "butt";
        ctx.stroke();
    }
}
