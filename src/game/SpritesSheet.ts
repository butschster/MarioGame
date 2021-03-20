import Sprite, {CanvasSprite} from "@/game/Sprite";
import {BoundingBox, Vec2} from "@/game/Geometry";
import CanvasBuffer from "@/game/CanvasBuffer";

export class Tile {
    readonly name: string;
    readonly width: number;
    readonly height: number;
    readonly solid: boolean;

    constructor(name: string, solid = false, width = 16, height = 16) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.solid = solid;
    }

    boundingBox(x: number, y: number): BoundingBox {
        return new BoundingBox(
            new Vec2(x * this.width, y * this.height),
            new Vec2(x * this.width + this.width, y * this.height + this.height)
        );
    }
}

export default class SpriteSheet {
    readonly image: HTMLImageElement;
    readonly tiles: Map<string, CanvasSprite>;

    constructor(image: HTMLImageElement) {
        this.image = image;
        this.tiles = new Map();
    }

    draw(name: string, context: CanvasRenderingContext2D, pos: Vec2): void {
        const sprite: CanvasSprite = this.tiles.get(name);

        sprite.draw(context, new Vec2(pos.x, pos.y));
    }

    drawTile(name: string, context: CanvasRenderingContext2D, pos: Vec2): void {
        const sprite: CanvasSprite = this.tiles.get(name);

        sprite.draw(
            context,
            pos.multiplyVec(new Vec2(sprite.boundingBox.width, sprite.boundingBox.height))
        );
    }

    defineTile(tile: Tile, x: number, y: number): this {
        this.define(tile, x, y);

        return this;
    }

    define(tile: Tile, x: number, y: number): this {
        const image = new CanvasBuffer(tile.width, tile.height)

        const boundingBox = tile.boundingBox(x * tile.width, y * tile.height);

        image.draw(this.image, x * tile.width, y * tile.height);

        this.tiles.set(
            tile.name,
            new Sprite(
                tile,
                image.buffer,
                boundingBox
            )
        );

        return this;
    }
}