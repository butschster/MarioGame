import {LayerInterface} from "@/game/Layer";

export default class Compositor {
    readonly layers: Array<LayerInterface>;

    constructor() {
        this.layers = [];
    }

    insertLayer(layer: LayerInterface): Compositor {
        this.layers.push(layer);
        return this;
    }

    draw(context: CanvasRenderingContext2D): void {
        this.layers.forEach((layer: LayerInterface) => {
            layer.drawLayer(context)
        })
    }
}