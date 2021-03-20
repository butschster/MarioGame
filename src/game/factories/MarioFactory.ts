import Entity, {Trait} from "@/game/Entity";
import {Vec2} from "@/game/Geometry";
import SpriteSheet from "@/game/SpritesSheet";
import {loadMarioSprite} from "@/game/loaders";
import Mario from "@/game/Entities/Mario";

export function createMario(): Promise<Entity> {
    return loadMarioSprite()
        .then((sprite: SpriteSheet) => {
            return new Mario(
                sprite,
                new Vec2(64, 60)
            );
        })
}