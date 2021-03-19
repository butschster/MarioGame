import Entity, {Trait} from "@/game/Entity";
import {GameInterface} from "@/Game";

export default class Velocity extends Trait {
    constructor() {
        super('velocity');
    }

    update(entity: Entity, game: GameInterface): void {
        entity.pos = entity.pos.addVec(
            entity.vel.multiplyAll(game.deltaTime)
        );

        entity.vel.y += game.level.gravity * game.deltaTime;
    }
}