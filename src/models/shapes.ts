export interface Dot {
    radius: number;
}

export interface Circle {
    radius: number;
    width: number;
}

export interface Branch {
    length: number;
    width: number;
    angle: number;
    mirror: boolean;
    start: number; // Circle index. Use -1 if not bound to a circle
    end: number; // Circle index. Use -1 if not bound to a circle
    rounded_caps: boolean;
}
