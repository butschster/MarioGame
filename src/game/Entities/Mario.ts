import Entity from "@/game/Entity";
import { Vec2 } from "@/game/Geometry";
import SpriteSheet from "@/game/SpritesSheet";
import Velocity from "@/game/traits/Velocity";
import Jump from "@/game/traits/Jump";

export default class Mario extends Entity {
    constructor(sprite: SpriteSheet, pos: Vec2) {
        super(sprite, new Vec2(16, 16), pos, new Vec2(0, 0));

        this.addTrait(new Velocity());
        this.addTrait(new Jump());
    }
}