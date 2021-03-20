import {BoundingBox} from "@/game/Geometry";

export default class CanvasBuffer {
    readonly buffer: HTMLCanvasElement;
    readonly width: number;
    readonly height: number;
    readonly context: CanvasRenderingContext2D;

    constructor(width: number, height: number) {
        this.buffer = document.createElement('canvas');
        this.width = width;
        this.height = height;
        this.buffer.width = width;
        this.buffer.height = height;
        this.context = this.buffer.getContext('2d');
    }

    draw(image: CanvasImageSource, x: number, y: number, dx = 0, dy = 0): void {
        this.context.drawImage(
            image,
            x, y,
            this.width, this.height,
            dx, dy,
            this.width, this.height
        )
    }

    drawRect(boundingBox: BoundingBox, color = 'blue'): void {
        this.context.strokeStyle = color;

        this.context.beginPath();
        this.context.rect(
            boundingBox.left, boundingBox.top,
            boundingBox.width, boundingBox.height
        )
        this.context.stroke();
    }
}