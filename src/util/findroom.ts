import {MAX_CIRCLE_RADIUS} from "./constants.ts";
import {Circle, Dot} from "../models/shapes.ts";

// Return a new circle, positioned so that it is not hidden
export function createCircle(dot: Dot, circles: Circle[]): Circle {
    // Let's find all radius that are taken by the dot and other circles.
    const taken: [number, number][] = [];
    taken.push([0, dot.radius]);
    circles.forEach(c => taken.push([
        Math.floor(c.radius - c.width / 2),
        Math.ceil(c.radius + c.width / 2)]
    ));
    // Testing each radius is not the ideal solution, but it'll work for now.
    let tested_radius = 1;
    const free: [number, number][] = [];
    let free_interval: [number, number] = [tested_radius, tested_radius];
    while (tested_radius <= MAX_CIRCLE_RADIUS) {
        free_interval[1] = tested_radius;
        for (const taken_interval of taken) {
            if (tested_radius >= taken_interval[0] && tested_radius <= taken_interval[1]) {
                // If this radius is taken.
                // Save the free interval if it's not 1
                if (free_interval[1] - free_interval[0] > 1) {
                    free.push([...free_interval]);
                }
                // Reset it
                free_interval = [tested_radius + 1, tested_radius + 1];
                break;
            }
        }
        tested_radius++;
    }
    if (free_interval[1] - free_interval[0] > 1) {
        free.push([...free_interval]);
    }
    // Then find the largest free interval
    free.sort((a, b) => ((b[1] - b[0]) - (a[1] - a[0])));
    // Finally create the circle
    const final_circle: Circle = {radius: 50, width: 10};
    if (free.length > 0) {
        const chosen_interval = free[0];
        final_circle.radius = Math.floor((chosen_interval[1] + chosen_interval[0]) / 2);
        final_circle.width = Math.min(Math.max(chosen_interval[1] - chosen_interval[0] - 2, 1), 10);
    }
    return final_circle;
}
