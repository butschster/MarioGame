import {RenderInterface} from "@/Game";

export interface LayerInterface {
    drawLayer(render: RenderInterface): void;
}