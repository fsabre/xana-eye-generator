import {MAX_CIRCLE_RADIUS, MIN_CIRCLE_RADIUS} from "./constants.ts";
import {Circle, Dot} from "../models/shapes.ts";

type Interval = [number, number];

// Find the greatest free interval between min and max, excluding taken ones.
// Intervals can overlap.
// intervals can be decimals, but are rounded to greater integer ones.
function findGreatestFreeInterval(taken_intervals: Interval[], min: number, max: number): Interval | null {
    // Round the numbers, it's easier to work with integers
    let taken: Interval[] = taken_intervals.map(a => [Math.floor(a[0]), Math.ceil(a[1])]);
    // Sort the intervals by start
    taken.sort((a, b) => a[0] - b[0]);
    // Let's compute the free intervals
    const free: Interval[] = [];
    let current_start = min, current_end = min;

    // Create a free interval if pertinent
    function makeFreeInterval() {
        if (current_start !== current_end) {
            const interval: Interval = [current_start, current_end];
            free.push(interval);
        }
        current_start = current_end + 1;
    }

    while (current_start < max) {
        if (taken.length) {
            if (taken[0][0] <= current_start) {
                // The `current_start` is in an interval
                // Goto end of the interval
                current_start = taken[0][1] + 1;
                // Remove taken intervals that are already passed
                taken = taken.filter(a => a[1] >= current_start);
            } else {
                // Jump to the start of the next interval
                current_end = taken[0][0] - 1;
                makeFreeInterval();
            }
        } else {
            // No taken intervals anymore, time to race to the end
            current_end = max;
            makeFreeInterval();
        }
    }

    // Take the biggest free interval
    if (free.length) {
        free.sort((a, b) => ((b[1] - b[0]) - (a[1] - a[0])));
        return free[0];
    } else {
        return null;
    }
}

// Return a new circle, positioned so that it is not hidden
export function createCircle(dot: Dot, circles: Circle[]): Circle {
    // Let's find all radius that are taken by the dot and other circles.
    const taken: Interval[] = [];
    taken.push([0, dot.radius]);
    circles.forEach(c => taken.push([
        Math.floor(c.radius - c.width / 2),
        Math.ceil(c.radius + c.width / 2)]
    ));
    // Find the greatest free interval
    const free_interval = findGreatestFreeInterval(taken, MIN_CIRCLE_RADIUS, MAX_CIRCLE_RADIUS);
    // Use it to determinate the next circle properties
    const final_circle: Circle = {radius: 50, width: 10};
    if (free_interval !== null) {
        final_circle.radius = Math.floor((free_interval[1] + free_interval[0]) / 2);
        final_circle.width = Math.min(Math.max(free_interval[1] - free_interval[0] - 2, 1), 10);
    }
    return final_circle;
}
