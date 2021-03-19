import {LayerInterface} from "@/game/Layer";
import Entity from "@/game/Entity";

export default class SpriteLayer implements LayerInterface {
    readonly entites: Set<Entity>;

    constructor(entites: Set<Entity>) {
        this.entites = entites;
    }

    drawLayer(context: CanvasRenderingContext2D): void {
        this.entites.forEach(entity => {
            entity.drawLayer(context);
        })
    }
}