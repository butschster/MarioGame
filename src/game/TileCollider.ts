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

    toIndexRange(pos1: number, pos2: number): Array<number> {
        const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
        const range = [];

        let pos = pos1;

        do {
            range.push(this.toIndex(pos));
            pos += this.tileSize;
        } while (pos < pMax);

        return range;
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

    searchByPosition(pos: Vec2): TileGeometry {
        return this.getByIndex(
            this.toIndex(pos.x),
            this.toIndex(pos.y)
        );
    }

    searchByRange(start: Vec2, end: Vec2): Array<TileGeometry> {
        const matches: Array<TileGeometry> = [];

        this.toIndexRange(start.x, end.x).forEach(indexX => {
            this.toIndexRange(start.y, end.y).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY);
                if (match) {
                    matches.push(match);
                }
            })
        })

        return matches;
    }
}

export default class TileCollider {
    readonly resolver: TileResolver;

    constructor(tiles: Matrix) {
        this.resolver = new TileResolver(tiles);
    }

    checkX(entity: Entity): void {
        const topLeft = Object.assign({}, entity.boundingBox.topLeft);
        const bottomRight = Object.assign({}, entity.boundingBox.bottomRight);

        if (entity.vel.x > 0) {
            topLeft.x = entity.boundingBox.right;
            bottomRight.x = entity.boundingBox.right;
        } else if(entity.vel.x < 0) {
            topLeft.x = entity.pos.x;
            bottomRight.x = entity.pos.x;
        } else {
            return;
        }

        const matches = this.resolver.searchByRange(
            topLeft,
            bottomRight
        );

        matches.forEach((tile: TileGeometry) => {
            if (!tile.solid) {
                return;
            }

            if (entity.vel.x > 0) { // Движение вправо
                if (entity.boundingBox.right > tile.boundingBox.left) {
                    entity.pos.x = tile.boundingBox.left - entity.boundingBox.height;
                    entity.vel.x = 0;
                }
            } else if (entity.vel.x < 0) { // Движение влево
                if (entity.boundingBox.left < tile.boundingBox.right) {
                    entity.pos.x = tile.boundingBox.right;
                    entity.vel.x = 0;
                }
            }
        })
    }

    checkY(entity: Entity): void {
        const topLeft = Object.assign({}, entity.boundingBox.topLeft);
        const bottomRight = Object.assign({}, entity.boundingBox.bottomRight);

        if (entity.vel.y > 0) {
            topLeft.y = entity.boundingBox.bottom;
            bottomRight.y = entity.boundingBox.bottom;
        } else if(entity.vel.y < 0) {
            topLeft.y = entity.pos.y;
            bottomRight.y = entity.pos.y;
        } else {
            return;
        }

        const matches = this.resolver.searchByRange(
            topLeft,
            bottomRight
        );

        matches.forEach((tile: TileGeometry) => {
            if (!tile.solid) {
                return;
            }

            if (entity.vel.y > 0) { // Движение вниз
                if (entity.boundingBox.bottom > tile.boundingBox.top) {
                    entity.pos.y = tile.boundingBox.top - entity.boundingBox.height;
                    entity.vel.y = 0;
                }
            } else if (entity.vel.y < 0) { // Движение вверх
                if (entity.boundingBox.top < tile.boundingBox.bottom) {
                    entity.pos.y = tile.boundingBox.bottom;
                    entity.vel.y = 0;
                }
            }
        })
    }
}