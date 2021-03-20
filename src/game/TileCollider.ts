import {BoundingBox, Matrix, Vec2} from "@/game/Geometry";
import Entity from "@/game/Entity";

export interface TileGeometry {
    readonly tile: string;
    readonly solid: boolean;
    readonly boundingBox: BoundingBox;
}

export class TileResolver {
    readonly tiles: Matrix;
    readonly tileSize: number;

    constructor(tiles: Matrix, tileSize = 16) {
        this.tiles = tiles;
        this.tileSize = tileSize;
    }

    toIndex(pos: number): number {
        return Math.floor(pos / this.tileSize);
    }

    getByIndex(indexX: number, indexY: number): TileGeometry {
        const tile = this.tiles.get(new Vec2(indexX, indexY));

        if (tile) {
            const boundingBox = tile.boundingBox(
                indexX, indexY
            );

            return {
                tile: tile.name,
                solid: tile.solid,
                boundingBox
            } as TileGeometry;
        }
    }

    matchByPosition(pos: Vec2): TileGeometry {
        return this.getByIndex(
            this.toIndex(pos.x),
            this.toIndex(pos.y)
        );
    }
}

export default class TileCollider {
    readonly resolver: TileResolver;

    constructor(tiles: Matrix) {
        this.resolver = new TileResolver(tiles);
    }

    checkY(entity: Entity): boolean {
        const tile = this.resolver.matchByPosition(entity.pos);
        if (!tile) {
            return false;
        }

        if (!tile.solid) {
            return false;
        }

        if (entity.vel.y > 0) {
            if (entity.boundingBox.bottom > tile.boundingBox.top) {
                entity.pos.y = tile.boundingBox.top - entity.size.y;
                entity.vel.y = 0;
            }
        } else if (entity.vel.y < 0) {
            if (entity.boundingBox.top < tile.boundingBox.bottom) {
                entity.pos.y = tile.boundingBox.bottom - entity.size.y;
                entity.vel.y = 0;
            }
        }

        //console.log(tile.boundingBox.collide(entity.pos, entity.vel))
    }
}