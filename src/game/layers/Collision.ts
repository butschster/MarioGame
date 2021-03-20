import {TileGeometry, TileResolver} from "@/game/TileCollider";
import {LayerInterface} from "@/game/Layer";
import CanvasBuffer from "@/game/CanvasBuffer";
import Entity from "@/game/Entity";
import {RenderInterface} from "@/Game";

export default class CollisionLayer implements LayerInterface {
    readonly tileResolver: TileResolver;
    readonly entities: Set<Entity>;
    readonly width: number;
    readonly height: number;
    readonly collidedTiles: Array<any>;

    constructor(tileResolver: TileResolver, entities: Set<Entity>, width: number, height: number) {
        this.tileResolver = tileResolver;
        this.entities = entities;
        this.width = width;
        this.height = height;

        this.collidedTiles = [];
        const originalGetByIndex = this.tileResolver.getByIndex

        this.tileResolver.getByIndex = (indexX: number, indexY: number) => {
            const tile = originalGetByIndex.call(tileResolver, indexX, indexY);
            this.collidedTiles.push(tile);

            return tile;
        }
    }

    drawLayer(render: RenderInterface): void {
        const buffer = new CanvasBuffer(this.width, this.height);

        buffer.context.font = '8px serif';

        this.collidedTiles.forEach((tile: TileGeometry) => {
            if(!tile || !tile.solid) return;

            const boundingBox = tile.boundingBox;
            buffer.drawRect(boundingBox, 'blue', render.camera.pos.multiplyAll(-1));
            buffer.context.fillText(
                Math.floor(boundingBox.left) + ', ' + Math.floor(boundingBox.top),
                boundingBox.left - render.camera.pos.x - 20, boundingBox.top - 4
            );
        })

        this.collidedTiles.length = 0;

        this.entities.forEach((entity: Entity) => {
            buffer.drawRect(entity.boundingBox, 'red', render.camera.pos.multiplyAll(-1));

            buffer.context.fillText(
                Math.floor(entity.boundingBox.left) + ', ' + Math.floor(entity.boundingBox.top) + ', ' + Math.floor(entity.vel.y),
                entity.boundingBox.right - render.camera.pos.x + 4, entity.boundingBox.top - 4
            );
            buffer.context.fillText(
                Math.floor(entity.boundingBox.right) + ', ' + Math.floor(entity.boundingBox.bottom),
                entity.boundingBox.right - render.camera.pos.x + 4, entity.boundingBox.bottom + 4
            );
        })

        render.context.drawImage(buffer.buffer, 0, 0)
    }
}