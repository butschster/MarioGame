import {LayerInterface} from "@/game/Layer";
import Entity from "@/game/Entity";
import {RenderInterface} from "@/Game";
import CanvasBuffer from "@/game/CanvasBuffer";

export default class SpriteLayer implements LayerInterface {
    readonly entites: Set<Entity>;
    readonly buffer: CanvasBuffer;
    readonly width: number;
    readonly height: number;

    constructor(entites: Set<Entity>, width = 64, height = 64) {
        this.entites = entites;
        this.width = width;
        this.height = height;
        this.buffer = new CanvasBuffer(this.width, this.height);
    }

    drawLayer(render: RenderInterface): void {
        const bufferRender = Object.assign({}, render);
        bufferRender.context = this.buffer.context;
        bufferRender.camera = render.camera;

        this.entites.forEach(entity => {
            this.buffer.context.clearRect(0, 0, this.width, this.height);
            entity.drawLayer(bufferRender);

            render.context.drawImage(
                this.buffer.buffer,
                entity.boundingBox.left - render.camera.pos.x,
                entity.boundingBox.top - render.camera.pos.y,
            )
        })
    }
}