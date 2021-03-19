import {BoundingBox, Vec2} from "@/game/Geometry";
import {Tile} from "@/game/SpritesSheet";

export interface SpriteInterface {
    readonly tile: Tile;
    readonly boundingBox: BoundingBox;
    readonly image: HTMLCanvasElement;
}

export interface CanvasSprite extends SpriteInterface{
    draw(context: CanvasRenderingContext2D, pos: Vec2): void;
}

export default class Sprite implements SpriteInterface, CanvasSprite {
    readonly tile: Tile;
    readonly boundingBox: BoundingBox;
    readonly image: HTMLCanvasElement;

    constructor(tile: Tile, image: HTMLCanvasElement, boundingBox: BoundingBox) {
        this.tile = tile;
        this.image = image;
        this.boundingBox = boundingBox;
    }

    draw(context: CanvasRenderingContext2D, pos: Vec2): void {
        context.drawImage(this.image, pos.x, pos.y);
    }
}