import {LayerInterface} from "@/game/Layer";
import {RenderInterface} from "@/Game";

export default class Compositor {
    readonly layers: Array<LayerInterface>;

    constructor() {
        this.layers = [];
    }

    insertLayer(layer: LayerInterface): Compositor {
        this.layers.push(layer);
        return this;
    }

    draw(render: RenderInterface): void {
        this.layers.forEach((layer: LayerInterface) => {
            layer.drawLayer(render)
        })
    }
}