import {Branch, Circle, Dot} from "../models/shapes.ts";

const MAIN_COLOR = "#FF0000";

export function drawEye(ctx: CanvasRenderingContext2D, width: number, height: number, dot: Dot, circles: Circle[], branches: Branch[]): void {
    ctx.clearRect(0, 0, width, height);
    const centerX = width / 2;
    const centerY = height / 2;
    drawDot(ctx, dot, centerX, centerY);
    circles.forEach(circle => drawCircle(ctx, circle, centerX, centerY));
    branches.forEach(branch => drawBranch(ctx, branch, centerX, centerY));
}

function drawDot(ctx: CanvasRenderingContext2D, dot: Dot, x: number, y: number): void {
    ctx.beginPath();
    ctx.arc(x, y, dot.radius, 0, 2 * Math.PI);
    ctx.fillStyle = MAIN_COLOR;
    ctx.fill();
}

function drawCircle(ctx: CanvasRenderingContext2D, circle: Circle, x: number, y: number): void {
    ctx.beginPath();
    ctx.arc(x, y, circle.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = MAIN_COLOR;
    ctx.lineWidth = circle.width;
    ctx.stroke();
}

function drawBranch(ctx: CanvasRenderingContext2D, branch: Branch, x: number, y: number): void {
    ctx.beginPath();
    ctx.moveTo(x, y);
    // Convert the angle from degrees to radians. Angle is calculated clockwise, 0° is midnight.
    const angle = (branch.angle - 90) * Math.PI / 180;
    const destX = x + branch.length * Math.cos(angle);
    const destY = y + branch.length * Math.sin(angle);
    ctx.lineTo(destX, destY);
    ctx.strokeStyle = MAIN_COLOR;
    ctx.lineWidth = branch.width;
    ctx.stroke();
}
