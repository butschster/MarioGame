import Entity, {Trait} from "@/game/Entity";
import {GameInterface} from "@/Game";

export default class Gravity extends Trait {
    constructor() {
        super('gravity');
    }

    update(entity: Entity, game: GameInterface): void {
        entity.vel.y += game.level.gravity * game.deltaTime;
    }
}