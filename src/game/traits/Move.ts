import Entity, {Trait} from "@/game/Entity";
import {GameInterface} from "@/Game";

export default class Move extends Trait {
    dir: number;
    speed: number;

    constructor() {
        super('move');
        this.dir = 0;
        this.speed = 6000;
    }

    right(): void {
        this.dir = 1;
    }

    left(): void {
        this.dir = -1;
    }

    stop(): void {
        this.dir = 0;
    }

    update(entity: Entity, game: GameInterface) {
        entity.vel.x = this.speed * this.dir * game.deltaTime;
    }
}