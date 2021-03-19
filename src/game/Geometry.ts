import {Tile} from "@/game/SpritesSheet";

export class Matrix {
    grid: any[];

    constructor() {
        this.grid = [];
    }

    forEach(callback: CallableFunction): void {
        this.grid.forEach((column: any[], x: number) => {
            column.forEach((tile: Tile, y) => {
                callback(tile, new Vec2(x, y));
            })
        })
    }

    get(pos: Vec2) {
        const col = this.grid[pos.x];
        if (col) {
            return col[pos.y];
        }

        return undefined;
    }

    set(pos: Vec2, tile: Tile) {
        if (!this.grid[pos.x]) {
            this.grid[pos.x] = [];
        }

        this.grid[pos.x][pos.y] = tile;
    }
}

export class Vec2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.set(x, y);
    }

    set(x: number, y: number): Vec2 {
        this.x = x;
        this.y = y;

        return this;
    }

    addVec(vec: Vec2): Vec2 {
        return new Vec2(this.x + vec.x, this.y + vec.y);
    }

    subVec(vec: Vec2): Vec2 {
        return new Vec2(this.x - vec.x, this.y - vec.y);
    }

    multiplyVec(vec: Vec2): Vec2 {
        return new Vec2(this.x * vec.x, this.y * vec.y);
    }

    multiplyAll(val: number): Vec2 {
        return new Vec2(this.x * val, this.y * val);
    }
}

export class BoundingBox {
    readonly topLeft: Vec2;
    readonly bottomRight: Vec2;

    constructor(topLeft: Vec2, bottomRight: Vec2) {
        this.topLeft = topLeft;
        this.bottomRight = bottomRight;
    }

    get topRight(): Vec2 {
        return new Vec2(this.bottomRight.x, this.topLeft.y);
    }

    get bottomLeft(): Vec2 {
        return new Vec2(this.topLeft.x, this.bottomRight.y);
    }

    get width(): number {
        return this.topRight.x - this.topLeft.x;
    }

    get height(): number {
        return this.bottomRight.y - this.topLeft.y;
    }
}
