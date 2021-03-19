import Entity, {Trait} from "@/game/Entity";
import {Vec2} from "@/game/Geometry";
import SpriteSheet from "@/game/SpritesSheet";
import {loadMarioSprite} from "@/utils/loaders";
import Velocity from "@/game/traits/Velocity";
import Jump from "@/game/traits/Jump";

export function createMario(): Promise<Entity> {
    return loadMarioSprite()
        .then((sprite: SpriteSheet) => {
            const mario = new Entity(
                sprite,
                new Vec2(64, 60),
                new Vec2(0, 0)
            );

            mario.addTrait(new Velocity());
            mario.addTrait(new Jump());

            return mario;
        })
}