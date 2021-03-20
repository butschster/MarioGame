import {LayerInterface} from "@/game/Layer";
import CanvasBuffer from "@/game/CanvasBuffer";
import {Vec2} from "@/game/Geometry";
import {Tile} from "@/game/SpritesSheet";
import Level from "@/game/Level";

export default class BackgroundLayer implements LayerInterface {
    private buffer: CanvasBuffer;

    constructor(level: Level, width = 1000, height = 240) {
        this.buffer = new CanvasBuffer(width, height);
        level.tiles.forEach((tile: Tile, pos: Vec2) => {
            level.sprites.drawTile(tile.name, this.buffer.context, pos)
        })
    }

    drawLayer(context: CanvasRenderingContext2D): void {
        context.drawImage(this.buffer.buffer, 0, 0);
    }
}