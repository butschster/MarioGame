import {Vec2} from "@/game/Geometry";

export default class Camera {
    readonly pos: Vec2;

    constructor() {
        this.pos = new Vec2(0, 0);
    }

    updatePosition(pos: Vec2) {
        this.pos.x = pos.x > 0 ? pos.x : 0;
    }
}