import Entity from "@/game/Entity";
import {Vec2} from "@/game/Geometry";
import SpriteSheet from "@/game/SpritesSheet";
import Velocity from "@/game/traits/Velocity";
import Jump from "@/game/traits/Jump";
import Move from "@/game/traits/Move";
import Gravity from "@/game/traits/Gravity";
import {RenderInterface} from "@/Game";

export default class Mario extends Entity {
    constructor(sprite: SpriteSheet, pos: Vec2) {
        super(sprite, new Vec2(14, 16), pos, new Vec2(0, 0));

        this.addTrait(new Move())
            .addTrait(new Jump())
            .addTrait(new Gravity())
            //.addTrait(new Velocity());
    }

    drawLayer(render: RenderInterface) {
        super.drawLayer(render);

        this.sprite.draw('idle', render.context, new Vec2(0, 0));

        render.camera.updatePosition(new Vec2(this.boundingBox.left - 100, 0));
    }

    get velocity(): Velocity {
        return this.trait('velocity')
    }

    get move(): Move {
        return this.trait('move')
    }

    get jump(): Jump {
        return this.trait('jump')
    }
}