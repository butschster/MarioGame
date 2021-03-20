import TileCollider, {TileGeometry} from "@/game/TileCollider";
import {LayerInterface} from "@/game/Layer";
import CanvasBuffer from "@/game/CanvasBuffer";
import {Tile} from "@/game/SpritesSheet";
import {Vec2} from "@/game/Geometry";

export default class CollisionLayer implements LayerInterface {
    readonly collider: TileCollider;

    rendered: boolean;

    constructor(collider: TileCollider) {
        this.collider = collider;
    }

    drawLayer(context: CanvasRenderingContext2D): void {
        if (this.rendered) {
            return;
        }

        this.collider.resolver.tiles.forEach((tile: Tile, pos: Vec2) => {
            const buffer = new CanvasBuffer(tile.width, tile.height);
            const boundingBox = tile.boundingBox(pos.x, pos.y);

            buffer.drawRect(boundingBox)

            context.drawImage(buffer.buffer, pos.x, pos.y)
        });
        this.rendered = true;
    }
}