import Entity, {Trait} from "@/game/Entity";
import {Vec2} from "@/game/Geometry";
import {GameInterface} from "@/Game";

export default class Jump extends Trait {
    readonly duration: number;
    readonly velocity: Vec2;
    engageTime: number;

    constructor() {
        super('jump');

        this.duration = 0.5;
        this.velocity = new Vec2(0, 200);
        this.engageTime = 0;
    }

    start() {
        this.engageTime = this.duration;
    }

    cancel() {
        this.engageTime = 0;
    }

    update(entity: Entity, game: GameInterface) {
        if (this.engageTime > 0) {
            entity.vel.y = -this.velocity.y;
            this.engageTime -= game.deltaTime;
        }
    }
}