import {Circle, Dot} from "../models/shapes.ts";

const MAIN_COLOR = "#FF0000";

export function drawEye(ctx: CanvasRenderingContext2D, width: number, height: number, dot: Dot, circles: Circle[]): void {
    ctx.clearRect(0, 0, width, height);
    const centerX = width / 2;
    const centerY = height / 2;
    drawDot(ctx, dot, centerX, centerY);
    circles.forEach(circle => drawCircle(ctx, circle, centerX, centerY));
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
